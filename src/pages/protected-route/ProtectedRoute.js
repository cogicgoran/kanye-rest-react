import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({redirectTo, component:Component}) {
    const user = localStorage.getItem('current-user');

    if ( user ) {
        return <Component />
    }
    return <Navigate to={redirectTo}/>
};

export default ProtectedRoute;