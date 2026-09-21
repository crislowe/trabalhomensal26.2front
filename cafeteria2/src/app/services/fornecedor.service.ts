import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  http = inject(HttpClient);

  API = environment.SERVIDOR + '/fornecedores';

  constructor() { }

  findAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.API + '/listar');
  }

  findById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(this.API + '/findById/' + id);
  }

  save(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.API + '/save', fornecedor);
  }

  update(fornecedor: Fornecedor, id: number): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(this.API + '/atualizar/' + id, fornecedor);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.API + '/delete/' + id);
  }

}
