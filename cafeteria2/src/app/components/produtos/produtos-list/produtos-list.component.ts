import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [FormsModule, ProdutosFormComponent, MdbModalModule],
  templateUrl: './produtos-list.component.html',
  styleUrl: './produtos-list.component.scss'
})
export class ProdutosListComponent {

  lista: Produto[] = [];
  produtoEdit!: Produto;

  produtoService = inject(ProdutoService);

  @ViewChild("modalProdutoForm") modalProdutoForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.produtoService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: () => {
        Swal.fire('Erro ao carregar produtos!', '', 'error');
      }
    });
  }

  delete(produto: Produto) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.deleteById(produto.id).subscribe({
          next: () => {
            Swal.fire('Produto deletado com sucesso!', '', 'success');
            this.findAll();
          },
          error: () => {
            Swal.fire('Erro ao deletar produto!', '', 'error');
          }
        });
      }
    });
  }

  new() {
    this.produtoEdit = new Produto();
    this.modalRef = this.modalService.open(this.modalProdutoForm, { modalClass: 'modal-lg' });
  }

  edit(produto: Produto) {
    this.produtoEdit = produto;
    this.modalRef = this.modalService.open(this.modalProdutoForm, { modalClass: 'modal-lg' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

}
