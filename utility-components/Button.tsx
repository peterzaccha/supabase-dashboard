import { MouseEventHandler, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
export default function Button(props: ButtonProps) {
  return (
    <button
      className="bg-black rounded w-100 px-5 py-2 text-white "
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
