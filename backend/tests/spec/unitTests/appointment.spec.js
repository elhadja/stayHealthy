const axios = require("axios");

const appointmentEndPoint = "http://localhost:3000/appointment";
const doctorEndPoint = "http://localhost:3000/doctor";
const patientEndPoint = "http://localhost:3000/patient";
const slotEndPoint = "http://localhost:3000/slot";

const UserBody = {
    firstName: "Elhadj Amadou",
    lastName: "Bah",
    adress: "avenue de collégno",
    email: "addSlotBeforAll@gmail.com",
    password: "toto"
};
const slotBody = {
    date: {
        jj: 25,
        mm: 5,
        yy: 1900
    },
    startHour: {
        hh: 12,
        mn: 45
    },
    doctorId: ""
};

describe("add appointment tests: ", () => {

    let beforeAllPost;
    beforeAll(async () => {
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "addSlotBeforAll@gmail.com",
                password: "toto"
            };
            beforeAllPost = await axios.post(doctorEndPoint, body);
        } catch(error) {
            fail(error);
        }
 
    });

    afterAll(async () => {
        await deleteDoctor(beforeAllPost);
    });



    it("appointment should created", async () => {
        let postPatientResponse;
        let postSlotResponse;
        try {
            postPatientResponse = await axios.post(patientEndPoint , UserBody);
            postSlotResponse = await axios.post(slotEndPoint , {
                ...slotBody, doctorId: beforeAllPost.data.id
            });
            const createAppointmentResponse = await axios.post(appointmentEndPoint 
                                            + "/" + postPatientResponse.data.id
                                            + "/" + postSlotResponse.data.slot._id);
            expect(createAppointmentResponse.status).toBe(200);
        } catch (error) {
            fail(error);
        } finally {
            await deletePatient(postPatientResponse);
            await deleteSlot(postSlotResponse);
        }
    });

    it("if the appoitment is occupied, the request should fail", async () => {
        let postPatientResponse;
        let postSlotResponse;
        try {
            postPatientResponse = await axios.post(patientEndPoint , UserBody);
            postSlotResponse = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
                patientId: postPatientResponse.data.id
            });
            await axios.post(appointmentEndPoint 
                                            + "/" + postPatientResponse.data.id
                                            + "/" + postSlotResponse.data.slot._id);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("slot not found or occupied by à patient");
        } finally {
            await deletePatient(postPatientResponse);
            await deleteSlot(postSlotResponse);
        }
 
    });


    it("if appointment's slot is not valid, then the request should fail", async () => {
        let postPatientResponse;
        try {
            postPatientResponse = await axios.post(patientEndPoint , UserBody);
            await axios.post(appointmentEndPoint 
                                            + "/" + postPatientResponse.data.id
                                            + "/" + "eeeeeeeeeeeeeeeeeeeeeeee");
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("slot not found or occupied by à patient");
        } finally {
            await deletePatient(postPatientResponse);
        }
        
    });

    it("if the patient not exists, the request should fail", async () => {
        let postSlotResponse;
        let postSlotResponse2;
        try {
            postSlotResponse = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
            });
            postSlotResponse2 = await axios.post(appointmentEndPoint 
                                            + "/" + "eeeeeeeeeeeeeeeeeeeeeeee"
                                            + "/" + postSlotResponse.data.slot._id);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe("patientId must be valid");
        } finally {
            await deleteSlot(postSlotResponse);
            await deleteSlot(postSlotResponse2);
        }
    });
});

describe("cancel appointment tests: ", () => {
    let beforeAllPost;
    beforeAll(async () => {
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "addSlotBeforAll@gmail.com",
                password: "toto"
            };
            beforeAllPost = await axios.post(doctorEndPoint, body);
        } catch(error) {
            fail(error);
        }
 
    });

    afterAll(async () => {
        await deleteDoctor(beforeAllPost);
    });

    it("appointment should be canceled", async () => {
        let postSlotResponse;
        let postSlotResponse2;
        let postPatientResponse;
        try {

            postPatientResponse = await axios.post(patientEndPoint , UserBody);
            postSlotResponse = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
                patientId: postPatientResponse.data.id
            });
            const cancelResponse = await axios.put(appointmentEndPoint
                + "/" + postSlotResponse.data.slot._id, {});
            expect(cancelResponse.status).toBe(200);
            expect(cancelResponse.data.message).toBe("appointment canceled");
        } catch (error) {
            fail(error);
        } finally {
            await deletePatient(postPatientResponse);
            await deleteSlot(postSlotResponse);
            await deleteSlot(postSlotResponse2);
        }
        
    });

    it("if the slot not exists, the request should fail", async () => {
        try {
            await axios.put(appointmentEndPoint
                + "/" + "eeeeeeeeeeeeeeeeeeeeeeee", {});
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});

describe("get Doctor/Patient appointments tests: ", () => {
    let beforeAllPost;
    beforeAll(async () => {
        try {
            const body = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "addSlotBeforAll@gmail.com",
                password: "toto"
            };
            beforeAllPost = await axios.post(doctorEndPoint, body);
        } catch(error) {
            fail(error);
        }
    });

    afterAll(async () => {
        await deleteDoctor(beforeAllPost);
    });


    it("if the appointments exists, the request should return an array with the appointment", async () => {
        let postPatientResponse;
        let postSlotResponse1;
        let postSlotResponse2;
        let postSlotResponse3;
        try {
            postPatientResponse = await axios.post(patientEndPoint , UserBody);
            postSlotResponse1 = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
                patientId: postPatientResponse.data.id
            });
            postSlotResponse2 = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
                patientId: postPatientResponse.data.id
            });
            postSlotResponse3 = await axios.post(slotEndPoint , {
                ...slotBody, 
                doctorId: beforeAllPost.data.id,
            });
 
            const getResponse = await axios.get(appointmentEndPoint 
                                                + "/doctor/" + beforeAllPost.data.id);

            const getResponse2 = await axios.get(appointmentEndPoint 
                                            + "/patient/" + postPatientResponse.data.id);
            expect(getResponse.status).toBe(200);
            expect(getResponse2.status).toBe(200);
            expect(getResponse2.data.length).toBe(2);
        } catch (error) {
            fail();
        } finally {
            await deletePatient(postPatientResponse);
            await deleteSlot(postSlotResponse1);
            await deleteSlot(postSlotResponse2);
            await deleteSlot(postSlotResponse3);
        }
    });
});

async function deletePatient(axiosResponse) {
    if (axiosResponse)
        await axios.delete(patientEndPoint + "/" + axiosResponse.data.id);
}

async function deleteDoctor(axiosResponse) {
    if (axiosResponse)
        await axios.delete(doctorEndPoint + "/" + axiosResponse.data.id);
}

async function deleteSlot(axiosResponse) {
    try {
        if (axiosResponse)
            await axios.delete(slotEndPoint + "/" + axiosResponse.data.slot._id);
    } catch (error) {
        await axios.put(appointmentEndPoint + "/" + axiosResponse.data.slot._id);
        await axios.delete(slotEndPoint + "/" + axiosResponse.data.slot._id);
    }
}