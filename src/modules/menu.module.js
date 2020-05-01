import { MenuClass, MenuGeneralClass } from '../core/class/elements.class';
import { BarClass } from './../core/class/elements.class';


/**
 * menu module for build menu fast
 */
export let MenuModule = (role) => loadMenu(role);

/**
 * change the Menu Role
 * @param {*} role
 */
function loadMenu(role){
    let menu = new MenuClass({
        selectedRole: "def",
        links: [],
        appName : appName
    });
    if(role){
        menu.selectedRole = role;
        menu.links = pushingMenu([], loadSideBar(role));
    }
    return menu;
}

/**
 * load a sidebar by role
 * @param {*} role
 */
function loadSideBar(role){
        return {
            General: [
                new BarClass({ isVisible: true, name: "dashboard", icon: "tachometer-alt" }),
                new BarClass({ isVisible: true, name: "profile", icon: "user" })
            ],
            Menu: [
                new BarClass({
                    isVisible: role ==="ad" ? true:false,
                    name: "gestion des comptes",
                    path: "/comptes",
                    icon: "users"
                }),
                new BarClass({
                    isVisible: role === "te" ? false : true,
                    name: "gestion des employés",
                    path: "/employes",
                    icon: "briefcase"
                }),
                new BarClass({
                    isVisible: true,
                    name: "gestion des contacts",
                    path: "/contacts",
                    icon: "phone"
                }),
                new BarClass({
                    isVisible: role === "te" ? false : true,
                    name: "gestion des projets",
                    path: "/projects",
                    icon: "project-diagram"
                }),
                new BarClass({
                    isVisible: role !== "te" ? false : true,
                    name: "gestion des taches",
                    path: "/tasks",
                    icon: "tasks"
                }),
                new BarClass({
                    isVisible: true,
                    name: "gestion des rapports",
                    path: "/tasks",
                    icon: "book"
                }),
            ]
        };
}

/**
 * push menus in table
 * @param {*} array
 * @param {*} arrayToPush
 */
function pushingMenu(array,arrayToPush){
    for (let link in arrayToPush) {
        array.push(
            new MenuGeneralClass({ titre: link, bars: arrayToPush[link]})
        )
    }
    return array;
}
