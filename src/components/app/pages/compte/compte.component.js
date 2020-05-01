import React from 'react';
import { PageComponent } from './../page.component';
import CompteView from './../../../../views/compte/compte.view';
import { CompteModel } from './../../../../models/compte.model';
import { CompteService } from './../../../../services/compte.service';

export default class CompteComponent extends PageComponent{
    async UNSAFE_componentWillMount(){
        this.loadFrame(CompteView);
        await this.serviceSetState(new CompteService({ path: "comptes", payLoad: null }));
        await this.modelSetState(new CompteModel({id: null,type: null,nom: null,etat: true, adresse: null, }));
    }

    async componentDidMount() {
        await this.loadData();
    }
}
