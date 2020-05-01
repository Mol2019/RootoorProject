import React from "react";
import BaseView from "../base.view";
import { InputClass, FormClass } from "../../core/class/elements.class";
import { FetchingDataClass, FrameDataClass, FrameClass } from './../../core/class/base.class';
import { ModalClass, TextareaClass } from './../../core/class/elements.class';
import { Link } from 'react-router-dom';
import './card-progress.css';

export default class ProjetCompteView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs: [
                new InputClass({
                    name: "domaine", type: "text", icon: "", errors: this.props.data.formMessage.errors["titre"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "titre", type: "text", icon: "", errors: this.props.data.formMessage.errors["titre"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "budget", type: "text", icon: "", errors: this.props.data.formMessage.errors["budget"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "delais", titre: "Delais", type: "date", icon: "", errors: this.props.data.formMessage.errors["delais"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "marge", titre : "Donnez une marge en nombre de jours svp",type: "number", icon: "", errors: this.props.data.formMessage.errors["marge"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "compte", type: "hidden", icon: "", defValue: this.props.accountId, errors: this.props.data.formMessage.errors["delais"],
                    handleChange: this.props.data.formAction.handleField
                }),
            ],
            textarea: new TextareaClass({
                name: "description", type: "text", icon: "", errors: this.props.data.formMessage.errors["description"],
                handleChange: this.props.data.formAction.handleField})
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
            pListFrameComponent: ProjetList,
            pFilterList: null
        })

        const FrameDataObject = new FrameDataClass({
            name: 'projet',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "projet", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });
        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title: "Gestion des projets",
        });
        this.initFrame(FrameObject);
    }
}

export class ProjetList extends React.Component{
    componentDidMount(){
        $(document).ready(function(){
            $(function () {
                $(".progress").each(function () {

                    var value = $(this).attr('data-value');
                    var left = $(this).find('.progress-left .progress-bar');
                    var right = $(this).find('.progress-right .progress-bar');
                    if (value > 0) {
                        if (value <= 50) {
                            right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
                        } else {
                            right.css('transform', 'rotate(180deg)')
                            left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
                        }
                    }

                })

                function percentageToDegrees(percentage) {

                    return percentage / 100 * 360

                }

            });

        })
    }
    render(){
        return <div id="card" className="row p-4 justify-content-center">
                    {
                        this.props.data.tableData.map(
                            item => {
                                return <div key={item.id} className="col-xl-4 m-1 col-md-4 col-lg-6 col-12 mb-4 mt-2 card">
                                    <div className="mb-3 p-2 border-bottom">
                                        <h4 className="text-primary">{item.titre}</h4>
                                    </div>

                                    <div className="progress py-auto my-4 mx-auto" data-value='50'>
                                        <span className="progress-left">
                                            <span className="progress-bar border-primary"></span>
                                        </span>
                                        <span className="progress-right">
                                            <span className="progress-bar border-primary"></span>
                                        </span>
                                        <div className="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                            <div className="h2 font-weight-bold">50<sup className="small">%</sup></div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        <Link to={"/projet/" + item.id + "/configs"} className="btn btn-outline-dark m-1 col-12 col-md-5 col-lg-5 ">
                                            paramétrage
                                         </Link>

                                        <Link to={"/projet/" + item.id} className="btn btn-outline-primary m-1 col-12 col-md-5 col-lg-5">
                                            Gestion
                                        </Link>

                                    </div>
                                    <div className="delete p-2">
                                        <button id={item.id} name="supprimer" onClick={this.props.modalChange} className="btn btn-block btn-outline-danger">
                                            Supprimer
                                         </button>

                                    </div>

                                </div>
                            }
                        )

                    }

                </div>
    }
}


