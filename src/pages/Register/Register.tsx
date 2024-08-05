import { images } from '@/assets/images';
import { AppDispatch } from '@/stores/store';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '@/stores/thunks/auth.thunk';
import Button from '@/components/Button';
import { Status } from '@/models/index.model';

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: any) => state.auth);

    const formik = useFormik({
        initialValues: {
            user_name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required('Tài khoản là bắt buộc'),
            email: Yup.string().email().required('Email là bắt buộc'),
            password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
                .required('Nhập lại mật khẩu là bắt buộc'),
        }),

        onSubmit: (values) => {
            dispatch(
                register({
                    body: values,
                }),
            );
        },
    });

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <img src={images.logoF8} className="w-16 mb-6 rounded-lg" alt="Logo" />
                <div className="text-2xl font-semibold mb-2">Đăng ký tài khoản Study Hub</div>
                <p className="text-center text-xs text-red-500 mb-4">Mỗi người nên sử dụng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa</p>
                <form onSubmit={formik.handleSubmit} className="w-full">
                    <div className="w-full mb-6 relative">
                        <div className="relative">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer 
                                h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm ">{formik.errors.email}</div> : null}
                    </div>
                    <div className="w-full mb-6 relative">
                        <div className="relative">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Tài khoản"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium 
                                peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.user_name}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.user_name && formik.errors.user_name ? <div className="text-red-500 text-sm">{formik.errors.user_name}</div> : null}
                    </div>
                    <div className="w-full mb-6 relative">
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full 
                                w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
                    </div>
                    <div className="w-full mb-6 relative">
                        <div className="relative">
                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Nhập lại mật khẩu"
                                className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full
                                 w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                        </div>
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirm_password}</div>
                        ) : null}
                    </div>
                    <Button
                        text="Đăng ký"
                        isLoading={state.status === Status.PENDING}
                        className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                    />
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
                        Bạn đã có tài khoản?
                        <Link className="text-orange-500 underline ml-1" to={'/login'}>
                            Đăng nhập
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

export default Register;
