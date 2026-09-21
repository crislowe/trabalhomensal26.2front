import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Fornecedor } from '../../../models/fornecedor';
import { FornecedorService } from '../../../services/fornecedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedores-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './fornecedores-form.component.html',
  styleUrl: './fornecedores-form.component.scss'
})
export class FornecedoresFormComponent {

  @Input("fornecedor") fornecedor: Fornecedor = new Fornecedor();
  @Output("meuEvento") meuEvento = new EventEmitter();

  fornecedorService = inject(FornecedorService);

  save() {
    if (this.fornecedor.id > 0) {
      this.fornecedorService.update(this.fornecedor, this.fornecedor.id).subscribe({
        next: () => {
          Swal.fire('Fornecedor atualizado com sucesso!', '', 'success');
          this.meuEvento.emit('OK');
        },
        error: () => {
          Swal.fire('Erro ao atualizar fornecedor!', '', 'error');
        }
      });
    } else {
      this.fornecedorService.save(this.fornecedor).subscribe({
        next: () => {
          Swal.fire('Fornecedor salvo com sucesso!', '', 'success');
          this.meuEvento.emit('OK');
        },
        error: () => {
          Swal.fire('Erro ao salvar fornecedor!', '', 'error');
        }
      });
    }
  }

}
