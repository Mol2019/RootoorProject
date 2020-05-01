/**
 * @class Auth service class for get user service
 */
export class AuthService {
    constructor() {
        this.currentUserValue = {
            isLoggedIn: false,
            user: {},
            token: null
        };
    }

    /**
    * @return {*} user : user information
    */
    getUserInfo() {
        let user = null;
        let state = localStorage["appInfo"];
        if (state) {
            let AppInfo = JSON.parse(state);
            if (AppInfo.user && AppInfo.token) {
                user = {
                    isLoggedIn: true,
                    user: AppInfo.user,
                    token: AppInfo.token
                }
            }
        }
        return user;
    }

    /**
     * Update current user connected information
     */
    setAuthInfo(user) {
        this.currentUserValue = user;
    }

    /**
     * method use for check the user role in app
     * @params {*} role
     */
    checkRole(role) {
        let check = false;
        if (this.currentUserValue.user.roles.find(
            item =>  item.type === role
        )) {
            check = true;
        }
        return check;
    }

}



/**
 * Auth const for get current user connected
 */
export let Auth = () => {
    let userData = new AuthService();
    userData.setAuthInfo(userData.getUserInfo());
    return userData;
}


/**
 * @method for store data in the localStorage
 */
export function storeInLocalStorage(userData) {
    if (userData) {
        localStorage['appInfo'] = JSON.stringify(userData);
    }
}


export function logout(e){
    e.preventDefault();
    storeInLocalStorage({});
    location.reload();
}
