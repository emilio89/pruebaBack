import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EmpleadoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-empleado div table .btn-danger'));
  title = element.all(by.css('jhi-empleado div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EmpleadoUpdatePage {
  pageTitle = element(by.id('jhi-empleado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  idEmpleadoInput = element(by.id('field_idEmpleado'));
  nombreInput = element(by.id('field_nombre'));
  salarioInput = element(by.id('field_salario'));
  apellidoInput = element(by.id('field_apellido'));
  departamentoSelect = element(by.id('field_departamento'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdEmpleadoInput(idEmpleado) {
    await this.idEmpleadoInput.sendKeys(idEmpleado);
  }

  async getIdEmpleadoInput() {
    return await this.idEmpleadoInput.getAttribute('value');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return await this.nombreInput.getAttribute('value');
  }

  async setSalarioInput(salario) {
    await this.salarioInput.sendKeys(salario);
  }

  async getSalarioInput() {
    return await this.salarioInput.getAttribute('value');
  }

  async setApellidoInput(apellido) {
    await this.apellidoInput.sendKeys(apellido);
  }

  async getApellidoInput() {
    return await this.apellidoInput.getAttribute('value');
  }

  async departamentoSelectLastOption(timeout?: number) {
    await this.departamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departamentoSelectOption(option) {
    await this.departamentoSelect.sendKeys(option);
  }

  getDepartamentoSelect(): ElementFinder {
    return this.departamentoSelect;
  }

  async getDepartamentoSelectedOption() {
    return await this.departamentoSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EmpleadoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-empleado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-empleado'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
