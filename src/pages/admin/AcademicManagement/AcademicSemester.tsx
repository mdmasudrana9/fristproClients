import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("data :>> ", data);
  return <div className="">Avabvhsvhv</div>;
};

export default AcademicSemester;
