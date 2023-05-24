# APP - SOSIT

## RF (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como usuário;
- [x] Deve ser possível se cadastrar como empresa;

- [x] Deve ser possível se autenticar como usuário;
- [x] Deve ser possível se autenticar como empresa;

- [x] Deve ser possível obter as informações da empresa;
- [x] Deve ser possível obter as informações do usuário;

- [x] Deve ser possível excluir o cadastro do usuário;
- [x] Deve ser possível excluir o cadastro do empresa;

- [x] Deve ser possível cadastrar a agenda;
- [x] Deve ser possível obter as informações da agenda;

- [x] Deve ser possível pesquisar a agenda por serviços;

- [x] Deve ser possível marcar compromissos na agenda;

- [x] Deve ser possível desmarcar compromissos na agenda;

- [x] Deve ser possível obter o historioco de compromissos;

## RN (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um cpf duplicado;
- [x] A empresa não deve poder se cadastrar com um cnpj duplicado;

- [x] O usuário não pode marcar dois compromissos no mesmo horário;
- [x] A empresa não pode marcar dois compromissos no mesmo horário;

## RNF (Requisitos não funcionais)

- [x] A senha do usuário e da empresa precisam estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;


<!-- - [] Todas listas de dados precisam estar paginadas com 20 itens por páginas; -->
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
