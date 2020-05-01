import { PageComponent } from "../page.component";
import { ProjetService } from './../../../../services/projet.service';
import { ListProjetPhaseView, ListProjetPhaseTacheView } from "../../../../views/projet/planification.projet.view";
import { PhaseService } from './../../../../services/phase.service';
import { PhaseModel } from './../../../../models/phase.model';
import React from 'react';
import { TacheModel } from './../../../../models/tache.model';
import { TacheService } from "../../../../services/tache.service";

export default class ListProjetPhaseComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(ListProjetPhaseView);
        this.serviceSetState(new ProjetService({path:"projets"}));
        this.modelSetState(new PhaseModel());

    }
    componentDidMount(){
        this.loadPhases();

    }

    loadPhases(){
        this.state.service.loadProjectPhase(this.props.idProjet).then(
                json => {

                this.setState(
                    () => ({
                        frameUtils: {
                            ...this.state.frameUtils,
                            donnees: json
                        }
                    })
                )
                }).catch((err) => {console.err(err)})
    }

    async onSubmit(e){
        e.preventDefault();
        const payLoad = this.state.model;

        payLoad.projet = this.props.idProjet;

        const service = new PhaseService({path:'phases',payLoad:payLoad});

        service.create().then(
            async json => {
                if (json.data.success) {
                    let donnees = this.state.frameUtils.donnees;

                    donnees.push(json.data.data[0])

                    await this.loadFormMessage('success', json.data.successMessage);
                    setTimeout(() => {
                        this.loadFormMessage('success', "");
                        this.closeModal();
                    }, 2000);
                } else {
                    await this.loadFormMessage('error', json.data.errors)
                }
            }
        ).catch((err) => {console.error(err)})
    }

    render(){
        return <ListProjetPhaseView changeTaskList={this.props.send} data={this.state.frameUtils}/>
    }

}




export class ListProjetPhaseTacheComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(ListProjetPhaseTacheView);
        this.serviceSetState(new PhaseService({path:"phases"}));
        this.modelSetState(new TacheModel());

    }

    componentDidUpdate(prevProps) {
        if(prevProps.idPhase !== this.props.idPhase){
           this.loadTaches(this.props.idPhase);
        }
    }


    componentDidMount(){
        //this.loadTaches();

    }

    loadTaches(idP){
        this.state.service.loadPhaseTache(idP).then(
                json => {

                this.setState(
                    () => ({
                        frameUtils: {
                            ...this.state.frameUtils,
                            donnees: json
                        }
                    })
                )
                }).catch((err) => {console.err(err)})
    }

    async onSubmit(e){
        e.preventDefault();
        const payLoad = this.state.model;

        payLoad.phase = this.props.idPhase;

        const service = new TacheService({path:'taches',payLoad:payLoad});
        console.log(payLoad)
        service.create().then(
            async json => {
                if (json.data.success) {
                    let donnees = this.state.frameUtils.donnees;

                    donnees.push(json.data.data[0])

                    await this.loadFormMessage('success', json.data.successMessage);
                    setTimeout(() => {
                        this.loadFormMessage('success', "");
                        this.closeModal();
                    }, 2000);
                } else {
                    await this.loadFormMessage('error', json.data.errors)
                }
            }
        ).catch((err) => {console.error(err)})
    }
}




