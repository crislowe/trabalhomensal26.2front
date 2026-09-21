import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: () => {
        Swal.fire('Bem-vindo!', '', 'success');
        this.router.navigate(['admin/dashboard']);
      },
      error: () => {
        Swal.fire('Usuário ou senha incorretos!', '', 'error');
      }
    });
  }

}
