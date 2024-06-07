import {Router} from "express";
import { checkSchema } from "express-validator";
import { exampleRouteValidation } from "../utils/validationSchemas.mjs";
import { matchedData,validationResult } from "express-validator";
import { handleError } from "../utils/helpers.mjs";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

//example POST route using express-validator validation
router.post('/acolhidas/todas', async (req, res) => {
    const { acolhida } = req.body;
    if (!acolhida || acolhida == "") {
        return res.status(200).send({status: "error", "message": "Nome da acolhida não informado!"}); 
    }
    
    const response = await prisma.acolhidas.findMany({
        where: {
            nome: {
                contains: acolhida
            }
        }
    })

    if (!response || response.length == 0) {
        return res.status(200).send({status: "error", "message": "Nenhuma acolhida encontrada."}); 
    }

    if (response.length >= 1) {
        return res.status(200).send({status: "success", data: response}); 
    }
    
    return res.status(200).send({status: "error", "message": "Erro inesperado!"}); 
})
// ----------------------------


export default router