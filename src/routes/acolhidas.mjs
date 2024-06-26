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
// ----------------------------


export default router