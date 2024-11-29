export default function WelcomeAppLogo(props) {
    return (
        <img
            {...props}
            src="/assets/trackmyjob2.png" // Path to the logo in the public/assets folder
            className="h-12 w-auto"
        />
    );
}
