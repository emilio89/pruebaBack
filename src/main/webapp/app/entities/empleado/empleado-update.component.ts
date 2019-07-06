import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from 'app/entities/departamento';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving: boolean;

  departamentos: IDepartamento[];

  editForm = this.fb.group({
    id: [],
    idEmpleado: [null, [Validators.required]],
    nombre: [],
    salario: [],
    apellido: [],
    departamento: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected empleadoService: EmpleadoService,
    protected departamentoService: DepartamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);
    });
    this.departamentoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartamento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartamento[]>) => response.body)
      )
      .subscribe((res: IDepartamento[]) => (this.departamentos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(empleado: IEmpleado) {
    this.editForm.patchValue({
      id: empleado.id,
      idEmpleado: empleado.idEmpleado,
      nombre: empleado.nombre,
      salario: empleado.salario,
      apellido: empleado.apellido,
      departamento: empleado.departamento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id']).value,
      idEmpleado: this.editForm.get(['idEmpleado']).value,
      nombre: this.editForm.get(['nombre']).value,
      salario: this.editForm.get(['salario']).value,
      apellido: this.editForm.get(['apellido']).value,
      departamento: this.editForm.get(['departamento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDepartamentoById(index: number, item: IDepartamento) {
    return item.id;
  }
}
