import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDepartamento, Departamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from './departamento.service';
import { ITarea } from 'app/shared/model/tarea.model';
import { TareaService } from 'app/entities/tarea';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa';

@Component({
  selector: 'jhi-departamento-update',
  templateUrl: './departamento-update.component.html'
})
export class DepartamentoUpdateComponent implements OnInit {
  isSaving: boolean;

  tareas: ITarea[];

  empresas: IEmpresa[];

  editForm = this.fb.group({
    id: [],
    nombreDepartamento: [null, [Validators.required]],
    tareas: [],
    empresa: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected departamentoService: DepartamentoService,
    protected tareaService: TareaService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ departamento }) => {
      this.updateForm(departamento);
    });
    this.tareaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITarea[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITarea[]>) => response.body)
      )
      .subscribe((res: ITarea[]) => (this.tareas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.empresaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpresa[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpresa[]>) => response.body)
      )
      .subscribe((res: IEmpresa[]) => (this.empresas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(departamento: IDepartamento) {
    this.editForm.patchValue({
      id: departamento.id,
      nombreDepartamento: departamento.nombreDepartamento,
      tareas: departamento.tareas,
      empresa: departamento.empresa
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const departamento = this.createFromForm();
    if (departamento.id !== undefined) {
      this.subscribeToSaveResponse(this.departamentoService.update(departamento));
    } else {
      this.subscribeToSaveResponse(this.departamentoService.create(departamento));
    }
  }

  private createFromForm(): IDepartamento {
    return {
      ...new Departamento(),
      id: this.editForm.get(['id']).value,
      nombreDepartamento: this.editForm.get(['nombreDepartamento']).value,
      tareas: this.editForm.get(['tareas']).value,
      empresa: this.editForm.get(['empresa']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartamento>>) {
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

  trackTareaById(index: number, item: ITarea) {
    return item.id;
  }

  trackEmpresaById(index: number, item: IEmpresa) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
