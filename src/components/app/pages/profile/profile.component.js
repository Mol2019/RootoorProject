import React from 'react';
import { PageComponent } from './../page.component';
import ProfileView from './../../../../views/profile/profile.view';
import './profile.css';

export default class ProfileComponent extends PageComponent{
   UNSAFE_componentWillMount(){
       this.loadFrame(ProfileView);
   }
}
