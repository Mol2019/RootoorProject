import React from 'react';
import { PageComponent } from "../page.component";
import { CompteService } from './../../../../services/compte.service';
import { SpaceCompteView } from './../../../../views/compte/space-compte.view';

export class SpaceCompteComponent extends PageComponent{
    async UNSAFE_componentWillMount(){
        this.loadFrame(SpaceCompteView);
        await this.serviceSetState(new CompteService({ path: "comptes", payLoad: null }));
    }


    render(){
        return <SpaceCompteView accountId={this.props.match.params.id} data={this.state.frameUtils}/>
    }
}
