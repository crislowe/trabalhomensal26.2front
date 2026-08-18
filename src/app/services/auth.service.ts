import { Injectable } from '@angular/core';

export interface UsuarioCadastrado {
  usuario: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logado: boolean = false;
  private perfil: string = 'usuario';
  private nomeUsuario: string = '';
  private usuariosRegistrados: UsuarioCadastrado[] = [];

  constructor() {
    const salvoLogado = localStorage.getItem('logado');
    const salvoPerfil = localStorage.getItem('perfil');
    const salvoNome = localStorage.getItem('nomeUsuario');

    if (salvoLogado === 'true') {
      this.logado = true;
      this.perfil = salvoPerfil || 'usuario';
      this.nomeUsuario = salvoNome || 'Usuário';
    }

    const contasSalvas = localStorage.getItem('contas_usuarios');
    if (contasSalvas) {
      this.usuariosRegistrados = JSON.parse(contasSalvas);
    }
  }

  // Tenta efetuar login
  // Admin fixo: adm123 / 123
  fazerLogin(usuarioInput: string, senhaInput: string): boolean {
    const user = usuarioInput.trim();
    const pass = senhaInput.trim();

    // Checagem de Administrador
    if (user === 'adm123' && pass === '123') {
      this.logado = true;
      this.perfil = 'admin';
      this.nomeUsuario = 'Administrador';
      this.salvarSessao();
      return true;
    }

    // Checagem de Usuario Comum cadastrado
    const encontrado = this.usuariosRegistrados.find(
      u => u.usuario.toLowerCase() === user.toLowerCase() && u.senha === pass
    );

    if (encontrado) {
      this.logado = true;
      this.perfil = 'usuario';
      this.nomeUsuario = encontrado.usuario;
      this.salvarSessao();
      return true;
    }

    return false;
  }

  // Cadastrar nova conta de usuario comum
  cadastrarConta(usuarioInput: string, senhaInput: string): boolean {
    const user = usuarioInput.trim();
    const pass = senhaInput.trim();

    if (!user || !pass) return false;

    // Impedir cadastrar com o nome de adm
    if (user.toLowerCase() === 'adm123') return false;

    // Verificar se ja existe
    const jaExiste = this.usuariosRegistrados.some(u => u.usuario.toLowerCase() === user.toLowerCase());
    if (jaExiste) return false;

    this.usuariosRegistrados.push({ usuario: user, senha: pass });
    localStorage.setItem('contas_usuarios', JSON.stringify(this.usuariosRegistrados));
    return true;
  }

  private salvarSessao(): void {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('perfil', this.perfil);
    localStorage.setItem('nomeUsuario', this.nomeUsuario);
  }

  fazerLogout(): void {
    this.logado = false;
    this.perfil = 'usuario';
    this.nomeUsuario = '';
    localStorage.removeItem('logado');
    localStorage.removeItem('perfil');
    localStorage.removeItem('nomeUsuario');
  }

  isEstaLogado(): boolean {
    return this.logado;
  }

  isAdmin(): boolean {
    return this.perfil === 'admin';
  }

  getNomeUsuario(): string {
    return this.nomeUsuario;
  }

  getPerfil(): string {
    return this.perfil;
  }
}
