import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario: string = '';
  senha: string = '';
  
  modoCadastro: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.usuario.trim() || !this.senha.trim()) {
      this.mensagemErro = 'Preencha o usuário e a senha.';
      return;
    }

    const deuceerto = this.authService.fazerLogin(this.usuario, this.senha);
    if (deuceerto) {
      this.router.navigate(['/painel/lista']);
    } else {
      this.mensagemErro = 'Usuário ou senha incorretos! Se não tiver conta, clique em Cadastrar.';
    }
  }

  cadastrar(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.usuario.trim() || !this.senha.trim()) {
      this.mensagemErro = 'Preencha usuário e senha para cadastrar.';
      return;
    }

    const sucesso = this.authService.cadastrarConta(this.usuario, this.senha);
    if (sucesso) {
      this.mensagemSucesso = 'Conta criada com sucesso! Faça login para entrar.';
      this.modoCadastro = false;
    } else {
      this.mensagemErro = 'Usuário já existe ou nome inválido!';
    }
  }

  alternarModo(): void {
    this.modoCadastro = !this.modoCadastro;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }
}
