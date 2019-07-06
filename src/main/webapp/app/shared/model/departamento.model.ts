import { IEmpleado } from 'app/shared/model/empleado.model';
import { ITarea } from 'app/shared/model/tarea.model';
import { IEmpresa } from 'app/shared/model/empresa.model';

export interface IDepartamento {
  id?: number;
  nombreDepartamento?: string;
  empleados?: IEmpleado[];
  tareas?: ITarea[];
  empresa?: IEmpresa;
}

export class Departamento implements IDepartamento {
  constructor(
    public id?: number,
    public nombreDepartamento?: string,
    public empleados?: IEmpleado[],
    public tareas?: ITarea[],
    public empresa?: IEmpresa
  ) {}
}
