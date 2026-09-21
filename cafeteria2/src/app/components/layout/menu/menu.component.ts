import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  loginService = inject(LoginService);
  router = inject(Router);

  sair() {
    Swal.fire({
      title: 'Deseja sair?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}
