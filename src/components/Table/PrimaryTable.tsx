import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
export interface ITableData {
    key: React.Key;
    [key: string]: unknown;
}
export interface IPrimaryTable {
    columns: ColumnsType;
    data: ITableData[];
}

const PrimaryTable = ({ columns, data }: IPrimaryTable) => {
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default PrimaryTable;
