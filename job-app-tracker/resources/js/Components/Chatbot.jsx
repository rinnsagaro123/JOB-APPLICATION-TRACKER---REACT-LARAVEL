import { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(null); // State to track the open options menu
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [deletingMessage, setDeletingMessage] = useState(null);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const messagesEndRef = useRef(null); // Reference for scrolling to the bottom of the chat

    // Fetching conversation history
    const fetchConversationHistory = async () => {
        try {
            const response = await fetch('http://localhost:8000/chatbot-conversations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                const data = await response.json();
                const formattedMessages = data.map((item) => ({
                    id: item.id,
                    sender: item.sender,
                    text: item.message,
                }));
                setMessages(formattedMessages);
            } else {
                console.error('Failed to fetch conversation history:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching conversation history:', error);
        }
    };

    useEffect(() => {
        fetchConversationHistory();
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the chat when new messages are added
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending a message to the AI and getting a response
    const handleSendMessage = async () => {
        if (userInput.trim() === '') return;
    
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const userID = window.appConfig?.userID || 'guest';
    
        const userMessage = { sender: 'user', text: userInput };
    
        setMessages((prevMessages) => [...prevMessages, userMessage]);
    
        try {
            const response = await fetch('http://localhost:8000/chatbot-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ userInput: userInput, userID: userID }),
                credentials: 'same-origin',
            });
    
            if (response.ok) {
                const data = await response.json();
                const botResponse = data.response || 'Sorry, something went wrong.';
                const botMessage = { sender: 'bot', text: botResponse };
    
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else {
                console.error('Failed to get response:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with server:', error);
            const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    
        setUserInput('');
    };
    
    

    const saveMessageToDatabase = async (message) => {
        try {
            await fetch('http://localhost:8000/chatbot-save-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(message),
                credentials: 'same-origin',
            });
        } catch (error) {
            console.error('Error saving message to the database:', error);
        }
    };

    // Handle Enter key press for sending messages
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    // Toggle minimize/maximize
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Open edit modal and pre-fill message text
    const handleEdit = (index) => {
        console.log("index", index);
        console.log('message:', messages[index].text);
        setEditingMessage(index);
        setUserInput(messages[index].text);
        setShowEditModal(true);
        setShowOptionsMenu(null);
    };

    // Open delete confirmation modal
    const handleDelete = (index) => {
        setDeletingMessage(index);
        setShowDeleteModal(true);
        setShowOptionsMenu(null);
    };

    // Function to delete the message
  // Function to delete the message and remove it from the database
  const handleDeleteMessage = async () => {
    if (deletingMessage === null || deletingMessage === undefined) {
        console.error("No message selected for deletion.");
        return;
    }

    try {
        const messageId = messages[deletingMessage]?.id;

        if (!messageId) {
            console.error("Message ID not found. Cannot delete the message.");
            return;
        }

        const response = await fetch(`http://localhost:8000/chatbot-messages/${messageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            credentials: 'same-origin',
        });

        if (response.ok) {
            // Remove the deleted message from the local state
            setMessages((prevMessages) => 
                prevMessages.filter((_, index) => index !== deletingMessage)
            );

            // Close modals and clear state
            setShowDeleteModal(false);
            setDeletingMessage(null);
            setShowOptionsMenu(null);
        } else {
            console.error(`Failed to delete message. Status: ${response.status}, Text: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error occurred while deleting the message:", error);
    }
};



// Handle saving the edited message to the backend
const handleEditMessage = async () => {
    if (userInput.trim() === '') return; // Don't send empty message

    const updatedMessage = { sender: 'user', text: userInput };

    try {
        const response = await fetch(`http://localhost:8000/chatbot-messages/${messages[editingMessage].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ text: userInput }), // Send updated text
            credentials: 'same-origin',
        });

        if (response.ok) {
            const data = await response.json();
            // Update the message in the state with the new text
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[editingMessage] = { ...updatedMessages[editingMessage], text: data.data.message };
                return updatedMessages;
            });

            setShowEditModal(false); // Close modal after saving
            setUserInput(''); // Clear the input field
        } else {
            console.error('Failed to update message:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating message:', error);
    }
};



    const handleOptionsMenuToggle = (index) => {
        // If the options menu is already open for this message, close it
        if (showOptionsMenu === index) {
            setShowOptionsMenu(null);
        } else {
            // Otherwise, open the options menu for this message
            setShowOptionsMenu(index);
        }
    };
    

    return (
<div className="fixed bottom-4 right-4 w-86 bg-white border shadow-lg rounded-lg">
    {/* Top Section - Header with blue background covering the full width */}
    <div className="bg-blue-500 p-4 rounded-t-lg flex justify-between items-center">
                <div className="text-lg font-semibold cursor-pointer" onClick={toggleMinimize}>
                    TrackMyJob - ChatBot
                </div>
                <button onClick={toggleMinimize} className="text-gray-500">
                    {isMinimized ? '🔼' : '🔽'}
                </button>
            </div>

            {!isMinimized && (
            <div className="h-80 overflow-y-auto mt-2 mb-4 p-2 border-b">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`relative mb-2 flex items-center ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                    
        >
         {/* Message Content */}
         {message.sender === 'user' && (
             <div className="ml-2">
                 <button
                     className="text-gray-500"
                     onClick={() => handleOptionsMenuToggle(index)}
                 >
                     <FaEllipsisV />
                 </button>

                 {showOptionsMenu === index && (
                     <div className="absolute left-0 bg-white shadow-lg rounded-lg w-32 p-2 mt-2 z-50">
                         <button
                             onClick={() => {
                                 handleEdit(index);
                                 setShowOptionsMenu(null); // Close the options menu after selecting
                             }}
                             className="w-full text-left p-1"
                         >
                             Edit
                         </button>
                         <button
                             onClick={() => {
                                 handleDelete(index);
                                 setShowOptionsMenu(null); // Close the options menu after selecting
                             }}
                             className="w-full text-left p-1"
                         >
                             Delete
                         </button>
                     </div>
                 )}
             </div>
         )}
         <div
             className={`inline-block p-2 rounded-lg max-w-xs ${
                 message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
             }`}
         >
             {message.text}
         </div>

         {/* Options Menu (only for user messages) */}
         
     </div>
 ))}
 <div ref={messagesEndRef} />
</div>

            
            )}

            {!isMinimized && (
                <div className="flex">
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded-l-lg"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-96">
                        <h3 className="font-semibold">Edit Message</h3>
                        <textarea
                            value={userInput}  // Make sure userInput is bound to the message text to edit
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                        <div className="flex justify-end mt-2">
                            <button onClick={handleEditMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-96">
                        <h3 className="font-semibold">Are you sure you want to delete this message?</h3>
                        <div className="flex justify-end mt-2">
                            <button onClick={handleDeleteMessage} className="bg-red-500 text-white px-4 py-2 rounded">
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
