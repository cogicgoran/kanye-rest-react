import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

interface Props {
    disallowAuthorized?: boolean;
    redirectTo: string;
    component: React.ComponentType;
}

function ProtectedRoute({disallowAuthorized, redirectTo, component:Component}: Props): JSX.Element {
    const currentUser = useAppSelector((state) => state.currentUser.user );
    if (disallowAuthorized && !currentUser) return <Component />;
    if (!disallowAuthorized && currentUser) return <Component />;
    return <Navigate to={redirectTo}/>;
};

export default ProtectedRoute;