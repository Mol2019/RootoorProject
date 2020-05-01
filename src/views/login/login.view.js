import React from 'react';
import BaseView from './../base.view';
import { FrameClass, FrameDataClass } from './../../core/class/base.class';
import { FormClass } from '../../core/class/elements.class';
import { InputClass } from './../../core/class/elements.class';

export default class LoginView extends BaseView{
    UNSAFE_componentWillMount(){
        const Fields = {
            inputs : [
                new InputClass({name: "login", handleChange: this.props.data.formAction.handleField , type: "text", titre: "Nom d'utilisateur", icon: "user", errors: this.props.data.formMessage.errors['login'] }),
                new InputClass({name: "password", handleChange: this.props.data.formAction.handleField, type: "password", titre: "Mot de passe", icon: "lock", errors: this.props.data.formMessage.errors['password'] }),
                new InputClass({name:"remember",handleChange:this.props.data.formAction.handleField, type : "checkbox", titre : "Se souvenir", errors : this.props.data.formMessage.errors['remember']})
            ]
        };
        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            action : "login",
            formMessage : this.props.data.formMessage,
            btnText : "Connexion",
            fields : Fields
        });
        const FrameDataObject = new FrameDataClass({
            name : 'connexion',
            FormData : FormDataObject,
            fetchingData : {}

        });
        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action : "formFetch",
            title: "Espace connexion",
        });
        this.initFrame(FrameObject);
    }
}


