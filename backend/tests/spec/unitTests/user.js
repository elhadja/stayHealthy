const axios = require("axios");

const urlBase = "http://localhost:3000";

exports.emailShouldBeUnique = async (userType) => {
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
};

exports.incorrectPassword = async (userType) => {
    let addUserResponse = undefined;
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
        if (addUserResponse)
            await axios.delete(urlBase + "/" + userType + "/" + addUserResponse.data.id);
    }  
};

exports.userShouldBeLogged = async (userType) => {
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
};