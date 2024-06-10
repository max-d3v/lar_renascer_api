import {Router} from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema } from "express-validator";
import { matchedData,validationResult } from "express-validator";
import { handleError } from "../utils/helpers.mjs";
import { benfeitoresSearch, benfeitorRegisterFisica, benfeitorRegisterJuridica } from "../utils/validationSchemas.mjs";
const prisma = new PrismaClient();

const router = Router();

router.post("/benfeitores", checkSchema(benfeitoresSearch), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({status: "error", "message": errors.array()});
    }
    const { benfeitor } = matchedData(req);
    var response;
    try {
        if (benfeitor !== "") {
            response = await prisma.benfeitores.findMany({
                where: {
                    nome: {
                        contains: benfeitor
                    }
                }
            })
        }
        if (benfeitor === "") {
            response = await prisma.benfeitores.findMany();
        }
    } catch (error) {
        return handleError(res, error);
    }
    
    

    if (!response || response.length == 0) {
        return handleError(res, "Nenhum benfeitor encontrado.");
        }

    if (response.length >= 1) {
        return res.status(200).send({status: "success", data: response}); 
    }
    
    return handleError(res, "Erro inesperado.");
});


router.post("/benfeitores/registerjuridica", checkSchema(benfeitorRegisterJuridica), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({status: "error", "message": errors.array()});
    }
    const { cnpj, razaoSocial, telefone } = matchedData(req);
    try {
        const benfeitor = await prisma.benfeitores.create({
            data: {
                cnpj,   
                razaoSocial: razaoSocial,
                telefone,
                tipo: "juridico"
            }
        });
        console.log(benfeitor)
        return res.status(200).send({status: "success", data: benfeitor});
    } catch (error) {
        console.log(error);
        return handleError(res, error);
    }
})

router.post("/benfeitores/registerfisica", checkSchema(benfeitorRegisterFisica), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({status: "error", "message": errors.array()});
    }
    const { nome, telefone, cpf } = matchedData(req);
    try {
        const benfeitor = await prisma.benfeitores.create({
            data: {
                cpf,
                nome,
                telefone,
                tipo: "fisico"
            }
        });
        return res.status(200).send({status: "success", data: benfeitor});
    } catch (error) {
        return handleError(res, error);
    }
})



export default router;