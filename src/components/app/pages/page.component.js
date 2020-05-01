import React from 'react';
import { BaseComponent } from './../../base.component';
import { AppModule } from './../../../modules/app.module';
import { storeInLocalStorage } from './../../../../../../../fait/services/auth.service';
import { Redirect } from 'react-router-dom';
import { Auth } from '../../../services/auth.service';

const current = Auth();

export class PageComponent extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            app : {},
            redirect : false,
        }
        this.init = this.init.bind(this);
        this.setCurrentRole = this.setCurrentRole.bind(this);
        this.setFrameUtils = this.setFrameUtils.bind(this);
        this.changeFrameTemplate = this.changeFrameTemplate.bind(this);
        this.onChangeFrameRole = this.onChangeFrameRole.bind(this);
        this.loadFrame = this.loadFrame.bind(this);
        this.updateApp = this.updateApp.bind(this);
        this.logout = this.logout.bind(this);
    }

    /**
     * init frame
     */
    init(){
        this.initFrame();
    }

    async loadFrame(component){
        if (current.isLoggedIn === false){
            this.setState({redirect : true});
        }else{
            this.init();
            let appM = AppModule();
            if (component) {
                appM.setCurrentComponent(component);
            }
            await this.setState({ app: appM });
            const role = localStorage['ar'];
            if (role) {
                appM.setRole(role);
                appM = AppModule(appM);
                this.updateApp(appM);
            }
            this.setFrameUtils();    
        }
        
    }

    /**
     * Change your frame template
     * @param {*} e
     */
    async changeFrameTemplate(e,component) {
        e.preventDefault();
        if (this.state.tempRole) {
            localStorage['ar'] = this.state.tempRole;
            location.reload();
        }
    }
    /**
     * For set the current role
     * @param {*} role
     */
    async setCurrentRole(role) {
        if (role) {
            await this.setState(
                () => ({
                    app: {
                        ...this.state.app,
                        currentUserRoleSelected: role
                    }
                })
            );
        }
    }

    logout(e){
        if (Auth.isLoggedIn){
            e.preventDefault();
            storeInLocalStorage({});
            this.setState({ redirect: true });
            //location.reload();
        }
        
    }

    async updateApp(appU){
        await this.setState({app : appU});
    }

    /**
     * frame utils
     */
    async setFrameUtils() {
        let donnees = this.state.frameUtils;
        donnees.frameAction = {
            init: this.init,
            info: this.state.app,
            changeFrameTemplate: this.changeFrameTemplate,
            onChangeFrameRole: this.onChangeFrameRole,
            logout : this.logout
        };
        this.setState({ frameUtils: donnees });
    }

    /**
     * Valid the role change
     * @param {*} e
     */
    async onChangeFrameRole(e){
        await this.setState({ tempRole: e.target.value });
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/" {...this.props}/>
        }
        const Component = this.state.app.currentComponent;
        return <Component data={this.state.frameUtils} />
    }
}
