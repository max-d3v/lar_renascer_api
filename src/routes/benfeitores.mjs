import {Router} from "express";
import { PrismaClient } from "@prisma/client";
import { checkSchema } from "express-validator";
import { matchedData,validationResult } from "express-validator";
import { handleError } from "../utils/helpers.mjs";

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




export default router;