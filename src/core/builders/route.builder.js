import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { Auth } from './../../services/auth.service';
import { NotFoundComponent } from './../../components/not-found-component/not-found.component';


const currentUserVal = Auth();

export const RouteBuilder = ({component: Component,type,allHasAccess,role,path, ...rest }) => {
    if(type === "public"){
        return <PublicRoute path={path} component={Component} {...rest}/>
    }
    if (type === "private"){
        if(allHasAccess){
            return <PrivateRoute access={true} path={path} component={Component} {...rest} />;
        }else{
            if (role) {
                if (currentUserVal.checkRole(role)) {
                    return <PrivateRoute access={true} path={path} component={Component} {...rest} />;
                } else {
                    return <PrivateRoute path={path} component={Component} {...rest} />;
                }
            }
            console.error('this route with role user is not available');
            return null;
        }
    }
    console.error("type of route you provide is not available");
    return null;
}


/**
 * Build public route for all guest or user app
 * @param {*} param
 */
export const PublicRoute = ({ component: Component, path, ...rest }) => (
    <Route path={path} component={Component} {...rest} />
);

/**
 * Build public route for all guest or user app
 * @param {*} param
 */
export const PrivateRoute = ({component:Component,access,...rest}) => (
    <Route {...rest} render={ props => {
            const currentUser = currentUserVal.currentUserValue;
            if (!currentUser || (currentUser && !currentUser.isLoggedIn)) {
                //redirect to the home page for login
                return <Redirect to={{ path: '/', state: { from: props.location, error: 'Vous devez d\'abord vous connecter' } }} />
            }

            //check if user has the right access for this route
            if (currentUser && currentUser.isLoggedIn && access) {
                //redirect to dashboard if not access

                return <Component {...props} />
            }
            return <PublicRoute component={NotFoundComponent} />;
        }
    }/>
)
