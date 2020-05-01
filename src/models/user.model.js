import { BaseModel } from './base.model';
import { EmployeModel } from './employe.model';

/**
 * Class for the user login model
 */
export class LoginModel extends BaseModel{
    constructor(params){
        super();
        this.login = params.login ? params.login : null;
        this.password = params.password ? params.password : null;
    }
}

export class RegisterModel extends EmployeModel{
    constructor(params){
        super(params);
        this.login = params.login;
        this.password = params.password;
    }
}
