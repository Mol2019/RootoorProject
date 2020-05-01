export class ContactModel {
    constructor(params){
        this.nom = params.nom ? params.nom : null;
        this.prenoms = params.prenoms ? params.prenoms : null;
        this.email = params.email ? params.email : null;
        this.telephone = params.telephone ? params.telephone : null;
        this.localisation = params.localisation ? params.localisation : null;
        if (params.id) {
            this.id = params.id;
        }
    }
}