const axios = require("axios");
const { ObjectId } = require("mongodb").ObjectID;

const appointmentEndPoint = "http://localhost:3000/appointment";
const doctorEndPoint = "http://localhost:3000/doctor";
const patientEndPoint = "http://localhost:3000/patient";
const slotEndPoint = "http://localhost:3000/slot";

describe("add appointment tests: ", () => {
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
            expect(true).toBe(true);
        } finally {
            await deleteSlot(postSlotResponse);
            await deleteSlot(postSlotResponse2);
        }
    });
});

describe("cancel appointment tests: ", () => {

});

describe("get Doctor appointment tests: ", () => {

});

describe("get patient appointment tests: ", () => {

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