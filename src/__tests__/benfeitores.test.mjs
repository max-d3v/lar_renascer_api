import supertest from 'supertest';
import { app } from '../index.mjs';


describe('Benfeitores', () => {
    describe("Benfeitores route", () => {
        describe(`POST /benfeitores with no value given`, () => {
            it("should return status:error and validation with express validation   ", async () => {
                await supertest(app).post("/api/v1/benfeitores")
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(
                    {
                        status: "error", message: [
                        {   
                        type: 'field',
                        msg: 'Benfeitor deve ser um texto!',
                        path: 'benfeitor',
                        location: 'body'
                        }
                  ]})
            })
        }) 
        describe('POST /benfeitores with empty string', () => {
            it('should return status:success and a data:benfeitores with all benfeitores', async () => {
                const response = await supertest(app)
                .post("/api/v1/benfeitores")
                .send({benfeitor: ""})
                .expect('Content-Type', /json/)
                .expect(200);
    
                (response.body.status).toBe("success");

                expect(response.body.data).toMatch(
                    expect.arrayContaining([
                        expect.objectContaining({
                            cnpj: expect.anything(),
                            cpf: expect.anything(),
                            id: expect.any(Number),
                            nome: expect.anything(),
                            razaoSocial: expect.anything(),
                            telefone: expect.anything(),
                            tipo: expect.any(String),
                        }),
                    ]),
                );
            })
        })
    })
})