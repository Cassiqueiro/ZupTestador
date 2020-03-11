const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('CompraAgulha', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('CompraAgulha', async function() {
    await driver.get("https://www.ciata.org.br/loja/")
    await driver.manage().window().setRect(1050, 660)
    await driver.findElement(By.name("busca")).sendKeys("jogo da velha")
    await driver.findElement(By.name("botao")).click()
    assert(await driver.findElement(By.id("nao_achou")).getText() == "Produto não localizado ou indisponível no momento.")
    await driver.findElement(By.name("busca")).sendKeys("agulhas auto-enfiante")
    await driver.findElement(By.name("botao")).click()
    assert(await driver.findElement(By.id("title_holder_1")).getText() == "Agulhas Auto-enfiantes")
    await driver.findElement(By.css("td:nth-child(3) > input")).click()
    assert(await driver.findElement(By.css("a > b")).getText() == "Suas compras: 1 itens, R$ 5,00")
    await driver.findElement(By.css("td:nth-child(2) > a")).click()
    await driver.findElement(By.linkText("Finalizar Compra")).click()
    assert(await driver.getTitle() == "Fechamento :: Tiflotecnia.com")
    await driver.findElement(By.id("logon")).click()
    await driver.findElement(By.name("email")).sendKeys("teste@teste.com")
    await driver.findElement(By.name("pwd")).sendKeys("testers")
    await driver.findElement(By.css("td:nth-child(1) > input")).click()
    assert(await driver.findElement(By.css("#main > h2")).getText() == "Forma de Pagamento e Entrega")
    {
      const dropdown = await driver.findElement(By.name("formapagto"))
      await dropdown.findElement(By.xpath("//option[. = 'CARTÃO DE CRÉDITO VISA']")).click()
    }
    await driver.findElement(By.name("formapagto")).click()
  })
})
