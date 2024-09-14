import { FieldError, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

type FormData = {
  email: string;
  name: string;
  country: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type ValidFieldNames =
  | "email"
  | "name"
  | "country"
  | "phone"
  | "password"
  | "confirmPassword";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
