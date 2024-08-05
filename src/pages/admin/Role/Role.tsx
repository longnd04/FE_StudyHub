import PrimaryTable, { ITableData } from '@/components/Table/PrimaryTable';
import { AppDispatch } from '@/stores/store';
import { getAllUser, updateRole } from '@/stores/thunks/user.thunk';
import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

// Define the mappings for select options
const roleOptions: Record<string, string> = {
    ADMIN: 'Admin',
    CLIENT: 'Client',
};

const statusOptions: Record<number, string> = {
    2: 'Blocked',
    1: 'Active',
    0: 'Inactive',
};

const Role = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { accounts } = useSelector((state: { account: { accounts: any[] } }) => state.account);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllUser({ query: {} })).unwrap();
        };

        fetchData();
    }, [dispatch]);

    const handleUpdateRole = async (email: string, newRole: string) => {
        await dispatch(updateRole({ body: { email, role: newRole } })).unwrap();
        dispatch(getAllUser({ query: {} })).unwrap();
    };

    const data: ITableData[] = (accounts || []).map((account) => ({
        key: account.email,
        user_name: account.user_name,
        role: account.role,
        status: account.status,
    }));

    const columns: ColumnsType<ITableData> = [
        {
            dataIndex: 'user_name',
            title: 'User',
        },
        {
            dataIndex: 'role',
            title: 'Role',
            render: (role: string, record: any) => (
                <Select value={role} onChange={(value) => handleUpdateRole(record.key, value)}>
                    {Object.entries(roleOptions).map(([key, label]) => (
                        <Select.Option key={key} value={key}>
                            {label}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            dataIndex: 'status',
            title: 'Status',
            render: (status: number) => statusOptions[status] || status,
        },
    ];
    return <PrimaryTable columns={columns} data={data} />;
};

export default Role;
