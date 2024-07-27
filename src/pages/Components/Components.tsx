import Button from '@/components/Button';
import InputTextNumber from '@/components/InputTextNumber';
import { IoSaveOutline } from 'react-icons/io5';

const Components = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="display-xl-medium">Button</div>
                <div className="flex flex-col gap-4 items-start">
                    <Button text="Đây là button primary" />
                    <Button isLoading text="Đây là button primary có isLoading" />
                    <Button isDisabled text="Đây là button primary có isDisabled" />
                    <Button icon={<IoSaveOutline />} text="Đây là button primary có icon" />
                    <Button type="default" text="Đây là button default" />
                    <Button type="default" isLoading text="Đây là button default có isLoading" />
                    <Button type="default" isDisabled text="Đây là button default có isDisabled" />
                    <Button type="default" icon={<IoSaveOutline />} text="Đây là button secondary có icon" />
                    <Button type="ghost" text="Đây là button ghost" />
                    <Button type="ghost" isLoading text="Đây là button ghost có isLoading" />
                    <Button type="ghost" isDisabled text="Đây là button ghost có isDisabled" />
                    <Button type="ghost" icon={<IoSaveOutline />} text="Đây là button ghost có icon" />
                    <Button size="full" text="Đây là button có w-full" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="display-xl-medium">Button</div>
                <div className="flex flex-col gap-4 items-start">
                    <InputTextNumber placeholder="Đây là input number" type="number" />
                    <InputTextNumber placeholder="Đây là input number bị disabled" isDisabled value={'Long'} />
                    <InputTextNumber placeholder="Đây là input text" type="text" />
                    <InputTextNumber error="error!!!" placeholder="Đây là input text bị lỗi" type="text" />
                    <InputTextNumber placeholder="Đây là input text bị readonly" isReadonly type="text" />
                    <InputTextNumber placeholder="Đây là input text có label" label="This is label" type="text" />
                    <InputTextNumber placeholder="Đây là input password" label="This is label" type="password" />
                </div>
            </div>
        </div>
    );
};

export default Components;
