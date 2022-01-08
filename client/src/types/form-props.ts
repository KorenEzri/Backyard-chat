export interface FormProps {
  attributes: Partial<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  title: string;
  required?: boolean;
  options?: string[];
  validation?: Function;
}
