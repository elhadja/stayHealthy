const axios = require("axios");
const { ObjectId } = require("mongodb").ObjectID;

const user = require("./user");
const urlBase = "http://localhost:3000";

describe("doctor login tests: ", () => {
    it("user should be logged", async () => {
        await user.userShouldBeLogged("doctor");
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
        await user.incorrectPassword("doctor");
    });
});

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
        await user.emailShouldBeUnique("doctor");
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

describe("getting doctor by Id tests: ", () => {
    it("should get a doctor", async () => {
        let postResponse = undefined;
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "getDoctorSuccess@gmail.com",
                password: "toto"
            };
            postResponse = await axios.post(urlBase + "/doctor", body);
            const getResponse = await axios.get(urlBase + "/doctor/" + postResponse.data.id);
            expect(postResponse.data.id).toBe(getResponse.data._id);
            expect(body.firstName).toBe(getResponse.data.firstName);
            expect(body.lastName).toBe(getResponse.data.lastName);
            await axios.delete(urlBase + "/doctor/" + postResponse.data.id);
        } catch(error) {
            fail(error.response);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/doctor/" + postResponse.data.id);
        }
    });

    it("if the doctor not exists the request should fail", async () => {
        try {
            const id = new ObjectId("mqkdfjmqldkq");
            await axios.get(urlBase + "/doctor/" + id);
            expect(true).toBe(false);
        } catch(error) {
            expect(error.response.status).toBe(404);
        } 
    });
});

describe("delete doctor tests: ", () => {
    it("if the user exists, the user should be deleted", async () => {
        let postResponse;
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "deleteDoctorSuccess@gmail.com",
                password: "toto"
            };
            postResponse = await axios.post(urlBase + "/doctor", body);
            let deleteResponse = await axios.delete(urlBase + "/doctor/" + postResponse.data.id);
            expect(deleteResponse.status).toBe(200);
        } catch(error) {
            fail();
        }
    });
});
