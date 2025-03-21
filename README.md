# API para Gestão de Leads, Grupos e Campanhas (Projeto de Estudo)

### **Visão Geral**
Este projeto foi desenvolvido com o objetivo de aprender e praticar conceitos relacionados à criação de APIs RESTful utilizando **TypeScript**, **Express** e **Prisma ORM**. Ele simula a gestão de leads de marketing, grupos e campanhas, permitindo explorar operações CRUD, relacionamentos entre entidades, filtragem, ordenação e paginação.

---

### **Tecnologias Utilizadas**
- **TypeScript**: Para melhorar a tipagem e a organização do código.
- **Express**: Para estruturar a API RESTful de forma simples.
- **Prisma ORM**: Para interagir com o banco de dados de maneira eficiente e prática.
- **Node.js**: Plataforma para execução do código no backend.

---

### **O Que Foi Aprendido?**
- Modelagem de dados utilizando **ORM**.
- Criação de endpoints RESTful e boas práticas.
- Implementação de funcionalidades de filtragem, paginação e ordenação.
- Gerenciamento de relacionamentos entre entidades no banco de dados.
- Utilização de tipos em **TypeScript** para maior segurança no desenvolvimento.

---

### **Modelos de Dados**
Os seguintes modelos foram criados como parte do aprendizado:

1. **Groups**:
    - `id` (int): Identificador único do grupo.
    - `name` (string): Nome único do grupo.
    - `description` (string, opcional): Descrição do grupo.

2. **Leads**:
    - `id` (int): Identificador único do lead.
    - `name` (string): Nome do lead.
    - `email` (string): E-mail exclusivo do lead.
    - `phone` (string, opcional): Telefone do lead.
    - `status` (enum): Estado do lead (ex.: `'Novo'`, `'Contatado'`, etc.).

3. **Campaigns**:
    - `id` (int): Identificador único da campanha.
    - `name` (string): Nome da campanha.
    - `description` (string, opcional): Descrição da campanha.
    - `startDate` (DateTime): Data de início.
    - `endDate` (DateTime, opcional): Data de término.

4. **CampaignLeads**:
    - `leadId` (int): ID do lead associado.
    - `campaignId` (int): ID da campanha associada.
    - `status` (enum): Estado do lead na campanha (ex.: `'Interessado'`, `'Não Interessado'`, etc.).
