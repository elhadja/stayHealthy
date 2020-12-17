const axios = require("axios");


describe("register doctor tests: ", () => {
    const urlBase = "http://localhost:3000";

    it("should add a new doctor", async () => {
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "testRegister@gmail.com",
                password: "toto"
            }
            const response = await axios.post(urlBase + "/doctor", body);
            expect(response.status).toBe(201);
            await axios.delete(urlBase + "/doctor/" + response.data.id);
        } catch(error) {
            fail(error.response.data);
        }
    });

    it("email should be unique", async () => {
        await emailShouldBeUnique("doctor");
     });

    it("if required items don't exists, user should not be added", async () => {
        try {
            const body = {
                password: "toto"
            }
            await axios.post(urlBase + "/doctor", body);
            expect(true).toBe(false);
        } catch(error) {
            expect(error.response.status).toBe(400);
            const numberOfRequiredItems = 3;
            expect(Object.keys(error.response.data.error.errors).length).toBe(numberOfRequiredItems);
        }
    });


});

describe("register patient tests: ", () => {
    const urlBase = "http://localhost:3000";

        it("patient should be added", async () => {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "testRegister@gmail.com",
                password: "toto"
            }
            try {
                let response = await axios.post(urlBase + "/patient", body);
                expect(response.status).toBe(201);
                await axios.delete(urlBase + "/patient/" + response.data.id);
            } catch (error) {
                fail(error.response.data);
            }
        });

        it("email should be unique", async () => {
            await emailShouldBeUnique("patient")
        });

        it("if required items don't exists, user should not be added", async () => {
            try {
                const body = {
                    password: "toto"
                }
                await axios.post(urlBase + "/patient", body);
                expect(true).toBe(false);
            } catch(error) {
                expect(error.response.status).toBe(400);
                const numberOfRequiredItems = 3;
                expect(Object.keys(error.response.data.error.errors).length).toBe(numberOfRequiredItems);
            }
    });


});

async function emailShouldBeUnique(userType) {
    const urlBase = "http://localhost:3000";
    try {
        const body = {
            firstName: "Elhadj Amadou",
            lastName: "Bah",
            adress: "avenue de collégno",
            email: "testRegister@gmail.com",
            password: "toto"
        }
        const response1 = await axios.post(urlBase + "/" + userType, body);
        try {
            await axios.post(urlBase + "/" + userType, body);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.response.status).toBe(400);
            await axios.delete(urlBase + "/" + userType + "/" + response1.data.id);
        }
    } catch(error) {
        fail(error.response.data);
    }   
}