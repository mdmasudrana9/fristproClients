import { FormProvider, useForm } from "react-hook-form";
type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type AppFormProps = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  className?: string;
} & TFormConfig;

const AppForm = ({
  onSubmit,
  children,
  className,
  defaultValues,
}: AppFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
      ;
    </FormProvider>
  );
};

export default AppForm;
