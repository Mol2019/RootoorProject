import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {RoutesModule} from './modules/routes.module';


export const Index = () => (<Route component={RoutesModule} />);


if(document.getElementById("app")) ReactDOM.render(
    <Router><Index/></Router>,document.getElementById('app')
);
