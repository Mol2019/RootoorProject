import { BaseService } from './base.service';
import  Axios  from 'axios';

export class DisposeService extends BaseService{
    constructor(params){
        super(params);
    }

    loadOptions() {
        const chemin = this.path + "/options";
        return Axios.get(chemin).then(
            json => { return json.data.data }
        ).catch((err) => { console.error(err) });
    }

    delete(){
        const chemin = this.path + "/delete";
        return this.postDataToServer(chemin).then(
            json =>{ return json}
        );
    }
}
