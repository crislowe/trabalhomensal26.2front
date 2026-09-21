import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../models/produto';
import { Fornecedor } from '../../../models/fornecedor';
import { ProdutoService } from '../../../services/produto.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './produtos-form.component.html',
  styleUrl: './produtos-form.component.scss'
})
export class ProdutosFormComponent {

  @Input("produto") produto: Produto = new Produto();
  @Output("meuEvento") meuEvento = new EventEmitter();

  listaFornecedores: Fornecedor[] = [];
  categorias = ['BEBIDA_QUENTE', 'BEBIDA_FRIA', 'DOCE', 'SALGADO'];

  produtoService = inject(ProdutoService);
  fornecedorService = inject(FornecedorService);

  constructor() {
    this.findAllFornecedores();
  }

  findAllFornecedores() {
    this.fornecedorService.findAll().subscribe({
      next: (lista) => {
        this.listaFornecedores = lista;
      },
      error: () => {
        Swal.fire('Erro ao carregar fornecedores!', '', 'error');
      }
    });
  }

  save() {
    if (this.produto.id > 0) {
      this.produtoService.update(this.produto, this.produto.id).subscribe({
        next: () => {
          Swal.fire('Produto atualizado com sucesso!', '', 'success');
          this.meuEvento.emit('OK');
        },
        error: () => {
          Swal.fire('Erro ao atualizar produto!', '', 'error');
        }
      });
    } else {
      this.produtoService.save(this.produto).subscribe({
        next: () => {
          Swal.fire('Produto salvo com sucesso!', '', 'success');
          this.meuEvento.emit('OK');
        },
        error: () => {
          Swal.fire('Erro ao salvar produto!', '', 'error');
        }
      });
    }
  }

}
