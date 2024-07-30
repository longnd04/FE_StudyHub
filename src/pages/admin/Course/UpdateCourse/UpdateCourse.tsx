import { FormikProps } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm, { ICourseFormInitialValues } from "../CourseForm";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { getCourseById } from "@/stores/thunks/course.thunk";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ICourseFormInitialValues>>(null);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => state.course);

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id));
    }
  }, [id, dispatch]);

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
          text="Update Course"
        />
      </div>
      {state.activeCourse && (
        <CourseForm
          type="update"
          formikRef={formikRef}
          course={state.activeCourse}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  )
}

export default UpdateCourse;
