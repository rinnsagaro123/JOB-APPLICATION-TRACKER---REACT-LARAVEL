import React from 'react';

const Background = ({ imageSrc, altText }) => {
    const handleImageError = () => {
        document.getElementById('background')?.classList.add('hidden');
    };

  return (
    <img
                    id="background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/assets/tym-bg2.png"
                    alt="sds"
                    onError={handleImageError}
/>
  );
};

export default Background;
