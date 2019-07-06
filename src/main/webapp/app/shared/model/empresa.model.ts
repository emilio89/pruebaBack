import { IDepartamento } from 'app/shared/model/departamento.model';

export interface IEmpresa {
  id?: number;
  nombreEmpresa?: string;
  departaments?: IDepartamento[];
}

export class Empresa implements IEmpresa {
  constructor(public id?: number, public nombreEmpresa?: string, public departaments?: IDepartamento[]) {}
}
