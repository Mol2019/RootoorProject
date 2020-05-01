import React from  'react';
import { PageComponent } from "../page.component";
import ProjetCompteView from "../../../../views/projet/projet.compte.view";
import { CompteService } from './../../../../services/compte.service';
import { ProjetModel } from './../../../../models/projet.model';
import { ProjetService } from './../../../../services/projet.service';
import { Redirect } from 'react-router-dom';

export class ProjetCompteComponent extends PageComponent{
    UNSAFE_componentWillMount() {
        this.loadFrame(ProjetCompteView);
        this.serviceSetState(new ProjetService({ path: "projets", payLoad: null }));
        this.modelSetState(new ProjetModel({ compte: this.props.otherData.id}));
    }

    async componentDidMount() {
        const service = new CompteService({path : "comptes"});
        service.loadProjects(this.props.otherData.id).then(
                                async json => {
                                    await this.setState(
                                            () => ({
                                                frameUtils : {
                                                    ...this.state.frameUtils,
                                                    donnees : json
                                                }
                                        })
                                    )
                                }
                            )
                            .catch(
                                (err) => {console.error(err);}
                            )
    }

    async onSubmit(e){
            e.preventDefault();
            let execAdd = this.state.service;
            execAdd.payLoad = this.state.model;
            await this.setState({ service: execAdd });
            this.state.service.create().then(
                        async json => {
                            if (json.data.success) {

                                await this.setState({
                                    data : json.data.data[0]
                                })
                                this.loadFormMessage('success', json.data.successMessage);
                                setTimeout(() => {
                                    this.loadFormMessage('success', "");
                                    this.closeModal();
                                    this.setState({
                                        redirect : true,
                                    })
                                }, 2000);
                            } else {
                                await this.loadFormMessage('error', json.data.errors)
                            }
                        }
                    ).catch((err) => { console.error(err) });


    }


    render() {
        if (this.state.redirect && this.state.data){
            return <Redirect to={"/projet/" + this.state.data.id+"/configs"}/>
        }
        return <ProjetCompteView accountId={this.props.otherData.id} data={this.state.frameUtils} />
    }
}
