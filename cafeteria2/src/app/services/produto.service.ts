import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR + '/produtos';

  constructor() { }

  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API + '/listar');
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.API + '/findById/' + id);
  }

  save(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API + '/save', produto);
  }

  update(produto: Produto, id: number): Observable<Produto> {
    return this.http.put<Produto>(this.API + '/atualizar/' + id, produto);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(this.API + '/delete/' + id);
  }

}
