## Daily Diet API

    ** Este sistema permite a criação de usuários e o registro de suas refeições, fornecendo métricas sobre as mesmas. As refeições podem ser marcadas como dentro ou fora da dieta e associadas a um usuário específico.

# Funcionalidades

    - Criar usuário: é possível criar um novo usuário, fornecendo um nome, um e-mail único e password.

    - Identificar usuário: ao efetuar login, o usuário é identificado através de um token único que é enviado em todas as requisições subsequentes.

    - Registrar refeição: é possível registrar uma refeição feita, fornecendo o nome, descrição, data e hora, e se está dentro ou não da dieta. As refeições são relacionadas a um usuário específico.

    - Editar refeição: é possível editar uma refeição já registrada, alterando as informações como nome, descrição, data e hora e status da dieta.

    - Apagar refeição: é possível remover uma refeição previamente registrada.

    - Listar refeições: é possível visualizar todas as refeições registradas por um usuário específico.

    - Visualizar refeição: é possível visualizar informações detalhadas sobre uma única refeição.

    - Recuperar métricas: é possível recuperar as métricas de um usuário, como a quantidade total de refeições registradas, a quantidade total de refeições dentro da dieta, a  quantidade total de refeições fora da dieta e a melhor sequência por dia de refeições dentro da dieta.

# Tecnologias utilizadas

O sistema foi desenvolvido utilizando as seguintes tecnologias:

    - Node.js
    - fastify
    - Postgres
    - PrismaIO

# Como rodar o projeto

    - Faça um clone do repositório: git clone https://github.com/Hauagge/Daily-Diet-API
    - Entre na pasta do projeto: cd Daily-Diet-API
    - Instale as dependências: yarn
    - Rode as migrations: yarn prisma migrate dev
    - Inicie o servidor: yarn dev
    - Acesse o sistema no seu navegador: http://localhost:3333

# Rotas disponíveis

    - POST /users - Cria um novo usuário
    - POST /users/sessions - Efetua login de um usuário
    - POST /meals - Registra uma nova refeição
    - PUT /meals/:mealId - Edita uma refeição existente
    - DELETE /meals/:mealId - Remove uma refeição existente
    - GET /meals - Lista todas as refeições registradas pelo usuário logado
    - GET /meals/:mealId - Retorna informações detalhadas sobre uma refeição específica
    - GET /meals/metrics - Retorna as métricas do usuário logado

# Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
