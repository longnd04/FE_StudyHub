import { images } from '@/assets/images';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <img src={images.logoF8} className="w-16 mb-6 rounded-lg" alt="Logo" />
                <div className="text-2xl font-semibold mb-2">Đăng ký tài khoản Study Hub</div>
                <p className="text-center text-xs text-red-500 mb-4">
                    Mỗi người nên sử dụng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa
                </p>
                <div className="w-full mb-6 relative">
                    <input
                        type="text"
                        placeholder="Tài khoản"
                        id="password"
                        className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                        required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                </div>
                <div className="w-full mb-6 relative">
                    <input
                        type="text"
                        placeholder="Tên người dùng"
                        id="password"
                        className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                        required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                </div>
                <div className="w-full mb-6 relative">
                    <input
                        type="text"
                        placeholder="Mật khẩu"
                        id="password"
                        className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                        required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                </div>
                <div className="w-full mb-6 relative">
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        id="password"
                        className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                        required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                </div>
                <button className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Đăng ký</button>
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
                        <Link className="text-orange-500 underline ml-1" to={'/login'}>Đăng nhập</Link>
                    </p>
                    <Link className="text-orange-500 underline text-[14px]" to={'/forgotpassword'}>Quên mật khẩu</Link>
                    <p className="mt-4 text-[10px] text-gray-500">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <Link className="text-orange-500 underline px-1" to={'/terms'}>điều khoản sử dụng</Link> của chúng tôi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
