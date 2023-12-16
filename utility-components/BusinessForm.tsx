import Button from "@/utility-components/Button";
import Input from "@/utility-components/Input";
import { useState } from "react";

export interface BusinessFormProps {
  onSubmit: (data: { name: string }) => void;
  name?: string;
  buttonLabel?: string;
}
export default function BusinessForm(props: BusinessFormProps) {
  const [name, setName] = useState(props.name || "");
  return (
    <div className="flex flex-col gap-4">
      <Input
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
        label="Name"
        name="name"
        value={name}
      />
      <Button onClick={(_) => props.onSubmit({ name })}>
        {props.buttonLabel || "Create"}
      </Button>
    </div>
  );
}
