import BaseView from "../base.view";
import React from 'react';
import { FrameClass } from "../../core/class/base.class";
import './parametrage.css';
import { Link } from "react-router-dom";
import FlashMessage from 'react-flash-message';


export default class ConfigPhaseView extends BaseView{
     UNSAFE_componentWillMount() {
        const Data = {
            data: this.props.data
        };
        const FrameObject = new FrameClass({
            data: Data,
            action: "listDataFetch",
            title: "Gestion des projets",
            pFrameComponent: PConfigPhase
        });

        this.initFrame(FrameObject);
    }
}


class PConfigPhase extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.validForm = this.validForm.bind(this);
    }


    componentDidMount() {
        $(document).ready(function () {
            for (let i = 0; i < $("form").length; i++) {
                $("#f" + i).hide();
                $("#l" + i).show();
            }

        })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            if (this.props.data.data.formMessage !== prevProps.data.data.formMessage) {
                if (this.props.data.data.formMessage.success) {
                    this.setState({ successMessage: this.props.data.data.formMessage.success });
                    this.closeAll();
                    setTimeout(() => {
                        this.setState({ successMessage: null });
                    }, 6000)
                }

                if (this.props.data.data.formMessage.errors) {
                    this.setState({ errors: this.props.data.data.formMessage.errors });
                }

            }
            if (this.props.data.data.donnees !== prevProps.data.data.donnees) {
                this.setState({ localData: this.props.data.data.donnees })
                //console.log(this.props.data.data.donnees.pm)
            }

            if (this.props.data.data.others !== prevProps.data.data.others) {
                this.setState({ options: this.props.data.data.others })
            }
        }
    }


    showForm(e, i) {
        $(function () {
            $("#f" + i).show();
            $("#l" + i).hide();
        });
        this.setState({ isBtnCloseVisible: true })
        this.setState({ errors: null })

    }

    hideForm(e, i) {
        $(function () {
            $("#f" + i).hide();
            $("#l" + i).show();
        })
        this.setState({ isBtnCloseVisible: false })
        this.setState({ errors: null })
    }

    validForm(e) {
        e.preventDefault();
        this.props.data.data.formAction.submitForm(e);
    }

    change(i) {
        if (this.props.data.data.formMessage) {

            if (this.state.successMessage) {
                $(function () {
                    $("#f" + i).hide();
                    $("#l" + i).show();
                })
            }
        }
    }

    closeAll() {
        $(function () {
            for (let i = 0; i < $("form").length; i++) {
                $("#f" + i).hide();
                $("#l" + i).show();
            }
        })
        this.setState({ isBtnCloseVisible: false });
    }



    render(){
        const phase = this.props.data.data.donnees;

       if(phase){
           return <div className="container-fluid bg-light">
                    <div className="p-4 params-header">
                        <div className="row">
                            <div className="col-9">
                                <span>
                                    <h3 className="text-white"><i className="fa fa fa-cogs mr-2"></i> Paramétrage</h3>
                                </span>

                            </div>
                            <div className="col-3">
                                <Link to={"/phase/" + phase.id} className="btn btn-light btn-arrow-left">
                                    Retour à la phase
                                </Link>
                            </div>
                        </div>
                    </div>
               <div className="params-body mt-3">
                   {
                       this.state.successMessage ?

                           <FlashMessage className="mt-3 mb-3" duration={6000}>
                               <div className="col-12 bg-success text-right p-4">
                                   <strong className="text-white text-italic">{this.state.successMessage}</strong>
                               </div>
                           </FlashMessage> : null
                   }
                       <div  className="row border p-2">
                           <div id="form-config" className="col-7">
                               <h3 id="l0">Titre :  <span className="text-muted">{phase.titre}</span>
                                   <button onClick={(e) => {this.showForm(e,0)}} className="btn btn-outline-primary">
                                       <i className="fa fa-edit"></i>
                                   </button>
                               </h3>
                               <form id="f0" onSubmit={(e) => {this.validForm(e)}} className="p-2">
                                    <div  className="form-inline">
                                        <h5><label className="mr-2" htmlFor="titre">Titre : </label></h5>
                                        <input name="titre" onChange={(e)=>{e.persist(); this.props.data.data.formAction.handleField(e)}} type="text" id="titre" defaultValue={phase.titre} className="form-control mr-2" placeholder="Titre" />
                                        <button type="submit" className="btn btn-outline-primary mr-2">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button onClick={(e) => { this.hideForm(e, 0) }}  className="btn btn-outline-danger">
                                            <i className="fa fa-crosshairs"></i>
                                        </button>
                                    </div>
                               </form>
                           </div>
                           <div id="form-config" className="col-5">
                               <h3 id="l1">Budget : <span className="text-muted">{phase.budget}</span>
                                   <button onClick={(e) => {this.showForm(e,1)}} className="btn btn-outline-primary">
                                       <i className="fa fa-edit"></i>
                                   </button>
                               </h3>
                               <form id="f1"  onSubmit={(e) => {this.validForm(e)}} className="p-2">
                               <div  className="form-inline">
                                   <h5><label className="mr-2" htmlFor="titre">Budget : </label></h5>
                                   <input name="budget" onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }} defaultValue={phase.budget} type="text" id="budget" className="form-control mr-2" placeholder="Budget" />
                                   <button type="submit" className="btn btn-outline-primary mr-2">
                                       <i className="fa fa-check"></i>
                                   </button>
                                   <button onClick={(e) => { this.hideForm(e, 1) }} className="btn btn-outline-danger">
                                       <i className="fa fa-crosshairs"></i>
                                   </button>
                               </div>
                                </form>
                           </div>
                       </div>

                       <div className="row mt-2">
                           <div className="col-4 border-right p-3">
                               <div id="form-config" className="block1 mt-2 mb-3">
                                   <h4 id="l5">Objectif : <span className="text-muted">{phase.objectif}</span>
                                       <button onClick={(e) => { this.showForm(e, 5) }} className="btn btn-outline-primary">
                                           <i className="fa fa-edit"></i>
                                       </button>
                                   </h4>
                               <form id="f5"  onSubmit={(e) => {this.validForm(e)}} className="p-2">

                                   <div  className="form-inline">
                                       <h5><label className="mr-2" htmlFor="statut">Objectif : </label></h5>
                                       <input name="objectif"
                                            onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }}
                                           defaultValue={phase.objectif}
                                           id="objectif" className="form-control mr-2" placeholder="Objectif"/>

                                       <button type="submit" className="btn btn-outline-primary mr-2">
                                           <i className="fa fa-check"></i>
                                       </button>
                                       <button onClick={(e) => { this.hideForm(e, 5) }} className="btn btn-outline-danger">
                                           <i className="fa fa-crosshairs"></i>
                                       </button>
                                   </div>
                                </form>   
                               </div>

                               <div id="form-config" className="block1 mt-2 mb-3">
                                   <h4 id="l6">Numero d'ordre : <span className="text-muted">{phase.ordre}</span>
                                       <button onClick={(e) => { this.showForm(e, 6) }} className="btn btn-outline-primary">
                                           <i className="fa fa-edit"></i>
                                       </button>
                                   </h4>
                               <form id="f6"  onSubmit={(e) => {this.validForm(e)}} className="p-2">

                                   <div  className="form-inline">
                                       <h5><label className="mr-2" htmlFor="statut">Ordre : </label></h5>
                                       <input name="ordre"
                                            onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }}
                                           defaultValue={phase.ordre}
                                           id="ordre" className="form-control mr-2" placeholder="Numero d'ordre"/>

                                       <button type="submit" className="btn btn-outline-primary mr-2">
                                           <i className="fa fa-check"></i>
                                       </button>
                                       <button onClick={(e) => { this.hideForm(e, 6) }} className="btn btn-outline-danger">
                                           <i className="fa fa-crosshairs"></i>
                                       </button>
                                   </div>
                                </form>   
                               </div>

                               
                               <div id="form-config" className="block1 mt-2 mb-3">
                                   <h4 id="l7">Pourcentage : <span className="text-muted">{phase.pourcentage} %</span>
                                       <button onClick={(e) => { this.showForm(e, 7) }} className="btn btn-outline-primary">
                                           <i className="fa fa-edit"></i>
                                       </button>
                                   </h4>
                               <form id="f7"  onSubmit={(e) => {this.validForm(e)}} className="p-2">

                                   <div  className="form-inline">
                                       <h5><label className="mr-2" htmlFor="pourcentage">Pourcentage : </label></h5>
                                       <input name="pourcentage"
                                           onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }}
                                           defaultValue={phase.pourcentage}
                                           id="pourcentage" className="form-control mr-2" placeholder="Pourcentage" />

                                       <button type="submit" className="btn btn-outline-primary mr-2">
                                           <i className="fa fa-check"></i>
                                       </button>
                                       <button onClick={(e) => { this.hideForm(e, 7) }} className="btn btn-outline-danger">
                                           <i className="fa fa-crosshairs"></i>
                                       </button>
                                   </div>
                                </form>   
                               </div>

                               <div id="form-config" className="block1 mt-2 mb-3">
                                   <h4 id="l2">Statut de la phase : <span className="text-muted"></span>
                                       <button onClick={(e) => {this.showForm(e,2)}} className="btn btn-outline-primary">
                                           <i className="fa fa-edit"></i>
                                       </button>
                                   </h4>
                                   <form id="f2"  onSubmit={(e) => {this.validForm(e)}} className="p-2">
                                    <div className="form-inline">
                                        <h5><label className="mr-2" htmlFor="statut">Statut : </label></h5>
                                        <select  name="statut" onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }}
                                                    defaultValue={phase.statut}
                                                    id="statut" className="form-control mr-2" placeholder="statut">
                                            <option className="text-muted" value="">Selectionner un statut svp</option>
                                            <option value="1">En attente</option>
                                            <option value="2">En cours</option>
                                            <option value="3">Bloqué</option>
                                            <option value="4">Terminé</option>

                                        </select>
                                        <button type="submit" className="btn btn-outline-primary mr-2">
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button onClick={(e) => {this.hideForm(e,2)}} className="btn btn-outline-danger">
                                            <i className="fa fa-crosshairs"></i>
                                        </button>
                                    </div>
                                   </form> 
                               </div>

                               <div id="form-config" className="block3 mt-2 mb-3">
                                   <h4 id="l3">Marge : <span className="text-muted">{phase.marge}</span>
                                       <button onClick={(e) => {this.showForm(e,3)}} className="btn btn-outline-primary">
                                           <i className="fa fa-edit"></i>
                                       </button>

                                   </h4>
                               <form id="f3"  onSubmit={(e) => {this.validForm(e)}} className="p-2">

                                   <div className="form-inline mb-3">
                                       <h6><label className="mr-2" htmlFor="marge">Marge: </label></h6>
                                       <input name="marge" defaultValue={phase.marge} type="number" id="marge" className="form-control mr-2" placeholder="Marge en nombre de jours svp" />
                                       <button type="submit" className="btn btn-outline-primary mr-2">
                                           <i className="fa fa-check"></i>
                                       </button>
                                       <button onClick={(e) => { this.hideForm(e, 3) }} className="btn btn-outline-danger">
                                           <i className="fa fa-crosshairs"></i>
                                       </button>
                                   </div>
                                </form>
                                   </div>
                               
                           </div>


                           <div className="col-8">
                               <div id="form-config" className="block2 mt-2 mb-3">
                                   <span>
                                        <h4 id="l4">Description :
                                            <button onClick={(e) => {this.showForm(e,4)}} className="btn btn-outline-primary">
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        </h4>
                                        <p>
                                             <span className="text-muted">
                                                {phase.description}
                                             </span>
                                        </p>
                                   </span>
                               <form id="f4"  onSubmit={(e) => {this.validForm(e)}} className="p-2">

                                   <div >
                                        <div className="form-group mb-3">
                                            <h6><label className="mr-2" htmlFor="description">Description: </label></h6>
                                            <textarea defaultValue={phase.description}
                                             className="form-control" rows="10"
                                             onChange={(e) => { e.persist(); this.props.data.data.formAction.handleField(e) }}
                                             >
                                             </textarea>
                                        </div>
                                        <div  className="form-group">
                                            <button type="submit" className="btn btn-outline-primary mr-2">
                                                <i className="fa fa-check"></i>
                                            </button>
                                            <button onClick={(e) => {this.hideForm(e,4)}} className="btn btn-outline-danger">
                                                <i className="fa fa-crosshairs"></i>
                                            </button>
                                        </div>
                                   </div>
                                 
                               </form>
                                   </div>
                               
                           </div>
                           
                       </div>
                       <div className="form-group mt-3">
                           {this.state.isBtnCloseVisible === true ? <button onClick={this.closeAll.bind(this)} className="btn btn-block btn-outline-success text-bold p-3">fin de paramétrage</button> : null}
                       </div>
                   
               </div>
           </div>
       }
       return null;
    }
}
