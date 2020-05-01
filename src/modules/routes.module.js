import React from 'react';
import { Switch} from 'react-router-dom';
import { RouteBuilder} from './../core/builders/route.builder';
import AppComponent from './../components/app/app.component';
import { MainComponent } from './../components/app/pages/main/main.component';
import DashboardComponent from './../components/app/pages/dashboard/dashboard.component';
import ProfileComponent from '../components/app/pages/profile/profile.component';
import CompteComponent from './../components/app/pages/compte/compte.component';
import EmployeComponent from './../components/app/pages/employe/employe.component';
import { NotFoundComponent } from './../components/not-found-component/not-found.component';
import ContactComponent from './../components/app/pages/contact/contact.component';
import ProjetComponent  from './../components/app/pages/projet/projet.component';
import SingleCompteComponent from '../components/app/pages/compte/single.compte.component';
import { SingleContactComponent } from './../components/app/pages/contact/single.contact.component';
import SingleEmployeComponent from './../components/app/pages/employe/single.employe.component';
import { SpaceCompteComponent } from '../components/app/pages/compte/space-compte.component';
import ConfigProjectComponent from '../components/app/pages/projet/config.projet.component';
import SingleProjetComponent from '../components/app/pages/projet/single.projet.component';
import { RegisterComponent } from '../components/register/register.component';
import ListPhaseProjetComponent from '../components/app/pages/phase/list.phase.projet.component';
import { ConfigPhaseComponent } from '../components/app/pages/phase/config.phase.component';
import SinglePhaseComponent  from '../components/app/pages/phase/single.phase.component';


export  let RoutesModule = () => (
    <Switch>
        <RouteBuilder exact path="/" type="public" component={AppComponent}/>
        <RouteBuilder exact path="/home" type="public" component={MainComponent} />
        <RouteBuilder exact path="/register" type="public" component={RegisterComponent} />
        <RouteBuilder path={"/dashboard"} allHasAccess={true} type="private" component={DashboardComponent}/>
        <RouteBuilder path={"/profile"} allHasAccess={true} type="private" component={ProfileComponent} />
        <RouteBuilder path={"/comptes"} role={"ad"} type="private" component={CompteComponent} />
        <RouteBuilder path={"/projet/:id/configs"} role={"ad"} type="private" component={ConfigProjectComponent} />
        <RouteBuilder path={"/phases/:id/configs"} role={"ad"} type="private" component={ConfigPhaseComponent} />
        <RouteBuilder path={"/phase/:id"} role={"ad"} type="private" component={SinglePhaseComponent} />
        <RouteBuilder path={"/space/compte/:id"} role={"ad"} type="private" component={SpaceCompteComponent} />
        <RouteBuilder path={"/compte/:id"} role={"ad"} type="private" component={SingleCompteComponent} />
        <RouteBuilder path={"/contact/:id"} allHasAccess={true} type="private" component={SingleContactComponent} />
        <RouteBuilder path={"/employe/:id"} role={"ad" || "pm"} type="private" component={SingleEmployeComponent} />
        <RouteBuilder path={"/employes"} role={"ad" || "pm"} type="private" component={EmployeComponent} />
        <RouteBuilder path={"/projects"} role={"ad" || "pm"} type="private" component={ProjetComponent} />
        <RouteBuilder path={"/projet/:id"} role={"ad" || "pm"} type="private" component={SingleProjetComponent} />
        <RouteBuilder path={"/projets/:id/phases"} role={"ad" || "pm"} type="private" component={ListPhaseProjetComponent} />
        <RouteBuilder path={"/contacts"} allHasAccess={true} type="private" component={ContactComponent} />
        <RouteBuilder type="public" component={NotFoundComponent} />
    </Switch>
);
