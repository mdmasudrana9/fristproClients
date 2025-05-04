// components/ui/AppTable.tsx

import { Table } from "antd";
import type { TableProps } from "antd";

interface AppTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>["columns"];
  loading?: boolean;
}

const AppTable = <T extends object>({
  data,
  columns,
  loading = false,
  ...rest
}: AppTableProps<T>) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      rowKey={(record) => (record as any).id || JSON.stringify(record)}
      pagination={{ pageSize: 10 }}
      {...rest}
    />
  );
};

export default AppTable;
