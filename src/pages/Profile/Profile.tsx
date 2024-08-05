import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { getProfile, updateUser } from '@/stores/thunks/auth.thunk';
import { Col, Row, Modal, message } from 'antd';
import { BsPencil } from 'react-icons/bs';
import Button from '@/components/Button';
import InputTextNumber from '@/components/InputTextNumber';
import UploadImage from '@/components/UploadImage';

const Profile = () => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        user_name: user?.user_name || '',
        bio: user?.bio || '',
        github: user?.github || '',
        portfolio: user?.portfolio || '',
        avatar: user?.avatar || '',
    });

    useEffect(() => {
        dispatch(getProfile({}));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                user_name: user?.user_name || '',
                bio: user?.bio || '',
                github: user?.github || '',
                portfolio: user?.portfolio || '',
                avatar: user?.avatar || '',
            });
        }
    }, [user]);

    const handleIconClick = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (name: string, value: string | number) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (imageUrl: string | string[]) => {
        setFormData((prevData) => ({
            ...prevData,
            avatar: imageUrl,
        }));
    };

    const handleFormSubmit = async () => {
        try {
            await dispatch(updateUser({ body: formData, param: user.id })).unwrap();
            message.success('Update profile thành công');
        } catch (error) {
            message.error('Update profile không thành công');
        }
    };

    return (
        <div className="p-10 mx-auto max-w-screen-lg">
            <div>
                <Row className="bg-white flex p-10 w-full gap-10 rounded-lg shadow-lg relative">
                    <Col className="relative">
                        <img className="w-[150px] h-[150px] shrink-0 rounded-full" src={formData.avatar} alt="" />
                        <div
                            className="w-[30px] h-[30px] bg-blue-300 absolute right-0 rounded-full 
                            top-[103px] cursor-pointer flex justify-center items-center"
                            onClick={handleIconClick}
                        >
                            <BsPencil size={18} />
                        </div>
                    </Col>
                    <Col className="flex justify-between gap-10 mb-20">
                        <div className="w-[256px] flex flex-col gap-3">
                            <InputTextNumber
                                type="text"
                                value={formData.user_name}
                                className="w-full"
                                label="Tên"
                                name="user_name"
                                onChange={(value) => handleInputChange('user_name', value)}
                            />
                            <InputTextNumber
                                type="text"
                                value={user?.email}
                                className="w-full"
                                label="Email"
                                name="email"
                                onChange={(value) => handleInputChange('email', value)}
                            />
                        </div>
                        <div className="w-[256px] flex flex-col gap-3">
                            <InputTextNumber
                                type="text"
                                value={formData.bio}
                                className="w-full"
                                label="Bio"
                                name="bio"
                                onChange={(value) => handleInputChange('bio', value)}
                            />
                            <InputTextNumber
                                type="text"
                                value={formData.github}
                                className="w-full"
                                label="Git hub"
                                name="github"
                                onChange={(value) => handleInputChange('github', value)}
                            />
                            <InputTextNumber
                                type="text"
                                value={formData.portfolio}
                                className="w-full"
                                label="Portfolio"
                                name="portfolio"
                                onChange={(value) => handleInputChange('portfolio', String(value))}
                            />
                        </div>
                    </Col>
                    <Button className="absolute right-10 bottom-5" text="Cập nhật" onClick={handleFormSubmit} />
                </Row>
            </div>
            <Modal title="Upload Image" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <UploadImage label="Vui lòng chọn ảnh" onImageUpload={handleImageUpload} />
            </Modal>
        </div>
    );
};

export default Profile;
