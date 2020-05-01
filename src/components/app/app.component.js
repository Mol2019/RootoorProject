import React from 'react';
import HomeComponent from './../home-component/home.component';
import { SpinnerComponent } from './../spinner/spinner.component';
import { MainComponent } from './pages/main/main.component';
import { Auth } from './../../../../../../fait/services/auth.service';
import { logout } from '../../services/auth.service';
import { storeInLocalStorage } from './../../services/auth.service';


const currentUser = Auth().currentUserValue;

/**
 * Le component de base qui permettra d'accceder à aux autres component
 */
export default class AppComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn : false,
            user : {},
            fetching : null
        }
    }

    //verification du statut d'auth et retour de la bonne vue
    async UNSAFE_componentWillMount(){
        if(currentUser){
            this.setState({ isLoggedIn: currentUser.isLoggedIn, user: currentUser.user });
        }
        await this.setState({ fetching: SpinnerComponent });
    }
    //au montage appel du bon component
    async componentDidMount(){
        setTimeout(async () => {
            if (this.state.isLoggedIn && this.state.user) {
                await this.setState({ fetching: MainComponent });
            } else {
                await this.setState({ fetching: HomeComponent });
            }
        }, 3000);

    }

    render(){
        let FetchView = this.state.fetching;
        return <FetchView isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
    }
}
