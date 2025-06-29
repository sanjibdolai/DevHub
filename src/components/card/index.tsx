import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}
function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 p-4 ${className}`}>
            {children}
        </div>
    )
}

export default Card