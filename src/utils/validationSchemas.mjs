//Validation schemas using express-validator
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
// ----------------------------