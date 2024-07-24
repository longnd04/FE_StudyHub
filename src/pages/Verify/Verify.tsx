import { icons } from '@/assets/icons';

const Verify = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 ">
            <div className="w-[500px] flex gap-6 py-10 flex-col bg-white mx-auto rounded-xl border shadow-lg">
                <div className="flex justify-center">
                    <img className="w-[50px]" src={icons.iconVerify} alt="F8 Logo" />
                </div>
                <div className="items-center flex flex-col gap-4">
                    <h2 className="uppercase text-2xl text-center">Authenticate Your Account</h2>
                    <div className="border-t w-3/4 border-gray-300"></div>
                    <div className="font-semibold">Duyzfclong@gmail.com</div>
                    <button className="py-2 px-8 mt-4 text-white bg-orange-500 rounded-md">Verify</button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
