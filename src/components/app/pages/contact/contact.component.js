import React from 'react';
import { PageComponent } from './../page.component';
import ContactView from './../../../../views/contact/contact.view';
import { ContactService } from './../../../../services/contact.service';
import { ContactModel } from './../../../../models/contact.model';
import './contact.css';

export default class ContactComponent extends PageComponent{
    async UNSAFE_componentWillMount(){
        this.loadFrame(ContactView);
    }
}
