import { PageComponent } from './../page.component';
import { SingleContactView } from './../../../../views/contact/single.contact.view';
import { ContactService } from './../../../../services/contact.service';
import { ContactModel } from './../../../../models/contact.model';

export class SingleContactComponent extends PageComponent{
    async UNSAFE_componentWillMount() {
        this.loadFrame(SingleContactView);
        this.state.actComp = "forSingle";
        await this.serviceSetState(new ContactService({ path: "contacts", payLoad: null }));
        await this.modelSetState(new ContactModel({ nom: "", prenoms: "", email: "", telephone: "", localisation: "", id: null }));
    }

    async componentDidMount() {
        await this.loadData(this.props.match.params.id);
    }
}
