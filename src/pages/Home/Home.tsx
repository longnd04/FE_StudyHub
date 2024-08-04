import { useState, useEffect } from 'react';
import { images } from '@/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourse } from '@/stores/thunks/course.thunk';
import { AppDispatch } from '@/stores/store';
import { ICourse } from '@/stores/module';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [images.slider1, images.slider3];
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const { courses } = useSelector((state: any) => state.course)
    console.log(courses);


    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getAllCourse({ query: {} }));
    }, [dispatch]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };
    useEffect(() => {
        setInterval(nextSlide, 3000);
    }, []);

    return (
        <div>
            <div className="relative">
                <div className="w-full h-[300px] overflow-hidden">
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
            <div className='my-10'>
                <div className='display-l-bold '>Khoá học Pro</div>
                <div className='flex gap-10 my-10'>
                    {courses.map((course: ICourse, index: number) => (
                        <div className='w-[300px] flex flex-col  rounded-xl overflow-hidden shadow-lg' key={index}>
                            <img className='w-full h-auto' src={course.thumbnail} alt={course.title} />
                            <div className=' bg-gray-50 flex flex-col gap-2 px-4'>
                                <div className='pt-4 text-l-semibold'>{course.title}</div>
                                <div className='flex gap-3'>
                                    <div className='text-l line-through text-gray-700'>{course.regular_price}đ</div>
                                    <div className='text-l-regular text-red-500'>{course.sale_price}đ</div>
                                </div>
                                <div className='text-gray-500'>{course.total_time}</div>
                                <div className='text-gray-500'>{course.students}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
