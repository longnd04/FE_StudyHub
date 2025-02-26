import { images } from '@/assets/images';
import { AppDispatch } from '@/stores/store';
import { forgotPasswpord } from '@/stores/thunks/auth.thunk';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>('');

    const handleSubmit = () => {
        if (email) {
            dispatch(forgotPasswpord({ body: { email } }));
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="flex flex-col items-center bg-white w-[400px] p-8 rounded-lg shadow-lg">
                <img src={images.logoF8} className="w-16 mb-6 rounded-lg" alt="Logo" />
                <div className="text-2xl font-semibold mb-2">Quên mật khẩu ?</div>
                <p className="text-center text-sm text-gray-400 mb-4">Nhập email của bạn chúng tôi sẽ gửi bạn mã khôi phục mật khẩu</p>
                <div className="w-full mb-6 relative">
                    <input
                        type="email"
                        placeholder="Tài khoản"
                        id="email"
                        className="placeholder:text-m-medium border-b border-gray-300 text-m-medium peer 
                        h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-orange-500 transition-size duration-500 peer-focus:w-full"></div>
                </div>
                <button onClick={handleSubmit} className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600">
                    Đặt lại mật khẩu
                </button>
                <div className="text-center mt-6">
                    <p className="text-[10px] text-gray-500">
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

export default ForgotPassword;
