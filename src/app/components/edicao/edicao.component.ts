import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProdutoService, ProdutoCafeteria } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edicao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edicao.component.html'
})
export class EdicaoComponent implements OnInit {

  produto: ProdutoCafeteria = {
    id: 0,
    nome: '',
    preco: 0,
    quantidadeEstoque: 0
  };

  isEdicao: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Bloqueia usuario comum caso tente acessar pela URL
    if (!this.authService.isAdmin()) {
      alert('Acesso negado: Apenas administradores podem cadastrar ou editar produtos.');
      this.router.navigate(['/painel/lista']);
      return;
    }

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.isEdicao = true;
      const idNum = Number(paramId);
      const itemEncontrado = this.produtoService.obterPorId(idNum);
      if (itemEncontrado) {
        this.produto = { ...itemEncontrado };
      }
    }
  }

  salvar(): void {
    if (!this.produto.nome.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    if (this.isEdicao) {
      this.produtoService.atualizar(this.produto.id, this.produto);
    } else {
      this.produtoService.adicionar(this.produto);
    }

    this.router.navigate(['/painel/lista']);
  }
}
