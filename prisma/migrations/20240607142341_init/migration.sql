-- CreateTable
CREATE TABLE `acolhidas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` TEXT NULL,
    `data_nascimento` DATE NULL,
    `rg` VARCHAR(50) NULL,
    `estado_civil` VARCHAR(50) NULL,
    `filiacao_genitor` TEXT NULL,
    `filiacao_genitora` TEXT NULL,
    `telefone` VARCHAR(50) NULL,
    `escolaridade` VARCHAR(50) NULL,
    `alfabetizada` VARCHAR(50) NULL,
    `experiencia_profissional` LONGTEXT NULL,
    `funcao` TEXT NULL,
    `registro_carteira` TEXT NULL,
    `saude` TEXT NULL,
    `pre_natal` VARCHAR(50) NULL,
    `tempo_gestacao` VARCHAR(50) NULL,
    `apresenta_problema_saude` VARCHAR(50) NULL,
    `problemas_saude` LONGTEXT NULL,
    `tratamento_problema_saude` LONGTEXT NULL,
    `portador_necessidades_especiais` VARCHAR(50) NULL,
    `necessidades_especiais` VARCHAR(50) NULL,
    `tratamento_necessidades_especiais` VARCHAR(50) NULL,
    `cadastro_unico` VARCHAR(50) NULL,
    `bolsa_familia` VARCHAR(50) NULL,
    `valor_bolsa_familia` VARCHAR(50) NULL,
    `pensao` VARCHAR(50) NULL,
    `valor_pensao` VARCHAR(50) NULL,
    `historia_pregressa_atual` LONGTEXT NULL,
    `cpf` VARCHAR(50) NULL,
    `data_cadastro` DATETIME(0) NULL,

    INDEX `cpf`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `composicao_familiar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_acolhida` INTEGER NULL,
    `nome_familiar` TEXT NULL,
    `parentesco` TEXT NULL,
    `data_nascimento` DATE NULL,
    `escolaridade` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `session_id` VARCHAR(128) NOT NULL,
    `expires` INTEGER UNSIGNED NOT NULL,
    `data` MEDIUMTEXT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(250) NOT NULL DEFAULT '0',
    `tipo` VARCHAR(250) NOT NULL DEFAULT '0',
    `usuario` VARCHAR(250) NOT NULL DEFAULT '0',
    `senha` VARCHAR(250) NOT NULL DEFAULT '0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benfeitores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` TEXT NOT NULL,
    `razao_social` TEXT NOT NULL,
    `cnpj` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(50) NOT NULL,
    `telefone` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
