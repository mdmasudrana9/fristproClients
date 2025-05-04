import AppForm from "../../../component/form/AppForm";
import AppButton from "../../../component/ui/AppButton";
import AppFormInput from "../../../component/ui/AppFormInput ";

const CreateAcademicDepartMent = () => {
  const onSubmit = async (data: any) => {
    const semesterInfo = {
      name: data.name,
    };
    console.log("data :>> ", semesterInfo);
  };
  return (
    <>
      <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
          <h1 className="text-2xl flex items-center justify-center font-bold text-gray-800 mb-6">
            Create A.Department Form
          </h1>

          <AppForm onSubmit={onSubmit} className="space-y-0.5">
            <AppFormInput
              name="name"
              label="Department Name"
              placeholder="Enter Department Name"
              required
              helperText="Should provide Department name carefully"
            />
            <AppFormInput
              name="Faculty Name"
              label="Faculty Name"
              placeholder="Enter Faculty Name"
              required
              helperText="Should provide Faculty name carefully"
            />
            <AppButton
              label="Create Academic Department"
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

export default CreateAcademicDepartMent;
