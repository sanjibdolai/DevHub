import { useNavigate } from "react-router";
import Button from "../../components/button";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
                    Welcome to <span className="text-indigo-600 dark:text-indigo-400">DevHub</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    The ultimate platform to discover talented developers, read insightful blogs, and share your own expertise.
                </p>
                <div className="space-x-4">
                    <Button onClick={() => navigate('developers')} className="px-8 py-3 text-lg">Browse Developers</Button>
                    <Button onClick={() => navigate('blogs')} variant="secondary" className="px-8 py-3 text-lg">Browse Blogs</Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage