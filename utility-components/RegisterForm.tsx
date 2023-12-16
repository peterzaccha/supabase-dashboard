import Button from "@/utility-components/Button";
import Input from "@/utility-components/Input";
import { useState } from "react";

export interface RegisterFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
  }) => void | Promise<any>;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function isValid() {
    return name.length > 0 && email.length > 0 && password.length > 0;
  }
  return (
    <div className="px-10 py-10 flex flex-col gap-4">
      <Input
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
        label="Name"
        name="name"
        value={name}
      />
      <Input
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        label="Email"
        name="email"
        value={email}
      />
      <Input
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        label="Password"
        name="password"
        type="password"
        value={password}
      />
      <Button
        disabled={!isValid()}
        onClick={(_) => props.onSubmit({ name, email, password })}
      >
        Register
      </Button>
    </div>
  );
}
