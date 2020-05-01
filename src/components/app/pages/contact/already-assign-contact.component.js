import React from 'react';
import { PageComponent } from './../page.component';
import { AlreadyAssignContactView } from './../../../../views/contact/already-assign-contact.view';
import { DisposeModel } from './../../../../models/dispose.model';
import { DisposeService } from './../../../../services/dispose.service';
import { OptionClass } from './../../../../core/class/elements.class';

export class AlreadyAssignContactComponent extends PageComponent{
    async UNSAFE_componentWillMount(){
        this.loadFrame(AlreadyAssignContactView);
        await this.serviceSetState(new DisposeService({path : "disposes",payLoad:null}));
        await this.modelSetState(new DisposeModel({compte:"",contact:""}));
    }


    async componentDidMount(){
        this.loadData();
        this.state.frameUtils.options = [];
        await this.loadOptions();

    }

    async onValidAction(e) {
        const data  = this.state.data.find(element => element['id'] == e.currentTarget.id);

        this.state.service.payLoad = data;


        this.state.service.delete().then(
            json => {
                if (json.data.success) {
                    let donnees = this.state.data;
                    const pos = donnees.indexOf(donnees.find(item => { return item.id == json.data.id }))
                    donnees.splice(pos, 1)
                    this.setState({ data: donnees });
                    setTimeout(() => {
                        alert(json.data.successMessage);
                        this.closeModal();
                    }, 3000);
                }
            }
        );
    }

    optionsForSomeThing(thingName,options){
        this.setState(
            prevState => ({
                frameUtils : {
                    ...prevState.frameUtils,
                    options : {
                        ...prevState.frameUtils.options,
                        [thingName] : options
                    }
                }
            })
        );
    }

    async loadOptions() {
        await this.state.service.loadOptions().then(
            async json => {
                let compteOptionsArray = [];
                let contactOptionsArray = [];

                contactOptionsArray.push(
                    new OptionClass({ value: "", text: " Selectionner un contact" })
                );

                compteOptionsArray.push(
                    new OptionClass({ value: "", text: " Selectionner un compte" })
                );

                json.comptes.map(
                    item => {
                        compteOptionsArray.push(
                            new OptionClass({ value: item.id, text: item.nom })
                        );
                    }
                );

                json.contacts.map(
                    item => {
                        contactOptionsArray.push(
                            new OptionClass({ value: item.id, text: item.nom + " " + item.prenoms })
                        );
                    }
                );
                this.optionsForSomeThing("compte",compteOptionsArray);
                this.optionsForSomeThing("contact", contactOptionsArray);
            }
        )
    }
}

export class AssignFormComponent extends React.Component{
    render(){
        return <p>hdhdhdhd</p>
    }
}


