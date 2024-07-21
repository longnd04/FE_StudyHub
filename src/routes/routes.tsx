import DefaultLayout from '@/layouts/Default';
import AuthMiddleware from '@/middlewares/AuthMiddleware';
import { IRoute } from '@/models/shared/routes.model';
import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import Products from '@/pages/admin/Products/Products';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';


export const routes: IRoute[] = [
    {
        path: '/',
        middleware: AuthMiddleware,
        pages: [
            {
                path: '/',
                element: Home,
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
                path: '/admin',
                layout: () => <DefaultLayout />,
                pages: [
                    {
                        path: '/',
                        element: () => <Dashboard />,
                    },
                    {
                        path: '/product',
                        element: () => <Products />,
                    },
                ]
            },
        ],

    },
];
