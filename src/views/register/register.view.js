import React from 'react';
import BaseView from "../base.view";
import { InputClass, FormClass, SelectClass } from "../../core/class/elements.class";
import { FrameDataClass, FrameClass } from "../../core/class/base.class";

export class RegisterView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs: [
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
                    name: "chmd", titre: "Cout horaire de main d'oeuvre", type: "number",
                    icon: "money-check-alt", errors: this.props.data.formMessage.errors["fonction"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "login", type: "text",
                    icon: "money-check-alt", errors: this.props.data.formMessage.errors["login"],
                    handleChange: this.props.data.formAction.handleField
                }),
                new InputClass({
                    name: "password", type: "text",
                    icon: "money-check-alt", errors: this.props.data.formMessage.errors["password"],
                    handleChange: this.props.data.formAction.handleField
                })
            ],
            /*selects : [
                new SelectClass({
                    name: "domaine", icon: "user-tag", errors: this.props.data.formMessage.errors["fonction"],
                    handleChange: this.props.data.formAction.handleField} ),
                new SelectClass({
                    name: "specialite", titre: "Spécialité",icon: "user-tag", errors: this.props.data.formMessage.errors["fonction"],
                    handleChange: this.props.data.formAction.handleField}),

                ]*/


        };
        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action: "Enregistrement",
            formMessage: this.props.data.formMessage,
            btnText: "valider",
            fields: Fields,
        });
        const FrameDataObject = new FrameDataClass({
            name: 'inscription',
            FormData: FormDataObject,
            fetchingData: {}

        });
        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "formFetch",
            title: "Espace inscription",
        });
        this.initFrame(FrameObject);
    }
}


