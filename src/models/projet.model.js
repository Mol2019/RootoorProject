export class ProjetModel{
    constructor(params){
        if(params.id){
            this.id = params.id;
        }
        this.compte = params.compte ? params.compte : null;
        this.titre = params.titre ? params.titre : null;
        this.budget = params.budget ? params.budget : null;
        this.delais = params.delais ? params.delais : null;
        this.marge = params.marge ? params.marge : null;
        this.description = params.description ? params.description : null;
        this.domaine = params.domaine ? params.domaine : null;
        this.debut_theorique = params.debut_theorique ? params.debut_theorique : null;
        this.debut_reel = params.debut_reel ? params.debut_reel : null;
        this.fin_theorique = params.fin_theorique ? params.fin_theorique : null;
        this.fin_reel = params.fin_reel ? params.fin_reel : null;
        if(params.pm){
            this.pm = params.pm ? params.pm : null; 
        }

    }
}
