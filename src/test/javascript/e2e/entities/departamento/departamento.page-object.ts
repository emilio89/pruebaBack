import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DepartamentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-departamento div table .btn-danger'));
  title = element.all(by.css('jhi-departamento div h2#page-heading span')).first();

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

export class DepartamentoUpdatePage {
  pageTitle = element(by.id('jhi-departamento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreDepartamentoInput = element(by.id('field_nombreDepartamento'));
  tareaSelect = element(by.id('field_tarea'));
  empresaSelect = element(by.id('field_empresa'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreDepartamentoInput(nombreDepartamento) {
    await this.nombreDepartamentoInput.sendKeys(nombreDepartamento);
  }

  async getNombreDepartamentoInput() {
    return await this.nombreDepartamentoInput.getAttribute('value');
  }

  async tareaSelectLastOption(timeout?: number) {
    await this.tareaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tareaSelectOption(option) {
    await this.tareaSelect.sendKeys(option);
  }

  getTareaSelect(): ElementFinder {
    return this.tareaSelect;
  }

  async getTareaSelectedOption() {
    return await this.tareaSelect.element(by.css('option:checked')).getText();
  }

  async empresaSelectLastOption(timeout?: number) {
    await this.empresaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async empresaSelectOption(option) {
    await this.empresaSelect.sendKeys(option);
  }

  getEmpresaSelect(): ElementFinder {
    return this.empresaSelect;
  }

  async getEmpresaSelectedOption() {
    return await this.empresaSelect.element(by.css('option:checked')).getText();
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

export class DepartamentoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-departamento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-departamento'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
