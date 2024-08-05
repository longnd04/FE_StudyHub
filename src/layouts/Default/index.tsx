import { useState, useEffect } from 'react';
import { ConfigProvider, Input, Popover } from 'antd';
import { images } from '@/assets/images';
import { CiLogout, CiSearch } from 'react-icons/ci';
import { IoIosNotifications, IoMdHome } from 'react-icons/io';
import { FaRoad } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlineNotification } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '@/stores/thunks/auth.thunk';
import { AppDispatch } from '@/stores/store';
import Button from '@/components/Button';
import { RiAdminLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

const DefaultLayout = () => {
    const [selectedNav, setSelectedNav] = useState('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        dispatch(getProfile({}));
    }, [dispatch]);
    const checkPemisson = localStorage.getItem('user');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        setIsAuthenticated(!!accessToken && !!refreshToken);
    }, []);

    const settingsContent = (
        <div className="w-[300px]">
            <div className=" flex gap-5 pb-5 pt-3 px-2">
                <img className="w-[50px] h-[50px] shrink-0 rounded-full" src={user?.avatar} alt="" />
                <div>
                    <div className="text-l-semibold">{user?.user_name}</div>
                    <div>{user?.email}</div>
                </div>
            </div>
            {checkPemisson === 'ADMIN' && (
                <Link className="py-2 px-5 hover:bg-primary-100 hover:rounded-md hover:text-black cursor-pointer flex items-center" to={'/admin'}>
                    <RiAdminLine className="mr-2" size={18} />
                    <div>Trang quản trị</div>
                </Link>
            )}
            <Link className="py-2 px-5 hover:bg-primary-100 hover:rounded-md hover:text-black cursor-pointer flex items-center" to={'/profile'}>
                <CgProfile size={18} className="mr-2" />
                <div>Profile</div>
            </Link>

            <hr className="border-primary-100 my-1" />
            <div className="py-2 px-5 hover:bg-primary-100 hover:rounded-md cursor-pointer flex items-center" onClick={() => dispatch(logout())}>
                <CiLogout size={18} className="mr-2 text-red-500" />
                <span className="text-red-500">Logout</span>
            </div>
        </div>
    );

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
                    {isAuthenticated && (
                        <div className="flex items-center gap-5">
                            <div className="text-gray-700 text-m-medium">Khoá học của tôi</div>
                            <IoIosNotifications size={18} />
                            <Popover content={settingsContent} trigger="click" placement="bottom">
                                <img className="w-[29px] h-[29px] rounded-full" src={user?.avatar} alt="" />
                            </Popover>
                        </div>
                    )}
                    {!isAuthenticated && (
                        <div className="flex gap-5">
                            <Link to={'/register'}>
                                {' '}
                                <Button type="ghost" text="Đăng ký" />
                            </Link>
                            <Link to={'/login'}>
                                {' '}
                                <Button text="Đăng nhập" />
                            </Link>
                        </div>
                    )}
                </header>

                <div className="flex flex-1">
                    <nav className="flex flex-col fixed gap-6 pt-5 left-0 w-[100px] px-3 ml-3">
                        <div className="flex flex-col gap-6">
                            <div
                                className={`flex flex-col gap-2 cursor-pointer justify-center items-center w-[70px] h-[70px] rounded-md
                                     ${selectedNav === 'home' ? 'bg-primary-400 text-white' : 'hover:bg-primary-200'}`}
                                onClick={() => setSelectedNav('home')}
                            >
                                <div>
                                    <IoMdHome size={20} />
                                </div>
                                <div className="text-xs">Trang chủ</div>
                            </div>
                            <div
                                className={`flex flex-col gap-2 cursor-pointer justify-center items-center w-[70px] h-[70px] rounded-md 
                                    ${selectedNav === 'roadmap' ? 'bg-primary-400 text-white' : 'hover:bg-primary-200'}`}
                                onClick={() => setSelectedNav('roadmap')}
                            >
                                <div>
                                    <FaRoad size={20} />
                                </div>
                                <div className="text-xs">Lộ trình</div>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col w gap-2 cursor-pointer fixed bottom-10 justify-center items-center w-[70px] h-[70px] rounded-m`}
                            onClick={() => setSelectedNav('notifi')}
                        >
                            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex justify-center items-center">
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
