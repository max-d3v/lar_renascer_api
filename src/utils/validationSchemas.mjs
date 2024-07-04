import { validaCNPJ, validaCPF } from "./helpers.mjs"


export const acolhidaSearch = {
    acolhida: {
        isString: {
            errorMessage: "Acolhida deve ser um texto!"
        }
    }
}

export const benfeitoresSearch = {
    benfeitor: {
        custom: {
            options: (value) => {
                if (value == undefined || value == null || typeof value !== "string" ) {
                    throw new Error('Benfeitor deve ser um texto!');
                }
                return true;
            },
        },
    },
}

export const benfeitorRegisterFisica = {
    nome: {
        notEmpty: {
            errorMessage: "Nome não fornecido!",
        },
    },
    telefone: {
        isMobilePhone: {
            errorMessage: "Número de telefone inválido!"
        },
        notEmpty: {
            errorMessage: "Número de telefone não fornecido!",
        },
    },
    cpf: {
        notEmpty: {
            errorMessage: "CPF não fornecido!",
        },
        custom: {
            options: (value) => {
                if (!validaCPF(value)) {
                    throw new Error('CPF inválido!');
                }
                return true;
            }
        }
    }
}

export const benfeitorRegisterJuridica = {
    razaoSocial: {
        notEmpty: {
            errorMessage: "Nome não fornecido!",
        },
    },
    telefone: {
        isMobilePhone: {
            errorMessage: "Número de telefone inválido!"
        },
        notEmpty: {
            errorMessage: "Número de telefone não fornecido!",
        },
    },
    cnpj: {
        notEmpty: {
            errorMessage: "CPF não fornecido!",
        },
        custom: {
            options: (value) => {
                if (!validaCNPJ(value)) {
                    throw new Error('CNPJ inválido!');
                }
                return true;
            }
        }
    }
}

// ----------------------------