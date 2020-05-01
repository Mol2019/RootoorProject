import React from 'react';
import BaseView from "./../base.view"
import { FrameClass } from '../../core/class/base.class';
import { Link } from 'react-router-dom';

export default class SinglePhaseView extends BaseView{
    UNSAFE_componentWillMount(){
        const Data = {
            data: this.props.data
        };

        const FrameObject = new FrameClass({
            data: Data,
            title: "Gestion de projet ",
            withSideBar: true,
            withHeader: true,
            pFrameComponent: PPhase
        });
        this.initFrame(FrameObject);
    }
}



class PPhase extends React.Component{
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
    render() {
        const phase = this.props.data.data.donnees;
        if (phase) {
            return <div className="row bg-gray p-2">
                <div className="col-12 col-md-4 col-lg-4 col-xs-4 p-2">
                    <div className="card">
                        <div className="mb-3 p-2 text-center border-bottom">
                            <h4 className="text-primary">{phase.titre}</h4>
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
                            <Link to={"/phases/" + phase.id + "/configs"} className="btn btn-block btn-outline-secondary">paramètres <i className="fa fa-cog"></i> </Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4 col-xs-4 p-2">
                    <div className="card">
                        <ul className="list-group bg-gray">
                            <li className="list-group-item list-group-item-light text-primary mb-2" style={{ fontSize: "20px;cursor:pointer" }}>
                                <i className="fa fa-clock" style={{ fontSize: "20px;cursor:pointer" }}></i> Temps restant : 40 Jours
                            </li>
                            <li className="list-group-item list-group-item-light text-primary mb-2" style={{ fontSize: "20px;cursor:pointer" }}><i className="fas fa-money-bill-alt"></i> Budget : {phase.budget}
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
                                        Phase  créee le  {phase.created_at}
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
                                <h5 className="card-title text-center border-bottom">Les taches de la phase</h5>
                                <ul className="list-group">
                                    {
                                        phase.taches ? phase.taches.map(
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
                                <Link to={"/phases/" + phase.id + "/taches"} type="button" className="btn btn-block btn-outline-secondary" id="left-panel-link">
                                    Liste des taches <i className="fa fa-arrow-right"></i>
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



