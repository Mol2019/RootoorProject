export class CompteModel{
    constructor(parameter) {
        this.nom = parameter.nom;
        this.type = parameter.type;
        this.etat = parameter.etat;
        this.adresse = parameter.adresse;
        if (parameter.id) {
            this.id = parameter.id;
        }

    }
}
