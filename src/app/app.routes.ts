import { Routes } from '@angular/router';
import { TestesComponent } from './testes-component/testes-component';
import { HomeComponent } from './home-component/home-component';
import { BackendComponent } from './backend-component/backend-component';
import { DocumentacaoComponent } from './documentacao-component/documentacao-component';
import { ConfigComponent } from './config-component/config-component';
import { ApisComponent } from './apis-component/apis-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { GatewaysComponent } from './gateways-component/gateways-component';
import { TagsComponent } from './tags-component/tags-component';
import { UsuariosComponent } from './usuarios-component/usuarios-component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "testes", component: TestesComponent},
    {path: "backend", component: BackendComponent},
    {path: "documentacao", component: DocumentacaoComponent},
    {path: "configuracao", component: ConfigComponent},
    {path: "apis", component: ApisComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "gateways", component: GatewaysComponent},
    {path: "tags", component: TagsComponent},
    {path: "usuarios", component: UsuariosComponent}
];
