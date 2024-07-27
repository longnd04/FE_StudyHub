import { images } from '@/assets/images';
import Button from '@/components/Button';
import InputTextNumber from '@/components/InputTextNumber';
import { Col, Row } from 'antd';
import { BsPencil } from 'react-icons/bs';

const Profile = () => {
    return (
        <div className="p-10 mx-auto max-w-screen-lg ">
            <div>
                <Row className="bg-white flex p-10 w-full gap-10 rounded-lg shadow-lg relative">
                    <Col className="relative">
                        <img className="w-[150px] rounded-full " src={images.logoF8} alt="" />
                        <div
                            className="w-[30px] h-[30px] bg-blue-300 absolute right-0 rounded-full 
                            top-[103px] cursor-pointer flex justify-center items-center"
                        >
                            <BsPencil size={18} />
                        </div>
                    </Col>
                    <Col className="flex justify-between gap-10 mb-20">
                        <div className="w-[256px] flex flex-col gap-3">
                            <InputTextNumber placeholder="Long" className="w-full" label="Tên" />
                            <InputTextNumber placeholder="duyzfclong@gmail.com" className="w-full" label="Email" />
                            <InputTextNumber placeholder="************" type="password" className="w-full" label="Mật khẩu" />
                        </div>
                        <div className="w-[256px] flex flex-col gap-3">
                            <InputTextNumber placeholder="30/9/2004" className="w-full" label="Ngày sinh" />
                            <InputTextNumber placeholder="Đông Anh - Hà Nội" className="w-full" label="Địa chỉ" />
                        </div>
                    </Col>
                    <Button className="absolute right-10 bottom-5 " text="Cập nhật" />
                </Row>
            </div>
        </div>
    );
};

export default Profile;
