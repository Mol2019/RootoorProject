import React from 'react';
import { PageComponent } from './../page.component';
import { ContactListView } from '../../../../views/contact/contact.view';
import { ContactService } from './../../../../services/contact.service';
import { ContactModel } from './../../../../models/contact.model';

export default class ContactListComponent extends PageComponent{
    async UNSAFE_componentWillMount() {
        this.loadFrame(ContactListView);
        await this.serviceSetState(new ContactService({ path: "contacts", payLoad: null }));
        await this.modelSetState(new ContactModel({ nom: "", prenoms: "", email: "", telephone: "", localisation: "", id: null }));
    }

    async componentDidMount() {
        await this.loadData();
    }
}
