// pages/admin/academic-semester/AcademicSemester.tsx
import { useMemo } from "react";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.Api";

import { Spin } from "antd";
import AppTable from "../../../component/ui/AppTable";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllSemesterQuery(undefined);

  const columns = useMemo(
    () => [
      {
        title: "Season",
        dataIndex: "name",
        key: "season",
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
    ],
    []
  );

  return (
    <div className="p-6">
      {isLoading ? (
        <Spin />
      ) : (
        <AppTable
          data={data?.data || []}
          columns={columns}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default AcademicSemester;
