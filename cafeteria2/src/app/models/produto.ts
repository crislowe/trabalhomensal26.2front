export class Produto {
  id!: number;
  nome!: string;
  preco!: number;
  quantidade!: number;
  categoria!: string;
  fornecedorId!: number;
  nomeFornecedor?: string;
}
