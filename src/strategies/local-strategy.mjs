import passport from "passport";
import { Strategy } from 'passport-local';
import { db } from "../db/db.mjs";
import { queryDb, hashSenha } from "../utils/helpers.mjs";
import bcrypt from  'bcrypt'
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


passport.serializeUser((user, done) => {
    if (!user) {
        done(new Error("User not provided"), null);
    } else {
        done(null, user);
    }});


passport.deserializeUser((user, done) => {
    done(null, user) 
})




export default passport.use(
    new Strategy({ usernameField: "usuario", passwordField: "senha" }, async (username, password, done) => {
        var user;

        try {
            user = await prisma.usuarios.findMany({
                where: {
                    usuario: username
                }
            })    
        }
        catch (error) {
            return done(null, false, 'Erro ao efetuar Login!');    
        }
        

        if (!user) {
            return done(null, false, 'Credencias inválidas!');
        }
        if (user.length == 0) {
            return done(null, false, 'Credencias inválidas!');    
        }

        const responseObj = user[0];

        const senhasCoincidem = await bcrypt.compare(password, responseObj.senha);

        if (senhasCoincidem) {
            const userObj = {
                nome: responseObj.nome,
                tipo: responseObj.tipo
            }

            done(null, userObj);
            return
        }

        done(null, false, 'Credencias inválidas!');    
        return        
    })
)
