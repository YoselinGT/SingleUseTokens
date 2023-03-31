import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client'
import {
    generateRandomString,
    encryptText,
    descryptText,
    generateHash,
    compareTextAndHash
} from "../utils/generateToken";
import {
    addHoursToADate, compareDates,
    getCurrentTimeAndDate,
    formatDate

} from "../utils/dates";

const prisma = new PrismaClient();

const isTokenValid = async (req:Request,res:Response) => {

    try {

        const {token} = req.params;
        //console.log(token);
        const {ireferenciaid,icattokenid} = req.query

        //1. Seleccionamos el hash de la base para comparalo con el token que nos estan mandando
        const rsToken = await prisma.token.findMany({
            where: {
                icattokenid: Number(icattokenid),
                ireferenciaid: Number(ireferenciaid),
                iused: false
            }
        });

        //2. Validamos que tengamos token en la base
        if(rsToken.length === 0) {
            throw new Error("El token es invalido: no existe en la base");
        }

        //3. Validamos que el token este vigente
        const startDate = getCurrentTimeAndDate();
        //console.log("startDate"+startDate);
        const endDate = formatDate(String(rsToken[0].dtvigencia));
        //console.log("endDate"+endDate);
        const isCurrentToken = compareDates(endDate,startDate);

        if(!isCurrentToken){
            throw new Error("El token no esta vigente");
        }

        //4. Comparamos el hash y el token
        const isValidToken  = compareTextAndHash(token,rsToken[0].vtoken);
        if(!isValidToken){
            throw new Error("El token no es valido");
        }

        //5. Desactivamos el token
        rsToken.map( async (token) => {
           const post = await prisma.token.update({
               where: { itokenid: token.itokenid },
               data: { iused: true },
           });
        })

        //6. Regresamos en la respuesta el token
        res.json({
           msg: "El token es valido"
        });

        } catch (err){
            res.status(500).json({
                msg: String(err)
            })
    }
}

const genToken = async (req:Request,res:Response) => {

    const {body} = req;

    try {

        //1. Generamos el token ramdom y el hash para guardarlo en base
        const token = generateRandomString(6);
        const tokenEnc = generateHash(token);
        body.vtoken = tokenEnc;

        //2. Obtenemos la vigencia del token
        const date = getCurrentTimeAndDate();
        const vigencia = addHoursToADate(date,body.vigencia || 1);
        body.dtvigencia = vigencia;

        //3. Guardamos el token en base
        const rsToken = await prisma.token.create({
            data: body
        })

        //4. Regresamos en la respuesta el token
        res.json({
            token,
            //rsToken
        });

    } catch (err){
        res.status(500).json({
            msg: String(err)
        })
    }


}

export {
    genToken,
    isTokenValid
}