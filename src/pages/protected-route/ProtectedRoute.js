import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../helper/storage.functions';

function ProtectedRoute({disallowAuthorized, redirectTo, component:Component}) {
    const user = getCurrentUser();
    if (disallowAuthorized && !user) return <Component />;
    if (!disallowAuthorized && user) return <Component />;
    return <Navigate to={redirectTo}/>;
};

export default ProtectedRoute;