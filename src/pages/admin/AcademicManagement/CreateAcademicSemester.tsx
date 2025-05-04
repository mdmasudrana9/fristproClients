/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";
import AppForm from "../../../component/form/AppForm";
import AppButton from "../../../component/ui/AppButton";
import AppFormInput from "../../../component/ui/AppFormInput ";
import AppFormMonth from "../../../component/ui/AppFormMonth";
import AppFormSelect from "../../../component/ui/AppformSelect";
import AppFormYear from "../../../component/ui/AppFormYear";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.Api";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

const SEASON_CODES = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

const seasonOptions = [
  { label: "Autumn", value: "Autumn" },
  { label: "Summar", value: "Summar" },
  { label: "Fall", value: "Fall" },
];

const currentYear = new Date().getFullYear();
const NextYear = currentYear + 5;

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating semester...");
    const semesterInfo = {
      name: data.season,
      code: data.seasonCode,
      year: data.year,
      startMonth: capitalizeFirstLetter(data.startMonth),
      endMonth: capitalizeFirstLetter(data.endMonth),
    };
    console.log("data :>> ", semesterInfo);
    try {
      const res = await createAcademicSemester(semesterInfo).unwrap();

      console.log(res);
      toast.success("Semester created successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to create semester", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <>
      <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
          <h1 className="text-2xl flex items-center justify-center font-bold text-gray-800 mb-6">
            Create A.Semester Form
          </h1>

          <AppForm onSubmit={onSubmit} className="space-y-0.5">
            <AppFormSelect
              name="season"
              label="Select Season"
              options={seasonOptions}
              required
              placeholder="Choose a season..."
              linkedField="seasonCode"
              valueMap={SEASON_CODES}
              helperText="When you select a season, the code will be automatically filled"
            />
            <AppFormInput
              name="seasonCode"
              label="Season Code"
              required
              readOnly
              helperText="This field is automatically filled based on your season selection"
            />

            <AppFormYear
              name="year"
              label="Year"
              required
              placeholder="Select Academic year"
              startYear={currentYear}
              endYear={NextYear}
              helperText="Select the fiscal year for reporting"
              className="mt-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppFormMonth
                name="startMonth"
                label="Start Month"
                required
                placeholder="Select start month"
                helperText="Provide Valid month"
              />
              <AppFormMonth
                name="endMonth"
                label="End Month"
                required
                placeholder="Select end month"
                helperText="Provide Valid month"
              />
            </div>
            <AppButton
              label="Create Semester"
              variant="outlined"
              className="w-full rounded-lg"
              type="submit"
            ></AppButton>
          </AppForm>
        </div>
      </div>
    </>
  );
};

export default CreateAcademicSemester;
