import { PageComponent } from "../page.component";
import PlanificationProjetView from './../../../../views/projet/planification.projet.view';
import React from 'react';

export default class PlanificationProjetComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(PlanificationProjetView);
    }

    render(){
        return <PlanificationProjetView project={this.props.otherData.id} data={this.state.frameUtils}/>
    }
}
