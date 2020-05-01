import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css';
import './user-cards.scss';




export default class CardsBuilder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="card" className={"row p-5"}>
            {
                this.props.cardsInfo.cardData.map(
                    item => {
                        switch (this.props.cardsInfo.cardType) {
                            case "withToggle": return <CardWithToggle key={item.id} data={item} modalChange={this.props.modalChange} name={this.props.name} />;
                            case "userCards": return <UserCard key={item.id} data={item} modalChange={this.props.modalChange} name={this.props.name} />;
                            default: break;
                        }
                    }
                )
            }
        </div>;
    }
}


/**
 * cards with toggle
 * @param {*} props
 */
export function CardWithToggle(props) {
    const data = props.data ? props.data : null;
    const name = props.name ? props.name : null;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 px-2 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-9">
                            <h3 className="h6 mb-2 font-weight-bold text-uppercase text-primary">{data && data.nom ? data.nom : "Nom du compte"}</h3>
                        </div>
                        <div className="col-3 pr-5">
                            {data.etat ?
                                <input id={data.id} onClick={props.modalChange} type="checkbox" name="verrouiller" defaultChecked data-toggle="toggle" data-on="Actif" data-off="Inactif" data-size="xs" data-onstyle="success" data-offstyle="danger" />
                                :
                                <input id={data.id} onClick={props.modalChange} type="checkbox" name="deverrouiller" data-toggle="toggle" data-on="Actif" data-off="Inactif" data-size="xs" data-onstyle="success" data-offstyle="danger" />
                            }

                        </div>
                        <div className="col-12">
                            <span className="text-secondary font-weight-bold small text-uppercase">{data && data.type ? data.type : 'Type'}</span>
                        </div>
                    </div>
                    <div className="box1">
                        <img className="w-100 mt-2 mb-3" src="./assets/images/compte.jpg" />
                        <ul className="icon">
                            <li><Link to={"/" + name + "/" + data.id} className="edit"><i className="fa fa-eye"></i></Link></li>
                            <li><a name="modifier" onClick={props.modalChange} id={data.id} className="update"><i className="fas fa-edit"></i></a></li>
                            <li><a name="supprimer" onClick={props.modalChange} id={data.id} className="delete"><i name="supprimer" onClick={props.modalChange} id={data.id} className="fa fa-trash"></i></a></li>
                        </ul>
                    </div>
                    {
                        data.etat ? <Link to={"/space/" + name + "/" + data.id} className="btn btn-info btn-block mb-2">
                            <span className="mr-2">Accéder</span>
                            <i className="fa fa-forward mr-1"></i>
                        </Link>
                            :
                            <Link to="" onClick={() => { alert("Inacessible") }} className="btn btn-info btn-block mb-2">
                                <span className="mr-2">Accéder</span>
                                <i className="fa fa-forward mr-1"></i>
                            </Link>
                    }

                </div>
            </div>
        </div>
    );
}

/**
 * users card builder
 * @param {*} props
 */
/*export function UserCard(props) {
    const data = props.data ? props.data : null;
    return <div className="col-12 col-md-5 col-lg-5 m-auto bg-light">
        <div className="well well-white mini-profile-widget row">
            <div className="col-6">
                <div className="image-container">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="avatar img-responsive" alt="avatar" />
                </div>
            </div>
            <div className="col-6">
                <div className="details">
                    <h5>{data.nom + " " + data.prenoms}</h5>
                    <hr />
                    <div><h6>{data.fonction}</h6></div>
                    <div><h6>{data.email}</h6></div>
                    <div><h6>{data.telephone}</h6></div>
                </div>
            </div>
        </div>
        <Link to={"/employe/" + data.id} className="btn btn-block btn-primary">
            <i className="fa fa-eye mr-1"></i>
                        Voir profile
                </Link>
    </div>
}*/



export const UserCard = props => {
    const data = props.data ? props.data : null;
    if (data) {
        return <div className="card bg-light col-12 col-sm-6 col-md-4 col-lg-4 mx-2 mb-3 p-5">
            <div className="profile-card">
                <div className="card-header profile-card__img">
                    <img src={data.photo ? data.photo : "https://bootdey.com/img/Content/avatar/avatar7.png"}
                        alt={data.nom + " image"} className="card-img-top" />
                </div>
                <div className="card-body profile-card__cnt">
                    <div className="text-primary pt-3 profile-card__name">{data.nom + " " + data.prenoms}</div>
                    <div className="profile-card__txt"><strong> {data.fonction} </strong></div>
                </div>
                <div className="row profile-card-ctr">
                    <div className="col-6">
                        <button className="profile-card__button button--orange btn">
                            Message
                                </button>
                    </div>
                    <div className="col-6">
                        <Link to={"/employe/" + data.id} className="profile-card__button button--blue btn">
                            Profile
                                </Link>
                    </div>
                </div>
            </div>
        </div>
    }
    console.error('data are missing');
    return null;
}
