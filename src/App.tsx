import { Routes, useNavigate } from 'react-router-dom';
import { routes } from './routes/routes';
import { renderRoutes } from './routes/renderRoutes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthActions } from './models/index.model';
import { message } from 'antd';

function App() {
    const navigate = useNavigate()
    const { action } = useSelector((state: any) => state.auth)

    useEffect(() => {
        switch (action) {
            case AuthActions.LOGIN:
                message.success("Đăng Nhập thành công")
                navigate('/')
                break;
            case AuthActions.VERIFY:
                message.success("Xác thực thành công")
                navigate('/login')
                break;
            case AuthActions.REGISTER:
                message.success("Đăng Ký thành công")
                navigate('/login')
                break;
            case AuthActions.LOGOUT:
                navigate('/login')
                message.success("Đăng xuất thành công")
                break;
            default:
                break;
        }

    }, [action])

    return <Routes>{renderRoutes(routes)}</Routes>;
}
export default App;
