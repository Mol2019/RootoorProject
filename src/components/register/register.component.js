import React from 'react';
import { BaseComponent } from "../base.component";
import { RegisterView } from '../../views/register/register.view';
import { UserService } from './../../services/user.service';
import { RegisterModel } from '../../models/user.model';

export class RegisterComponent extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    async UNSAFE_componentWillMount() {
        this.initFrame();
        await this.serviceSetState(new UserService({ path: "users", payLoad: null }));
        await this.modelSetState(new RegisterModel({}));
    }

    /**
     * Redefine submitFunction
     * @param {*} e
     */
    async onSubmit(e) {
        e.preventDefault();
        if (this.state.model) {
            let execLog = this.state.service;
            execLog.payLoad = this.state.model;
            this.serviceSetState(execLog);
        }
        this.state.service.register();

        //envoie des donneés au server pour la connexion
        /*this.state.service.login().then(
            async json => {
                const data = json.data;
                if (data.success) {
                    await this.loadFormMessage('success', "Connecté avec succès");
                    setTimeout(() => {
                        this.loadFormMessage('success', "");
                        let userData = {
                            id: data.data.params.id,
                            nom: data.data.params.nom,
                            prenoms: data.data.params.prenoms,
                            userName: data.data.params.login,
                            photo: data.data.params.photo,
                            access_token: data.data.jeton,
                            roles: data.data.params.roles
                        };

                        let appState = {
                            isLoggedIn: true,
                            user: userData,
                            token: userData.access_token
                        };
                        storeInLocalStorage(appState);
                        location.reload();
                    }, 2000);
                } else {
                    await this.loadFormMessage('error', data.errors);
                }

            }
        ).catch((err) => { console.error(err) });*/
    }

    render() {
        return <RegisterView data={this.state.frameUtils} />
    }
}
