import { AppDataClass } from "../core/class/base.class";
import { Auth } from "../services/auth.service";
import { MenuModule } from './menu.module';

const currentUserVal = Auth();

/**
 * App module for load all data of current frame
 */


/**
 * load or reload app
 * @param {*} app
 */
function loadingApp(app){
    let appValue = new AppDataClass({
                        sidebar: {},
                        currentUser: currentUserVal,
                        currentComponent: null
                    });
    if(app){
        if (app.currentUserRoleSelected)
            appValue.setRole(app.currentUserRoleSelected);
        if (app.currentComponent)
            appValue.setCurrentComponent(app.currentComponent);
    }
    appValue.sidebar = MenuModule(appValue.currentUserRoleSelected);
    return appValue;
}


export let AppModule = (app) => loadingApp(app);

