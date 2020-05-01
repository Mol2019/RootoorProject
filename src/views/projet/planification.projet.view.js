import BaseView from './../base.view';
import { FrameClass, FrameDataClass, FetchingDataClass  } from '../../core/class/base.class';
import React from 'react';
import ListProjetPhaseComponent, { ListProjetPhaseTacheComponent } from '../../components/app/pages/phase/list.projet.phase.component';

import { ModalClass, InputClass, TextareaClass, FormClass, SelectClass, OptionClass } from './../../core/class/elements.class';
import { Link } from 'react-router-dom';
import FrameModule from './../../modules/frame.module';

export default class PlanificationProjetView extends BaseView{
    UNSAFE_componentWillMount(){
        const FrameObject = new FrameClass({
            data : this.props.data,
            action: "listDataFetch",
            title: "Planification de projet ",
            pFrameComponent : Plan
        });
        FrameObject.data.project = this.props.project;
        this.initFrame(FrameObject);
    }
}



class Plan extends React.Component{

    constructor(props){
        super(props);
        this.state = {phaseId : 0}
        this.onChangePhaseId = this.onChangePhaseId.bind(this);
    }

    onChangePhaseId(e,i){
        this.setState({phaseId : i});
    }

    render(){
        return  <div className="row p-0">
                    <div className="col-12 col-lg-7 col-md-7 mr-1">
                      <ListProjetPhaseComponent idProjet={this.props.data.project} send={this.onChangePhaseId}  />
                    </div>

                    <div className="col-4">
                <ListProjetPhaseTacheComponent idPhase={this.state.phaseId}/>
                    </div>
                </div>
    }

}


export class ListProjetPhaseView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs: [
                new InputClass({
                    name: "titre", type: "text", icon: "", errors: this.props.data.formMessage.errors["titre"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "ordre", titre: "Ordre d'exécution " ,type: "number", icon: "", errors: this.props.data.formMessage.errors["ordre"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "pourcentage", titre:"Pourcentage dans le projet",type: "text", icon: "", errors: this.props.data.formMessage.errors["pourcentage"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "objectif", type: "text", icon: "", errors: this.props.data.formMessage.errors["objectif"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "budget", type: "text", icon: "", errors: this.props.data.formMessage.errors["budget"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "marge", titre: "Donnez une marge en nombre de jours svp", type: "number", icon: "", errors: this.props.data.formMessage.errors["marge"],
                    handleChange: this.props.data.formAction.handleField
                }),
            ],
            textarea: new TextareaClass({
                name: "description", type: "text", icon: "", errors: this.props.data.formMessage.errors["description"],
                handleChange: this.props.data.formAction.handleField
            })
        };


        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action: "add",
            formMessage: this.props.data.formMessage,
            fields: Fields
        });
        this.state.formD = FormDataObject;

        const arrDa = {
            tableData: []
        }

        const ListData = new FetchingDataClass({
            type: "list",
            arrayData: arrDa,
            pListFrameComponent: PhaseList,
            pFilterList: null,
            otherAction: this.props.changeTaskList
        })
         const FrameDataObject = new FrameDataClass({
            name: 'phase',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "phase", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });

        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title : "ccc"
        });
        this.initFrame(FrameObject);
    }


    render() {
        return <FrameModule frameData={this.state.frameInfo} />
    }
}


class PhaseList extends React.Component{


    render(){
        const phases = this.props.data.tableData;
        return <div className="">
                    {
                        phases.map(
                            item => {
                                return <div key={item.id} className="row">
                                                <button onClick={(e) => {this.props.otherAction(e,item.id)}} className="list-group-item mb-2 mr-2 d-flex justify-content-between align-items-center list-group-item-action list-group-item-primary col-8">
                                                    {item.titre}
                                                    <span className="badge badge-primary badge-pill">55</span>
                                                </button>

                                                <Link className="list-group-item mb-2 d-flex justify-content-between align-items-center list-group-item-action list-group-item-primary col-2" to={"/phase/"+item.id}>
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                        </div>


                            }
                        )
                    }
                </div>
    }
}



export class ListProjetPhaseTacheView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs: [
                new InputClass({
                    name: "titre", type: "text", icon: "", errors: this.props.data.formMessage.errors["titre"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "pourcentage", titre: "Pourcentage dans le projet", type: "text", icon: "", errors: this.props.data.formMessage.errors["pourcentage"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "objectif", type: "text", icon: "", errors: this.props.data.formMessage.errors["objectif"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "budget", type: "text", icon: "", errors: this.props.data.formMessage.errors["budget"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "marge", titre: "Donnez une marge en nombre de jours svp", type: "number", icon: "", errors: this.props.data.formMessage.errors["marge"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "ordre", titre: "Donnez le numero d'ordre de la tache svp", type: "number", icon: "", errors: this.props.data.formMessage.errors["ordre"],
                    handleChange: this.props.data.formAction.handleField
                }),
            ],
            textarea: new TextareaClass({
                name: "description", type: "text", icon: "", errors: this.props.data.formMessage.errors["description"],
                handleChange: this.props.data.formAction.handleField
            }),
            selects: [
                new SelectClass({
                    name: 'priorite', titre: "Priorité", errors: this.props.data.formMessage.errors["priorite"],
                    handleChange: this.props.data.formAction.handleField, optionsData: [
                        new OptionClass({ value: "", text: "Selectionner une priorité" }),
                        new OptionClass({ value: "Urgente", text: "Urgente" }),
                        new OptionClass({ value: "importante", text: "Importante" }),
                        new OptionClass({ value: "reguliere", text: "Regulière" }),
                    ]
                })
            ]
        };


        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action: "add",
            formMessage: this.props.data.formMessage,
            fields: Fields
        });
        this.state.formD = FormDataObject;

        const arrDa = {
            tableData: []
        }

        const ListData = new FetchingDataClass({
            type: "list",
            arrayData: arrDa,
            pListFrameComponent: TacheList,
            pFilterList: null,
            otherAction: this.props.changeTaskList
        })
         const FrameDataObject = new FrameDataClass({
            name: 'tache',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "tache", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });

        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title : "ccc"
        });
        this.initFrame(FrameObject);
    }


    render() {
        return <FrameModule frameData={this.state.frameInfo} />
    }
}


class TacheList extends React.Component{


    render(){
        const taches = this.props.data.tableData;
        return <div className="">
                    {
                        taches.map(
                            item => {
                                return <div key={item.id} className="row">
                                                <Link to={'/phase/'+item.id}  className="list-group-item mb-2 mr-2 d-flex justify-content-between align-items-center list-group-item-action list-group-item-primary col-8">
                                                    {item.titre}
                                                    <span className="badge badge-primary badge-pill">55</span>
                                                </Link>

                                        </div>


                            }
                        )
                    }
                </div>
    }
}



/*export const ListProjetPhaseTacheComponent = (props) => (
    <p>List des taches de la phase {props.idPhase}</p>
);*/
