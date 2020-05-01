import { MenuClass,ModalClass } from "./elements.class";

/**
 * Frame class for build a frame
 */
export class FrameClass{
    constructor(params){
        this.pFrameComponent = params.pFrameComponent ? params.pFrameComponent : null;
        this.withSideBar = params.withSideBar ? params.withSideBar : false;
        this.withHeader = params.withHeader ? params.withHeader : false;
        this.title = params.title ? params.title : null;
        this.info = params.info ? params.info : {};
        this.withSubMenu = params.withSubMenu ? params.withSubMenu : false;
        if (this.withSideBar) {
            this.sideBarData = params.sideBarData ? params.sideBarData : new MenuClass({selectedRole:'deb',appName:appName,links:[]});
            if (!this.sideBarData)
                console.error('use choose frame with sidebar but side bar data are not provided');
        }
        if (!this.pFrameComponent){
            this.action = params.action ? params.action : null;
            if(this.action) {
                if (this.action === "formFetch") this.withHeader = false;
                this.title = params.title ? params.title : null;
                if(!this.title){
                    console.error("title is required")
                }else{
                    this.data = params.data ? params.data : null;
                }
            } else {
                console.error("action is needed for build frame")
            }
        }else{
            this.data = params.data ? params.data : null;
        }
        if(this.withSubMenu){
            this.subMenuData = params.subMenuData ? params.subMenuData : null;
            this.otherData = params.otherData ? params.otherData : null;
            this.changeComponent = params.changeComponent ? params.changeComponent : null;
        }
    }
}


/**
 * Frame data class
 */
export class FrameDataClass{
    constructor(params) {
        this.name = params.name ? params.name : "";
        this.fetchingData = params.fetchingData;
        this.FormData = params.FormData ? params.FormData : null;
        this.formInModal = params.formInModal ? params.formInModal : false;
        this.hasModal = params.hasModal ? params.hasModal : false;
        if (this.formInModal) {
            this.hasModal = true;
        }
        if (this.hasModal) {
            this.modalData = params.modalData ? params.modalData : null;
            this.onChangeModalTemplate = params.onChangeModalTemplate ? params.onChangeModalTemplate : null;
            if (this.formInModal) {
                this.modalData.mData.fields = this.FormData;
                if (!this.modalData.mData.fields) console.error('form data are need for  this kind of modal');
            }
            if (!this.modalData) console.error('modal data are not provided');
        }

    }
}

/**
 * @class app data for get the app data for frame
 */
export class AppDataClass {
    constructor(params) {
        if (params.currentUser) {
            if (params.currentUser.currentUserValue.isLoggedIn && params.currentUser.currentUserValue.token) {
                this.sidebar = params.sidebar;
                if (!this.sidebar) console.error("sidebar must be provided");
                this.connectedMode = true;
                this.currentUser = params.currentUser;
                this.currentUserRoleSelected = params.currentUserRoleSelected ?
                    params.currentUserRoleSelected : this.getDefaultRole();
                this.currentComponent = params.currentComponent ? params.currentComponent : null;
            } else {
                console.error("the user params are not valid please check it");
            }
        } else {
            console.error("no user found");
        }
    }

    /**
     * APP mode
     * @param {*} mode
     */
    setMode(mode) {
        if (mode) this.connectedMode = mode;
    }

    /**
     * get default role
     * @return {*} role
     */
    getDefaultRole() {
        if (this.currentUser) {
            if (this.currentUser.checkRole("ad")) {
                return "ad";
            }
            if (this.currentUser.checkRole("pm")) {
                return "pm";
            }
            if (this.currentUser.checkRole("te")) {
                return "te";

            }
        }
        return null;
    }

    /**
     * Set the current role selected
     * @param {*} role
     */
    setRole(role){
        if(role === "ad" || "pm" || "te"){
            this.currentUserRoleSelected = role;
        }
    }

    /**
     * get the current component
     */
    getCurrentComponent(){
        return this.currentComponent;
    }

    /**
     * set the current component
     * @param {*} component
     */
    setCurrentComponent(component){
        if (component) this.currentComponent = component;
    }

}

/**
 * List frame
 */
export class FetchingListClass {
    constructor(params) {
        this.typeList = params.typeList ? params.typeList : "table";
        if (this.typeList) {
            switch (params.typeList) {
                case "table":
                    this.tableInformation = params.tableInformation ? params.tableInformation : null;
                    if (!this.tableInformation) console.log("table information missed")
                    break;
                case "card":
                    this.cardsInformation = params.cardsInformation ? params.cardsInformation : null;
                    if (!this.cardsInformation) console.error("cards information are missing");
                    break;
                default: console.error("type given is not valid"); break;
            }
        } else {
            console.error("type of fetch must be provided");
        }
    }
}



/**
 * Fetch the data
 */
export class FetchingDataClass {
    constructor(params) {
        this.pFetchingData = params.pFetchingData ? params.pFetchingData : null;
        if (!this.pFetchingData) {
            this.type = params.type;
            switch (params.type) {
                case "list": this.pListFrameComponent = params.pListFrameComponent ? params.pListFrameComponent : null;
                    this.pFilterList = params.pFilterList ? params.pFilterList : null;

                    if (!this.pListFrameComponent) {
                        this.listData = params.listData ? params.listData : null;
                        if (!this.listData) {
                            console.error("type data must be provided")
                        }
                    } else {
                        this.arrayData = params.arrayData ? params.arrayData : null;
                        this.otherAction = params.otherAction ? params.otherAction : null ;
                    }
                    break;
                case "single": this.pSingleDataFrameComponent = params.pSingleDataFrameComponent ? params.pSingleDataFrameComponent : null;
                    this.singleton = params.singleton ? params.singleton : null;
                if (!this.pSingleDataFrameComponent) {
                        this.singleton = params.singleton ? params.singleton : null;
                        if (!this.singleton) console.log("single data not provided")
                    }
                    break;
                case "form": break;
                default: console.log("type you provide is not valid"); break;
            }
        }
    }
}
