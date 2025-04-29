import { FormProvider, useForm } from "react-hook-form";
import AppFormInput from "../component/ui/AppFormInput ";
import { Lock, User } from "lucide-react";
import AppButton from "./../component/ui/AppButton";
const Login = () => {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  type FormValues = {
    firstName: string;
    lastName: string;
    password: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("Form submitted successfully!");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Registration Form
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-0.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AppFormInput
                name="firstName"
                label="First Name"
                placeholder="John"
                required
                icon={<User size={18} />}
              />
              <AppFormInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
                icon={<User size={18} />}
              />
            </div>
            <AppFormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
              icon={<Lock size={18} />}
              helperText="Password must be at least 8 characters long."
            />
            <AppButton
              label="Login"
              variant="outlined"
              className="w-full rounded-lg"
              type="submit"
            ></AppButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
