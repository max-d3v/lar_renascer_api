import { Router } from "express";
import acolhidasRouter from "./acolhidas.mjs";
import authRouter from "./auth.mjs";
import benfeitoresRouter from "./benfeitores.mjs";


const router = Router();

//Router initialization
router.use(acolhidasRouter);
router.use(authRouter);
router.use(benfeitoresRouter);

// ----------------------------


export default router