/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmpleadoComponentsPage, EmpleadoDeleteDialog, EmpleadoUpdatePage } from './empleado.page-object';

const expect = chai.expect;

describe('Empleado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empleadoUpdatePage: EmpleadoUpdatePage;
  let empleadoComponentsPage: EmpleadoComponentsPage;
  let empleadoDeleteDialog: EmpleadoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Empleados', async () => {
    await navBarPage.goToEntity('empleado');
    empleadoComponentsPage = new EmpleadoComponentsPage();
    await browser.wait(ec.visibilityOf(empleadoComponentsPage.title), 5000);
    expect(await empleadoComponentsPage.getTitle()).to.eq('pruebaBackApp.empleado.home.title');
  });

  it('should load create Empleado page', async () => {
    await empleadoComponentsPage.clickOnCreateButton();
    empleadoUpdatePage = new EmpleadoUpdatePage();
    expect(await empleadoUpdatePage.getPageTitle()).to.eq('pruebaBackApp.empleado.home.createOrEditLabel');
    await empleadoUpdatePage.cancel();
  });

  it('should create and save Empleados', async () => {
    const nbButtonsBeforeCreate = await empleadoComponentsPage.countDeleteButtons();

    await empleadoComponentsPage.clickOnCreateButton();
    await promise.all([
      empleadoUpdatePage.setIdEmpleadoInput('5'),
      empleadoUpdatePage.setNombreInput('nombre'),
      empleadoUpdatePage.setSalarioInput('5'),
      empleadoUpdatePage.setApellidoInput('apellido'),
      empleadoUpdatePage.departamentoSelectLastOption()
    ]);
    expect(await empleadoUpdatePage.getIdEmpleadoInput()).to.eq('5', 'Expected idEmpleado value to be equals to 5');
    expect(await empleadoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await empleadoUpdatePage.getSalarioInput()).to.eq('5', 'Expected salario value to be equals to 5');
    expect(await empleadoUpdatePage.getApellidoInput()).to.eq('apellido', 'Expected Apellido value to be equals to apellido');
    await empleadoUpdatePage.save();
    expect(await empleadoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await empleadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Empleado', async () => {
    const nbButtonsBeforeDelete = await empleadoComponentsPage.countDeleteButtons();
    await empleadoComponentsPage.clickOnLastDeleteButton();

    empleadoDeleteDialog = new EmpleadoDeleteDialog();
    expect(await empleadoDeleteDialog.getDialogTitle()).to.eq('pruebaBackApp.empleado.delete.question');
    await empleadoDeleteDialog.clickOnConfirmButton();

    expect(await empleadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
