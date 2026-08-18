import { Injectable } from '@angular/core';

export interface ProdutoCafeteria {
  id: number;
  nome: string;
  preco: number;
  quantidadeEstoque: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // Lista local dos produtos da cafeteria
  private produtos: ProdutoCafeteria[] = [];

  constructor() {
    // Tenta carregar do localStorage
    const dadosSalvos = localStorage.getItem('produtos_cafeteria');
    if (dadosSalvos) {
      this.produtos = JSON.parse(dadosSalvos);
    } else {
      // Produtos de cafeteria cadastrados por padrao
      this.produtos = [
        { id: 1, nome: 'Café Expresso Tradicional', preco: 6.50, quantidadeEstoque: 45 },
        { id: 2, nome: 'Cappuccino com Canela', preco: 9.90, quantidadeEstoque: 20 },
        { id: 3, nome: 'Pão de Queijo Mineiro', preco: 4.50, quantidadeEstoque: 60 },
        { id: 4, nome: 'Bolo de Cenoura com Chocolate', preco: 8.00, quantidadeEstoque: 15 }
      ];
      this.salvarNoStorage();
    }
  }

  // Atualiza os dados no localStorage
  private salvarNoStorage(): void {
    localStorage.setItem('produtos_cafeteria', JSON.stringify(this.produtos));
  }

  // Listar todos os produtos
  listar(): ProdutoCafeteria[] {
    return this.produtos;
  }

  // Buscar produto pelo ID
  obterPorId(id: number): ProdutoCafeteria | undefined {
    return this.produtos.find(p => p.id === id);
  }

  // Adicionar novo produto
  adicionar(produto: ProdutoCafeteria): void {
    produto.id = new Date().getTime();
    this.produtos.push(produto);
    this.salvarNoStorage();
  }

  // Atualizar produto existente
  atualizar(id: number, produtoAtualizado: ProdutoCafeteria): void {
    const indice = this.produtos.findIndex(p => p.id === id);
    if (indice !== -1) {
      this.produtos[indice] = { ...produtoAtualizado, id: id };
      this.salvarNoStorage();
    }
  }

  // Remover produto da lista
  excluir(id: number): void {
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarNoStorage();
  }
}
