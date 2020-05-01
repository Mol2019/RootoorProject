import { QueryBackend } from './environnement/querybackend';
import { appEnvironnement } from './environnement/parameters';

export class BaseService extends QueryBackend{
    constructor(params){
        super(params);
        this.path = appEnvironnement.url + "/" + this.path;
    }

    /**
     * method use for put data in database
     * @return data you send for register to database
     */
    create(){
        const chemin = this.path + "/create";
        if (this.payLoad) {
            return this.postDataToServer(chemin);
        }
        console.error("Payload is missing");
        return null;
    }

    /**
     * getAll for get all rows of column call
     * @return promise
     */
    getAll() {
        return this.getDataFromServer(this.path);
    }

    /**
     * @return For get one row
     */
    getOne(id) {
        const chemin = this.path + "/" + id;
        return this.getDataFromServer(chemin);
    }

    /**
     * @return For update data
     */
    update() {
        const chemin = this.path + "/update";
        return this.postDataToServer(chemin);
    }

    /**
     * @return for delete data
     */
    delete(id) {

        const chemin = this.path + "/delete/" + id;
        return this.removeDataToServer(chemin);
    }
}
