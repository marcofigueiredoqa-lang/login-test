import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) =>{
  await page.goto('file:///C:/Users/Marco%20Figueiredo/projeto-login/index%20(1).html')
  const abaCadastro = await page.locator('#tab-register');
  await abaCadastro.click();
})


test.describe('Cadastro com sucesso', async () => {

    test('Cadastro válido', async ({ page }) => {
        // Preenchendo nome
        const campoNome = await page.locator('#reg-name');
        await campoNome.fill('Marco Junio dos Santos');
        // Preenchendo e-mail
        const campoEmail = await page.locator('#reg-email');          
        await campoEmail.fill('teste@gmail.com');  
        // Preenchendo senha
        const campoSenha = await page.locator('#reg-password');          
        await campoSenha.fill('Senha123'); 
        // Preenchendo confirmação da senha
        const campoSenhaConfirm = await page.locator('#reg-confirm');
        await campoSenhaConfirm.fill('Senha123');
        // Clicando em salvar
        const botaoSalvar = await page.locator('#btn-register')
        await botaoSalvar.click()
        // Validando mensagem de sucesso
        expect(await page.getByText('Cadastro realizado com sucesso!')).toBeVisible;
    })

} )

test.describe('Cadastro com falha', async () => {

    test('Obrigatoriedade dos campos', async ({ page }) =>{
        // Clicando em "Salvar"
        const botaoSalvar = await page.locator('#btn-register');
        await botaoSalvar.click();
        // Verificando obrigatoriedade no campo nome
        await expect(page.locator('#hint-reg-name')).toBeVisible();
        // Verificando obrigatoriedade no campo e-mail
        await expect(page.locator('#hint-reg-email')).toBeVisible();
        // Verificando obrigatoriedade no campo senha
        await expect(page.locator('#hint-reg-password')).toBeVisible();
        // Verificando obrigatoriedade no campo confirmar senha
        await expect(page.locator('#hint-reg-confirm')).toBeVisible();
    })
    
    test('E-mail incorreto', async ({ page }) => {
        // Preenchendo nome
        const campoNome = await page.locator('#reg-name');
        await campoNome.fill('Marco Junio dos Santos');
        // Preenchendo e-mail incorretamente
        const campoEmail = await page.locator('#reg-email');          
        await campoEmail.fill('emailincorreto');  
        // Preenchendo senha
        const campoSenha = await page.locator('#reg-password');          
        await campoSenha.fill('Senha123'); 
        // Preenchendo confirmação da senha
        const campoSenhaConfirm = await page.locator('#reg-confirm');
        await campoSenhaConfirm.fill('Senha123');
        // Clicando em salvar
        const botaoSalvar = await page.locator('#btn-register')
        await botaoSalvar.click()
        // Validando mensagem de erro 
        expect(await page.getByText('E-mail inválido')).toBeVisible;
    })

    test('Senhas não conferem', async ({ page }) => {
        // Preenchendo nome
        const campoNome = await page.locator('#reg-name');
        await campoNome.fill('Marco Junio dos Santos');
        // Preenchendo e-mail
        const campoEmail = await page.locator('#reg-email');          
        await campoEmail.fill('email@teste.com');  
        // Preenchendo senha incorretamente
        const campoSenha = await page.locator('#reg-password');          
        await campoSenha.fill('Senha1234'); 
        // Preenchendo confirmação da senha
        const campoSenhaConfirm = await page.locator('#reg-confirm');
        await campoSenhaConfirm.fill('Senha123');
        // Clicando em salvar
        const botaoSalvar = await page.locator('#btn-register')
        await botaoSalvar.click()
        // Validando mensagem de erro 
        expect(await page.getByText('As senhas não coincidem')).toBeVisible;
    })

} )
