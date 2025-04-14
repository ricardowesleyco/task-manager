<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Instruções para executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/ricardowesleyco/task-manager
cd gerenciador-de-tasks
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (ajuste conforme necessário):

**.env**

```env

DB_PASSWORD=postgres
DB_DATABASENAME= task_db
DB_USERNAME=postgres
DB_URL= postgres
DB_PORT=5432
SCHEMA=task
PORT=3001
BASE_API_PREFIX=api/v1
BASE_API_URL=localhost:3001
JWT_KEY=ANSWER_IS_FOURTY_TWO
PUBLIC_KEY=UNKNOWN_QUESTION

```

### 3. Configure o Docker

Certifique-se de que o Docker está instalado corretamente no seu sistema.

### 4.1 Crie o network no Docker

Execute o comando abaixo para criar o network entre frontend e backend no docker:

```bash
docker network create app-network
```

### 4.2 Suba os containers com Docker Compose

Execute o comando abaixo para iniciar o container :

```bash
docker-compose up --build
```

### 5. Acesse o projeto

- Backend estará disponível em: **http://localhost:3001**

---

### 6. Acesse a documentação

- A documentação em Swagger estará disponível em: **http://localhost:3001/api**

---

### 7. Acesse como usuário

- Usuário admin

```bash
email: admin@email.com
password: admin
```

- Usuário padrão

```bash
email: user@email.com
password: user
```

---

### Para o uso completo da aplicação, utilize junto com o frontend.

- https://github.com/ricardowesleyco/task-manager-frontend

---
