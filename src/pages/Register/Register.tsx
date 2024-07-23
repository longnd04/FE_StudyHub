import logoF8 from "@/assets/images/logo_f8.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[500px] p-10 rounded-xl gap-4 shadow-md">
                <img src={logoF8} className="w-[50px] rounded-lg" alt="Logo" />
                <div className="text-3xl font-bold">Đăng ký tài khoản Study Hub</div>
                <div className="text-center text-sm text-red-500">
                    Mỗi người nên sử dụng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="username">Tài khoản</label>
                        <input type="text" id="username" className="border p-[6px] focus:border-orange-200 focus:outline-none rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Tên của bạn</label>
                        <input type="text" id="username" className="border p-[6px] focus:border-orange-200 focus:outline-none rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" id="password" className="border p-[6px] focus:border-orange-200 focus:outline-none rounded" required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Nhập lại mật khẩu</label>
                        <input type="text" id="username" className="border p-[6px] focus:border-orange-200 focus:outline-none rounded" required />
                    </div>

                </div>
                <button className="border p-2 w-full rounded bg-orange-600 text-white">Đăng ký</button>
                <div className="flex items-center w-full">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 font-bold uppercase tracking-wide">Hoặc</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center gap-3 text-center cursor-pointer font-medium">
                    <FcGoogle className="text-2xl" />
                    <div className="flex text-center">Đăng ký với Google</div>
                </div>
                <div className="text-center">
                    <div>Bạn đã có tài khoản?
                        <Link className="text-orange-500 underline cursor-pointer ml-1" to={"/login"}>Đăng nhập</Link>
                    </div>
                    <div className="text-orange-500 underline">Quên mật khẩu</div>
                    <div className="mt-2 text-sm text-gray-500">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <span className="text-orange-500 underline px-1 cursor-pointer">điều khoản sử dụng</span>của chúng tôi.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
