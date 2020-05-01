import { BaseService } from './base.service';
import  Axios  from 'axios';

export class ProjetService extends BaseService {
    constructor(params){
        super(params);
    }

    paramsProjUpdate(){
        const chemin = this.path + "/updateProjParams";
        return this.postDataToServer(chemin).then(json=>{return json})
                                            .catch(err=>{console.error(err)});
    }

    loadOptions(){
        const chemin = this.path + "/options";
        return Axios.get(chemin).then(json => { return json.data.data })
            .catch(err => { console.error(err) });
    }

    loadProjectPhase(id) {
        const chemin = this.path + "/" + id + '/phases';

        return Axios.get(chemin).then(json => {return json.data.data })
            .catch(err => { console.error(err) });
    }
}
