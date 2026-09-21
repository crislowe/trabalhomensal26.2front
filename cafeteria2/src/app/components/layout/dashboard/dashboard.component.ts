import { Component, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  loginService = inject(LoginService);

}
