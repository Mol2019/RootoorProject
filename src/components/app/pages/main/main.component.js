import React from 'react';
import { Redirect } from 'react-router-dom';

export const MainComponent = props => {
    if (!props.isLoggedIn) {
        return <Redirect to="/" />
    }
    return <Redirect to="/dashboard" {...props} />;
}
