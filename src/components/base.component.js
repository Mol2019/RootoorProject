import React from 'react';
import { modelToFormData } from './../core/utils/utils.functions';
import './../modules/frame.css';

export class BaseComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            frameUtils : {},
            service : null,
            model : null,
            data : null
        }
        this.loadData = this.loadData.bind(this);
        this.loadFormMessage = this.loadFormMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onValidAction = this.onValidAction.bind(this);
        this.initFrame = this.initFrame.bind(this);
        this.serviceSetState = this.serviceSetState.bind(this);
        this.modelSetState = this.modelSetState.bind(this);
    }

    //initialize frame data
    async initFrame(){
        await this.setState({
                frameUtils : {
                    modalInfo : {
                        isOpen : false,
                        openModal: this.openModal,
                        closeModal: this.closeModal,
                        validAction: this.onValidAction
                    },
                    formAction: {
                        handleField: this.handleChange,
                        submitForm: this.onSubmit
                    },
                    formMessage: {
                        errors: [],
                        success: null
                    },
                    donnees: []
                }
            });
    }


    //load all data of this component
    async loadData(id){
        if(id){
            if (this.state.service) {
                this.state.service.getOne(id).then(
                    async json => {
                        await this.setState({data:json});
                        await this.setState(
                            prevState => ({
                                frameUtils: {
                                    ...prevState.frameUtils,
                                    donnees: this.state.data,
                                }
                            })
                        )
                    }
                ).catch((err) => { this.setState({ data: null }); console.error(err) })
            }
        }else{
            if (this.state.service) {
                this.state.service.getAll().then(
                    async json => {
                        await this.setState({ data: json });
                        await this.setState(
                            prevState => ({
                                frameUtils: {
                                    ...prevState.frameUtils,
                                    donnees: this.state.data,
                                }
                            })
                        )
                    }
                ).catch((err) => {console.error(err) })
            }
        }
    }

    //open modal for control frame modal
    async openModal(){
        await this.setState(
                prevState => ({
                    frameUtils: {
                        ...prevState.frameUtils,
                        modalInfo: {
                            ...prevState.frameUtils.modalInfo,
                            isOpen: true
                        }
                    }
                })
            );
    }

    //close modal for control frame modal
    async closeModal() {
        await this.setState(
            prevState => ({
                frameUtils: {
                    ...prevState.frameUtils,
                    modalInfo: {
                        ...prevState.frameUtils.modalInfo,
                        isOpen: false
                    }
                }
            })
        );
    }

    //handler form inputs or selects or textarea
    async handleChange(e){
        const name = e.target.name;
        await this.setState(
                prevState => ({
                    model : {
                        ...prevState.model,
                        [name] : e.target.value
                    }
                })
        );
    }

    //submit action
    async onSubmit(e){
        e.preventDefault();

        switch (e.target[e.target.length - 1].innerText){
            case "Ajouter" : if(this.state.model){
                                let execAdd = this.state.service;
                                execAdd.payLoad = this.state.model;
                                await this.setState({ service: execAdd});
                                this.state.service.create().then(
                                    async json => {
                                        if (json.data.success) {
                                            let donnees = this.state.data;

                                            donnees.push(json.data.data[0])
                                            await this.setState({
                                                data: donnees
                                            })
                                            this.loadFormMessage('success', json.data.successMessage);
                                            setTimeout(() => {
                                                this.loadFormMessage('success', "");
                                                this.closeModal();
                                            }, 2000);
                                        } else {
                                            await this.loadFormMessage('error',json.data.errors)
                                        }
                                    }
                                ).catch((err) => {console.error(err)});
                            }
                            break;
            case "Modifier" :
                            for (let i = 0; i < e.target.length - 1;i++){
                                this.state.model[e.target[i].name] = e.target[i].value
                            }
                            const execUpdate = this.state.service;
                            execUpdate.payLoad = this.state.model;
                            await this.setState({service : execUpdate});

                            this.state.service.update().then(
                                async json => {
                                    if (json.data.success) {
                                        let donnees = this.state.data;
                                        if (!(this.state.actComp === "forSingle")) {
                                            const pos = donnees.indexOf(donnees.find(item => { return item.id == json.data.data.id }))
                                            donnees[pos] = json.data.data;
                                            await this.setState({ data: donnees });
                                        }else{
                                            donnees = json.data.data;
                                            for(let data in donnees){
                                                this.setState(
                                                    () => ({
                                                        frameUtils: {
                                                            ...this.state.frameUtils,
                                                            data: {
                                                                [data]: json.data.data[data]
                                                            }
                                                        }
                                                    })
                                                )
                                            }

                                        }



                                        this.loadFormMessage('success', json.data.successMessage);
                                        setTimeout(() => {
                                            this.loadFormMessage('success', "");
                                            this.closeModal();
                                        }, 3000);


                                    } else {
                                        this.loadFormMessage('error', json.data.errors);
                                    }
                                }
                            ).catch((err) => {console.error(err)});
                            break;
            default : console.error('non valid action'); break;
        }
    }

    //action with no post element validation
    async onValidAction(e){
        e.preventDefault();
        switch (e.target.name) {
            case "lock":
                this.state.service.lockOrUnlock(e.target.id).then(
                    json => {
                        if (json) {
                            let donnees = this.state.data;
                            const pos = donnees.indexOf(donnees.find(item => { return item.id == json.id }))
                            donnees[pos] = json;
                            this.setState({ data: donnees });
                            setTimeout(() => {
                                alert("verrouiller avec succès");
                                this.closeModal();
                            }, 3000);
                        }
                    }
                )
                break;
            case "unlock":
                this.state.service.lockOrUnlock(e.target.id).then(
                    json => {
                        if (json) {
                            let donnees = this.state.data;
                            const pos = donnees.indexOf(donnees.find(item => { return item.id == json.id }))
                            donnees[pos] = json;
                            this.setState({ data: donnees });
                            setTimeout(() => {
                                alert("déverrouiller avec succès");
                                this.closeModal();
                            }, 3000);
                        }
                    }
                )
                break;
            case "delete":
                 this.state.service.delete(e.target.id).then(
                    json => {
                        if (json.data.success) {
                            let donnees = this.state.data;
                            const pos = donnees.indexOf(donnees.find(item => { return item.id == json.data.data.id }))
                            donnees.splice(pos, 1)
                            this.setState({ data: donnees });
                            setTimeout(() => {
                                alert(json.data.successMessage);
                                this.closeModal();
                            }, 3000);
                        }
                    }
                )

                break;
            default: console.error("no action available"); break;
        }
    }

    /**
     * update service data
     * @param {*} service
     */
    async serviceSetState(serviceP){
        await this.setState({service : serviceP});
    }

    /**
     * update model data
     * @param {*} service
     */
    async modelSetState(modelP) {
        await this.setState({ model: modelP });
    }

    //form message
    async loadFormMessage(type,message){
        switch(type){
            case "error" :
                            await this.setState(
                                prevState => ({
                                    frameUtils: {
                                        ...prevState.frameUtils,
                                        formMessage: {
                                            errors: message,
                                            success: null
                                        }
                                    }
                                })
                            );
                        break;
            case "success":
                            await this.setState(
                                prevState => ({
                                    frameUtils: {
                                        ...prevState.frameUtils,
                                        formMessage: {
                                            errors: [],
                                            success: message
                                        }
                                    }
                                })
                            );
                        break;
            default : console.error("cant't find this type of message form"); break;
        }
    }
}
