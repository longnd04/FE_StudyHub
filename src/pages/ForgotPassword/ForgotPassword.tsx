import logoF8 from "@/assets/images/logo_f8.png";
const ForgotPassword = () => {
    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[500px] p-10 rounded-xl gap-6 shadow-md">
                <img src={logoF8} className="w-[50px] rounded-lg" alt="Logo" />
                <div className="text-3xl font-bold">Quên mật khẩu?</div>
                <div className="text-center text-sm text-gray-400">
                    Nhập email của bạn chúng tôi sẽ gửi bạn mã khôi phục mật khẩu.
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="username">Tài khoản</label>
                        <input type="text" id="username" className="border p-[6px] focus:border-orange-200 focus:outline-none rounded" required />
                    </div>
                </div>
                <button className="border p-2 w-full rounded bg-orange-600 text-white">Đặt lại mật khẩu</button>
                <div className="text-center">
                    <div className="mt-2 text-sm text-gray-500">
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <span className="text-orange-500 underline px-1 cursor-pointer">điều khoản sử dụng</span>của chúng tôi.
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;
