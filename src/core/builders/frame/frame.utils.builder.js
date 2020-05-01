/**
 * class for frame utilities build
 * @param {*} all
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FormBuilder } from './../form/form.builder';
import { filterData, strUcFirst } from './../../utils/utils.functions';
import CardsBuilder from './../card/card.builder';
import TableBuilder from './../table/table.builder';


/**
 * Header of frame
 * @param {*} props
 */
export const FrameHeaderBuilder = props => {
    let titre = "";
    switch (props.data.action) {
        case 'formFetch': titre = props.data.titre ?
            props.data.titre :
            "Formulaire de " + props.data.titre;
            break;

        case 'listDataFetch': titre = props.data.titre ? props.data.titre : "Liste des " + props.data.name + 's';
            break;
        case 'singleDataFetch': titre = props.data.titre ? props.data.titre : "Informations sur " + props.data.name + '#' + props.data.dataId;
            break;
    }

    return <div className="blue-gradient p-3 mx-4 my-4 d-flex justify-content-between align-items-center text-light">
        <div>
            <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2 text-white">
                <i className="fa fa-th-large mt-0"></i>
            </button>
            <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2 text-white">
                <i className="fa fa-columns mt-0"></i>
            </button>
        </div>

        <a className="text-light mx-2">
            <h5 className="fetcher-header">
                {titre}
            </h5>
        </a>

        {
            props.data.action === "formFetch" ?
                <div>
                    <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2 text-white">
                        <i className="fa fa-th-large mt-0"></i>
                    </button>
                    <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2 text-white">
                        <i className="fa fa-columns mt-0"></i>
                    </button>
                </div> :
                <div>
                    {
                        props.data.action === "listDataFetch" ?
                            <button onClick={props.data.modalChange} type="button" name="nouveau" className="btn btn-outline-white text-light btn-rounded btn-sm px-2 mr-3 new">
                                <i className="fa fa-plus mt-0 mr-2"></i>
                                        nouveau
                                </button>
                            :
                            <Link className="btn btn-outline-white text-light btn-rounded btn-sm px-2 mr-3" to={"/" + props.data.name + 's'}>
                                <i className="fa fa-arrow-circle-left mt-0 mr-2"></i>
                                        Liste
                            </Link>
                    }

                </div>
        }
    </div>
}

export const DefaultFormBuilderFetch = props => {
    return <FormBuilder formObject={props.infos.FormData} />
}

export const FrameHeaderModeAndTitle = props => {
    if(props.data.actions){
        let titre = '';
        if (props.data.actions.info){
            switch (props.data.actions.info.currentUserRoleSelected) {
                case 'ad': titre = 'Administrateur'; break;
                case 'pm': titre = 'Chef de projet'; break;
                case 'te': titre = 'Employé standard'; break;
                default: titre = ''; break;
            }
            return <nav className="navbar nav-epm justify-content-between">
                        <h3>
                    <a className="navbar-brand text-light text-bold p-2">{props.data.title}</a>
                        </h3>
                        <div className="m-auto">
                            <span className="text-light mr-1">Connecté en mode : </span>
                            <a className="text-muted btn-nav p-1 px-3 py-2">{titre}</a>
                        </div>
                        <div className="form-inline">
                            <label className="label-control text-light p-2" htmlFor="mode">Changer de mode : </label>
                            <select onChange={props.data.actions.onChangeFrameRole} id="mode" className="form-control custom-select mr-sm-2">
                                <option className="text-muted" value="">Selectionner un mode</option>
                                {
                                    props.data.actions.info.currentUser.checkRole("ad") ? <option value="ad">Administrateur</option> : null
                                }
                                {
                                    props.data.actions.info.currentUser.checkRole("pm") ? <option value="pm">Chef de projet</option> : null
                                }
                                {
                                    props.data.actions.info.currentUser.checkRole("te") ? <option value="te">Employé Standard</option> : null
                                }
                            </select>
                            <button onClick={(e) =>
                                    { props.data.actions.changeFrameTemplate(e, props.data.actions.info.currentComponent)}}
                                    className="btn btn-light my-2 my-sm-0" type="submit">
                                    OK
                            </button>
                        </div>
                    </nav>
        }
        return null;
    }
    console.error("building false");
    return null;
}


export class DefaultListBuilderFetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donnees: this.props.infos.fetchingData.listData ? this.props.infos.fetchingData.listData : this.props.infos.fetchingData,
            name: this.props.infos.name,
            filteredData: []
        }
        this.handleChange = this.handleChange.bind(this);
    }


    async UNSAFE_componentWillMount() {
        this.setState({
            filteredData: this.state.donnees
        });
    }


    handleChange(e) {
        let filteredData = this.state.donnees;
        if (!this.props.infos.fetchingData.pListFrameComponent) {
            switch (this.state.donnees.typeList) {
                case "table": let data = filterData(e.target.value, e.target.name, this.state.donnees.tableInformation.tds);
                    this.setState(() => ({
                        filteredData: {
                            ...this.state.donnees,
                            tableInformation: {
                                ...this.state.donnees.tableInformation,
                                tds: data
                            }
                        }
                    }));
                    break;
                case "card": let data2 = filterData(e.target.value, e.target.name, this.state.donnees.cardsInformation.cardData);
                    this.setState(() => ({
                        filteredData: {
                            ...this.state.donnees,
                            cardsInformation: {
                                ...this.state.donnees.cardsInformation,
                                cardData: data2
                            }
                        }
                    }));
                    break;
                default: console.error('type not define'); break;
            }
        } else {
            let data2 = filterData(e.target.value, e.target.name, this.state.donnees.arrayData.tableData);
            this.setState(() => ({
                filteredData : {
                    ...this.state.donnees,
                    arrayData : {
                        ...this.state.donnees.arrayData,
                        tableData : data2
                    }
                }
            }));
        }


    }

    render() {
        const GoodListFetcher = () => {
            switch (this.state.donnees.typeList) {
                case "table": return this.state.filteredData.tableInformation.tds.length <= 0 ?
                    <EmptyDataFrameBuilder /> :
                    <TableBuilder modalChange={this.props.infos.onChangeModalTemplate} name={this.state.name} tableInfo={this.state.filteredData.tableInformation} />;
                case "card": return this.state.filteredData.cardsInformation.cardData.length <= 0 ?
                    <EmptyDataFrameBuilder /> :
                    <CardsBuilder modalChange={this.props.infos.onChangeModalTemplate} name={this.state.name} cardsInfo={this.state.filteredData.cardsInformation} />;

                default: console.error("data Type not define you can choose personal dataFetcher"); break;
            }
        }

        const PFilterList = this.props.infos.fetchingData.pFilterList ? this.props.infos.fetchingData.pFilterList : null;

        const PListFrameComponent = this.props.infos.fetchingData.pListFrameComponent ? this.props.infos.fetchingData.pListFrameComponent : null;
        return <div className="table-data">
            {<SearchFrameBuilder name={this.state.name} soc={PFilterList} handleChange={this.handleChange} />}
            {
                PListFrameComponent ?
                    this.state.donnees.arrayData.tableData.length > 0 ?
                        <PListFrameComponent otherAction={this.props.infos.fetchingData.otherAction} modalChange={this.props.infos.onChangeModalTemplate} data={this.state.filteredData.arrayData} /> :
                        <EmptyDataFrameBuilder />
                    : <GoodListFetcher />
            }
        </div>;
    }

}

/**
 * Search data
 * @param {*} props
 */
export function SearchFrameBuilder(props) {
    const name = props.name ? props.name : "";
    const SearchOtherComponent = props.soc ? props.soc : null;
    return (
        <div className="search col-md-12 col-lg-12 pr-0 mx-2 mb-4">
            {
                SearchOtherComponent ?
                    <SearchOtherComponent handleChange={props.handleChange} />
                    :
                    <div className="col-md-11 m-auto mx-0">
                        <input type="search" name="global" placeholder={"Rechercher " + name} onChange={props.handleChange} className="form-control" />
                    </div>
            }

        </div>
    );
}

/**
 *@FetchASingle data frame
 */
export class DefaultFetchSingleDataBuilder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const PSingleDataFrameComponent = this.props.infos.fetchingData.pSingleDataFrameComponent ?
            this.props.infos.fetchingData.pSingleDataFrameComponent : null;

        return PSingleDataFrameComponent ? <PSingleDataFrameComponent modalChange={this.props.infos.onChangeModalTemplate} data={this.props.infos.fetchingData.singleton} /> :
            <DefaultSingleDataComponent modalChange={this.props.infos.onChangeModalTemplate} data={this.props.infos.fetchingData.singleton} />

    }

}

export function DefaultSingleDataComponent(props) {
    return <div className="container personal-frame">
        <div className="row">
            <div className="col-md-3 personal-frame-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                <h3>{appName}</h3>
                <p>Votre outil de gestion de projet</p>
            </div>
            <div className="col-12 col-md-9 col-lg-9 p-2 personal-frame-right">
                <div className="tab-content" id="myTabContent">
                    <div className="row personal-frame-data">
                        <DataFetching data={props.data} />
                        <div className="col-md-6">
                            <DefaultActionBtnFrame modalChange={props.modalChange} dataId={props.data.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export function DefaultActionBtnFrame(props) {
    const id = props.dataId ? props.dataId : null;
    return <div className="form-group row">
        <button id={id} name="modifier" className="btnEdit btn btn-success mr-1 col-5" onClick={props.modalChange}>
            Modifier <i className="fas fa-edit"></i>
        </button>
        <button id={id} name="supprimer" className="btnEdit btn btn-danger col-5" onClick={props.modalChange}>
            Supprimer <i className="fa fa-trash"></i>
        </button>
    </div>
}

export function DataFetching(props) {
    const data = props.data ? props.data : null;
    let donnees = [];
    for (let item in data) {
        donnees.push({ titre: item, donnee: data[item] });
    }

    return donnees.map(
        item => {
            if (item.titre === "created_at" || item.titre === "updated_at" || item.titre === "deleted_at" || item.titre === "id") {
                return null;
            } else {
                return <div key={item.titre} className="col-6 text-dark pt-2">
                    <span className="">
                        <h5 className="text-bold">{strUcFirst(item.titre)} : </h5>
                        {item.titre === "etat" ? item.donnee ? "actif" : "inactif" : item.donnee}
                    </span>
                </div>
            }
        }
    )
}

/**
 * Fetch if there are no data in tableData
 */
export function EmptyDataFrameBuilder() {
    return (
        <div className="container empty border-top">
            <div className="row text-center">
                <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-2 error-main">
                    <div className="row">
                        <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                            <h5 className="m-0 mt-5 pt-5 mb-5 pb-5">Aucune donnée disponible !!!</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


