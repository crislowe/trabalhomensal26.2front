import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  nomeUsuario: string = '';
  perfil: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isEstaLogado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.nomeUsuario = this.authService.getNomeUsuario();
    this.perfil = this.authService.getPerfil();
  }

  sair(): void {
    this.authService.fazerLogout();
    this.router.navigate(['/login']);
  }
}
