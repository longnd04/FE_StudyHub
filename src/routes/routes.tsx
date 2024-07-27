import DefaultLayoutAdmin from '@/layouts/Auth';
import DefaultLayout from '@/layouts/Default';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import { IRoute } from '@/models/shared/routes.model';
import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import Products from '@/pages/admin/Products/Products';
import Components from '@/pages/Components/Components';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Register from '@/pages/Register/Register';
import Verify from '@/pages/Verify/Verify';

export const routes: IRoute[] = [
    {
        path: '/',
        middleware: AuthMiddleware,
        layout: () => <DefaultLayout />,
        pages: [
            {
                path: '/',
                element: Home,
            },
        ],
    },
    {
        path: '/admin',
        layout: () => <DefaultLayoutAdmin />,
        pages: [
            {
                path: '/',
                element: () => <Dashboard />,
            },
            {
                path: '/product',
                element: () => <Products />,
            },
            {
                path: '/components',
                element: () => <Components />,
            },
            {
                path: '/profile',
                element: () => <Profile />,
            },
        ],
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/register',
        element: Register,
    },
    {
        path: '/forgotpassword',
        element: () => <ForgotPassword />,
    },
    {
        path: '/verify',
        element: () => <Verify />,
    },
];
