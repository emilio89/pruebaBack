import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PruebaBackSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PruebaBackSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PruebaBackSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaBackSharedModule {
  static forRoot() {
    return {
      ngModule: PruebaBackSharedModule
    };
  }
}
