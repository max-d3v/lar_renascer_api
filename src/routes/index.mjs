import { Router } from "express";
import exampleRouter from "./acolhidas.mjs";
import authRouter from "./auth.mjs";



const router = Router();

//Router initialization
router.use(exampleRouter);
router.use(authRouter);
// ----------------------------


export default router