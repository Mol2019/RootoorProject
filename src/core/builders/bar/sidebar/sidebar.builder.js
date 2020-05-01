import React from 'react';
import { MenusBuilder } from './../menu/menu.builder';

/**
 * Side bar builder
 * @param {*} props
 */
export const SidebarBuilder = props =>{
    let side = props.sb;
    let sb = {
        name : "",
        links : []
    }

    if (side.sbObject){
        sb.name = side.sbObject.appName;
        sb.links = side.sbObject.menus;
    }
    if (side.links){
       sb.name = side.appName;
       sb.links = side.links;
    }

     return <nav id="sidebar" className="sidebar-wrapper">
                    <SidebarBrand appName={sb.name} />
                    <SidebarHeader />
                    <SidebarBody donnees={sb.links} />
                    <SidebarFooter />
             </nav>
}

/**
 * The sidebar header
 * @param {*} props
 */
export const SidebarHeader = props =>(
    <div className="sidebar-header">
        <div className="user-pic col-4">
            <img className="img-responsive img-rounded" src={"https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"}
                alt="User picture" />
        </div>
        <div className="user-info col-7 pt-1 text-center">
            <span className="user-name">
                {"Kouadio "}
                <strong>{"Molou"}</strong>
            </span>
            <span className="user-role">{"administareur"}</span>
        </div>
    </div>
);

/**
 *brand side
 */
const  SidebarBrand = (props) => {
    const appName = props.appName;
    return <div className="sidebar-brand">
                <a href="#">{appName}</a>
                <div id="close-sidebar">
                    <i className="fa fa-bars"></i>
                </div>
            </div>;

}

/**
 * Menu in sidebar
 * @param {*} props
 */
function SidebarBody(props) {
    const donnees = props.donnees;
    return (
        <div className="sidebar-menu">
            <ul>
                <MenusBuilder menus={donnees} />
            </ul>
        </div>
    );
}


const SidebarFooter  = props => (
    <div className="sidebar-footer">
        <a href="#">
            <i className="fa fa-bell"></i>
            <span className="badge badge-pill badge-warning notification">3</span>
        </a>
        <a href="#">
            <i className="fa fa-envelope"></i>
            <span className="badge badge-pill badge-success notification">7</span>
        </a>
        <a href="#">
            <i className="fa fa-cog"></i>
            <span className="badge-sonar"></span>
        </a>
        <a href="#">
            <i className="fa fa-power-off"></i>
        </a>
    </div>
);
