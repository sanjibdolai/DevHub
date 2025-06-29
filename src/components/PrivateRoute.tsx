import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../store/useAuth";
import LoadingSpinner from "./loading-spinner";

const PrivateRoute: React.FC = () => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
