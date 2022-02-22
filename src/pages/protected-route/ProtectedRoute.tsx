import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../helper/storage.functions';

interface Props {
    disallowAuthorized?: boolean;
    redirectTo: string;
    component: React.ComponentType;
}

function ProtectedRoute({disallowAuthorized, redirectTo, component:Component}: Props): JSX.Element {
    const user = getCurrentUser();
    if (disallowAuthorized && !user) return <Component />;
    if (!disallowAuthorized && user) return <Component />;
    return <Navigate to={redirectTo}/>;
};

export default ProtectedRoute;