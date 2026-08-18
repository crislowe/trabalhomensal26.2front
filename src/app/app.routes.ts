import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListagemComponent } from './components/listagem/listagem.component';
import { EdicaoComponent } from './components/edicao/edicao.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'painel',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: 'lista', component: ListagemComponent },
      { path: 'novo', component: EdicaoComponent },
      { path: 'editar/:id', component: EdicaoComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
