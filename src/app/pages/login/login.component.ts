import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword: boolean = true;

  username = '';
  password = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.usuarioService.login(this.username, this.password).subscribe({
      next: (response: string) => {
        const idUsuario = response.split(':')[1]?.trim();
        localStorage.setItem('usuarioId', idUsuario);
        Swal.fire('¡Éxito!', 'Login correcto', 'success');
        this.router.navigate(['/verificacion']);
      },
      error: () => {
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
      }
    });
  }
}
