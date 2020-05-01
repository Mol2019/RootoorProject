import React from 'react';
import BaseView from './../base.view';
import { InputClass, FormClass, CardClass, ModalClass } from './../../core/class/elements.class';
import { FetchingListClass, FrameDataClass } from '../../core/class/base.class';
import { FetchingDataClass, FrameClass } from './../../core/class/base.class';
import { Link } from 'react-router-dom';
import ContactListComponent from './../../components/app/pages/contact/contact.list.component';
import { AlreadyAssignContactComponent } from './../../components/app/pages/contact/already-assign-contact.component';
import { generateKey } from '../../core/utils/utils.functions';


export default class ContactView extends BaseView{
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        const FrameObject = new FrameClass({
            action: "listDataFetch",
            title: "Gestion des contacts",
            withSideBar: true,
            withHeader: true,
            withSubMenu : true,
            otherData : {
                component : ContactListComponent
            },
            subMenuData : [
                {
                    titre : "Liste des contacts",
                    component: ContactListComponent,
                    key : generateKey()
                },
                {
                    titre: "Contact assignés",
                    component: AlreadyAssignContactComponent,
                    key: generateKey()
                },
            ],
            changeComponent : this.changeComponent
        });
        this.initFrame(FrameObject);
    }
}



export class ContactListView extends BaseView {
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

        const arrDa = {
            tableData: []
        }

        const ListData = new FetchingDataClass({
            type: "list",
            arrayData: arrDa,
            pListFrameComponent: ContactList,
            pFilterList: ContactSearch
        })

        const FrameDataObject = new FrameDataClass({
            name: 'contact',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "contact", action: 'def' }
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });
        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title: "Gestion des contacts",
        });
        this.initFrame(FrameObject);
    }
}



function ContactList(props) {
    return <div className="col-12 container-fluid pt-0 contact-list">
                <OtherComponent data={props.data.tableData} />
            </div>
}

function ContactSearch(props) {
    return <div className="row pt-3">
        <div className="col-md-8">
            <input onChange={props.handleChange} className="form-control" placeholder="Rechercher un contact" type="search" name={value} />
        </div>
        <div className="col-md-3">
            <select onChange={changeTypeSearch} className="form-control custom-select">
                <option value="global">Global</option>
                <option value="nom">Par nom</option>
                <option value="telephone">Par numéro de téléphone</option>
                <option value="email">Par numéro de email</option>
            </select>
        </div>
    </div>
}


let value = "global";

let changeTypeSearch = (e) => {
    const name = e.target.value ? e.target.value : "global";
    value = name;
}

function OtherComponent(props) {
    return <div className="contact-group row p-3 bg-light card-group">
        {
            props.data.map(
                item => {
                    return <Link key={item.id} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6" to={"/contact/" + item.id}>
                        <div className="card contact-item mt-0 mt-sm-2 mt-xs-2">
                            <div className="row">
                                <div className="col-3 mr-2">
                                    <img className="rounded-circle p-1" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." />
                                </div>
                                <div className="col-8 pl-3">
                                    <h6 className="card-title">{item.nom + " " + item.prenoms}</h6>
                                    <div className="media-content">
                                        <ul className="list-unstyled">
                                            <li><i className="fa fa-map-marker"></i> {item.localisation}</li>
                                            <li><i className="fa fa-mobile"></i> {item.telephone}</li>
                                            <li><i className="fa fa-envelope"></i> {item.email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            )
        }
    </div>
}
