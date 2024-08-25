const { Builder, By, until } = require('selenium-webdriver');
const xlsx = require('xlsx');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const planilhaClientes = xlsx.readFile('dados_clientes.xlsx');
const paginaClientes = xlsx.utils.sheet_to_json(planilhaClientes.Sheets['Sheet1']);

const planilhaFechamento = xlsx.readFile('planilha_fechamento.xlsx');
const paginaFechamento = xlsx.utils.sheet_to_json(planilhaFechamento.Sheets['Planilha1']);

let driver = new Builder().forBrowser('chrome').build();

(async function main() {
  try {
    // Site que o script entra
    await driver.get('http://localhost:3000/');
    await sleep(2000);

    for (let linha of paginaClientes) {
      const { Nome: nome, Valor: valor, CPF: cpf, Vencimento: vencimento } = linha;

      let campoPesquisa = await driver.findElement(By.id('cpfInput'));
      await campoPesquisa.clear();
      await campoPesquisa.sendKeys(cpf);
      await sleep(1000);

      let botaoPesquisar = await driver.findElement(By.className('btn-consultar'));
      await botaoPesquisar.click();
      await sleep(4000);

      try {
        let statusElement = await driver.wait(until.elementLocated(By.className('status-value')), 10000);
        let status = await statusElement.getText();

        if (status === 'em dia') {
          let dataPagamento = await driver.findElement(By.className('data-value')).getText();
          
          const dataFormatada = new Date(dataPagamento).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });

          let metodoPagamento = await driver.findElement(By.className('metodo-value')).getText();
          paginaFechamento.push({ Nome: nome, Valor: valor, CPF: cpf, Vencimento: vencimento, Status: 'Em dia', "Data pagamento": dataFormatada, "Metodo de Pagamento": metodoPagamento });
        } else {
          paginaFechamento.push({ Nome: nome, Valor: valor, CPF: cpf, Vencimento: vencimento, Status: 'Pendente' });
        }

      } catch (e) {
        console.error(`Erro ao processar o CPF ${cpf}: ${e}`);
      }
    }

  } finally {
    await driver.quit();

    const novaPlanilha = xlsx.utils.book_new();
    const novaPagina = xlsx.utils.json_to_sheet(paginaFechamento);
    xlsx.utils.book_append_sheet(novaPlanilha, novaPagina, 'Planilha1');
    xlsx.writeFile(novaPlanilha, 'planilha_fechamento_atualizada.xlsx');
  }
})();
