/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepartamentoComponentsPage, DepartamentoDeleteDialog, DepartamentoUpdatePage } from './departamento.page-object';

const expect = chai.expect;

describe('Departamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departamentoUpdatePage: DepartamentoUpdatePage;
  let departamentoComponentsPage: DepartamentoComponentsPage;
  let departamentoDeleteDialog: DepartamentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Departamentos', async () => {
    await navBarPage.goToEntity('departamento');
    departamentoComponentsPage = new DepartamentoComponentsPage();
    await browser.wait(ec.visibilityOf(departamentoComponentsPage.title), 5000);
    expect(await departamentoComponentsPage.getTitle()).to.eq('pruebaBackApp.departamento.home.title');
  });

  it('should load create Departamento page', async () => {
    await departamentoComponentsPage.clickOnCreateButton();
    departamentoUpdatePage = new DepartamentoUpdatePage();
    expect(await departamentoUpdatePage.getPageTitle()).to.eq('pruebaBackApp.departamento.home.createOrEditLabel');
    await departamentoUpdatePage.cancel();
  });

  it('should create and save Departamentos', async () => {
    const nbButtonsBeforeCreate = await departamentoComponentsPage.countDeleteButtons();

    await departamentoComponentsPage.clickOnCreateButton();
    await promise.all([
      departamentoUpdatePage.setNombreDepartamentoInput('nombreDepartamento'),
      // departamentoUpdatePage.tareaSelectLastOption(),
      departamentoUpdatePage.empresaSelectLastOption()
    ]);
    expect(await departamentoUpdatePage.getNombreDepartamentoInput()).to.eq(
      'nombreDepartamento',
      'Expected NombreDepartamento value to be equals to nombreDepartamento'
    );
    await departamentoUpdatePage.save();
    expect(await departamentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await departamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Departamento', async () => {
    const nbButtonsBeforeDelete = await departamentoComponentsPage.countDeleteButtons();
    await departamentoComponentsPage.clickOnLastDeleteButton();

    departamentoDeleteDialog = new DepartamentoDeleteDialog();
    expect(await departamentoDeleteDialog.getDialogTitle()).to.eq('pruebaBackApp.departamento.delete.question');
    await departamentoDeleteDialog.clickOnConfirmButton();

    expect(await departamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
