import { images } from '@/assets/images';
import { AppDispatch } from '@/stores/store';
import { login } from '@/stores/thunks/auth.thunk';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email là bắt buộc'),
            password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
        }),
        onSubmit: (values) => {
            dispatch(
                login({
                    body: values,
                }),
            );
        },
    });

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <img src={images.logoF8} className="w-16 mb-6 rounded-lg" alt="Logo" />
                <div className="text-2xl font-semibold mb-2">Đăng nhập vào Study Hub</div>
                <p className="text-center text-xs text-red-500 mb-4">
                    Mỗi người nên sử dụng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa
                </p>
                <form onSubmit={formik.handleSubmit} className="w-full">
                    <div className="w-full mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full w-
                                full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm ">{formik.errors.email}</div> : null}
                    </div>
                    <div className="w-full mb-6">
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer
                                 h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm ">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                        Đăng nhập
                    </button>
                </form>
                <div className="flex items-center w-full my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="text-[14px] mx-4 text-gray-500 font-semibold uppercase">Hoặc</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button className="p-3 flex items-center justify-center border rounded-full hover:bg-gray-100 transition">
                    <FcGoogle className="text-2xl" />
                </button>
                <div className="text-center mt-6">
                    <p className="mb-2 text-[14px]">
                        Bạn chưa có tài khoản?
                        <Link className="text-orange-500 underline ml-1" to={'/register'}>
                            Đăng ký
                        </Link>
                    </p>
                    <Link className="text-orange-500 underline text-[14px]" to={'/forgotpassword'}>
                        Quên mật khẩu
                    </Link>
                    <p className="mt-4 text-[10px] text-gray-500">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <Link className="text-orange-500 underline px-1" to={'/terms'}>
                            điều khoản sử dụng
                        </Link>{' '}
                        của chúng tôi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
