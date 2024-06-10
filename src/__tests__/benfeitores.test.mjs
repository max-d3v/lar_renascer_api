import supertest from 'supertest';
import { app } from '../index.mjs';


describe('Benfeitores', () => {
    describe("POST benfeitores route", () => {
        describe(`Given no value for "benfeitor" is passed`, () => {
            it("should return status:error", async () => {
                await supertest(app).post("/api/v1/benfeitores")
                .expect(200)
                .expect({status: "error"})
            })
        })
    })
})