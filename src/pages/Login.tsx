/* eslint-disable @typescript-eslint/no-unused-vars */
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppForm from "../component/form/AppForm";
import AppFormInput from "../component/ui/AppFormInput ";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import AppButton from "./../component/ui/AppButton";
const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  type FormValues = {
    id: string;
    password: string;
  };

  const defaultValues = { id: "A-0001", password: "admin123" };

  const onSubmit = async (data: FormValues) => {
    // console.log("data :>> ", data);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as unknown as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      //toast.dismiss();
      //console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
      });
    }
  };
  return (
    <div className="min-h-screen flex  items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <h1 className="text-2xl flex items-center justify-center font-bold text-gray-800 mb-6">
          Login Form
        </h1>

        <AppForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          className="space-y-0.5"
        >
          <AppFormInput
            name="id"
            label="ID"
            placeholder="Enter your ID"
            required
            icon={<User size={18} />}
          />
          {/* <AppFormInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
                icon={<User size={18} />}
              /> */}

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
        </AppForm>
      </div>
    </div>
  );
};

export default Login;
