"use client";

import {
  authenticateUsingGoogle,
  authenticateUsingPassword,
  signupUsingPassword,
} from "@/lib/supabase.auth.client";
import Button from "@/utility-components/Button";
import LoginForm, { LoginFormProps } from "@/utility-components/LoginForm";
import RegisterForm, {
  RegisterFormProps,
} from "@/utility-components/RegisterForm";
import { FormEventHandler } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default async function Page() {
  const router = useRouter();
  const register: RegisterFormProps["onSubmit"] = async (data) => {
    const response = await signupUsingPassword({
      full_name: data.name,
      email: data.email,
      password: data.password,
    });
    if (response.error) {
      toast.error(response.error.message);
    } else {
      router.push("/admin/internal/dashboard");
    }
  };
  const login: LoginFormProps["onSubmit"] = async (data) => {
    const response = await authenticateUsingPassword(data);
    if (response.error) {
      toast.error(response.error.message);
    } else {
      router.push("/admin/internal/dashboard");
    }
  };
  const googleAuthentication: FormEventHandler<
    HTMLButtonElement
  > = async () => {
    const response = await authenticateUsingGoogle();
    console.log(response);
  };
  return (
    <main className="flex justify-center items-center h-screen w-100 flex-col">
      <div className="bg-white rounded ">
        <div className="flex ">
          <LoginForm onSubmit={login} />
          <RegisterForm onSubmit={register} />
        </div>
        <div className="flex w-100 justify-center py-5 border-t">
          <Button onClick={googleAuthentication}>
            Authenticate Using Google
          </Button>
        </div>
      </div>
    </main>
  );
}
