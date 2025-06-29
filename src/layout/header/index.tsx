import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { selectTheme, toggleTheme } from "../../store/redux/slices/themeSlice";
import Button from "../../components/button";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../../store/useAuth";

function Header() {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, signout } = useAuth();
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm  shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to={"/"} className="font-bold text-2xl text-indigo-600 dark:text-indigo-400 cursor-pointer">
                            DevHub
                        </Link>
                        <div className="hidden md:flex md:space-x-8">
                            <Link to={"/developers"} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium cursor-pointer">
                                Developers
                            </Link>
                            <Link to={"/blogs"} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium cursor-pointer">
                                Blogs
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                        </button>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="font-medium text-sm hidden sm:inline">Welcome, {user.email?.split('@')[0]}</span>
                                <Button variant="secondary" className="px-3 py-1.5 text-sm" onClick={async () => { await signout(); navigate('/'); }}>Logout</Button>
                            </div>
                        ) : (
                            <Button onClick={() => navigate('login')} className="px-3 py-1.5 text-sm">Login</Button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;