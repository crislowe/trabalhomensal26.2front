import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const roteador = inject(Router);

  if (loginService.estaLogado()) {
    return true;
  }

  roteador.navigate(['/login']);
  return false;
};
