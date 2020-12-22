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
            fail(error);
        }
    });

    it("if the user not exists the request should fail", async () => {
        try {
            const id = new ObjectId("eeeeeeeeeeeeeeeeeeeeeeee");
            await axios.delete(urlBase + "/doctor/" + id);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});

describe("update doctor tests: ", () => {
    it("the user should be updated", async () => {
        let postResponse;
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "updateDoctorSuccess@gmail.com",
                password: "toto"
            };
            postResponse = await axios.post(urlBase + "/doctor", body);
            const updateBody = {
                firstName: "newFirstName",
            };
            const PutResponse = await axios.put(urlBase + "/doctor/" + postResponse.data.id, updateBody);
            expect(PutResponse.status).toBe(200);
            expect(PutResponse.data.user.firstName).toBe(updateBody.firstName);
        } catch(error) {
            fail(error);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/doctor/" + postResponse.data.id);
        }
    });

    it("if the user not exists the request should fail", async () => {
        try {
            const id = new ObjectId("eeeeeeeeeeeeeeeeeeeeeeee");
            const body = {};
            await axios.put(urlBase + "/doctor/" + id, body);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.error).toBe("user not found");
        }
    });
});

describe("get severals doctors tests: ", () => {
    it("if no filter is specified, should return an empty array", async () => {
        try {
            const getResponse = await axios.get(urlBase + "/doctors");
            expect(getResponse.status).toBe(200);
            expect(getResponse.data.length).toBe(0);
        } catch(error) {
            fail(error);
        } 
    });

    it("if doctors exist, request should return an array whitch contents matched doctors", async () => {
        let postResponse1;
        let postResponse2;
        let postResponse3;
        let postResponse4;
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "testGetByName",
                adress: "avenue de collégno",
                email: "getDoctorsSuccess@gmail.com",
                password: "toto",
                speciality: "a speciality for test",
                address: {
                    road: "avenue de l'espoire",
                    postalCode: 33400,
                    city: "talence"
                }
            };
            postResponse1 = await axios.post(urlBase + "/doctor", body);
            postResponse2 = await axios.post(urlBase + "/doctor", {
                ...body,
                email: body.email + "1",
                speciality: "aSpeciality"
            });
            postResponse3 = await axios.post(urlBase + "/doctor", {
                ...body,
                email: body.email + "2",
                lastName: "aLastName"
            });
            postResponse4 = await axios.post(urlBase + "/doctor", {
                ...body,
                email: body.email + "3",
                address: {
                    postalCode: "99990"
                }
            });
            const getResponse = await axios.get(urlBase + "/doctors?name=aLastName"
                                                        + "&speciality=aSpeciality"
                                                        + "&postalCode=99990");
            expect(getResponse.status).toBe(200);
            expect(getResponse.data.length).toBe(3);
 
        } catch (error) {
            fail();
        } finally {
            if (postResponse1)
                await axios.delete(urlBase + "/doctor/" + postResponse1.data.id);
            if (postResponse2)
                await axios.delete(urlBase + "/doctor/" + postResponse2.data.id);
            if (postResponse3)
                await axios.delete(urlBase + "/doctor/" + postResponse3.data.id);
            if (postResponse4)
                await axios.delete(urlBase + "/doctor/" + postResponse4.data.id);
 
        }
    });
});