import { Control, Controller, FieldValues, Path } from "react-hook-form";
import "./textField.css";

interface TextFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control?: Control<T>;
}

const TextField = <T extends FieldValues>({
  label,
  name,
  control,
}: TextFieldProps<T>) => {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="input-container">
            <label>{label}</label>
            <input {...field} className="text-input" />
          </div>
        )}
      />
    );
  }
};

export default TextField;
