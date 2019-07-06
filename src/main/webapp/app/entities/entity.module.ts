import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        loadChildren: './region/region.module#PruebaBackRegionModule'
      },
      {
        path: 'country',
        loadChildren: './country/country.module#PruebaBackCountryModule'
      },
      {
        path: 'location',
        loadChildren: './location/location.module#PruebaBackLocationModule'
      },
      {
        path: 'department',
        loadChildren: './department/department.module#PruebaBackDepartmentModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#PruebaBackTaskModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#PruebaBackEmployeeModule'
      },
      {
        path: 'job',
        loadChildren: './job/job.module#PruebaBackJobModule'
      },
      {
        path: 'job-history',
        loadChildren: './job-history/job-history.module#PruebaBackJobHistoryModule'
      },
      {
        path: 'empleado',
        loadChildren: './empleado/empleado.module#PruebaBackEmpleadoModule'
      },
      {
        path: 'departamento',
        loadChildren: './departamento/departamento.module#PruebaBackDepartamentoModule'
      },
      {
        path: 'empresa',
        loadChildren: './empresa/empresa.module#PruebaBackEmpresaModule'
      },
      {
        path: 'tarea',
        loadChildren: './tarea/tarea.module#PruebaBackTareaModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaBackEntityModule {}
