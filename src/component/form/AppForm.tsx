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

  const submit = (data: any) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(submit)}>
        {children}
      </form>
      ;
    </FormProvider>
  );
};

export default AppForm;
