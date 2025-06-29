import { Lock, Mail, User } from "lucide-react";
import InputField from "../../components/input-field";
import { useAuth } from "../../store/useAuth";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useAddDeveloperMutation } from "../../store/api/developersApi";

interface SignupFormProps {
    onSwitch: () => void;
}

const schema = yup.object({
    fullName: yup.string().min(2, "Full name is required").required("Full name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

type SignupFormValues = yup.InferType<typeof schema>;

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [addDeveloper] = useAddDeveloperMutation();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            const user = await signup(data.email, data.password);
            if (user) {
                await addDeveloper({
                    uid: user.uid,
                    name: data.fullName,
                    skills: [],
                });
            }
            navigate("/", { replace: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert("Error signing up: " + error.message);
            } else {
                alert("Error signing up.");
            }
        }
    };

    return (
        <div className="animate-fade-in w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h2>
            <p className="text-gray-500 mb-8 text-center">Join us and start your adventure!</p>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <InputField id="fullName" type="text" placeholder="Your Full Name" icon={<User />} autoFocus aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} {...register("fullName")}/>
                {errors.fullName && <p id="fullName-error" className="text-red-500 text-xs" aria-live="polite">{errors.fullName.message}</p>}
                <label htmlFor="email-signup" className="sr-only">Email</label>
                <InputField id="email-signup" type="email" placeholder="youremail@example.com" icon={<Mail />} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-signup-error" : undefined} {...register("email")}/>
                {errors.email && <p id="email-signup-error" className="text-red-500 text-xs" aria-live="polite">{errors.email.message}</p>}
                <label htmlFor="password-signup" className="sr-only">Password</label>
                <InputField id="password-signup" type="password" placeholder="Create a password" icon={<Lock />} aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-signup-error" : undefined} {...register("password")}/>
                {errors.password && <p id="password-signup-error" className="text-red-500 text-xs" aria-live="polite">{errors.password.message}</p>}

                <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 duration-300">
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-500 lg:hidden">
                Already have an account? <button onClick={onSwitch} className="font-semibold text-green-600 hover:underline">Sign In</button>
            </p>
        </div>
    );
};

export default SignupForm;