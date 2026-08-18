import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, ProdutoCafeteria } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  listaProdutos: ProdutoCafeteria[] = [];

  constructor(
    private produtoService: ProdutoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.listaProdutos = this.produtoService.listar();
  }

  deletarItem(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto do estoque?')) {
      this.produtoService.excluir(id);
      this.carregarDados();
    }
  }
}
