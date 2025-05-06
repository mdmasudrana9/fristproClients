// pages/admin/academic-semester/AcademicSemester.tsx
import { useMemo, useState, Key } from "react";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, TableProps } from "antd";
import AppTable from "../../../component/ui/AppTable";
import AppTableLoader from "../../../component/ui/AppTableLoader";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
type OnChange = NonNullable<TableProps<DataType>["onChange"]>;

const AcademicSemester = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    { name: string; value: string }[]
  >([]);
  const { data, isLoading, isFetching } = useGetAllSemesterQuery(filteredInfo);
  console.log("data :>> ", data);

  const handleEdit = (record: DataType) => {
    console.log("সম্পাদনা করা হচ্ছে:", record);
  };

  const handleChange: OnChange = (pagination, filters, sorter, extra) => {
    console.log("Various parameters", pagination, sorter, filters, extra);
    if (extra.action === "filter") {
      const queryParams: { name: string; value: string }[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: String(item) })
      );
      setFilteredInfo(queryParams);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Season",
        dataIndex: "name",
        key: "name",

        filters: [
          { text: "Autumn", value: "Autumn" },
          { text: "Summar", value: "Summar" },
          { text: "Fall", value: "Fall" },
        ],
        filteredValue: filteredInfo.map((filter) => filter.value) || null,
        onFilter: (value: boolean | Key, record: DataType) =>
          typeof value === "string" && record.name.includes(value),
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
      },
      {
        title: "Start Month",
        dataIndex: "startMonth",
        key: "startMonth",
        render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
      },
      {
        title: "End Month",
        dataIndex: "endMonth",
        key: "endMonth",
        render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
      },
      {
        title: "Action",
        dataIndex: "action",
        //align: "center",
        key: "action",
        render: (_: unknown, record: DataType) => (
          <Space size="middle">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are You Sure ?"
              //onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [filteredInfo]
  );

  return (
    <div className="p-6">
      {isLoading ? (
        <AppTableLoader />
      ) : (
        <AppTable
          data={data?.data.result || []}
          columns={columns}
          onChange={handleChange}
          loading={isFetching}
        />
      )}
    </div>
  );
};

export default AcademicSemester;
