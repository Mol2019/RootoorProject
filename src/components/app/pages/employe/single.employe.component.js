import { PageComponent } from './../page.component';
import React from 'react';
import { EmployeService } from './../../../../services/employe.service';
import { EmployeModel } from './../../../../models/employe.model';
import SingleEmployeView from './../../../../views/employe/single.employe.view';

export default class SingleEmployeComponent extends PageComponent {
    async  UNSAFE_componentWillMount() {
        this.loadFrame(SingleEmployeView);
        this.state.actComp = "forSingle";
        await this.serviceSetState(new EmployeService({ path: "profile", payLoad: null }));
        await this.modelSetState(new EmployeModel({}));
    }

    componentDidMount() {
        this.loadData(this.props.match.params.id);
    }
}

