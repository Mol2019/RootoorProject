import React from 'react';
import BaseView from "../base.view";
import { FrameClass } from '../../core/class/base.class';
import { AdminDashboardComponent, TeDashboardComponent } from '../../components/app/pages/dashboard/dashboard.component';
import { PmDashboardComponent } from './../../components/app/pages/dashboard/dashboard.component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification,{store} from 'react-notifications-component';

export class DashboardView extends BaseView{
    async UNSAFE_componentWillMount(){
        let cmp = DashboardComponent;
        setTimeout(()=>{
            if (this.props.data.frameAction.info.currentUserRoleSelected === "ad"){
                cmp = AdminDashboardComponent;
            }
            if (this.props.data.frameAction.info.currentUserRoleSelected === "pm") {
                cmp = PmDashboardComponent
            }
            if (this.props.data.frameAction.info.currentUserRoleSelected === "te") {
                cmp = TeDashboardComponent
            }
            this.reloadFrameObject('pFrameComponent',cmp);
        });

        const FrameObject = new FrameClass({
            title: "Tableau de controle",
            withSideBar : true,
            withHeader: true,
            pFrameComponent : cmp,
        });
        this.initFrame(FrameObject);
    }

}

const DashboardComponent = () => (<p></p>)
/**
 * The admin employee dashboard view
 */
export class AdminDashboardView extends React.Component{

    componentDidMount(){
        store.addNotification({
            title: "Admin space !",
            message: "welcome to you mr",
            type: "info",
            insert: "bottom",
            container: "bottom-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    render(){
        return <div className="ad-dash">
                <ReactNotification/>
            <div className="row">
                <div className="col-8">
                    <div className="container text-primary">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-blue">
                                    <div className="inner">
                                        <h3> 13436 </h3>
                                        <p> Les projets </p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-project-diagram text-primary" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box">
                                    <div className="inner">
                                        <h3> ₹185358 </h3>
                                        <p> Les employés </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-briefcase" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-orange">
                                    <div className="inner">
                                        <h3> 5464 </h3>
                                        <p> Les contacts </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                                Récents projets

                            <button className="btn btn-outline-primary btn-xs col-2 offset-6">
                                Tous Lister
                            </button>
                        </h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="progress-title">HTML5</h3>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="progress red">
                                                <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{ width: "65%" }}>
                                                    <div className="progress-value">65%</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 pb-2">
                                            <button className="btn btn-primary btn-xs"> voir </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark mr-2 text-bold"></i>
                             Molou Kouadio
                        </h5>
                        <div className="card-body text-center" id="tmpH">
                            <span id='horloge' style={{ backgroundColor:"#1C1C1C",color:"silver",fontSize:"40px" }}>
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header mr-2">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                           Activités récentes
                       </h5>
                        <div className="list list-row card-body bg-light">
                            <div className="list-item card">
                                <div><a href="#"><span className="w-40 avatar gd-primary">EPM</span></a></div>
                                <div className="flex"> <a href="#" className="item-author text-bold text-color">connexion</a>
                                    <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                </div>
                                <div className="no-wrap">
                                    <div className="item-date text-muted text-sm d-none d-md-block">3 weeks ago</div>
                                </div>
                                <div>
                                    <div className="item-action dropdown"> <a href="#" data-toggle="dropdown" className="text-muted">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg> </a>
                                        <div className="dropdown-menu dropdown-menu-right bg-black" role="menu"> <a className="dropdown-item" href="#">See detail </a><a className="dropdown-item download" data-abc="true">Download </a><a className="dropdown-item edit" data-abc="true">Edit</a>
                                            <div className="dropdown-divider"></div> <a className="dropdown-item trash">Delete item</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

/**
 * The project manager employee dashboard view
 */
export class PmDashboardView extends React.Component{
    componentDidMount(){
        store.addNotification({
            title: "Admin space !",
            message: "welcome to you mr",
            type: "info",
            insert: "bottom",
            container: "bottom-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    render(){
        return <div className="ad-dash">
                <ReactNotification/>
            <div className="row">
                <div className="col-8">
                    <div className="container text-primary">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-blue">
                                    <div className="inner">
                                        <h3> 13436 </h3>
                                        <p> Les projets </p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-project-diagram text-primary" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box">
                                    <div className="inner">
                                        <h3> ₹185358 </h3>
                                        <p> Les collaborateurs </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-briefcase" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-orange">
                                    <div className="inner">
                                        <h3> 5464 </h3>
                                        <p> Les contacts </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                                Vos projets

                            <button className="btn btn-outline-primary btn-xs col-2 offset-7">
                                Tous Lister
                            </button>
                        </h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="progress-title">HTML5</h3>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="progress red">
                                                <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{ width: "65%" }}>
                                                    <div className="progress-value">65%</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 pb-2">
                                            <button className="btn btn-primary btn-xs"> voir </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark mr-2 text-dark text-bold"></i>
                             Molou Kouadio
                        </h5>
                        <div className="card-body text-center" id="tmpH">
                            <span id='horloge' style={{ backgroundColor:"#1C1C1C",color:"silver",fontSize:"40px" }}>
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark mr-2 text-dark text-bold"></i>
                           Activités récentes
                       </h5>
                        <div className="list list-row card-body bg-light">
                            <div className="list-item card">
                                <div><a href="#"><span className="w-40 avatar gd-primary">EPM</span></a></div>
                                <div className="flex"> <a href="#" className="item-author text-bold text-color">connexion</a>
                                    <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                </div>
                                <div className="no-wrap">
                                    <div className="item-date text-muted text-sm d-none d-md-block">3 weeks ago</div>
                                </div>
                                <div>
                                    <div className="item-action dropdown"> <a href="#" data-toggle="dropdown" className="text-muted">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg> </a>
                                        <div className="dropdown-menu dropdown-menu-right bg-black" role="menu"> <a className="dropdown-item" href="#">See detail </a><a className="dropdown-item download" data-abc="true">Download </a><a className="dropdown-item edit" data-abc="true">Edit</a>
                                            <div className="dropdown-divider"></div> <a className="dropdown-item trash">Delete item</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

/**
 * The Std employee dashboard view
 */
export class TeDashboardView extends React.Component {
    componentDidMount() {
        store.addNotification({
            title: "Admin space !",
            message: "welcome to you mr",
            type: "info",
            insert: "bottom",
            container: "bottom-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    render() {
        return <div className="ad-dash">
            <ReactNotification />
            <div className="row">
                <div className="col-8">
                    <div className="container text-primary">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-blue">
                                    <div className="inner">
                                        <h3> 13436 </h3>
                                        <p> Les taches </p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-project-diagram text-primary" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box">
                                    <div className="inner">
                                        <h3> ₹185358 </h3>
                                        <p> Les rapports </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-book" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="card-box bg-orange">
                                    <div className="inner">
                                        <h3> 5464 </h3>
                                        <p> Les contacts </p>
                                    </div>
                                    <div className="icon text-primary">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                    </div>
                                    <a href="#" className="card-box-footer">Voir <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                                Vos taches

                            <button className="btn btn-outline-primary btn-xs col-2 offset-7">
                                Tous Lister
                            </button>
                        </h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="progress-title">HTML5</h3>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="progress red">
                                                <div className="progress-bar progress-bar-danger progress-bar-striped active" style={{ width: "65%" }}>
                                                    <div className="progress-value">65%</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 pb-2">
                                            <button className="btn btn-primary btn-xs"> voir </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-2">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                             Molou Kouadio
                        </h5>
                        <div className="card-body text-center" id="tmpH">
                            <span id='horloge' style={{ backgroundColor: "#1C1C1C", color: "silver", fontSize: "40px" }}>
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <h5 className="card-header">
                            <i className="fa fa-bookmark text-dark text-bold mr-2"></i>
                           Activités récentes
                       </h5>
                        <div className="list list-row card-body bg-light">
                            <div className="list-item card">
                                <div><a href="#"><span className="w-40 avatar gd-primary">EPM</span></a></div>
                                <div className="flex"> <a href="#" className="item-author text-bold text-color">connexion</a>
                                    <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                </div>
                                <div className="no-wrap">
                                    <div className="item-date text-muted text-sm d-none d-md-block">3 weeks ago</div>
                                </div>
                                <div>
                                    <div className="item-action dropdown"> <a href="#" data-toggle="dropdown" className="text-muted">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="12" cy="5" r="1"></circle>
                                            <circle cx="12" cy="19" r="1"></circle>
                                        </svg> </a>
                                        <div className="dropdown-menu dropdown-menu-right bg-black" role="menu"> <a className="dropdown-item" href="#">See detail </a><a className="dropdown-item download" data-abc="true">Download </a><a className="dropdown-item edit" data-abc="true">Edit</a>
                                            <div className="dropdown-divider"></div> <a className="dropdown-item trash">Delete item</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


