import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/login`, null, {
      params,
      responseType: 'text' // porque devuelve un mensaje de texto
    });
  }

  obtenerDetalle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/detalle`);
  }

  validarImagen(usuarioId: number, nombreImagen: string): Observable<string> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('nombreImagen', nombreImagen);
    return this.http.post(`${this.apiUrl}/validar-imagen`, null, {
      params,
      responseType: 'text'
    });
  }

}
