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
    
    try {
        var benfeitores
        if (benfeitor !== "") {
            benfeitores = await prisma.benfeitores.findMany({
                where: {
                    nome: {
                        contains: benfeitor
                    }
                }
            })
        }
        if (benfeitor === "") {
            benfeitores = await prisma.benfeitores.findMany();
        }




    
    if (!benfeitores || benfeitores.length == 0) {
        return handleError(res, "Nenhum benfeitor encontrado.");
    }

    if (benfeitores.length >= 1) {
        benfeitores.forEach(benfeitor => {
            
        })


        return res.status(200).send({status: "success", data: benfeitores}); 
    }
    return handleError(res, "Erro inesperado.");
    }
    catch (error) {
        return handleError(res, error);
    }
});


router.post("/benfeitores/registerjuridica", checkSchema(benfeitorRegisterJuridica), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({status: "error", "message": errors.array()});
    }
    const { cnpj, razaoSocial, telefone } = matchedData(req);
    try {
        const checaExiste = await prisma.benfeitores.findUnique({
            where: {
                cnpj
            }
        })
        if (checaExiste) {
            return res.status(200).send({status: "error", message: "CNPJ já cadastrado!"});
        }
        const benfeitor = await prisma.benfeitores.create({
            data: {
                cnpj,   
                razaoSocial,
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
        const checaExiste = await prisma.benfeitores.findUnique({
            where: {
                cpf
            }
        })
        if (checaExiste) {
            return res.status(200).send({status: "error", message: "CPF já cadastrado!"});
        }

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
        console.log(error);
        return handleError(res, error);
    }
})



export default router;