import { strUcFirst, generateKey } from "../utils/utils.functions";

/**
 * modal class for a base modal
 */
export class ModalClass {
    constructor(params) {
        this.modalInfo = params.modalInfo ? params.modalInfo : null;
        this.mData = params.mData ? params.mData : null;
        if(this.mData){
            this.mData.pModalComponent = params.mData.pModalComponent ? params.mData.pModalComponent : null;
            this.mData.dataId = params.mData.dataId ? params.mData.dataId : null;
            if (!this.mData.pModalComponent) {
                this.mData.action = params.mData.action ? params.mData.action : null;
                if (!this.mData.action) {
                    console.error("action is missing for your modal please specify it")
                } else {
                    this.mData.name = params.mData.name ? params.mData.name : null;
                    if (!this.mData.name) console.error("name is missing")
                    this.mData.type = params.mData.type ? params.mData.type :"confirmModal";
                    switch (this.mData.action) {
                        case "add":
                            this.mData.type = "withForm";
                            this.mData.titre = params.mData.titre ? params.mData.titre : "Ajout de " + this.mData.name;
                            this.mData.fields = params.mData.fields ? params.mData.fields : null;
                            break;
                        case "lock":
                            this.mData.titre = "Verrouillage de " + this.mData.name + " #" + this.mData.dataId;
                            this.mData.textModal = "Souhaitez vous réellement verrouiller ceci ?";
                            break;
                        case "unlock":
                            this.mData.titre = "Déverrouillage de " + this.mData.name + " #" + this.mData.dataId;
                            this.mData.textModal = "Souhaitez vous réellement déverrouiller ceci ?";
                            break;
                        case 'edit':
                            this.mData.type = "withForm";
                            this.mData.data = params.mData.mData ? params.mData.data : null;
                            this.mData.titre = "Modification de " + this.mData.name;
                            this.mData.fields = params.mData.fields ? params.mData.fields : null;
                            break;
                        case 'logout':
                            this.mData.titre = "Déconnexion";
                            this.mData.textModal = "Souhaitez vous réellement vous déconnecter?";
                            break;
                        case 'valid':
                            this.mData.titre = "Validation de " + this.mData.name + " #" + this.mData.dataId;
                            this.mData.textModal = "Cette données est elle valide ?";
                            break;
                        case 'delete': this.mData.titre = "Suppression de " + this.mData.name + " #" + this.mData.dataId;
                            this.mData.textModal = "Souhaitez vous réellement supprimer ceci ?";
                            break;
                        case 'def' : break;
                        default: console.error("action not available"); break;
                    }
                }

            } else {
                this.mData.content = params.mData.content ? params.mData.content : null;
            }
        }
    }
}

/**
 * Build form data class
 */
export class FormClass{
    constructor (params) {
        this.pFormComponent = params.pFormComponent ? params.pFormComponent : null;
        this.formSubmit = params.formSubmit;
        this.action = params.action ? params.action : "add";
        this.data = params.data ? params.data : null;
        this.formMessage = params.formMessage ? params.formMessage : null;
        this.btnText = params.btnText;
        if (!this.pFormComponent){
            this.fields = params.fields ? params.fields : null;
            this.handleFile = params.handleFile ? params.handleFile : null;
            this.formType = params.formType ? params.formType : "byDefault";
            if (params.formType === "withCol") {
                this.hasColRow = true;
                this.colSize = params.colSize ? params.colSize : "6";
            }
        }else{
            this.handleFields = params.handleFields ? params.handleFields : null;
            this.handleFile = params.handleFile ? params.handleFile : null;
        }
    }
}


/**
 * Zone (input,select,textarea) class
 */
class Zone {
    constructor(params) {
        this.name = params.name;
        this.titre = params.titre ? params.titre : strUcFirst(this.name);
        this.icon = params.icon;
        this.value = params.value;
        this.defValue = params.defValue;
        this.errors = params.errors;
        this.handleChange = e => {e.persist(); params.handleChange(e)};
        this.key = this.generateKey();
    }

    generateKey(){
       return generateKey();
    }
}

/**
 * Class for input fields
 */
export class InputClass extends Zone{
    constructor(params){
        super(params);
        this.type = params.type ? params.type : text;
        if (this.type === "user-pic") {
            this.nameClass = "user-pic-icon d-flex justify-content-center";
            this.displayPhoto = true;
        }
        if (this.type === "photo") {
            this.nameClass = "photo-picker";
            this.displayPhoto = true;
        }
        if (this.type === "remember") {
            this.type = "checkbox";
            this.nameClass = "form-check-label";
            this.completeNameClass = "form-check-input";
        }
        if (this.type === "radio") {
            this.radios = params.radios;
            this.typeRadios = params.typeRadios ? params.typeRadios : null;
        }
        if (params.handleFile) {
            this.handleFile = params.handleFile;
        }
    }
}

/**
 * Radio button class maker
 */
export class RadioClass{
    constructor(params){
        this.key = this.generateKey();
        this.data = params.data ? params.data : null;
        this.type = params.type ? params.type : "byDefault";
    }
    generateKey() {
      return generateKey();
    }
}

/**
 * select options
 */
export class OptionClass {
    constructor(params) {
        this.value = params.value;
        this.text = params.text;
        this.key = this.generateKey();
    }
    generateKey() {
        return generateKey();
    }
}

/**
 * select fields class
 */
export class SelectClass extends Zone {
    constructor(params) {
        super(params);
        this.optionsData = params.optionsData ? params.optionsData : [];
    }
}

/**
 * Textarea fields class
 */
export class TextareaClass extends Zone {
    constructor(params) {
        super(params);
    }
}

/**
 * Build a complete menu
 */
export class MenuClass{
    constructor(params) {
        this.selectedRole = params.selectedRole ? params.selectedRole : null;
        this.appName = params.appName;
        if (this.selectedRole) {
            this.links = params.links ? params.links : [];
            if (!this.links) console.error("menu links are missing");
        } else {
            console.error("user role is not define");
        }
    }
}


/**
 * Made bar instance
 */
export class BarClass {
    constructor(params) {
        this.isVisible = params.isVisible;
        this.name = params.name;
        this.titre = params.titre ? strUcFirst(params.titre) : strUcFirst(this.name);
        this.path = params.path ? params.path : "/" + this.name;
        this.icon = params.icon;
        this.key = this.generateKey();
        this.isDropdown = params.isDropdown;
        if (this.isDropdown) {
            this.subMenuData = params.subMenuData;
        }
    }

    generateKey() {
        return (performance.now() + '').replace('.', '') + (Math.random() + '').replace('.', '');
    }
}

/**
 * made menu instance
 */
export class MenuGeneralClass {
    constructor(params) {
        this.role = params.role;
        this.titre = strUcFirst(params.titre);
        this.bars = params.bars;
        this.key = (performance.now() + '').replace('.', '') + (Math.random() + '').replace('.', '');
    }
}

/**
 * card data class
 */
export class CardClass {
    constructor(params) {
        this.pCardDataComponent = params.pCardDataComponent ? params.pCardDataComponent : null;
        if (!this.pCardDataComponent) {
            this.cardType = params.cardType ? params.cardType : null;
            if (!this.cardType) {
                console.log("type card is need");
            } else {
                this.cardData = params.cardData ? params.cardData : null;
                if (!this.cardData) console.error("data must be provided")
            }
        }
    }
}


/**
 * Class for make a table
 */
export class TableClass {
    constructor(params) {
        this.pTableDataComponent = params.pTableDataComponent ? params.pTableDataComponent : null;
        if (!this.pTableDataComponent) {
            this.ths = params.ths ? params.ths : null;
            if (!this.ths) {
                console.error("Headers of table missed")
            } else {
                this.tds = params.tds ? params.tds : null;
                this.pActionBtnComponent = params.pActionBtnComponent ? params.pActionBtnComponent : null;
                if (!this.tds) console.error("data are missed for your table")
            }
        }
    }
}
