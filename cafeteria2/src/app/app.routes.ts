import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import { FornecedoresListComponent } from './components/fornecedores/fornecedores-list/fornecedores-list.component';
import { guardGuard } from './auth/guard.guard';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "admin", component: PrincipalComponent, canActivate: [guardGuard], children: [
        { path: "dashboard", component: DashboardComponent },
        { path: "produtos", component: ProdutosListComponent },
        { path: "fornecedores", component: FornecedoresListComponent },
    ]}
];
