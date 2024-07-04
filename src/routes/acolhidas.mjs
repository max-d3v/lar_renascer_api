import {Router} from "express";
import { checkSchema } from "express-validator";
import { acolhidaSearch } from "../utils/validationSchemas.mjs";
import { matchedData,validationResult } from "express-validator";
import { handleError } from "../utils/helpers.mjs";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

//example POST route using express-validator validation
router.post('/acolhidas', checkSchema(acolhidaSearch), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({status: "error", "message": errors.array()});
    }
    const { acolhida } = matchedData(req);
    var response;
    try {
        if (acolhida !== "") {
            response = await prisma.acolhidas.findMany({
                where: {
                    nome: {
                        contains: acolhida
                    }
                }
            })
        }
        if (acolhida === "") {
            response = await prisma.acolhidas.findMany();
        }
    } catch (error) {
        return handleError(res, error);
    }
    
    

    if (!response || response.length == 0) {
        return handleError(res, "Nenhuma acolhida encontrada.");
        }

    if (response.length >= 1) {
        return res.status(200).send({status: "success", data: response}); 
    }
    
    return handleError(res, "Erro inesperado.");
});
router.post("/acolhidas/register", async (req, res) => {
    const {
        nome,
        dataNascimento,
        rg,
        estadoCivil,
        filiacaoGenitor,
        filiacaoGenitora,
        telefone,
        escolaridade,
        alfabetizada,
        experienciaProfissional,
        funcao,
        registroCarteira,
        saude,
        pre_natal,
        tempoGestacao,
        apresentaProblemaSaude,
        problemas_saude,
        tratamentoProblemaSaude,
        portadorNecessidadesEspeciais,
        necessidadesEspeciais,
        tratamentoNecessidadesEspeciais,
        cadastroUnico,
        bolsaFamilia,
        valorBolsaFamilia,
        pensao,
        valorPensao,
        historiaPregressaAtual,
        cpf,
        naturalidade,
        dataAcolhimento,
        dataDesligamento,
        // dataCadastro e dataAtualizacao são gerados automaticamente
    } = req.body;

    try {
        // Verifica se já existe um registro com o mesmo CPF ou RG
        const existingAcolhida = await prisma.acolhidas.findFirst({
            where: {
                OR: [
                    { cpf },
                    { rg }
                ]
            }
        });

        if (existingAcolhida) {
            return res.status(400).send({ status: "error", message: "Acolhida com este CPF ou RG já existe." });
        }

        // Cria um novo registro na tabela acolhidas
        const newAcolhida = await prisma.acolhidas.create({
            data: {
                nome,
                dataNascimento,
                rg,
                estadoCivil,
                filiacaoGenitor,
                filiacaoGenitora,
                telefone,
                escolaridade,
                alfabetizada,
                experienciaProfissional,
                funcao,
                registroCarteira,
                saude,
                pre_natal,
                tempoGestacao,
                apresentaProblemaSaude,
                problemas_saude,
                tratamentoProblemaSaude,
                portadorNecessidadesEspeciais,
                necessidadesEspeciais,
                tratamentoNecessidadesEspeciais,
                cadastroUnico,
                bolsaFamilia,
                valorBolsaFamilia,
                pensao,
                valorPensao,
                historiaPregressaAtual,
                cpf,
                naturalidade,
                dataAcolhimento,
                dataDesligamento,
                // dataCadastro e dataAtualizacao são gerados automaticamente
            }
        });

        return res.status(200).send({ status: "success", data: newAcolhida });
    } catch (error) {
        console.error("Erro ao registrar acolhida:", error);
        return res.status(500).send({ status: "error", message: "Erro interno do servidor" });
    }
});
// ----------------------------


export default router