/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TareaComponentsPage, TareaDeleteDialog, TareaUpdatePage } from './tarea.page-object';

const expect = chai.expect;

describe('Tarea e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tareaUpdatePage: TareaUpdatePage;
  let tareaComponentsPage: TareaComponentsPage;
  let tareaDeleteDialog: TareaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tareas', async () => {
    await navBarPage.goToEntity('tarea');
    tareaComponentsPage = new TareaComponentsPage();
    await browser.wait(ec.visibilityOf(tareaComponentsPage.title), 5000);
    expect(await tareaComponentsPage.getTitle()).to.eq('pruebaBackApp.tarea.home.title');
  });

  it('should load create Tarea page', async () => {
    await tareaComponentsPage.clickOnCreateButton();
    tareaUpdatePage = new TareaUpdatePage();
    expect(await tareaUpdatePage.getPageTitle()).to.eq('pruebaBackApp.tarea.home.createOrEditLabel');
    await tareaUpdatePage.cancel();
  });

  it('should create and save Tareas', async () => {
    const nbButtonsBeforeCreate = await tareaComponentsPage.countDeleteButtons();

    await tareaComponentsPage.clickOnCreateButton();
    await promise.all([tareaUpdatePage.setTituloInput('titulo'), tareaUpdatePage.setDescripcionInput('descripcion')]);
    expect(await tareaUpdatePage.getTituloInput()).to.eq('titulo', 'Expected Titulo value to be equals to titulo');
    expect(await tareaUpdatePage.getDescripcionInput()).to.eq('descripcion', 'Expected Descripcion value to be equals to descripcion');
    await tareaUpdatePage.save();
    expect(await tareaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tareaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tarea', async () => {
    const nbButtonsBeforeDelete = await tareaComponentsPage.countDeleteButtons();
    await tareaComponentsPage.clickOnLastDeleteButton();

    tareaDeleteDialog = new TareaDeleteDialog();
    expect(await tareaDeleteDialog.getDialogTitle()).to.eq('pruebaBackApp.tarea.delete.question');
    await tareaDeleteDialog.clickOnConfirmButton();

    expect(await tareaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
