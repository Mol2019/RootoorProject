import React from 'react';
import BaseView from './../base.view';
import { FrameClass } from './../../core/class/base.class';


export default class ProfileView extends BaseView{
    UNSAFE_componentWillMount(){
        const FrameObject = new FrameClass({
            title: "Profile",
            withSideBar: true,
            withHeader: true,
            pFrameComponent: PProfileView,
        });
        this.initFrame(FrameObject);
    }
}

function PProfileView(props){
    return <div className="row">
        <div className="col-md-4 col-lg-4">
            <div className="profile-card-4 z-depth-3">
                <div className="card">
                    <div className="card-body text-center bg-primary rounded-top">
                        <div className="user-box">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                        </div>
                        <h5 className="mb-1 text-white">Jhon Doe</h5>
                        <h6 className="text-light">UI/UX Engineer</h6>
                    </div>
                    <div className="card-body">
                        <ul className="list-group shadow-none">
                            <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-phone-square"></i>
                                </div>
                                <div className="list-details">
                                    <span>9910XXXXXX</span>
                                    <small>Numéro de téléphone</small>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="list-details">
                                    <span>info@example.com</span>
                                    <small>Addresse email</small>
                                </div>
                            </li>
                        </ul>
                        <div className="row text-center mt-4">
                            <div className="col p-2">
                                <h4 className="mb-1 line-height-5">154</h4>
                                <small className="mb-0 font-weight-bold">Projets</small>
                            </div>
                            <div className="col p-2">
                                <h4 className="mb-1 line-height-5">2.2k</h4>
                                <small className="mb-0 font-weight-bold">Taches</small>
                            </div>
                            <div className="col p-2">
                                <h4 className="mb-1 line-height-5">2 ans</h4>
                                <small className="mb-0 font-weight-bold">expériences</small>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <h5 className="btn-social waves-effect text-primary text-italic waves-light m-1">
                            Epm
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-8 col-lg-8">
            <div className="card z-depth-3">
                <div className="card-body">
                    <ul className="nav nav-pills nav-pills-primary nav-justified">
                        <li className="nav-item">
                            <a href="javascript:void();" data-target="#profile" data-toggle="pill" className="nav-link active show"><i className="icon-user"></i> <span className="hidden-xs">Activités</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="javascript:void();" data-target="#messages" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Messages</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="javascript:void();" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Editer</span></a>
                        </li>
                    </ul>
                    <div className="tab-content p-3">
                        <div className="tab-pane active show" id="profile">
                               <div className="col-md-12">
                                    <h5 className="mt-2 mb-3"><span className="fa fa-clock-o ion-clock float-right"></span>Activités récentes</h5>
                                    <table className="table table-hover table-striped">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>Abby</strong> joined ACME Project Team in <strong>'Collaboration'</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Gary</strong> deleted My Board1 in <strong>'Discussions'</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                        <div className="tab-pane" id="messages">
                            <div className="alert alert-info alert-dismissible" role="alert">
                                <button type="button" className="close" data-dismiss="alert">×</button>
                                <div className="alert-icon">
                                    <i className="icon-info"></i>
                                </div>
                                <div className="alert-message">
                                    <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                                </div>
                            </div>
                            <table className="table table-hover table-striped">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the..
                                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="float-right font-weight-bold">Yesterday</span> There has been a request on your account since that was..
                                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                                                </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                                                </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane" id="edit">
                            <form>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">First name</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" value="Mark" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" value="Jhonsan" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="email" value="mark@example.com" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Change profile</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="file" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Website</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="url" value="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" value="" placeholder="Street" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label"></label>
                                    <div className="col-lg-6">
                                        <input className="form-control" type="text" value="" placeholder="City" />
                                    </div>
                                    <div className="col-lg-3">
                                        <input className="form-control" type="text" value="" placeholder="State" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Username</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="text" value="jhonsanmark" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                    <div className="col-lg-9">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label"></label>
                                    <div className="col-lg-9">
                                        <input type="reset" className="btn btn-secondary" value="Cancel" />
                                        <input type="button" className="btn btn-primary" value="Save Changes" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
