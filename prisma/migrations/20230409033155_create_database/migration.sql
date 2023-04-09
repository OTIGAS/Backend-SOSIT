-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "nascimento" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,
    "razao_social" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "sobre" TEXT,
    "img_perfil" TEXT,
    "link_google" TEXT,
    "telefone" TEXT,
    "email_contato" TEXT,
    "nome_contato" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "descricao" TEXT,
    "dias_semana" TEXT[] DEFAULT ARRAY['seg', 'ter', 'qua', 'qui', 'sex', 'sab']::TEXT[],
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_senha_hash_key" ON "users"("senha_hash");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "companies_senha_hash_key" ON "companies"("senha_hash");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
