import { FormEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
  label: string;
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  onInput?: FormEventHandler<HTMLInputElement>;
}
export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col text-gray-600 w-100">
      <label className="text-gray-600">{props.label}</label>
      <input
        onInput={props.onInput}
        className=" border-gray-400  border rounded h-10 text-lg px-3"
        name={props.name}
        type={props.type || "text"}
        value={props.value}
      />
    </div>
  );
}
