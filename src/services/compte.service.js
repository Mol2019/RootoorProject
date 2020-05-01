import { BaseService } from './base.service';

export class CompteService extends BaseService{
    constructor(props) {
        super(props);
    }

    lockOrUnlock(id) {
        const chemin = this.path + "/lockOrUnlock/" + id;
        return this.getDataFromServer(chemin);
    }

    loadProjects(id){
        const chemin = this.path +"/"+ id+"/projets";
        return this.getDataFromServer(chemin);
    }
}
