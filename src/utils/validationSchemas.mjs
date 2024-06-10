import { validaCNPJ, validaCPF } from "./helpers.mjs"


export const acolhidaSearch = {
    acolhida: {
        notEmpty: {
            exists: {
                errorMessage: "Acolhida não fornecida!",
                options: { checkNull: true }
            },
        },
    }
}

export const benfeitoresSearch = {
    benfeitor: {
        notEmpty: {
            exists: {
                errorMessage: "Benfeitor não fornecido!",
                options: { checkNull: true }
            },
        },
    }
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