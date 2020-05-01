import { PageComponent } from "../page.component";
import { ProjetService } from "../../../../services/projet.service";
import { PhaseModel } from "../../../../models/phase.model";
import { ListPhaseProjetView } from "../../../../views/phase/list.phase.projet.view";

export default class ListPhaseProjetComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(ListPhaseProjetView);
        this.serviceSetState(new ProjetService({path:'projets'}));
        this.modelSetState(new PhaseModel());
    }

    componentDidMount(){
        this.loadData(this.props.match.params.id);
    }

    loadData(id){
        this.state.service.getOne(id).then(
            json => {
               this.setState(
                   prevState => ({
                       frameUtils : {
                           ...prevState.frameUtils,
                           donnees : json.phases
                       }
                   })
               )
            }
        ).catch(err => {console.error(err)})
    }
}
