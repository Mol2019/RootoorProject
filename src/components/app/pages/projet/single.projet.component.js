import { PageComponent } from "../page.component";
import SingleProjetView from "../../../../views/projet/single.projet.view";
import {InfoProjectView} from "../../../../views/projet/single.projet.view";
import React from 'react';
import { ProjetService } from './../../../../services/projet.service';

export default class SingleProjetComponent extends PageComponent{
    UNSAFE_componentWillMount() {
        this.loadFrame(SingleProjetView);
        //await this.serviceSetState(new CompteService({ path: "comptes", payLoad: null }));
    }


    render() {
        return <SingleProjetView projetId={this.props.match.params.id} data={this.state.frameUtils} />
    }
}


export class InfoProjectComponent extends PageComponent{
    UNSAFE_componentWillMount() {
        this.loadFrame(InfoProjectView);
        this.serviceSetState(new ProjetService({ path: "projets", payLoad: null }));
    }

    componentDidMount(){
        this.loadData(this.props.otherData.id);
    }

}
