# e-SEMUS – Sistema Integrado de Gestão da SEMUS

### Cobertura de Testes API

[![Testes Unitarios API](https://github.com/heyitsmepablo/sigsars/actions/workflows/testes-unitarios-api.yml/badge.svg?branch=dev&event=push)](https://github.com/heyitsmepablo/sigsars/actions/workflows/testes-unitarios-api.yml)
![Statements](.github/badges/badge-statements.svg)
![Branches](.github/badges/badge-branches.svg)
![Functions](.github/badges/badge-functions.svg)
![Lines](.github/badges/badge-lines.svg)

**Autor:** Pablo Eduardo Silva Santos  
**Status:** Em desenvolvimento

O **e-SEMUS** (Sistema Integrado de Gestão da SEMUS) é um sistema de informação voltado para a gestão e integração de dados da **Secretaria Municipal de Saúde (SEMUS)**, abrangendo todas as suas **superintendências**.  
Este projeto tem como objetivo centralizar e otimizar processos, promover a transparência e facilitar o acesso às informações essenciais para a tomada de decisões estratégicas no setor de saúde pública municipal.

---

## 🔧 Tecnologias Utilizadas

- **Banco de Dados:** [PostgreSQL 17.5](https://www.postgresql.org/)
- **ORM** [Prisma](https://www.prisma.io/)
- **API Backend:** [NestJS](https://nestjs.com/)
- **Web Client:** _Em breve..._

## 🚧 Projeto em Construção

Este repositório está em fase inicial de desenvolvimento. Em breve, serão adicionadas atualizações técnicas, melhorias e documentação detalhada sobre a arquitetura, endpoints da API e interface web.

Fique atento às atualizações futuras!

## 🧩 Módulos

| ✅ Módulo                                            | 📌 Status     |
| ---------------------------------------------------- | ------------- |
| **Boletim Hospitalar**                               | Em construção |
| **Cadastro, Autenticação e Autorização de Usuários** | Em construção |
| **Folha de Pagamento**                               | Em breve      |
| _Em breve mais módulos..._                           | 🔜            |

- **Boletim Hospitalar**  
  Módulo responsável pela gestão dos boletins hospitalares, incluindo ocupação de leitos, admissões, atendimentos de urgência e altas hospitalares.

- **Cadastro, Autenticação e Autorização de Usuários**  
  Módulo responsável pelo cadastro de usuários, autenticação via login e autorização básica para controle de acesso às funcionalidades do sistema.

## 🚀 Próximas Implementações

### 🛠️ API

| ✅ Implementação                                                     | 📌 Status |
| -------------------------------------------------------------------- | --------- |
| **Rota Para Listar Tipos Unidades**                                  | [x]       |
| **Rota Para Listar Unidades**                                        | [x]       |
| **Rota Para Listar Unidades Filtrados pelo Tipo**                    | [x]       |
| **Rota Para Listar Causas**                                          | [x]       |
| **Rota Para Listar Causas Filtrados pelo Tipo**                      | [x]       |
| **Rota Para Listar Causas SRAG**                                     | [x]       |
| **Rota Para Listar todos os Grupos das CIDs**                        | [x]       |
| **Rota Para Listar todas as Categoria das CIDs filtrado pelo Grupo** | [x]       |
| **Rota Para Listar todas CIDs filtrado pela Categoria**              | [x]       |
| **Rota Para Buscar CIDs pelo seu codigo**                            | [x]       |
| **Rota Para Listar CIDs SRAG**                                       | [x]       |
| **Rota Para SignUp (Cadastro de novos usuarios)**                    | [x]       |
| **Rota Para Login**                                                  | [x]       |
| **Rota Para Logout**                                                 | [x]       |
| **Guard de Autenticação (Protege rotas com validação de token JWT)** | [x]       |
| **Rota Para Cadastro de Boletim da Sindrome Gripal**                 | [ ]       |
| **Rota Para Listar Todos os Boletins da Sindrome Gripal**            | [ ]       |
| **Rota Para Cadastrar Boletim da Sindrome Gripal**                   | [ ]       |
| **Rota Para Atualizar Boletim da Sindrome Gripal**                   | [ ]       |
| **Rota Para Cadastrar Ficha de SPA**                                 | [ ]       |
| **Rota Para Listar Todas as Ficha de SPA**                           | [ ]       |
| **Rota Para Abrir Detalhes de uma Ficha de SPA**                     | [ ]       |
| _Em breve mais implementações..._                                    | 🔜        |

---

### 💻 Client

| ✅ Implementação                                             | 📌 Status |
| ------------------------------------------------------------ | --------- |
| **Tela de Formulario de Boletim da Sindrome Gripal**         | [ ]       |
| **Tela de Formulario de Boletim de Admissões da Internação** | [ ]       |
| **Tela de Formulario de Boletim de Atendimentos da Porta**   | [ ]       |
| **Tela de Formulario de Boletim de Saidas**                  | [ ]       |
| _Em breve mais implementações..._                            | 🔜        |

---

### 🗄️ Database

| ✅ Implementação                         | 📌 Status |
| ---------------------------------------- | --------- |
| **Cadastro dos Tipos das Unidades**      | [x]       |
| **Cadastro das Unidades Hospitalares**   | [x]       |
| **Cadastro das Causas do Tipo Externas** | [x]       |
| **Cadastro das Causas do Tipo Queixas**  | [x]       |
| **Cadastro das Causas SRAG**             | [x]       |
| **Cadastro dos Grupos das CIDS**         | [x]       |
| **Cadastro das Categorias das CIDS**     | [x]       |
| **Cadastro das CIDS**                    | [x]       |
| **Cadastro das CIDS SRAG**               | [x]       |
| _Em breve mais implementações..._        | 🔜        |

---

## 📄 Notas do Desenvolvedor

- O cadastro das bases de dados relativas aos **Grupos**, **Categorias** e **Subcategorias** da **Classificação Internacional de Doenças (CID-10)** foi realizado com base em informações oficiais disponibilizadas pelo [DATASUS](https://datasus.saude.gov.br/). As tabelas foram extraídas da versão **CID-10 - Versão 2008**, cujos dados estão disponíveis para consulta e download nos seguintes links oficiais:

  > - 📥 [Tabelas da CID-10 - Versão 2008 (Descrição e Download)](http://www2.datasus.gov.br/cid10/V2008/download.htm)
  > - Os arquivos utilizados para este processo estão em formato [CSV](http://www2.datasus.gov.br/cid10/V2008/descrcsv.htm), conforme disponibilizado pelo DATASUS.
