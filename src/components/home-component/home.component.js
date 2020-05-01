import React from 'react';
import HomeView from '../../views/home-view/home.view';
import { BaseComponent } from './../base.component';
import { Redirect } from 'react-router-dom';
import './home.scss';


export default class HomeComponent extends BaseComponent{

    async UNSAFE_componentWillMount(){
        this.initFrame();
    }

    render(){
        if (this.props.isLoggedIn && this.props.user){
            return <Redirect to="/home"/>
        }
        return <HomeView data={this.state.frameUtils}/>
    }
}
