import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 
import { UsuarioService } from '../../services/usuarios.service';


@Component({
  selector: 'app-estado-cuenta',
  imports: [RouterModule],
  templateUrl: './estado-cuenta.component.html',
  styleUrl: './estado-cuenta.component.css',
  standalone: true,
})

export class EstadoCuentaComponent implements OnInit {
  nombreUsuario: string = '';
  cuenta: any = null;
  fechaHoraActual: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      const usuarioId = +id;

      this.usuarioService.obtenerDetalle(usuarioId).subscribe(detalle => {
        this.nombreUsuario = detalle.username;
      });

      this.usuarioService.obtenerCuenta(usuarioId).subscribe(data => {
        this.cuenta = data;
      });

      const now = new Date();
      const fecha = now.toLocaleDateString('es-EC'); // e.g. 21/05/2025
      const hora = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.fechaHoraActual = `${fecha} - ${hora}`;
    } else {
      this.router.navigate(['/']); // por si no hay sesión
    }
  }
}
