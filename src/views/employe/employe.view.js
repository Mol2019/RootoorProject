import BaseView from './../base.view';
import React from "react";
import { InputClass, FormClass, CardClass, ModalClass } from './../../core/class/elements.class';
import { FetchingListClass, FrameDataClass } from '../../core/class/base.class';
import { FetchingDataClass, FrameClass } from './../../core/class/base.class';

export default class EmployeView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs: [
                new InputClass({
                    name: "photo", handleFile: this.props.data.handleFile, titre: "Selectionner une photo", type: "user-pic", errors: this.props.data.formMessage.errors["photo"],
                }),
                new InputClass({
                    name: "nom", type: "text", icon: "user", errors: this.props.data.formMessage.errors["nom"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "prenoms", type: "text", icon: "user", errors: this.props.data.formMessage.errors["prenoms"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "naissance", titre: "Date de naissance", type: "date", icon: "calendar-alt", errors: this.props.data.formMessage.errors["naissance"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "adresse", type: "text", icon: "map-marker-alt", errors: this.props.data.formMessage.errors["adresse"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "telephone", type: "phone", icon: "phone-alt", errors: this.props.data.formMessage.errors["telephone"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "email", type: "email", icon: "envelope", errors: this.props.data.formMessage.errors["email"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "fonction", type: "text", icon: "user-tag", errors: this.props.data.formMessage.errors["fonction"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "chmd", titre: "Cout horaire de main d'oeuvre", type: "number",
                    icon: "money-check-alt", errors: this.props.data.formMessage.errors["fonction"],
                    handleChange: this.props.data.formAction.handleField
                }),
            ]
        };
        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action: "add",
            formMessage: this.props.data.formMessage,
            fields: Fields
        });
        this.state.formD = FormDataObject;
        const cardData = new CardClass({
            pCardDataComponent: null,
            cardType: "userCards",
            cardData: []
        })

        const goodListFetcher = new FetchingListClass({
            typeList: "card",
            cardsInformation: cardData
        })

        const ListData = new FetchingDataClass({
            type: "list",
            listData: goodListFetcher,
            pListFrameComponent: null,
            pFilterList: null
        })

        const FrameDataObject = new FrameDataClass({
            name: 'employe',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "employé", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });
        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title: "Gestion des employés",
            withSideBar: true,
            withHeader: true,
        });
        this.initFrame(FrameObject);
    }
}

