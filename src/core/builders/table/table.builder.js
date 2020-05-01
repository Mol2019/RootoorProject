import React from 'react';
import { Link } from 'react-router-dom';
import { strUcFirst, generateKey } from '../../utils/utils.functions';

export default class TableBuilder extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            information: this.props.tableInfo ? this.props.tableInfo : null,
            pActionBtnComponent: this.props.tableInfo.pActionBtnComponent ? this.props.tableInfo.pActionBtnComponent : null,
            name: this.props.name ? this.props.name : null
        }
    }

    render() {
        return <table className="table m-auto table-responsive-sm table-responsive-md table-bordered table-hover">
            <TableThBuilder ths={this.state.information.ths} />
            <TableRowBuilder modalChange={this.props.modalChange} pActionBtnComponent={this.state.pActionBtnComponent} name={this.state.name} tds={this.state.information.tds} ths={this.state.information.ths} />
        </table>
    }
}


/**
 * Build table header
 * @param {*} props
 */
function TableThBuilder(props) {
    const ths = props.ths ? props.ths : null;
    if (ths) {
        return (
            <thead className="thead-dark">
                <tr>
                    {
                        ths.map(
                            item => {
                                return item === "id" ? <th scope="col" key={item}>#</th> : <th scope="col" key={item}>{strUcFirst(item)}</th>
                            }
                        )
                    }
                    <th></th>
                </tr>
            </thead>
        );
    }
    return null;
}


function TableRowBuilder(props) {
    const tds = props.tds ? props.tds : null;
    if (tds) {
        return <tbody>
            <TrBuilder modalChange={props.modalChange} pActionBtnComponent={props.pActionBtnComponent} name={props.name} donnees={tds} headers={props.ths} />
        </tbody>
    }
    return null;
}


function TrBuilder(props) {
    const donnees = props.donnees ? props.donnees : null;
    const headers = props.headers ? props.headers : null;
    const name = props.name ? props.name : null;
    const Actions = props.pActionBtnComponent ? props.pActionBtnComponent : DefaultAction;
    if (donnees) {
        return donnees.map(
            item => {
                return <tr key={generateKey()}>
                    <TdBuilder titles={headers} donnee={item} />
                    <Actions modalChange={props.modalChange} name={name} dataId={item.id} />
                </tr>
            }
        );


    }
    return null;
}

function DefaultAction(props) {
    const name = props.name ? props.name + "s" : null;
    const dataId = props.dataId;
    return <td>
        <Link to={"/" + name + '/' + dataId} className="btn btn-primary"><i className="far fa-eye"> voir</i></Link>
        <button name="modifier" id={dataId} onClick={props.modalChange} type="button" className="btn btn-success"><i className="fas fa-edit"></i>Modifier</button>
        <button name="supprimer" id={dataId} onClick={props.modalChange} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i> Supprimer</button>
    </td>;

}

function TdBuilder(props) {
    const donnee = props.donnee ? props.donnee : null;
    const titles = props.titles;
    if (donnee) {
        return titles.map(
            item => {
                return item === "id" ? <th scope="row" key={generateKey()}>{donnee[item]}</th> : <td key={generateKey()}>{donnee[item]}</td>;
            }
        );
    }
    return null;
}
