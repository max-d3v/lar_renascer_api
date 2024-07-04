import { Router } from "express";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/helpers.mjs";
const router = Router();

//Auth login route
router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return  handleError(res, info);

        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.status(200).send({ status: "success", data: req.sessionID });
        });
    })(req, res, next); // Adicione isto
});     

router.get("/authStatus", (req, res) => {
    res.status(200).send({ status: "success", message: "Usuário logado", user: req.user});
})

router.get("/auth/logout", (req, res) => {
    if (!req.user) {
        res.status(200).send({status: "error", message: "Usuário não logado"});
        return
    } 

    req.session.destroy((err) => {
        if (err) {
            res.status(200).send({status: "error", message: "Erro ao deslogar"});
        } else {
            res.status(200).send({status: "success", message: "Usuário deslogado"});
        }
    });
})


// ----------------------------

export default router
 