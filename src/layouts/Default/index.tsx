import { useState, ReactNode } from 'react';
import { Layout, Menu, ConfigProvider, Input } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import logoF8 from '@/assets/images/logo_f8.png';
import { IoPieChartOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaBookSolid } from 'react-icons/lia';
import { CiSearch } from 'react-icons/ci';
import { RxComponentNone } from 'react-icons/rx';
import { GoDeviceCameraVideo } from 'react-icons/go';

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
            label: 'Component',
            icon: <RxComponentNone  size={25} />,
        },
    ];

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
            <Layout className="min-h-screen">
                <Sider theme="light" width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="flex items-center gap-3 p-3 pl-5 border-b border-orange-300">
                        <img className="w-[50px] h-[50px] rounded-xl" src={logoF8} alt="logo" />
                        {!collapsed && <div className="text-2xl font-semibold text-orange-500">Study Hub</div>}
                    </div>
                    <Menu className='pt-3 flex flex-col gap-2' defaultSelectedKeys={['1']} mode="inline">
                        {renderMenuItems(menuItems)}
                    </Menu>
                </Sider>
                <Layout>
                    <div className='p-3 flex items-center'>
                        <Input
                            prefix={<CiSearch className="text-gray-400" />}
                            placeholder="Search for something"
                            className="bg-[#F5F7FA] "
                        />

                    </div>
                    <Content className="p-4 bg-gray-100">
                        <Outlet />
                    </Content>
                    <Footer className="text-center text-gray-500">
                        Study Hub © 2024 Created by Akalong
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default DefaultLayout;