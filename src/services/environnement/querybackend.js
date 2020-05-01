import Axios from 'axios';

/**
 * @class For make Query to the backend
 */
export class QueryBackend{
    constructor(params) {
        this.path = params.path ? params.path : "";
        this.payLoad = params.payLoad ? params.payLoad : null;
    }

    /**
     * method for send data to the server
     * @returns {*} data
     * @param {*} chemin
     */
    postDataToServer(chemin){
        let data = null;
        if(this.path && this.payLoad){
            data = Axios.post(chemin,this.payLoad).then(response => {return response;})
                                                  .catch(err => { return err});
        }
        return data;
    }

    /**
     * method for get data from server
     * @param {*} chemin
     */
    getDataFromServer(chemin){
        let data = null;
        if(this.path){
            data = Axios.get(chemin).then(response => { return response.data.original.data})
                                    .catch((err) => {return err});
        }
        return data;
    }

    /**
     * remove data to the server
     * @param {*} chemin
     */
    removeDataToServer(chemin){
        let data = null;
        data = Axios.get(chemin).then(
            response => { console.log(response); return response }
        ).catch((err) => { return err });
        return data;
    }
}
