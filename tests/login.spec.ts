import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) =>{
  await page.goto('file:///C:/Users/Marco%20Figueiredo/projeto-login/index%20(1).html')
})

test.describe('Login com sucesso', async () =>{

  test('Usuário e senha corretos', async ({ page }) => {
    // Preenchendo o campo usuário corretamente
    const campoUsuario = await page.locator('#login-email');
    await campoUsuario.fill('teste@email.com');
    // Preenchendo o campo senha corretamente
    const campoSenha = await page.locator('#login-password');
    await campoSenha.fill('Senha@123');
    // Clicando no botão salvar
    const botaoSalvar = await page.locator('#btn-login');
    await botaoSalvar.click()
    // Validando mensagem de "Login realizado"
    await expect(page.getByText('Login realizado')).toBeVisible();

})
});

test.describe('Login com falha', async () => {

  test('Usuário incorreto', async ({ page }) => {
    // Preenchendo o campo usuário incorretamente
    const campoUsuario = await page.locator('#login-email');
    await campoUsuario.fill('emailerrado');
    // Preenchendo o campo senha corretamente
    const campoSenha = await page.locator('#login-password');
    await campoSenha.fill('Senha@123');
    // Clicando no botão salvar
    const botaoSalvar = await page.locator('#btn-login');
    await botaoSalvar.click()
    // Validando mensagem de "E-mail inválido"
    await expect(page.getByText('E-mail inválido')).toBeVisible();
})

  test('Senha incorreta', async ({ page }) => {
    // Preenchendo o campo usuário incorretamente
    const campoUsuario = await page.locator('#login-email');
    await campoUsuario.fill('emailerrado');
    // Preenchendo o campo senha corretamente
    const campoSenha = await page.locator('#login-password');
    await campoSenha.fill('Senha@123');
    // Clicando no botão salvar
    const botaoSalvar = await page.locator('#btn-login');
    await botaoSalvar.click()
    // Validando mensagem de "E-mail inválido"
    await expect(page.getByText('E-mail inválido')).toBeVisible();
})


  test('Obrigatoriedade dos campos', async ({ page }) =>{

    // Clicando em salvar sem preecher nenhum campo
    const botaoSalvar = await page.locator('#btn-login');
    botaoSalvar.click();
    // Validando mensagem de obrigatoriedade do campo email
    await expect(page.locator('#hint-login-email')).toBeVisible();
    // Validando mensagem de obrigatoriedade do campo senha
    await expect(page.locator('#hint-login-password')).toBeVisible();

  })  


})






