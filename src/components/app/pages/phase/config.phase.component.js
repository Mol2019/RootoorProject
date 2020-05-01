import { PageComponent } from "../page.component";
import { PhaseService } from "../../../../services/phase.service";
import { PhaseModel } from './../../../../models/phase.model';
import ConfigPhaseView from "../../../../views/phase/config.phase.view";


export class ConfigPhaseComponent extends PageComponent{
    UNSAFE_componentWillMount(){
       this.loadFrame(ConfigPhaseView);
       this.serviceSetState(new PhaseService({path:"phases"}));
       this.modelSetState(new PhaseModel());
    }

    componentDidMount(){
        this.loadData(this.props.match.params.id);
    }

    async onSubmit(e){
        e.persist();
        this.state.model = this.state.data;
        await this.setState(
                    prevState => ({
                        model : {
                            ...prevState.model,
                            [e.target[0].name]: e.target[0].value,
                            id : this.state.frameUtils.donnees.id
                        }
                    })
        );
        const execUpdate = this.state.service;
        execUpdate.payLoad = this.state.model;
        console.log(execUpdate.payLoad)
        execUpdate.paramsPhaseUpdate().then(
            async json => {
                if(json.data.success){
                    await this.setState(
                        prevState => ({
                            frameUtils: {
                                ...prevState.frameUtils,
                                donnees: json.data.data
                            }
                        })
                    );

                    this.loadFormMessage('success',json.data.successMessage);
                }else{
                    await this.loadFormMessage('error', json.data.errors);
                }
                    
                
            }
        ).catch(err => {console.error(err)})
        
    }
}
