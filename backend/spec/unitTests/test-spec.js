const axios = require("axios");

const urlBase = "http://localhost:3000";

describe("register doctor tests: ", () => {
    const urlBase = "http://localhost:3000";

    it("should add a new doctor", async () => {
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "newDoctorSuccess@gmail.com",
                password: "toto"
            };
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
            };
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
            email: "newPatientSucess@gmail.com",
            password: "toto"
        };
        try {
            let response = await axios.post(urlBase + "/patient", body);
            expect(response.status).toBe(201);
            await axios.delete(urlBase + "/patient/" + response.data.id);
        } catch (error) {
            fail(error.response.data);
        }
    });

    it("email should be unique", async () => {
        await emailShouldBeUnique("patient");
    });

    it("if required items don't exists, user should not be added", async () => {
        try {
            const body = {
                password: "toto"
            };
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
            email: userType + "EmailShouldBeUnique@gmail.com",
            password: "toto"
        };
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

describe("doctor login tests: ", () => {
    const urlBase = "http://localhost:3000";
    it("user should be logged", async () => {
        await userShouldBeLogged("doctor");
    });

    it("if the user is not registered, the request should fail", async () => {
        try {
            await axios.post(urlBase + "/doctor/login", {
                email: "unknownxyqmldkfjfqlskdfjq@gmail.com",
                password: "toto"
            });
            expect(true).toBe(false);
        } catch(error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("user not found");
        }   
    });

    it("if the password is not correct, the request should fail", async () => {
        await incorrectPassword("doctor");
    });
});

describe("patient login tests: ", () => {
    const urlBase = "http://localhost:3000";
    it("user should be logged", async () => {
        await userShouldBeLogged("patient");
    });

    it("if the user is not registered, the request should fail", async () => {
        try {
            await axios.post(urlBase + "/doctor/login", {
                email: "unknownxyqmldkfjfqlskdfjq@gmail.com",
                password: "toto"
            });
            expect(true).toBe(false);
        } catch(error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("user not found");
        }   
 
    });

    it("if the password is not correct, the request should fail", async () => {
        await incorrectPassword("patient");
    });
});


async function incorrectPassword(userType) {
    let addUserResponse;
    try {
        const userBody = {
            firstName: "Elhadj Amadou",
            lastName: "Bah",
            adress: "avenue de collégno",
            email: userType + "incorrectPassword@gmail.com",
            password: "toto"
        };
        addUserResponse = await axios.post(urlBase + "/" + userType, userBody);
        await axios.post(urlBase + "/" + userType + "/login", {
            email: userBody.email,
            password: "qmlkdfmqkdjfmqldjfmqlkdjfmq"
        });
        expect(true).toBe(false);
    } catch(error) {
        expect(error.response.status).toBe(400);
    } finally {
        await axios.delete(urlBase + "/" + userType + "/" + addUserResponse.data.id);
    }  
}

async function userShouldBeLogged(userType) {
    try {
        const userBody = {
            firstName: "Elhadj Amadou",
            lastName: "Bah",
            adress: "avenue de collégno",
            email: userType +"ShouldBeLoged@gmail.com",
            password: "toto"
        };
        const addUserResponse = await axios.post(urlBase + "/" + userType, userBody);
        const responseLogin = await axios.post(urlBase + "/" + userType + "/login", {
            email: userBody.email,
            password: "toto"
        });
        expect(responseLogin.status).toBe(200);
        expect(responseLogin.data.id).toBe(addUserResponse.data.id);
        if (!responseLogin.data.token)
            fail("token should be returned after login");
        await axios.delete(urlBase + "/" + userType + "/" + addUserResponse.data.id);
    } catch(error) {
        fail(error.response.data);
    }   
}