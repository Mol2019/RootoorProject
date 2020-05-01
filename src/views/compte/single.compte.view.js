import React from 'react';
import { FrameClass, FrameDataClass, FetchingDataClass } from '../../core/class/base.class';
import { InputClass, FormClass, ModalClass, SelectClass, OptionClass, CardClass } from './../../core/class/elements.class';
import BaseView from '../base.view';


export default class CompteView extends BaseView {
    UNSAFE_componentWillMount() {
        const Fields = {
            inputs: [
                new InputClass({
                    name: "nom", type: "text", icon: "user", errors: this.props.data.formMessage.errors["nom"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "adresse", type: "text", icon: "map-marker-alt", errors: this.props.data.formMessage.errors["adresse"],
                    handleChange: this.props.data.formAction.handleField
                }),
            ],
            selects: [
                new SelectClass({
                    name: "type", icon: "handshake", errors: this.props.data.formMessage.errors["type"],
                    handleChange: this.props.data.formAction.handleField, optionsData: [
                        new OptionClass({ value: "", text: 'Selectionner un type' }),
                        new OptionClass({ value: "partenaire", text: 'Partenaire' }),
                        new OptionClass({ value: "client", text: 'Client' }),
                        new OptionClass({ value: "fournisseur", text: 'Fournisseur' })
                    ]
                }
                )
            ],
        };
        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action: "add",
            formMessage: this.props.data.formMessage,
            fields: Fields
        });
        this.state.formD = FormDataObject;

        const SingleData = new FetchingDataClass({
            type: "single",
            singleton: {},
            pSingleDataFrameComponent: null
        });


        const FrameDataObject = new FrameDataClass({
            name: 'compte',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: SingleData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "compte", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });


        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "singleDataFetch",
            title: "Gestion des comptes",
            withSideBar: true,
            withHeader: true,
        });
        this.initFrame(FrameObject);
    }
}
