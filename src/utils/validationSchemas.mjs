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
// ----------------------------