import React from 'react';
import { NavLink } from 'react-router-dom';
//import ContactListComponent from './../../../../components/app/pages/contact/contact.list.component';

/**
 * Menus builder
 * @param {*} props
 */
export function MenusBuilder(props) {
    const menus = props.menus;
    return menus.map(
        item => {
            return <MenuBuilder key={item.key} menu={item} />;
        }
    )
}


/**
 * Menu builder
 * @param {*} props
 */
export function MenuBuilder(props) {
    const menu = props.menu;
    return (
        <div>
            <li className="header-menu">
                <span>{menu.titre}</span>
            </li>
            <LinksMenu links={menu.bars} />
        </div>
    );
}

function LinksMenu(props) {
    const links = props.links;
    return links.map(
        item => {
            if (item.isVisible){
                return (
                    item.isDropdown ?
                        <LinkWithSubMenu key={item.key} link={item} />
                        : <SimpleLink key={item.key} link={item} />
                )
            }
            return null;
        }
    )
}

function LinkWithSubMenu(props) {
    const link = props.link;

    return <li className="sidebar-dropdown">
        <a href="#">
            <i className={"fa fa-" + link.icon}></i>
            {link.titre}
        </a>
        <div className="sidebar-submenu">
            <SubMenuBuilder data={link.subMenuData} />
        </div>
    </li>
}

function SimpleLink(props) {
    return <LinkBuilder link={props.link} />;
}

function SubMenuBuilder(props) {
    return (
        <UlBuilder data={props.data} />
    );
}

function UlBuilder(props) {
    const donnees = props.data;
    return <ul>
        <LinksBuilder links={donnees} />
    </ul>
}

function LinksBuilder(props) {
    const links = props.links;
    return links.map(
        item => {
            return <LinkBuilder key={item.key} link={item} />
        }
    )
}

function LinkBuilder(props) {
    const link = props.link;
    return (
        <li>
            <NavLink to={link.path}>
                <i className={"fa fa-" + link.icon}></i>
                <span>{link.titre}</span>
            </NavLink>
        </li>
    );
}


export const BoxSubMenu = (props) => {
    return <div className="box ">
            <div className="box-content">
                <div className="btn-group-box">
                    {
                    props.subData.map(
                        item => {
                            return <button key={item.key} onClick={(e => { props.changeSubComponent(e, item.component) })} className="btn">
                                {item.titre}
                            </button>
                        }
                    )
                }
        </div>
    </div>
    </div>
}
