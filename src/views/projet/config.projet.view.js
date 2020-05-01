import BaseView from './../base.view';
import { FrameClass } from './../../core/class/base.class';
import React from 'react';
import { Link } from 'react-router-dom';
import './config.scss';
import './bootstrap-directional-btn.scss';
import FlashMessage from 'react-flash-message';


export default class ConfigProjectView extends BaseView{
    UNSAFE_componentWillMount(){
        const Data = {
            data : this.props.data
        };
        const FrameObject = new FrameClass({
            data : Data,
            action: "listDataFetch",
            title: "Gestion des projets",
            pFrameComponent : PConfigProject
        });

        this.initFrame(FrameObject);
    }
}



class PConfigProject extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount(){
        $(document).ready(function(){
            for (let i =0; i<$("form").length;i++){
                $("#f" + i).hide();
                $("#fd" + i).show();
                $('#addPm').hide();
            }

        })
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            if (this.props.data.data.formMessage !== prevProps.data.data.formMessage){
                if(this.props.data.data.formMessage.success){
                    this.setState({ successMessage: this.props.data.data.formMessage.success });
                    this.closeAll();
                    setTimeout(() => {
                        this.setState({ successMessage: null });
                    }, 6000)
                }

                if (this.props.data.data.formMessage.errors) {
                    this.setState({errors: this.props.data.data.formMessage.errors });
                }

            }
            if (this.props.data.data.donnees !== prevProps.data.data.donnees){
                this.setState({ localData: this.props.data.data.donnees})
                //console.log(this.props.data.data.donnees.pm)
            }

            if (this.props.data.data.others !== prevProps.data.data.others){
                this.setState({ options: this.props.data.data.others})
            }
        }
    }


    showForm(e,i){
        $(function(){
            $("#f"+i).show();
            $("#fd"+i).hide();
        });
        this.setState({ isBtnCloseVisible : true})
        this.setState({ errors: null })

    }

    hideForm(e, i) {
        $(function () {
            $("#f" + i).hide();
            $("#fd" + i).show();
        })
    }

    validForm(e,i){
        e.preventDefault();
        this.props.data.data.formAction.submitForm(e);
    }

    change(i){
        if(this.props.data.data.formMessage){

            if (this.state.successMessage){
                $(function () {
                    $("#f" + i).hide();
                    $("#fd" + i).show();
                })
            }
        }
    }

    closeAll(){
        $(function(){
            for (let i = 0; i < $("form").length; i++) {
                $("#f" + i).hide();
                $("#fd" + i).show();
            }
        })
        this.setState({ isBtnCloseVisible: false });
        this.closeAddPm();
    }

    addSelectPm(e){
        $(function(){
            $('#addPm').show();
        })
        this.setState({ isBtnCloseVisible: true });
    }

    closeAddPm(e){
        $(function () {
            $('#addPm').hide();
        })
    }

    render(){
        return <div className="card card-config mt-3">
                <div className="card-header p-3">
                    <div className="container text-muted text-italic p-3 bg-light mb-2 row">
                        <h3 className="col-9"> <i className="fa fa-cogs pr-2"></i> Paramétrage du projet</h3>
                        <Link to={"/projet/"+this.props.data.data.donnees.id} className="btn btn-primary btn-arrow-left">
                            Retour au projet
                        </Link>
                    </div>
                </div>
            <div className="card-body">
                <div>
                        {
                         this.state.successMessage ?

                            <FlashMessage className="mt-3 mb-3" duration={6000}>
                                <div className="col-12 bg-success text-right p-4">
                                    <strong className="text-white text-italic">{this.state.successMessage}</strong>
                                </div>
                            </FlashMessage> : null
                        }

                      <h3 className="title pb-3">
                        <span id="fd0"> Titre : <span className="text-muted">
                            {this.props.data.data.donnees.titre}</span>
                            <button onClick={e => { this.showForm(e, 0) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                <i className="fa fa-edit"></i>
                                                    Modifier
                                                </button>
                        </span>

                        <form onSubmit={e => { this.validForm(e, 0) }} className="form-inline" id="f0">
                            {
                                this.state.errors ?
                                    <div className="text-danger">
                                        {this.state.errors["titre"] ? this.state.errors["titre"] : null}
                                    </div> : null
                            }
                            <div className="form-group mb-2">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input name="titre" type="text" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.titre} className="form-control" id="domaine" />
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">OK</button>
                            </div>
                        </form>
                        {this.state.isBtnCloseVisible === true ? <button onClick={this.closeAll.bind(this)} className="btn btn-sm btn-outline-danger offset-7">Tout fermer</button> : null
                        }


                    </h3>
                    <h2 className="subtitle subtitle-container">
                        <div className="row">
                            <div className="col-4">
                                <span id="fd1"> Domaine :
                                    {this.props.data.data.donnees.domaine}
                                    <button onClick={e => {this.showForm(e,1)}} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                        <i className="fa fa-edit"></i>
                                        Modifier
                                    </button>
                                </span>

                                <form onSubmit={e => { this.validForm(e, 1) }} className="form-inline" id="f1">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["domaine"] ? this.state.errors["domaine"] : null}
                                            </div> : null
                                    }
                                    <label htmlFor="domaine">Domaine</label>
                                    <div className="form-group mb-2">

                                        <div className="form-group mx-sm-3 mb-2">
                                            <input name="domaine" type="text" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.domaine} className="form-control" id="domaine" placeholder="Password"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger mb-2">
                                            <i className="fa fa-crosshairs"></i>
                                        </button>
                                    </div>
                                </form>
                        </div>
                            <div className="col-4">
                                <span id="fd2"> Début théorique:
                                    {this.props.data.data.donnees.debut_theorique}
                                    <button onClick={e => { this.showForm(e, 2) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                        <i className="fa fa-edit"></i>
                                        Modifier
                                    </button>
                                </span>

                                <form onSubmit={e => { this.validForm(e, 2) }} className="form-inline" id="f2">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["debut_theorique"] ? this.state.errors["debut_theorique"] : null}
                                            </div> : null
                                    }
                                    <div className="form-group mb-2">
                                        <div className="form-group mx-sm-3 mb-2">
                                            <input name="debut_theorique" type="date" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.debut_theorique} className="form-control"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">OK</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-4">
                                <span id="fd3"> Fin théorique:
                                    {this.props.data.data.donnees.fin_theorique}
                                    <button onClick={e => { this.showForm(e, 3) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                        <i className="fa fa-edit"></i>
                                        Modifier
                                    </button>
                                </span>

                                <form onSubmit={e => { this.validForm(e, 3) }} className="form-inline" id="f3">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["fin_theorique"] ? this.state.errors["fin_theorique"] : null}
                                            </div> : null
                                    }
                                    <div className="form-group mb-2">
                                        <div className="form-group mx-sm-3 mb-2">
                                            <input name="debut_theorique" type="date" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.fin_theorique} className="form-control"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">OK</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </h2>
                </div>

                <div className="row border-right">
                    <div className="col-4">
                        <span className="mt-2">

                    <h4 className="mt-4 mb-4">
                        <span id="fd4"> Budget :
                            <span className="emphasize"> {this.props.data.data.donnees.budget} </span>
                            <button onClick={e => { this.showForm(e, 4) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                <i className="fa fa-edit"></i>
                                Modifier
                            </button>
                        </span>

                        <form onSubmit={e => { this.validForm(e, 4) }} className="form-inline" id="f4">
                            <div className="form-group mb-2">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input name="budget" type="text" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.budget} className="form-control"/>
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">OK</button>
                            </div>
                        </form>
                    </h4>

                    <h4 className="mt-4 mb-5">
                        <span id="fd5">Piloté par :
                                    {this.props.data.data.donnees.pm ?
                                        this.props.data.data.donnees.pm.map(
                                            item => {
                                                return <div key={item.id}>
                                                            <span classNam="text-muted">{item.nom + " " + item.prenoms}</span>
                                                    <button onClick={e => { this.showForm(e, 5 + item.id) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                                                <i className="fa fa-edit"></i>
                                                                    Modifier
                                                            </button>
                                                    <form onSubmit={e => { this.validForm(e, 5 + item.id) }} className="form-inline" id="f5">
                                                        {
                                                            this.state.errors ?
                                                                <div className="text-danger">
                                                                    {this.state.errors["pm"] ? this.state.errors["pm"] : null}
                                                                </div> : null
                                                        }
                                                        <div className="form-group mb-2">
                                                            <div className="form-group mx-sm-3 mb-2">
                                                                <select name="pm" type="text" onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }} defaultValue={item.id} className="form-control custom-select">
                                                                    <option className="text-muted">Selectionnez un chef de projet</option>
                                                                    <option className="text-muted">Selectionnez un chef de projet</option>
                                                                    {
                                                                        this.state.options ?
                                                                            this.state.options.map(
                                                                                item => {
                                                                                    return <option key={item.id} value={item.id}>{item.nom + " " + item.prenoms} </option>
                                                                                }
                                                                            ) : null
                                                                    }
                                                                </select>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mb-2">OK</button>
                                                        </div>
                                                        </form>
                                                        </div>

                                            }
                                        ) : null
                                    }
                                {
                                        this.props.data.data.donnees.pm ?
                                            this.props.data.data.donnees.pm.length >= 2 ?
                                                null : <button onClick={this.addSelectPm.bind(this)} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                                        <i className="fa fa-plus"></i>
                                                        ajout
                                                    </button>
                                                 : null
                                }

                        </span>

                        <form onSubmit={e => { this.validForm(e) }} className="form-inline" id="addPm">
                            {
                                this.state.errors ?
                                    <div className="text-danger">
                                        {this.state.errors["pm"] ? this.state.errors["pm"] : null}
                                    </div> : null
                            }
                            <div className="form-group mb-2">
                                <div className="form-group mx-sm-3 mb-2">
                                    <select name="pm" type="text" onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }} defaultValue={this.props.data.data.donnees.pm} className="form-control custom-select">
                                        <option className="text-muted">Selectionnez un chef de projet</option>
                                        {
                                                    this.state.options ?
                                                        this.state.options.map(
                                                            item => {
                                                                return <option key={item.id} value={item.id}>{item.nom + " " + item.prenoms} </option>
                                                            }
                                                        ) : null
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">OK</button>
                            </div>
                        </form>
                    </h4>

                </span>
                <span className="mt-2">
                    <h4 className="mt-4 mb-5">
                        <span id="fd7">Délais :
                            {this.props.data.data.donnees.delais}
                            <button onClick={e => { this.showForm(e, 7) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                <i className="fa fa-edit"></i>
                                Modifier
                            </button>
                        </span>

                        <form onSubmit={e => { this.validForm(e, 7) }} className="form-inline" id="f7">

                            <div className="form-group mb-2">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["delais"] ? this.state.errors["delais"] : null}
                                            </div> : null
                                    }
                                <div className="form-group mx-sm-3 mb-2">
                                    <input name="delais" type="date" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.delais} className="form-control"/>                               </div>
                                <button type="submit" className="btn btn-primary mb-2">OK</button>
                            </div>
                        </form>
                    </h4>
                </span>
                <span className="mt-2">
                    <h4 className="mt-4 mb-5">
                        <span id="fd8">Marge :
                            {this.props.data.data.donnees.marge}
                            <button onClick={e => { this.showForm(e, 8) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                <i className="fa fa-edit"></i>
                                Modifier
                            </button>
                        </span>

                        <form onSubmit={e => { this.validForm(e, 8) }} className="form-inline" id="f8">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["marge"] ? this.state.errors["marge"] : null}
                                            </div> : null
                                    }
                            <div className="form-group mb-2">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input name="marge" type="number" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.marge} className="form-control" />                               </div>
                                <button type="submit" className="btn btn-primary mb-2">OK</button>
                            </div>
                        </form>
                    </h4>
                </span>

                        <span className="mt-2">
                            <h4 className="mt-4 mb-5">
                                <span id="fd9">Statut :

                                 {
                                        (this.props.data.data.donnees.statut && this.props.data.data.donnees.statut.length) > 0 ?
                                            this.props.data.data.donnees.statut[this.props.data.data.donnees.statut.length-1].statut.libelle
                                            :
                                        null

                                 }
                                    <button onClick={e => { this.showForm(e, 9) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                        <i className="fa fa-edit"></i>
                                Modifier
                            </button>
                                </span>

                                <form onSubmit={e => { this.validForm(e, 9) }} className="form-inline" id="f9">
                                    {
                                        this.state.errors ?
                                            <div className="text-danger">
                                                {this.state.errors["statut"] ? this.state.errors["statut"] : null}
                                            </div> : null
                                    }
                                    <div className="form-group mb-2">
                                        <div className="form-group mx-sm-3 mb-2">
                                            <input name="statut" type="number" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.statut} className="form-control" />                               </div>
                                        <button type="submit" className="btn btn-primary mb-2">OK</button>
                                    </div>
                                </form>
                            </h4>
                        </span>
                </div>
                    <div className="col-8">
                         <div id="fd6">
                        <h4 className="mt-4 mb-2">
                            <span>Description :

                                <button onClick={e => { this.showForm(e, 6) }} className="btn btn-sm btn-outline-primary ml-1" id="showForm">
                                    <i className="fa fa-edit"></i>
                                Modifier
                                </button>
                            </span>
                        </h4>
                        <h5>
                            {
                                this.props.data.data.donnees.description
                            }
                        </h5>
                    </div>

                    <form onSubmit={e => { this.validForm(e, 6) }} id="f6">
                            {
                                this.state.errors ?
                                    <div className="text-danger">
                                        {this.state.errors["description"] ? this.state.errors["description"] : null}
                                    </div> : null
                            }
                            <div className="form-group mb-2">
                                <div className="form-group mx-sm-3 mb-2">
                                    <textarea name="description" type="text" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} defaultValue={this.props.data.data.donnees.description} className="form-control">
                                    </textarea>
                                </div>
                                <button type="submit" className="btn btn-block btn-primary mb-2">OK</button>
                            </div>
                    </form>

                    </div>
                </div>


            </div>
        </div>
    }
}


