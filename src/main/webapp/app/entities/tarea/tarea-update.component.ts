import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITarea, Tarea } from 'app/shared/model/tarea.model';
import { TareaService } from './tarea.service';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from 'app/entities/departamento';

@Component({
  selector: 'jhi-tarea-update',
  templateUrl: './tarea-update.component.html'
})
export class TareaUpdateComponent implements OnInit {
  isSaving: boolean;

  departamentos: IDepartamento[];

  editForm = this.fb.group({
    id: [],
    titulo: [],
    descripcion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tareaService: TareaService,
    protected departamentoService: DepartamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tarea }) => {
      this.updateForm(tarea);
    });
    this.departamentoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartamento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartamento[]>) => response.body)
      )
      .subscribe((res: IDepartamento[]) => (this.departamentos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tarea: ITarea) {
    this.editForm.patchValue({
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tarea = this.createFromForm();
    if (tarea.id !== undefined) {
      this.subscribeToSaveResponse(this.tareaService.update(tarea));
    } else {
      this.subscribeToSaveResponse(this.tareaService.create(tarea));
    }
  }

  private createFromForm(): ITarea {
    return {
      ...new Tarea(),
      id: this.editForm.get(['id']).value,
      titulo: this.editForm.get(['titulo']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarea>>) {
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
