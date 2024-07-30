import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import CourseForm, { ICourseFormInitialValues } from "../CourseForm";
import { useRef } from "react";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";

const CreateCourse = () => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<ICourseFormInitialValues>>(null);

    const handleSuccess = () => {
        navigate("/admin/course");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="display-l-semibold">Course</div>
                <Button
                    onClick={() => {
                        if (formikRef.current) {
                            formikRef.current.handleSubmit();
                        }
                    }}
                    icon={<FaPlus />}
                    text="Create Course"
                />
            </div>
            <CourseForm type="create" formikRef={formikRef} onSuccess={handleSuccess} />
        </div>
    )
}

export default CreateCourse;
