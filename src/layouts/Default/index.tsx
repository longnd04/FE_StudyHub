import { useState, ReactNode } from 'react';
import { Layout, Menu, ConfigProvider, Input, Popover } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logoF8 from '@/assets/images/logo_f8.png';
import { IoPieChartOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaBookSolid } from 'react-icons/lia';
import { CiLogout, CiSearch, CiUser } from 'react-icons/ci';
import { RxComponentNone } from 'react-icons/rx';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { images } from '@/assets/images';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { LuUser } from 'react-icons/lu';

const { Content, Footer, Sider } = Layout;

interface IMenuItem {
    id: string;
    label: string;
    path?: string;
    icon?: ReactNode;
    onClick?: () => void;
    items?: IMenuItem[];
}

const theme = {
    token: {
        colorPrimary: '#f97316',
        colorBgContainer: '#ffffff',
    },
    components: {
        Menu: {
            itemSelectedBg: '#fff7ed',
            itemSelectedColor: '#f97316',
            itemHoverColor: '#333333',
            itemHoverBg: '#fff7ed',
        },
    },
};

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems: IMenuItem[] = [
        {
            id: '1',
            label: 'Dash Board',
            path: "/admin",
            icon: <IoPieChartOutline size={25} />,
        },
        {
            id: '2',
            label: 'Quản lý khóa học',
            icon: <LiaBookSolid size={25} />,
            items: [
                {
                    id: '2.1',
                    label: 'Learning',
                    icon: <GoDeviceCameraVideo size={25} />,
                },
            ],
        },
        {
            id: '3',
            label: 'Setting',
            icon: <IoSettingsOutline size={25} />,
            items: [
                {
                    id: "3.1",
                    label: "Role"
                },
                {
                    id: "3.2",
                    label: "Permission"
                },
                {
                    id: "3.3",
                    label: "Lesson"
                },
            ]
        },
        {
            id: '4',
            label: 'Profile',
            path: "/admin/profile",
            icon: <LuUser size={25} />,
        },
        {
            id: '5',
            label: 'Component',
            path: "/admin/components",
            icon: <RxComponentNone size={25} />,
        },
    ];
    const handleProfile = () => {
        console.log("Profile clicked");
    };

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    const settingsContent = (
        <div>
            <Link className="py-2 px-5 hover:bg-primary-100 hover:rounded-md hover:text-black cursor-pointer flex items-center"
                onClick={handleProfile} to={"/admin/profile"}>
                <CiUser size={18} className="mr-2" />
                <div>Profile</div>
            </Link>
            <hr className="border-primary-100 my-1" />
            <div
                className="py-2 px-5 hover:bg-primary-100 hover:rounded-md cursor-pointer flex items-center"
                onClick={handleLogout}
            >
                <CiLogout size={18} className="mr-2 text-red-500" />
                <span className='text-red-500'>Logout</span>
            </div>
        </div>
    );

    const renderMenuItems = (items: IMenuItem[]) => {
        return items.map((item) => {
            if (item.items && item.items.length > 0) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        icon={item.icon}
                        title={<span className='text-m-medium'>{item.label}</span>}
                    >
                        {renderMenuItems(item.items)}
                    </Menu.SubMenu>
                );
            }

            return (
                <Menu.Item
                    key={item.id}
                    icon={item.icon}
                    onClick={() => {
                        if (item.path) {
                            navigate(item.path);
                        }
                        if (item.onClick) {
                            item.onClick();
                        }
                    }}
                >
                    {<span className='text-m-medium'>{item.label}</span>}
                </Menu.Item>
            );
        });
    };

    return (
        <ConfigProvider theme={theme}>
            <div className="flex h-screen overflow-hidden">
                <div className="relative " style={{
                    width: collapsed ? 80 : 300,
                    transition: 'width 0.3s ease'
                }}>
                    <Sider
                        className='h-full border-r flex flex-col'
                        theme="light"
                        width={300}
                        collapsed={collapsed}
                        collapsible
                        trigger={null}
                    >
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 p-3 ">
                                <img className="w-[50px] h-[50px] rounded-xl" src={logoF8} alt="logo" />
                                {!collapsed && <div className="text-2xl font-semibold text-primary-500">Study Hub</div>}
                            </div>
                            <Menu className='pt-3 flex flex-col gap-2' defaultSelectedKeys={['1']} mode="inline">
                                {renderMenuItems(menuItems)}
                            </Menu>
                        </div>
                        <div
                            className="flex justify-end p-4 cursor-pointer"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <RightOutlined /> : <LeftOutlined />}
                        </div>
                    </Sider>
                </div>
                <Layout className="flex-1 overflow-hidden">
                    <div className='p-[7px] h-[70px] justify-end px-10 flex items-center bg-white gap-[30px] border-b'>
                        <div className='flex items-center gap-[30px]'>
                            <Input
                                prefix={<CiSearch className="text-[#718EBF]" size={20} />}
                                placeholder="Search for something"
                                className="bg-[#F5F7FA] placeholder:text-[#8BA3CB] rounded-full py-2 w-[255px]"
                            />
                            <Popover
                                content={settingsContent}
                                trigger="click"
                                placement="bottom"
                            >
                                <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-100 cursor-pointer'>
                                    <IoSettingsOutline className='text-[#718EBF]' size={25} />
                                </div>
                            </Popover>
                            <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-100'>
                                <IoIosNotificationsOutline className='text-red-500' size={25} />
                            </div>
                            <div>
                                <img className='w-[45px] rounded-full' src={images.logoF8} alt="" />
                            </div>
                        </div>
                    </div>
                    <Content className="p-4 bg-gray-50 overflow-y-auto" style={{ height: 'calc(100vh - 70px)' }}>
                        <Outlet />
                    </Content>
                    <Footer className="text-center text-gray-500">
                        Study Hub © 2024 Created by Akalong
                    </Footer>
                </Layout>

            </div>
        </ConfigProvider>
    );
};

export default DefaultLayout;