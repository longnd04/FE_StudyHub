import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import logoF8 from '@/assets/images/logo_f8.png';
import { IoPieChartOutline } from 'react-icons/io5';
import { LiaBookSolid } from 'react-icons/lia';
import { IconType } from 'react-icons';
const { Content, Footer, Sider } = Layout;

interface IMenuItem {
    id: string;
    label: string;
    path?: string;
    icons?: IconType;
    onClick?: () => void;
    items?: IMenuItem[];
}

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const menuItems: IMenuItem[] = [
        {
            id: '1',
            label: 'Dash Board',
            // path: "dashboard",
            icons: IoPieChartOutline,
        },
        {
            id: '2',
            label: 'E-Learning',
            icons: LiaBookSolid,
            items: [
                {
                    id: '2.1',
                    label: 'Learning',
                    icons: LiaBookSolid,
                },
            ],
        },
    ];

    const renderMenuItems = (items: IMenuItem[]) => {
        return items.map((item) => {
            if (item.items && item.items.length > 0) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        icon={item.icons && <item.icons size={20} className="" />}
                        title={<span className="text-gray-700  text-sm font-medium">{item.label}</span>}
                        className=""
                    >
                        {renderMenuItems(item.items)}
                    </Menu.SubMenu>
                );
            }

            return (
                <Menu.Item
                    key={item.id}
                    icon={item.icons && <item.icons size={20} className="" />}
                    onClick={() => {
                        if (item.path) {
                            navigate(item.path);
                        }
                        if (item.onClick) {
                            item.onClick();
                        }
                    }}
                >
                    <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                </Menu.Item>
            );
        });
    };

    return (
        <Layout className="min-h-screen">
            <Sider theme="light" className="flex flex-col" width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="flex items-center gap-3 p-3 pl-5 border-b border-orange-300">
                    <img className="w-[50px] h-[50px] rounded-xl" src={logoF8} alt="logo" />
                    <div className="text-2xl font-semibold">Study Hub</div>
                </div>
                <Menu defaultSelectedKeys={['1']} mode="inline" className="bg-white border-r-0">
                    {renderMenuItems(menuItems)}
                </Menu>
            </Sider>
            <Layout>
                <Content className="p-4 bg-gray-100">
                    <Outlet />
                </Content>
                <Footer className="text-center">{/* Your footer content here */}</Footer>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
