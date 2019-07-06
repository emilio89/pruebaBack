import { IDepartamento } from 'app/shared/model/departamento.model';

export interface ITarea {
  id?: number;
  titulo?: string;
  descripcion?: string;
  departamentos?: IDepartamento[];
}

export class Tarea implements ITarea {
  constructor(public id?: number, public titulo?: string, public descripcion?: string, public departamentos?: IDepartamento[]) {}
}
