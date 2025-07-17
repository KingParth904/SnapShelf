import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthType } from "../schemas/auth.tsx";
import { AuthSchema } from "../schemas/auth.tsx";
import { Button } from "../components/Button";
import { InputComp } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKNEND_URL } from "../config";


export function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AuthType>({
    resolver: zodResolver(AuthSchema)
  });

  const onSubmit = async (data: AuthType) => {
    await axios.post(`${BACKNEND_URL}/api/v1/signup`, data);
    alert("Signed up successfully");
    navigate("/signin");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4">
        <InputComp {...register("username")} placeholder="Username" />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}

        <InputComp {...register("password")} placeholder="Password" type="password" />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <Button type="submit" variant="primary" text="Sign Up" fullWidth />
      </form>
    </div>
  );
}
