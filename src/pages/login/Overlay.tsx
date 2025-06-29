import type { FC } from "react";

interface OverlayProps {
    onSwitch: () => void;
    isLogin: boolean;
}

const Overlay: FC<OverlayProps> = ({ onSwitch, isLogin }) => (
    <div className="relative h-full w-full">
        {/* Panel for prompting signup */}
        <div className={`absolute inset-0 p-12 text-center flex flex-col justify-center items-center transition-opacity duration-500 ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">New Here?</h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-lg mb-8">Sign up and discover a great amount of new opportunities!</p>
            <button onClick={onSwitch} className="self-center py-3 px-8 font-bold bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-transform transform hover:scale-105 duration-300">
                Sign Up
            </button>
        </div>
        {/* Panel for prompting signin */}
        <div className={`absolute inset-0 p-12 text-center flex flex-col justify-center items-center transition-opacity duration-500 ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">One of Us?</h1>
            <div className="w-24 h-1 bg-white mb-6"></div>
            <p className="text-lg mb-8">If you already have an account, just sign in. We've missed you!</p>
            <button onClick={onSwitch} className="self-center py-3 px-8 font-bold bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-50 transition-transform transform hover:scale-105 duration-300">
                Sign In
            </button>
        </div>
    </div>
);

export default Overlay;