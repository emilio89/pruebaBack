import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EmpresaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-empresa div table .btn-danger'));
  title = element.all(by.css('jhi-empresa div h2#page-heading span')).first();

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

export class EmpresaUpdatePage {
  pageTitle = element(by.id('jhi-empresa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nombreEmpresaInput = element(by.id('field_nombreEmpresa'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreEmpresaInput(nombreEmpresa) {
    await this.nombreEmpresaInput.sendKeys(nombreEmpresa);
  }

  async getNombreEmpresaInput() {
    return await this.nombreEmpresaInput.getAttribute('value');
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

export class EmpresaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-empresa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-empresa'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
