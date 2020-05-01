import { PageComponent } from './../page.component';
import ConfigProjectView from './../../../../views/projet/config.projet.view';
import { ProjetService } from './../../../../services/projet.service';
import { ProjetModel } from './../../../../models/projet.model';
import { EmployeService } from './../../../../services/employe.service';

export default class ConfigProjectComponent extends PageComponent{
    
    UNSAFE_componentWillMount(){
        this.loadFrame(ConfigProjectView);
        this.serviceSetState(new ProjetService({path:"projets",payLoad:null}));
        this.modelSetState(new ProjetModel({}));    
    }

    loadEmployees(){
        const service = new EmployeService({path:"employes",payLoad:null});
        service.getAll().then(
            async json => {
                    await this.setState(
                        prevState => ({
                            frameUtils : {
                                ...prevState.frameUtils,
                                others: json
                            }
                        })
                    )
            }
        ).catch(err => { console.error(err)})
    }

    async componentDidMount(){
        await this.loadData(this.props.match.params.id)
        await this.loadEmployees();
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
        execUpdate.paramsProjUpdate().then(
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

                    this.loadFormMessage('success',"Projet paramétré avec succès");
                }else{
                    await this.loadFormMessage('error', json.data.errors);
                }
                    
                
            }
        ).catch(err => {console.error(err)})
        
    }

}
