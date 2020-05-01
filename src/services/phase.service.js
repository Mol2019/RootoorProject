import { BaseService } from "./base.service";
import Axios from 'axios';

export class PhaseService extends BaseService{
    constructor(params){
        super(params);
    }

    loadPhaseTache(phaseId){
        const chemin = this.path + "/" + phaseId + '/taches';

        return Axios.get(chemin).then(json => { return json.data.data })
            .catch(err => { console.error(err) });
    }

    paramsPhaseUpdate(){
          const chemin = this.path + "/updatePhaseParams";
        return this.postDataToServer(chemin).then(json=>{return json})
                                            .catch(err=>{console.error(err)});
    }
}
