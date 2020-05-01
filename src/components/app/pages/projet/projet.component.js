import { PageComponent } from './../page.component';
import ProjetView from './../../../../views/projet/projet.view';
import { ProjetModel } from './../../../../models/projet.model';
import { ProjetService } from './../../../../services/projet.service';
import { OptionClass } from './../../../../core/class/elements.class';

export default class ProjetComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(ProjetView);
        this.serviceSetState(new ProjetService({ path: "projets", payLoad: null }));
        this.modelSetState(new ProjetModel({}));
    }

    componentDidMount(){
        this.loadData();
        this.state.frameUtils.options = [];
        this.loadOptions();
    }

    async loadOptions() {
        await this.state.service.loadOptions().then(
            async json => {
                console.log(json)
                let compteOptionsArray = [];
                compteOptionsArray.push(
                    new OptionClass({ value: "", text: " Selectionner un compte" })
                );

                json.map(
                    item => {
                        compteOptionsArray.push(
                            new OptionClass({ value: item.id, text: item.nom })
                        );
                    }
                );

               this.optionsForSomeThing("compte", compteOptionsArray);
            }
        )
    }

    optionsForSomeThing(thingName, options) {
        this.setState(
            prevState => ({
                frameUtils: {
                    ...prevState.frameUtils,
                    options: {
                        ...prevState.frameUtils.options,
                        [thingName]: options
                    }
                }
            })
        );
    }
}
