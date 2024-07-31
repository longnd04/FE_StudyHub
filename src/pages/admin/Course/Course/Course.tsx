import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { deleteCourse, getAllCourse } from '@/stores/thunks/course.thunk';
import PrimaryTable, { ITableData } from '@/components/Table/PrimaryTable';
import { ColumnsType } from 'antd/es/table';
import Button from '@/components/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, Tooltip } from 'antd';
import { IoEyeOutline, IoTrashBinOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import { ICourse } from '@/stores/module';
import ImageTable from '@/components/ImageTable';

const Course: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const coursesFromState = useSelector((state: any) => state.course.courses);
    const [courses, setCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        dispatch(getAllCourse({ query: {} }));
    }, [dispatch]);

    useEffect(() => {
        if (coursesFromState && coursesFromState.length > 0) {
            setCourses(coursesFromState);
        }
    }, [coursesFromState]);

    const data: ITableData[] = courses.map((course: ICourse) => ({
        key: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        students: course.students,
        regular_price: course.regular_price,
        sale_price: course.sale_price,
        total_time: course.total_time,
    }));

    const handleDelete = (record: ITableData) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this course?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await dispatch(deleteCourse(record.key as string));
                    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== record.key));
                } catch (error) {
                    console.error('Failed to delete course:', error);
                }
            },
        });
    };

    const handleEdit = (record: ITableData) => {
        navigate(`/admin/course/update/${record.key}`);
    };

    const ActionButtons: React.FC<{ record: ITableData }> = ({ record }) => (
        <div className="flex cursor-pointer gap-3">
            <Tooltip title="View">
                <IoEyeOutline className="text-[18px] text-blue-500" />
            </Tooltip>
            <Tooltip title="Edit">
                <PiNotePencilLight className="text-[18px] text-yellow-600" onClick={() => handleEdit(record)} />
            </Tooltip>
            <Tooltip title="Delete">
                <IoTrashBinOutline className="text-[18px] text-red-500" onClick={() => handleDelete(record)} />
            </Tooltip>
        </div>
    );

    const columns: ColumnsType<ITableData> = [
        {
            dataIndex: 'title',
            title: 'Tên',
        },
        {
            dataIndex: 'description',
            title: 'Mô tả',
        },
        {
            render: (thumbnail: string) => <ImageTable imageSrc={thumbnail} />,
            dataIndex: 'thumbnail',
            title: 'Ảnh',
        },
        {
            dataIndex: 'students',
            title: 'Học viên',
        },
        {
            dataIndex: 'regular_price',
            title: 'Giá',
        },
        {
            dataIndex: 'sale_price',
            title: 'Giảm giá',
        },
        {
            dataIndex: 'total_time',
            title: 'Thời lượng',
        },
        {
            dataIndex: 'action',
            title: 'Action',
            render: (_, record) => <ActionButtons record={record} />,
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="display-l-semibold">Course</div>
                <Button onClick={() => navigate('/admin/course/create')} icon={<FaPlus />} text="Create Course" />
            </div>
            <PrimaryTable columns={columns} data={data} />
        </div>
    );
};

export default Course;
