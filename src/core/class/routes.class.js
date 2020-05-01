export class RoutesClass{
    constructor(params){
        this.type = params.type ? params.type : null;
        if(this.type){
            switch (this.type){
                case "public":  this.component = params.component ? params.component : null;
                                this.path = params.path ? params.path : null;
                                break;
                case "private" :
                                this.isLoggedIn = params.isLoggedIn ? params.isLoggedIn : false;
                                this.hasAccess = params.hasAccess ? params.hasAccess : false;
                                if(this.access){
                                    this.component = params.component ? params.component : null;
                                    this.path = params.path ? params.path : null;
                                }else{
                                    console.error("you can't access this route you don't have the right access");
                                }
                                break;
                default :  console.error("type of route is not define"); break;
            }
        }else{
            console.error("make sure you provide type for build route this route");
        }
    }
}
