import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Login } from './login';

//nao tem login na back (sem integracao dae
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioValido = 'admin';
  private senhaValida = '1234';

  constructor() { }

  logar(login: Login): Observable<boolean> {
    if (login.usuario === this.usuarioValido && login.senha === this.senhaValida) {
      localStorage.setItem('logado', 'true');
      localStorage.setItem('usuario', login.usuario);
      return of(true);
    }
    return throwError(() => new Error('Usuário ou senha inválidos'));
  }

  logout() {
    localStorage.removeItem('logado');
    localStorage.removeItem('usuario');
  }

  estaLogado(): boolean {
    return localStorage.getItem('logado') === 'true';
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

}
