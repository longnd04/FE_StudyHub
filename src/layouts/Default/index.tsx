import { useState } from 'react';
import { ConfigProvider, Input } from 'antd';
import { images } from "@/assets/images";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications, IoMdHome } from "react-icons/io";
import { FaRoad } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import { AiOutlineNotification } from 'react-icons/ai';

const DefaultLayout = () => {
    const [selectedNav, setSelectedNav] = useState('home');

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FFA500',
                    colorPrimaryHover: '#FF8C00',
                },
                components: {
                    Input: {
                        activeBorderColor: '#FFA500',
                        hoverBorderColor: '#FFA500',
                    },
                },
            }}
        >
            <div className="flex flex-col h-screen">
                <header className="flex justify-between border-b px-8 py-3 items-center">
                    <div className="flex items-center gap-3">
                        <img className="w-[39px] h-[39px] rounded-lg" src={images.logoF8} alt="" />
                        <div className="text-l-semibold">Học Lập Trình Để Đi Làm</div>
                    </div>
                    <div>
                        <Input
                            prefix={<CiSearch className="text-[#718EBF]" size={20} />}
                            placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                            className="bg-[#F5F7FA] placeholder:text-[#8BA3CB] rounded-full py-2 w-[400px]"
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="text-gray-700 text-m-medium">Khoá học của tôi</div>
                        <IoIosNotifications size={18} />
                        <img className="w-[29px] h-[29px] rounded-full" src={images.logoF8} alt="" />
                    </div>
                </header>

                <div className="flex flex-1">
                    <nav className='flex flex-col fixed gap-6 pt-5 left-0 w-[100px] px-3 ml-3'>
                        <div className='flex flex-col gap-6'>
                            <div
                                className={`flex flex-col gap-2 cursor-pointer justify-center items-center w-[80px] h-[80px] rounded-md ${selectedNav === 'home' ? 'bg-primary-400 text-white' : 'hover:bg-primary-200'}`}
                                onClick={() => setSelectedNav('home')}
                            >
                                <div><IoMdHome size={20} /></div>
                                <div className='text-xs'>Trang chủ</div>
                            </div>
                            <div
                                className={`flex flex-col gap-2 cursor-pointer justify-center items-center w-[80px] h-[80px] rounded-md ${selectedNav === 'roadmap' ? 'bg-primary-400 text-white' : 'hover:bg-primary-200'}`}
                                onClick={() => setSelectedNav('roadmap')}
                            >
                                <div><FaRoad size={20} /></div>
                                <div className='text-xs'>Lộ trình</div>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col w gap-2 cursor-pointer fixed bottom-10 justify-center items-center w-[80px] h-[80px] rounded-m`}
                            onClick={() => setSelectedNav('notifi')}
                        >
                            <div className='w-[50px] h-[50px] bg-gray-300 rounded-full flex justify-center items-center'>
                                <AiOutlineNotification size={25} />
                            </div>
                        </div>
                    </nav>
                    <main className="flex-1 ml-[100px] pt-5 px-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default DefaultLayout;
