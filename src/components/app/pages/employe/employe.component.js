import { PageComponent } from './../page.component';
import React from  'react';
import EmployeView from './../../../../views/employe/employe.view';
import { EmployeService } from './../../../../services/employe.service';
import { EmployeModel } from './../../../../models/employe.model';

export default class EmployeComponent extends PageComponent{
   async  UNSAFE_componentWillMount(){
            this.loadFrame(EmployeView);
            await this.serviceSetState(new EmployeService({ path: "employes", payLoad: null }));
            await this.modelSetState(new EmployeModel({}));
    }

    componentDidMount(){
        this.loadData();
    }
}

