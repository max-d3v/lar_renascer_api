/*
  Warnings:

  - Added the required column `tipo` to the `benfeitores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `benfeitores` ADD COLUMN `tipo` VARCHAR(50) NOT NULL,
    MODIFY `nome` TEXT NULL,
    MODIFY `razao_social` TEXT NULL,
    MODIFY `cnpj` VARCHAR(50) NULL,
    MODIFY `cpf` VARCHAR(50) NULL,
    MODIFY `telefone` VARCHAR(50) NULL;
