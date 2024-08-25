<h1 align="center">Automação de Verificação de Pagamentos 📝</h1>

## ⚙️ Funcionalidades
- **📊 Leitura de dados**: Lê dados de clientes de um arquivo Excel (`dados_clientes.xlsx`).
- **🌐 Consulta de status**: Verifica o status de pagamento de cada cliente em um [site web](https://github.com/VitoIanhis/site-consulta-cpf) que você criou.
- **📋 Atualização de planilhas**: Atualiza uma planilha Excel (`planilha_fechamento.xlsx`) com o status de pagamento e outras informações relevantes.
- **📁 Geração de novo arquivo**: Cria um novo arquivo Excel com os resultados (`planilha_fechamento_atualizada.xlsx`).

## 🔨 Ferramentas Utilizadas
- **JavaScript (Node.js)**: Linguagem principal para escrita do script.
- **Selenium WebDriver**: Ferramenta para automação de navegadores.
- **xlsx**: Biblioteca para manipulação de arquivos Excel.

## 📦 Pré-requisitos
- **Node.js**
- **Google Chrome**
- **ChromeDriver**

## 📌 Como Utilizar

### 💻 Instalação

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/VitoIanhis/consultor-de-pagamentos
    cd consultor-de-pagamentos
    ```

2. **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

### 🌟 Configuração das Planilhas

Certifique-se de ter os seguintes arquivos Excel na raiz do projeto:

- `dados_clientes.xlsx`: Deve conter uma folha chamada `Sheet1` com colunas `Nome`, `Valor`, `CPF` e `Vencimento`.
- `planilha_fechamento.xlsx`: Deve conter uma folha chamada `Planilha1`.

### 🚀 Execução do Script

1. Certifique-se de que o [site web](https://github.com/VitoIanhis/site-consulta-cpf) que verifica os status de pagamento está em execução.
2. Execute o script para iniciar a automação:
    ```bash
    node app.js
    ```
3. Após a execução, um novo arquivo chamado `planilha_fechamento_atualizada.xlsx` será gerado com os resultados atualizados.

## 📂 Estrutura do Projeto

```bash
.
├── dados_clientes.xlsx              # Planilha de entrada com dados dos clientes
├── planilha_fechamento.xlsx         # Planilha de entrada para o fechamento
├── planilha_fechamento_atualizada.xlsx  # Planilha gerada com os resultados atualizados
├── app.js                           # Script principal de automação
├── package.json                     # Arquivo de configuração do projeto Node.js
└── README.md                        # Este arquivo
