import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fornecedor } from '../../../models/fornecedor';
import { FornecedorService } from '../../../services/fornecedor.service';
import { FornecedoresFormComponent } from '../fornecedores-form/fornecedores-form.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedores-list',
  standalone: true,
  imports: [FormsModule, FornecedoresFormComponent, MdbModalModule],
  templateUrl: './fornecedores-list.component.html',
  styleUrl: './fornecedores-list.component.scss'
})
export class FornecedoresListComponent {

  lista: Fornecedor[] = [];
  fornecedorEdit!: Fornecedor;

  fornecedorService = inject(FornecedorService);

  @ViewChild("modalFornecedorForm") modalFornecedorForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.fornecedorService.findAll().subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: () => {
        Swal.fire('Erro ao carregar fornecedores!', '', 'error');
      }
    });
  }

  delete(fornecedor: Fornecedor) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fornecedorService.deleteById(fornecedor.id).subscribe({
          next: () => {
            Swal.fire('Fornecedor deletado com sucesso!', '', 'success');
            this.findAll();
          },
          error: () => {
            Swal.fire('Erro ao deletar fornecedor! Verifique se ele possui produtos vinculados.', '', 'error');
          }
        });
      }
    });
  }

  new() {
    this.fornecedorEdit = new Fornecedor();
    this.modalRef = this.modalService.open(this.modalFornecedorForm, { modalClass: 'modal-lg' });
  }

  edit(fornecedor: Fornecedor) {
    this.fornecedorEdit = fornecedor;
    this.modalRef = this.modalService.open(this.modalFornecedorForm, { modalClass: 'modal-lg' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }

}
