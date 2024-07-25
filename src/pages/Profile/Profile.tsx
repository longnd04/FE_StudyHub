import { images } from "@/assets/images"
import InputTextNumber from "@/components/InputTextNumber"

const Profile = () => {
    return (
        <div className="p-10">
            <div className="bg-white flex p-10 gap-10">
                <div>
                    <img className="w-[150px] rounded-full " src={images.logoF8} alt="" />
                </div>
                <div className="flex gap-[30px]">
                    <div>
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                    </div>
                    <div>
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                        <InputTextNumber className="w-[420px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile