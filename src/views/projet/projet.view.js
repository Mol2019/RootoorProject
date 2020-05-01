import React from 'react';
import BaseView from './../base.view';
import { InputClass, FormClass, ModalClass, OptionClass, SelectClass, TextareaClass } from './../../core/class/elements.class';
import { FetchingDataClass, FrameDataClass, FrameClass } from './../../core/class/base.class';
import { ProjetList } from './projet.compte.view';

export default class ProjetView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            selects : [
                new SelectClass({
                    name: "compte", icon: "", errors: this.props.data.formMessage.errors["compte"],
                    handleChange: this.props.data.formAction.handleField, optionsData: [
                    ]
                 }
                )
            ],
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
                    name: "marge", titre: "Donnez une marge en nombre de jours svp", type: "number", icon: "", errors: this.props.data.formMessage.errors["marge"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "compte", type: "hidden", icon: "", defValue: this.props.accountId, errors: this.props.data.formMessage.errors["delais"],
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
            withSideBar: true,
            withHeader: true,
        });
        this.initFrame(FrameObject);
    }
}

