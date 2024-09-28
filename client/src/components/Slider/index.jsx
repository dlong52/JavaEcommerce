import React, { useEffect, useState } from 'react';
import { slide_1, slide_3, slide_4, slide_5 } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
    const [indexActive, setIndexActive] = useState(0);
    const [isShowDr, setIsShowDr] = useState(false);

    const slides = [
        {
            image: slide_3,
            path: "/"
        },
        {
            image: slide_1,
            path: "/"
        },
        {
            image: slide_4,
            path: "/"
        },
        {
            image: slide_5,
            path: "/"
        }
    ];

    const handlePrev = () => {
        const newIndex = (indexActive - 1 + slides.length) % slides.length;
        setIndexActive(newIndex);
    };

    const handleNext = () => {
        const newIndex = (indexActive + 1) % slides.length;
        setIndexActive(newIndex);
    };

    const handleDot = (index) => {
        setIndexActive(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [indexActive]);

    return (
        <div className='min-h-[350px] w-full h-fit relative rounded-[5px] overflow-hidden'>
            <div
                className="w-full overflow-hidden"
                onMouseEnter={() => setIsShowDr(true)}
                onMouseLeave={() => setIsShowDr(false)}
            >
                <div
                    className="flex"
                    style={{
                        width: `${slides.length * 100}%`,
                        transform: `translateX(-${indexActive * (100 / slides.length)}%)`,
                        transition: '1s'
                    }}
                >
                    {slides.map((slide, index) => (
                        <a
                            key={index}
                            style={{ width: `${(1 / slides.length) * 100}%` }}
                            href={slide.path}
                        >
                            <img className='w-full object-center' src={slide.image} alt={`Slide ${index + 1}`} />
                        </a>
                    ))}
                </div>
            </div>
            <div className="absolute container mx-auto left-1/2 justify-between top-1/2 -translate-y-1/2 -translate-x-1/2 w-full flex">
                <div
                    className="flex justify-between w-full transition-all duration-300"
                    style={{ opacity: isShowDr ? 1 : 0 }}
                    onMouseEnter={() => setIsShowDr(true)}
                    onMouseLeave={() => setIsShowDr(false)}
                >
                    <button
                        onClick={handlePrev}
                        className="flex items-center justify-center bg-white w-[45px] aspect-square rounded-full border-[#33333371] border-[4px]"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex items-center justify-center bg-white w-[45px] aspect-square rounded-full border-[#33333371] border-[4px]"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            <div className="flex gap-x-3 absolute left-1/2 -translate-x-1/2 z-10 bottom-[40px]">
                {slides.map((dot, index) => (
                    <div
                        key={index}
                        className={`w-[100px] h-[3px] rounded-full duration-700 cursor-pointer ${indexActive === index ? 'bg-black' : 'bg-white'}`}
                        onClick={() => handleDot(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
