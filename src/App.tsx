import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./store/authProvider";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { useSelector } from "react-redux";
import { selectTheme } from "./store/redux/slices/themeSlice";
import Layout from "./layout";
import LoadingSpinner from "./components/loading-spinner";
import ErrorBoundary from "./components/ErrorBoundary";

const HomePage = lazy(() => import("./pages/home"));
const DevelopersPage = lazy(() => import("./pages/developers"));
const BlogsPage = lazy(() => import("./pages/blogs"));
const LoginPage = lazy(() => import("./pages/login"));
const BlogForm = lazy(() => import("./pages/blogs/create-edit"));
const BlogDetailPage = lazy(() => import("./pages/blogs/details"));
const DeveloperProfilePage = lazy(() => import("./pages/developers/profile"));

const suspenseFallback = <LoadingSpinner />;

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={suspenseFallback}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: "developers",
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={suspenseFallback}>
								<DevelopersPage />
							</Suspense>
						),
					},
					{
						path: ":id",
						element: (
							<Suspense fallback={suspenseFallback}>
								<DeveloperProfilePage />
							</Suspense>
						),
					},
				],
			},
			{
				path: "blogs",
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={suspenseFallback}>
								<BlogsPage />
							</Suspense>
						),
					},
					{
						path: "create",
						element: <PrivateRoute />,
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={suspenseFallback}>
										<BlogForm />
									</Suspense>
								),
							},
						],
					},
					{
						path: ":id/edit",
						element: <PrivateRoute />,
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={suspenseFallback}>
										<BlogForm isEdit={true} />
									</Suspense>
								),
							},
						],
					},
					{
						path: ":id",
						element: (
							<Suspense fallback={suspenseFallback}>
								<BlogDetailPage />
							</Suspense>
						),
					},
				],
			},
			{
				path: "login",
				element: (
					<Suspense fallback={suspenseFallback}>
						<LoginPage />
					</Suspense>
				),
			},
		],
	},
]);

function App() {
	const theme = useSelector(selectTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
	}, [theme]);

	return (
		<AuthProvider>
			<ErrorBoundary>
				<RouterProvider router={router} />
			</ErrorBoundary>
		</AuthProvider>
	);
}

export default App;
