import Button from "@/utility-components/Button";
import Input from "@/utility-components/Input";
import { useState } from "react";

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}
export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="px-10 py-10 flex flex-col gap-4">
      <Input
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        value={email}
        label="Email"
        name="email"
      />
      <Input
        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        value={password}
        label="Password"
        name="password"
        type="password"
      />
      <Button onClick={(_) => props.onSubmit({ email, password })}>
        Login
      </Button>
    </div>
  );
}
