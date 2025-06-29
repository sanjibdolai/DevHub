import { Lock, Mail } from "lucide-react";
import InputField from "../../components/input-field";
import { useAuth } from "../../store/useAuth";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import * as yup from "yup";

interface LoginFormProps {
    onSwitch: () => void;
}

const schema = yup.object({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

type LoginFormValues = yup.InferType<typeof schema>;

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const { signin } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await signin(data.email, data.password);
            navigate("/", { replace: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Error signing in: " + error.message);
            } else {
                alert("Error signing in.");
            }
        }
    };

    return (
        <div className="animate-fade-in w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h2>
            <p className="text-gray-500 mb-8 text-center">Sign in to continue your journey.</p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className="sr-only">Email</label>
                <InputField id="email" type="email" placeholder="youremail@example.com" icon={<Mail />} autoFocus aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")}/>
                {errors.email && <p id="email-error" className="text-red-500 text-xs" aria-live="polite">{errors.email.message}</p>}
                <label htmlFor="password" className="sr-only">Password</label>
                <InputField id="password" type="password" placeholder="Enter your password" icon={<Lock />} aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} {...register("password")}/>
                {errors.password && <p id="password-error" className="text-red-500 text-xs" aria-live="polite">{errors.password.message}</p>}

                <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-300">
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-500 lg:hidden">
                Don't have an account? <button onClick={onSwitch} className="font-semibold text-blue-600 hover:underline">Sign Up</button>
            </p>
        </div>
    );
};

export default LoginForm;