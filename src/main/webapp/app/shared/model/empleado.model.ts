import { IDepartamento } from 'app/shared/model/departamento.model';

export interface IEmpleado {
  id?: number;
  idEmpleado?: number;
  nombre?: string;
  salario?: number;
  apellido?: string;
  departamento?: IDepartamento;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public idEmpleado?: number,
    public nombre?: string,
    public salario?: number,
    public apellido?: string,
    public departamento?: IDepartamento
  ) {}
}
