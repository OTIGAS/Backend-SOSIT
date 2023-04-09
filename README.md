# APP - Gympass style app

## RF (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como usuário;
- [x] Deve ser possível se cadastrar como empresa;

- [] Deve ser possível se autenticar como usuário;
- [] Deve ser possível se autenticar como empresa;

- [] Deve ser possível obter as informações da empresa como usuário;
- [] Deve ser possível obter as informações do usuário como empresa;

- [] Deve ser possível excluir o cadastro do usuário como usuário;
- [] Deve ser possível excluir o cadastro do empresa como empresa;

- [] Deve ser possível cadastrar as agendas como empresa;
- [] Deve ser possível obter as informações das proprias agendas como empresa;

- [] Deve ser possível pesquisar agendas por serviços como usuário;
- [] Deve ser possível obter as informações das agendas como usuário;

- [] Deve ser possível marcar compromissos nas proprias agendas como empresa;
- [] Deve ser possível marcar um compromisso na agenda como empresa ou usuário;

- [] Deve ser possível desmarcar compromissos nas proprias agendas como empresa;
- [] Deve ser possível desmarcar compromissos que partícipe como usuário;

- [] Deve ser possível obter o historioco de compromissos que partícipe como usuário;
- [] Deve ser possível obter o historioco de compromissos das prorprias agendas como empresa;

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
