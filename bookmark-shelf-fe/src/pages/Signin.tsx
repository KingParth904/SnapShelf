import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthType } from "../schemas/auth.tsx";
import { AuthSchema } from "../schemas/auth.tsx";
import { Button } from "../components/Button";
import { InputComp } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKNEND_URL } from "../config";


export function Signin() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthType>({
    resolver: zodResolver(AuthSchema)
  });

  const onSubmit = async (data: AuthType) => {
    const response = await axios.post(`${BACKNEND_URL}/api/v1/signin`, data);
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4">
  <InputComp
    {...register("username")}
    placeholder="Username"
    error={errors.username?.message}
  />

  <InputComp
    {...register("password")}
    placeholder="Password"
    type="password"
    error={errors.password?.message}
  />

  <Button type="submit" variant="primary" text="Sign In" fullWidth />
</form>

    </div>
  );
}
