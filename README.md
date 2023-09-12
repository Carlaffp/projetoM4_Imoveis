# Projeto Final: KImóveis - TypeORM com Relacionamentos
Neste projeto o objetivo foi desenvolver uma aolicação para o gerenciamento de uma imobiliária.
Através da aplicação é possível realizar o cadastro de imóveis e de usuários interessados na aquisição de propriedades. Além disso, é possível realizar o agendamento e consultar horários de visitas às propriedades disponíveis no banco de dados da imobiliária.

Tecnologias: TypeScript, TypeORM, Express, NodeJs, Bcryptjs (para criptografia de senhas),jsonwebtoken (para autenticação e autorização), serialização com Zod.

## Regras da entrega:
**Criação das tabelas seguindo essas nomenclaturas para banco e entidade:**

- Tabela **users**: precisa estar com o nome da sua entidade **User**.
- Tabela **addresses**: precisa estar com o nome da sua entidade **Address**.
- Tabela **categories**: precisa estar com o nome da sua entidade **Category**.
- Tabela **realEstates**: precisa estar com o nome da sua entidade **RealEstate**.
- Tabela **schedules**: precisa estar com o nome da sua entidade **Schedule**.

## Endpoints:

| Método | Endpoint                   | Responsabilidade                                  | Autenticação                           |
| ------ | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| POST   | /users                     | Criação de usuário                                | Qualquer usuário, não necessita token  |
| GET    | /users                     | Lista todos os usuários                           | Apenas Admnistradores                  |
| PATCH  | /users/:id                 | Atualiza um usuário                               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id                 | Realiza um soft delete no usuário                 | Apenas Admnistradores                  |
| POST   | /login                     | Gera o token de autenticação                      | Qualquer usuário, não necessita token  |
| POST   | /categories                | Criação de categoria                              | Apenas Admnistradores                  |
| GET    | /categories                | Lista todas as categorias                         | Qualquer usuário, não necessita token  |
| GET    | /categories/:id/realEstate | Lista todos imóveis que pertencem a uma categoria | Qualquer usuário, não necessita token  |
| POST   | /realEstate                | Criação de um imóvel                              | Apenas Admnistradores                  |
| GET    | /realEstate                | Lista todos os imóveis                            | Qualquer usuário, não necessita token  |
| POST   | /schedules                 | Agenda uma visita a um imóvel                     | Qualquer usuário, obrigatório token    |
| GET    | /schedules/realEstate/:id  | lista todos os agendamentos de um imóvel          | Apenas Admnistradores                  |

## Requisitos do Serviço:

### POST - /users

- Rota para criação de usuário com os seguintes dados:
  - **id**: number AUTOINCREMENT. Não deve ser passado, mas gerado pelo typeORM.
  - **name**: string, máximo de 45 caracteres e obrigatório.
  - **email**: string, máximo de 45 caracteres, obrigatório e único.
  - **password**: string, máximo de 120 caracteres e obrigatório. Receberá uma string mas armazenará uma hash gerada com o **bcryptjs diretamente pela entidade do TypeORM**.
  - **admin**: boolean, obrigatório e false por padrão.
  - **createdAt**: Não deve ser passado, mas gerado pelo typeORM.
  - **updatedAt**: Não deve ser passado, mas gerado pelo typeORM.
  - **deletedAt**: Não deve ser passado, mas gerado pelo typeORM.
- A rota de criação deve retornar todos os dados, com **exceção da hash** de senha.
- Não podem ser cadastrados dois usuários com o mesmo **e-mail**.
- A rota **não precisa de autenticação** para ser acessada.

### GET - /users

- A rota deve retornar todos os dados dos usuários, com **exceção da hash de senha**.
- A rota pode ser acessada apenas por usuários administradores.

### PATCH - /users/:id

- A rota deve atualizar os dados do usuário.
- Não deve ser possível atualizar os campos **id** e **admin**.
- Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

### DELETE - /users/:id

- A rota deve realizar um soft delete do usuário.
- A rota pode ser acessada apenas por administradores.
- Não deve ser possível realizar um soft delete em um usuário já deletado.

### POST - /login

- Rota de login recebendo **email** e **password**.
- O login deve validar se o usuário existe e validar se a senha está correta.
- Não deve ser possível realizar o login de um usuário marcado como deletado.
- A rota **não precisa de autenticação** para ser acessada.

### POST - /categories

- Rota para criação de categorias com os seguintes dados:
  - **id**: number AUTOINCREMENT. Não deve ser passado, mas gerado pelo **typeORM**.
  - **name**: string, máximo de 45 caracteres, obrigatório e único.
- Não podem ser cadastradas duas categorias com o mesmo nome.
- A rota pode ser acessada apenas por usuários administradores.

### GET - /categories

- Rota deve listar todas as categorias.
- A rota não precisa de autenticação para ser acessada.

### GET - /categories/:id/realEstate

- Rota deve listar todos os imóveis que pertencem a uma categoria.
- A rota não precisa de autenticação para ser acessada.

### POST - /realEstate

- Rota para criação de um imóvel com os seguintes dados:
  - **id**: number AUTOINCREMENT. Não deve ser passado, mas gerado pelo TypeORM.
  - **value**: decimal, precisão 12 e escala 2, obrigatório e 0 por padrão.
    - Quando trabalhamos com decimal, ela pode ser um number ou string, leve isso em consideração na hora de tipar e validar.
  - **size**: inteiro e obrigatório.
  - **address**: um objeto com os seguintes dados:
    - **street**: string, máximo de 45 caracteres e obrigatório.
    - **zipCode**: string, máximo de 8 caracteres e obrigatório.
    - **number**: number, inteiro, positivo e obrigatório.
    - **city**: string, máximo de 20 caracteres e obrigatório.
    - **state**: string, máximo de 2 caracteres e obrigatório.
  - **categoryId**: number, inteiro e obrigatório.
  - **sold**: Não deve ser passado, mas gerado no momento da validação dos dados no formato boolean com **false** por padrão.
  - **createdAt**: Não deve ser passado, mas gerado pelo typeORM.
  - **updatedAt**: Não deve ser passado, mas gerado pelo typeORM.
- Não podem ser cadastrados dois imóveis com o mesmo endereço.
- A rota pode ser acessada apenas por administradores.

### GET - /realEstate

- Rota deve listar todos os imóveis.
- A rota não precisa de autenticação para ser acessada.

### POST - /schedules

- Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:
  - **id**: number AUTOINCREMENT. Não deve ser passado, mas gerado pelo **TypeORM**.
  - **date**: string da data de agendamento da visita ao imóvel, no formato americano **AAAA-MM-DD**.
  - **hour**: string do horário de agendamento da visita ao imóvel, no formato **HH:MM**.
  - **realEstateId**: number, inteiro e obrigatório.
  - **userId**: Não deve ser passado no body da requisição e sim pego através do token do usuário.
- Não deve ser possível agendar uma visita a um imóvel com a mesma data e hora.
- Não deve ser possível o mesmo **usuário** agendar uma visita a 2 imóveis diferentes com a mesma data e hora.
- Só deve ser possível agendar uma visita durante horário comercial (08:00 as 18:00).
- Só deve ser possível agendar uma visita durante dias úteis (segunda à sexta).
- A rota pode ser acessada tanto por usuários comuns quanto administradores.

### GET - /schedules/realEstate/:id

- Rota deve listar todos os agendamentos de um imóvel.
- A rota pode ser acessada apenas por administradores.
