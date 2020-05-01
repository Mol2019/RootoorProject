import React from 'react';
import BaseView from './../base.view';
import { InputClass, FormClass, ModalClass } from './../../core/class/elements.class';
import { FetchingDataClass, FrameDataClass, FrameClass } from './../../core/class/base.class';
import './singlecontact.css';

export class SingleContactView extends BaseView{
    UNSAFE_componentWillMount() {
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
                    name: "localisation", type: "text", icon: "map-marker-alt", errors: this.props.data.formMessage.errors["localisation"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "email", type: "email", icon: "envelope", errors: this.props.data.formMessage.errors["email"],
                    handleChange: this.props.data.formAction.handleField
                }),

                new InputClass({
                    name: "telephone", type: "phone", icon: "phone", errors: this.props.data.formMessage.errors["telephone"],
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

        const SingleData = new FetchingDataClass({
            type: "single",
            singleton: {},
            pSingleDataFrameComponent: PContactView
        });


        const FrameDataObject = new FrameDataClass({
            name: 'contact',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: SingleData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "contact", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });


        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "singleDataFetch",
            title: "Gestion des contacts",
            withSideBar: true,
            withHeader: true,
        });
        this.initFrame(FrameObject);
    }
}


const PContactView = props => (
    <div className="container single p-3">
        <div className="col-sm-12 col-md-12">
            <div className="div-box">
                <div className="User-img">
                    <img src="/images/user-icon.jpg" />
                </div>
                <h3 className="User-name">{props.data.nom + " " + props.data.prenoms}</h3>
                <h4 className="designation"><i className="fas fa-phone-square-alt mr-2"></i>
                    <a href="#">{props.data.telephone}</a>
                </h4>
                <h4 className="designation"><i className="fas fa-envelope mr-2"></i>
                    <a href="#">{props.data.email}</a>
                </h4>
                <h4 className="designation"><i className="fas fa-map-marker-alt mr-2"></i>
                    <a href="#">{props.data.localisation}</a>
                </h4>
                <div className="contact-btn">
                    <button onClick={props.modalChange} id={props.data.id} name="modifier" type="button" className="btn btn-success">Modifier </button>
                    <button onClick={props.modalChange} id={props.data.id} name="supprimer" type="button" className="btn btn-danger">Supprimer </button>
                    <button type="button" className="btn btn-secondary">Message</button>
                </div>
            </div>
        </div>
    </div>

)
