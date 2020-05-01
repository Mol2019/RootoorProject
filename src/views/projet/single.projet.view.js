import BaseView from '../base.view';
import { FrameClass } from './../../core/class/base.class';
import React from 'react';
import { generateKey } from '../../core/utils/utils.functions';
import { InfoProjectComponent } from '../../components/app/pages/projet/single.projet.component';
import { Link } from 'react-router-dom';
import PlanificationProjetComponent from '../../components/app/pages/projet/planification.projet.component';

export default class SingleProjetView extends BaseView{
    UNSAFE_componentWillMount(){
        const FrameObject = new FrameClass({
            action: "listDataFetch",
            title: "Gestion de projet ",
            withSideBar: true,
            withHeader: true,
            withSubMenu: true,
            otherData: {
                component: InfoProjectComponent,
                id: this.props.projetId
            },
            subMenuData: [
                {
                    titre: "Information",
                    component: InfoProjectComponent,
                    key: generateKey()
                },
                {
                    titre: "Planification",
                    component: PlanificationProjetComponent,
                    key: generateKey()
                },
                {
                    titre: "Rapport & Livrables",
                    component: ReportComponent,
                    key: generateKey()
                },
            ],
            changeComponent: this.changeComponent
        });
        this.initFrame(FrameObject);
    }
}


export class InfoProjectView extends BaseView{
    UNSAFE_componentWillMount(){
        const Data = {
            data: this.props.data
        };
        const FrameObject = new FrameClass({
            data: Data,
            action: "listDataFetch",
            title: "Gestion des projets",
            pFrameComponent: PInfoProject
        });

        this.initFrame(FrameObject);
    }
}


class PInfoProject extends React.Component{
    componentDidMount() {
        $(document).ready(function () {
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
        const projet = this.props.data.data.donnees;
       if(projet){
           return <div className="row bg-gray p-2">
               <div className="col-12 col-md-4 col-lg-4 col-xs-4 p-2">
                   <div className="card">
                       <div className="mb-3 p-2 text-center border-bottom">
                           <h4 className="text-primary">{projet.titre}</h4>
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
                       <div className="mb-3 p-2 text-center border-bottom">
                           <Link to={"/projet/" + projet.id + "/configs"} className="btn btn-block btn-outline-secondary">paramètres <i className="fa fa-cog"></i> </Link>
                       </div>
                   </div>
               </div>
               <div className="col-12 col-md-4 col-lg-4 col-xs-4 p-2">
                   <div className="card">
                       <ul className="list-group bg-gray">
                           <li className="list-group-item list-group-item-light text-primary mb-2" style={{ fontSize: "20px;cursor:pointer" }}>
                               <i className="fa fa-user mr-1"></i> Pilote : Molou Ndoua
                            </li>
                           <li className="list-group-item list-group-item-light text-primary mb-2" style={{ fontSize: "20px;cursor:pointer" }}>
                               <i className="fa fa-clock" style={{ fontSize: "20px;cursor:pointer" }}></i> Temps restant : 40 Jours
                            </li>
                           <li className="list-group-item list-group-item-light text-primary mb-2" style={{ fontSize: "20px;cursor:pointer" }}><i className="fas fa-money-bill-alt"></i> Budget : 20000000
                            </li>
                           <li className="list-group-item list-group-item-light text-primary" style={{ fontSize: "20px;cursor:pointer" }}><i className="fas fa-arrow-up"></i> Evolution : Bonne
                            </li>
                       </ul>
                   </div>

                   <div className="card-deck mt-4">
                       <div className="card">
                           <div className="card-body">
                               <h5 className="card-title text-center border-bottom">Historique du projet</h5>
                               <ul className="list-group">
                                   <li className="list-group-item list-group-item-light text-dark bg-gray p-3">
                                       Projet  crée le  {projet.created_at}
                                   </li>
                               </ul>

                           </div>
                           <div className="card-footer">
                               <button type="button" className="btn btn-block btn-outline-secondary" id="left-panel-link">
                                   Historique complet<i className="fa fa-arrow-right"></i>
                               </button>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="col-12 col-md-4 col-lg-4 col-xs-4 p-2">
                   <div className="card-deck">
                       <div className="card">
                           <div className="card-body">
                               <h5 className="card-title text-center border-bottom">Les phases du projet</h5>
                               <ul className="list-group">
                                   {
                                       projet.phases ?  projet.phases.map(
                                           item => {
                                               return <li key={item.id} className="list-group-item list-group-item-light text-dark bg-gray p-3">
                                                           {item.titre}
                                                       </li>
                                           }
                                       ) : null
                                   }

                               </ul>

                           </div>
                           <div className="card-footer">
                               <Link to={"/projets/"+projet.id+"/phases"} type="button" className="btn btn-block btn-outline-secondary" id="left-panel-link">
                                   Liste des phases <i className="fa fa-arrow-right"></i>
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
           </div>

       }

       return null;
    }
}








const ReportComponent = props => {
    return <div class="container pb-filemng-template">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <nav class="navbar navbar-default pb-filemng-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="float-xs-left navbar-toggle collapsed treeview-toggle-btn" data-toggle="collapse" data-target="#treeview-toggle" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#options" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="fa fa-gears"></span>
                            </button>

                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#pb-filemng-navigation" aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="fa fa-share"></span>
                            </button>
                        </div>

                        <ul class="collapse navbar-collapse nav navbar-nav navbar-right" id="options">
                            <li><a href="#"><span class="fa fa-crosshairs fa-lg"></span></a></li>
                            <li><a href="#"><span class="fa fa-ellipsis-v fa-lg"></span></a></li>
                            <li><a href="#"><span class="fa fa-lg fa-server"></span></a></li>
                            <li><a href="#"><span class="fa fa-lg fa-minus"></span></a></li>
                            <li><a href="#"><span class="fa fa-lg fa-window-maximize"></span></a></li>
                            <li><a href="#"><span class="fa fa-lg fa-times"></span></a></li>
                        </ul>


                        <div class="collapse navbar-collapse" id="pb-filemng-navigation">
                            <ul class="nav navbar-nav">
                                <li><a href="#"><span class="fa fa-chevron-left fa-lg"></span></a></li>
                                <li><a href="#"><span class="fa fa-chevron-right fa-lg"></span></a></li>
                                <li class="pb-filemng-active"><a href="#"><span class="fa fa-file fa-lg"></span></a></li>
                            </ul>
                        </div>

                    </div>
                </nav>
                <div class="card ">
                    <div class="card-block pb-filemng-panel-body">
                        <div class="row">
                            <div class="col-sm-3 col-md-4 pb-filemng-template-treeview">
                                <div class="collapse navbar-collapse" id="treeview-toggle">
                                    <div id="treeview">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-9 col-md-8 pb-filemng-template-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
