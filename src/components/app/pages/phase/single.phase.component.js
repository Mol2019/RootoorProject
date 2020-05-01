import {PageComponent} from  '../page.component';
import SinglePhaseView from '../../../../views/phase/single.phase.view';
import { PhaseService } from '../../../../services/phase.service';

export default class SinglePhaseComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(SinglePhaseView);
        this.serviceSetState(new PhaseService({path:'phases'}));
    }

    componentDidMount(){
        this.loadData(this.props.match.params.id)
    }
}
