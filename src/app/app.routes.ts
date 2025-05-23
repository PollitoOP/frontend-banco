import { Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { VerificacionComponent } from './pages/verificacion/verificacion.component';
import { EstadoCuentaComponent } from './pages/estado-cuenta/estado-cuenta.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verificacion', component: VerificacionComponent, canActivate: [AuthGuard] },
  { path: 'estado-cuenta', component: EstadoCuentaComponent, canActivate: [AuthGuard] }
];
