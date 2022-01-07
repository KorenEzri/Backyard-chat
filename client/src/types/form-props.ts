export interface FormProps {
  title: string;
  attributes: Partial<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  options?: string[];
  validation?: Function;
}
