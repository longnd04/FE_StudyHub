import { useState, useEffect } from 'react';
import { images } from '@/assets/images';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [images.slider1, images.slider3];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <div className="w-full h-[350px] overflow-hidden">
                <div className="w-full h-full relative">
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className={`absolute top-0 left-0 w-full h-full rounded-xl object-cover transition-opacity duration-500 
                                ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
                <button
                    className="absolute top-1/2 left-[-18px] transform w-[40px] h-[40px] flex justify-center
                     items-center -translate-y-1/2 bg-white text-primary-500 p-3 rounded-full shadow-xl"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>
                <button
                    className="absolute top-1/2 right-[-18px] transform w-[40px] h-[40px] flex justify-center 
                    items-center -translate-y-1/2 bg-white text-primary-500 p-3 rounded-full shadow-xl"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Home;
