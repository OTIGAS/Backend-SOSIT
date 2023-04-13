# APP - SOSIT

## RF (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como usuário;
- [x] Deve ser possível se cadastrar como empresa;

- [x] Deve ser possível se autenticar como usuário;
- [x] Deve ser possível se autenticar como empresa;

- [x] Deve ser possível obter as informações da empresa;
- [x] Deve ser possível obter as informações do usuário;

- [] Deve ser possível excluir o cadastro do usuário;
- [] Deve ser possível excluir o cadastro do empresa;

- [] Deve ser possível cadastrar a agenda;
- [] Deve ser possível obter as informações da agenda;

- [] Deve ser possível pesquisar a agenda por serviços;

- [] Deve ser possível marcar compromissos na agenda;

- [] Deve ser possível desmarcar compromissos na agenda;

- [] Deve ser possível obter o historioco de compromissos;

## RN (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um cpf duplicado;
- [x] A empresa não deve poder se cadastrar com um cnpj duplicado;

- [] O usuário não pode marcar dois compromissos no mesmo horário;
- [] A empresa não pode marcar dois compromissos no mesmo horário;

- [] O usuário não pode marcar compromissos sem ter um dia com antecedência;

## RNF (Requisitos não funcionais)

- [] A senha do usuário e da empresa precisam estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;


<!-- - [] Todas listas de dados precisam estar paginadas com 20 itens por páginas; -->
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
