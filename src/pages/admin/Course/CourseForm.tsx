import React, { useState } from 'react';
import { FormikRefType } from "@/models/shared/api.model";
import { AppDispatch } from "@/stores/store";
import { createCourse, updateCourse } from "@/stores/thunks/course.thunk";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { number, object, string } from "yup";
import lodash from 'lodash';
import FormGroup from "@/components/FormGroup";
import InputTextNumber from "@/components/InputTextNumber";
import { message } from "antd";
import UploadImage from "@/components/UploadImage";
import { ICourse } from "@/stores/module";

interface ICourseFormProps {
  formikRef?: FormikRefType<ICourseFormInitialValues>;
  type: "create" | "update";
  course?: ICourseFormInitialValues;
  onSuccess?: () => void;
  FormikRefType?: React.MutableRefObject<FormikProps<ICourse> | null>;
}

export interface ICourseFormInitialValues {
  id?: string;
  title: string;
  description?: string;
  thumbnail: string;
  regular_price?: number;
  sale_price?: number;
}

const CourseForm: React.FC<ICourseFormProps> = ({ formikRef, type, onSuccess, course }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: ICourseFormInitialValues = {
    title: course?.title || "",
    description: course?.description || "",
    thumbnail: course?.thumbnail || "",
    regular_price: course?.regular_price || 0,
    sale_price: course?.sale_price || 0,
  };
  const courseSchema = object().shape({
    title: string().required("Vui lòng nhập tên khóa học"),
    description: string().required("Vui lòng nhập mô tả"),
    thumbnail: string().required("Vui lòng nhập URL hình ảnh"),
    regular_price: number().min(0, "Giá không thể âm").required("Vui lòng nhập giá"),
    sale_price: number().min(0, "Giá khuyến mãi không thể âm").required("Vui lòng nhập giá khuyến mãi"),
  });
  const handleSubmit = async (values: ICourseFormInitialValues, formikHelpers: FormikHelpers<ICourseFormInitialValues>) => {
    const { setSubmitting, setErrors } = formikHelpers;
    try {
      const payload = {
        ...lodash.omit(values, ["id"]),
      };
      if (type === "create") {
        await dispatch(createCourse({ body: payload })).unwrap();
        message.success("Khóa học đã được tạo thành công");
      } else if (type === "update" && course?.id) {
        await dispatch(updateCourse({ body: payload, param: course.id })).unwrap();
        message.success("Khóa học đã được cập nhật thành công");
      }
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={courseSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleBlur, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormGroup title="Thông tin">
            <InputTextNumber
              label="Title"
              placeholder="Nhập tiêu đề khóa học"
              name="title"
              value={values.title}
              error={touched.title ? errors.title : ""}
              onChange={(e) => setFieldValue("title", e)}
              onBlur={handleBlur}
            />
            <InputTextNumber
              label="Description"
              placeholder="Nhập mô tả khóa học"
              name="description"
              value={values.description}
              error={touched.description ? errors.description : ""}
              onChange={(e) => setFieldValue("description", e)}
              onBlur={handleBlur}
            />
            <UploadImage
              isMultiple={false}
              onImageUpload={(imageURL: string | string[]) => {
                const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
                setFieldValue("thumbnail", url);
              }}
              currentImageUrl={values.thumbnail}
              label="Thumbnail"
            />
            <InputTextNumber
              label="Regular Price"
              placeholder="Nhập giá gốc"
              name="regular_price"
              type="number"
              value={values.regular_price}
              error={touched.regular_price ? errors.regular_price : ""}
              onChange={(e) => setFieldValue("regular_price", Number(e))}
              onBlur={handleBlur}
            />
            <InputTextNumber
              label="Sale Price"
              placeholder="Nhập giá khuyến mãi"
              name="sale_price"
              type="number"
              value={values.sale_price}
              error={touched.sale_price ? errors.sale_price : ""}
              onChange={(e) => setFieldValue("sale_price", Number(e))}
              onBlur={handleBlur}
            />
          </FormGroup>
        </form>
      )}
    </Formik>
  );
};

export default CourseForm;