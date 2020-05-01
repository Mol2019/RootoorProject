import React from 'react';
import { PageComponent } from '../page.component';
import { DashboardView, AdminDashboardView, TeDashboardView } from '../../../../views/dashboard/dashboard.view';
import { PmDashboardView } from './../../../../views/dashboard/dashboard.view';

export default class DashboardComponent extends PageComponent{
    UNSAFE_componentWillMount(){
        this.loadFrame(DashboardView);
    }
}


export class AdminDashboardComponent extends PageComponent{
    UNSAFE_componentWillMount() {
        this.loadFrame(AdminDashboardView);
    }
}

export class PmDashboardComponent extends PageComponent {
    UNSAFE_componentWillMount() {
        this.loadFrame(PmDashboardView);
    }
}

export class TeDashboardComponent extends PageComponent {
    UNSAFE_componentWillMount() {
        this.loadFrame(TeDashboardView);
    }
}


