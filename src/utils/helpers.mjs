import { db } from "../db/db.mjs";
import bcrypt from 'bcrypt'
const saltRounds = 10



export const handleError = (res, err, errCode = 200) => {
    res.status(errCode).json({ status: "error", message: err });
}
// ------------------------------

export const queryDb = async (query, dados) => {
    const formattedQuery = formatQuery(query, dados);
    return new Promise((resolve, reject) => {
        db.query(formattedQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });                 
}                           

export const formatQuery = (query, values) => {
    return query.replace(/\?/g, () => {
        const value = values.shift();
        return typeof value === 'string' ? `'${value}'` : value;
    });
}

export const hashSenha = (senha) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(senha, salt)
}

export const validaCNPJ = (cnpj) => {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(cnpj).replace(/[^\d]/g, '')
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}

export const validaCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}