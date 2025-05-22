import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificacion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './verificacion.component.html',
  styleUrl: './verificacion.component.css'
})
export class VerificacionComponent implements OnInit {
  imagenes = [
    { src: 'assets/faro.png', label: 'FARO', alt: 'Faro' },
    { src: 'assets/basurero.png', label: 'BASURERO', alt: 'Basurero' },
    { src: 'assets/avion.png', label: 'AVIÓN', alt: 'Avión' },
    { src: 'assets/balon.png', label: 'BALÓN', alt: 'Balón' },
    { src: 'assets/microscopio.png', label: 'MICROSCOPIO', alt: 'Microscopio' },
    { src: 'assets/microfono.png', label: 'MICRÓFONO', alt: 'Micrófono' },
    { src: 'assets/corazon.png', label: 'CORAZÓN', alt: 'Corazón' },
    { src: 'assets/mariposa.png', label: 'MARIPOSA', alt: 'Mariposa' },
    { src: 'assets/llave.png', label: 'LLAVE', alt: 'Llave' },
    { src: 'assets/paloma.png', label: 'PALOMA', alt: 'Paloma' }
  ];

  preguntasUsuario: any[] = [];
  preguntaActual: any = null;
  respuestaIngresada: string = '';
  intentosFallidos: number = 0;
  imagenSeleccionada: string = '';
  mensaje: string = '';
  usuarioId: number = 0;

  respuestaCorrecta: boolean | null = null;
  mensajeError: string = '';

  nombreUsuario: string = ''; // ✅ Nueva propiedad para mostrar el nombre

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.obtenerDetalle(+id).subscribe(detalle => {
        this.nombreUsuario = detalle.username; // ✅ Asignar el nombre
        this.preguntasUsuario = detalle.preguntas;
        this.seleccionarPreguntaAleatoria();
        this.usuarioId = parseInt(id, 10);
      });
    }
  }

  seleccionarPreguntaAleatoria(): void {
    const preguntasRestantes = this.preguntasUsuario.filter(p => p !== this.preguntaActual);
    if (preguntasRestantes.length === 0) {
      this.preguntaActual = this.preguntasUsuario[Math.floor(Math.random() * this.preguntasUsuario.length)];
    } else {
      this.preguntaActual = preguntasRestantes[Math.floor(Math.random() * preguntasRestantes.length)];
    }
    this.respuestaIngresada = '';
    this.intentosFallidos = 0;
    this.respuestaCorrecta = null;
    this.mensajeError = '';
  }

  verificarRespuestaTiempoReal(): void {
    if (this.respuestaIngresada.trim() === '') {
      this.respuestaCorrecta = null;
      this.mensajeError = '';
      return;
    }

    if (this.preguntaActual?.respuesta === this.respuestaIngresada.trim()) {
      this.respuestaCorrecta = true;
      this.mensajeError = '';
    } else {
      this.respuestaCorrecta = false;
      this.mensajeError = 'Por favor responda la pregunta de seguridad';
    }
  }

  // metodo para verificar la imagen correcta

  seleccionarImagenDesdeSrc(src: string): void {
    const nombre = src.split('/').pop(); // obtiene 'faro.png', etc.
    this.imagenSeleccionada = nombre ?? '';
  }

  validarImagen() {
    if (!this.imagenSeleccionada || !this.usuarioId) {
      this.mensaje = 'Debe seleccionar una imagen.';
      return;
    }

    if (!this.respuestaCorrecta) {
      this.mensaje = 'La respuesta de seguridad es incorrecta.';
      return;
    }

    this.usuarioService.validarImagen(this.usuarioId, this.imagenSeleccionada)
    .subscribe({
      next: (resp) => {
        if (resp.includes('correcta')) {
          localStorage.setItem('imagenValidada', 'true');
          // ✅ Si imagen Y respuesta son correctas, ir a estado-cuenta
          this.router.navigate(['/estado-cuenta']);
        } else {
          this.mensaje = 'Imagen incorrecta.';
        }
      },
      error: () => {
        this.mensaje = 'Error al validar la imagen.';
        localStorage.removeItem('imagenValidada');
      }
    });
  }
}
