import { PageComponent } from './../page.component';
import SingleCompteView from './../../../../views/compte/single.compte.view';
import { CompteService } from './../../../../services/compte.service';
import { CompteModel } from './../../../../models/compte.model';


export default class  SingleCompteComponent extends PageComponent{
    async UNSAFE_componentWillMount(){
        this.loadFrame(SingleCompteView);
        this.state.actComp = "forSingle"
        await this.serviceSetState(new CompteService({ path: "comptes", payLoad: null }));
        await this.modelSetState(new CompteModel({ id: null, type: null, nom: null, etat: true, adresse: null, }));
    }

    async componentDidMount(){
        await this.loadData(this.props.match.params.id);
    }
}
