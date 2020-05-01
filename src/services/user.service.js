import { BaseService } from './base.service';

export class UserService extends BaseService{
    constructor(params){
        super(params);
    }

    /**
     * Login method for log a user
     */
    login(){
        const chemin = this.path + "/login";
        return this.postDataToServer(chemin);
    }

    /**
     * Register method for put user info into the server
     */
    register(){
        const chemin = this.path + "/register";
        return this.postDataToServer(chemin);
    }
}

