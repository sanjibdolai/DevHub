import { useState } from "react";
import LoginForm from "./LoginFrom";
import Overlay from "./Overlay";
import SignupForm from "./SignupForm";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="h-full flex justify-center items-center">
            <div className="relative w-full max-w-sm lg:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ height: '700px' }}>

                {/* Mobile View: Simple toggle, no animations */}
                <div className="lg:hidden p-8 w-full h-full flex items-center justify-center">
                    {isLogin ? <LoginForm onSwitch={handleSwitch} /> : <SignupForm onSwitch={handleSwitch} />}
                </div>

                {/* Desktop View: Sliding panel animation */}
                {/* Form Panel (contains EITHER login or signup) */}
                <div className={`hidden lg:flex absolute top-0 left-0 w-1/2 h-full items-center justify-center transition-transform duration-700 ease-in-out ${isLogin ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-12 w-full">
                        {/* The correct form is rendered based on the state. */}
                        {isLogin ? <LoginForm onSwitch={handleSwitch} /> : <SignupForm onSwitch={handleSwitch} />}
                    </div>
                </div>

                {/* Overlay Panel */}
                <div className={`hidden lg:flex absolute top-0 left-0 w-1/2 h-full items-center justify-center bg-blue-600 text-white transition-transform duration-700 ease-in-out ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
                    <Overlay onSwitch={handleSwitch} isLogin={isLogin} />
                </div>
            </div>
        </div>
    );
}