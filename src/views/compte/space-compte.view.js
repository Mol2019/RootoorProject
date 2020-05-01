import React from 'react';
import BaseView from "../base.view";
import { FrameClass } from './../../core/class/base.class';
import { generateKey } from "../../core/utils/utils.functions";
import { ProjetCompteComponent } from './../../components/app/pages/projet/projet.compte.component';


export class SpaceCompteView extends BaseView{
    UNSAFE_componentWillMount(){
        const FrameObject = new FrameClass({
            action: "listDataFetch",
            title: "Gestion des données",
            withSideBar: true,
            withHeader: true,
            withSubMenu: true,
            otherData: {
                component: ProjetCompteComponent,
                id : this.props.accountId
            },
            subMenuData: [
                {
                    titre: "Les projets",
                    component: ProjetCompteComponent,
                    key: generateKey()
                },
                {
                    titre: "Contacts de ce compte",
                    component: null,
                    key: generateKey()
                },
                {
                    titre: "Diagramme de gantt des projets",
                    component: null,
                    key: generateKey()
                },
                {
                    titre: "Gestion des dossiers et rapports",
                    component: null,
                    key: generateKey()
                },
            ],
            changeComponent: this.changeComponent
        });
        this.initFrame(FrameObject);
    }
}
