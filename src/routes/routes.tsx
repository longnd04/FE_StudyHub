import DefaultLayoutAdmin from '@/layouts/Auth';
import DefaultLayout from '@/layouts/Default';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import { IRoute } from '@/models/shared/routes.model';
import Course from '@/pages/admin/Course/Course/Course';
import CreateCourse from '@/pages/admin/Course/CreateCourse/CreateCourse';
import UpdateCourse from '@/pages/admin/Course/UpdateCourse/UpdateCourse';
import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import Products from '@/pages/admin/Products/Products';
import Components from '@/pages/Components/Components';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Register from '@/pages/Register/Register';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';
import Verify from '@/pages/Verify/Verify';

export const routes: IRoute[] = [
    {
        path: '/',

        layout: () => <DefaultLayout />,
        pages: [
            {
                path: '/',
                element: Home,
            },
            {
                path: '/profile',
                middleware: AuthMiddleware,
                element: () => <Profile />,
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
                path: '/course',
                element: () => <Course />,
            },
            {
                path: '/course/create',
                element: () => <CreateCourse />,
            },
            {
                path: '/course/update/:id',
                element: () => <UpdateCourse />,
            },
            {
                path: '/product',
                element: () => <Products />,
            },
            {
                path: '/components',
                element: () => <Components />,
            },
        ],
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/reset-password',
        element: ResetPassword,
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
