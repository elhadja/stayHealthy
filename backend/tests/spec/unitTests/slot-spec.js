const axios = require("axios");
const { ObjectId } = require("mongodb").ObjectID;



describe("add slot tests: ", () => {
    const urlBase = "http://localhost:3000";

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
            beforeAllPost = await axios.post(urlBase + "/doctor", body);
        } catch(error) {
            fail(error);
        }
 
    });

    afterAll(async () => {
        if (beforeAllPost)
            await axios.delete(urlBase + "/doctor/" + beforeAllPost.data.id);
    });

    it("slot should be added", async () => {
        const body = {
            date: {
                jj: 25,
                mm: 5,
                yy: 1900
            },
            startHour: {
                hh: 12,
                mn: 45
            },
            doctorId: beforeAllPost.data.id
        };
        let postResponse;
        try {
            postResponse = await axios.post(urlBase + "/slot", body);
            expect(postResponse.status).toBe(201);
            expect(postResponse.data.message).toBe("slot added");
        } catch (error) {
            fail(error);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
    });

    it("if required elements not exists, then request should fail", async () => {
        let postResponse;
        try {
            postResponse = await axios.post(urlBase + "/slot", {});
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
        
    });

    it("if date items not exists, then request should fail", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                },
                startHour: {
                    hh: 12,
                    mn: 51
                },
                doctorId: beforeAllPost.data.id
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
            const requiredItemNumber = 4;
            expect(Object.keys(error.response.data.errors).length).toBe(requiredItemNumber);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
        
    });

    it("if hour items not exists, then request should fail", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                },
                doctorId: beforeAllPost.data.id
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
            const requiredItemNumber = 3;
            expect(Object.keys(error.response.data.errors).length).toBe(requiredItemNumber);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
 
    });

    it("if the doctor don't exists, then request should fail", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: ObjectId("aaaaaaaaaaaaaaaaaaaaaaaa")
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
    });
});

describe(("update slot tests: "), () => {
    const urlBase = "http://localhost:3000";

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
            beforeAllPost = await axios.post(urlBase + "/doctor", body);
        } catch(error) {
            fail(error);
        }
 
    });

    afterAll(async () => {
        if (beforeAllPost)
            await axios.delete(urlBase + "/doctor/" + beforeAllPost.data.id);
    });

    it("slot should be updated", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: beforeAllPost.data.id
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            const putResponse = await axios.put(urlBase + "/slot/" + postResponse.data.slot._id, {
                ...body,
                startHour: {
                    hh: 13,
                    mn: 3
                }               
            });
            expect(putResponse.status).toBe(200);
            expect(putResponse.data.slot.startHour.hh).toBe(13);
            expect(putResponse.data.slot.startHour.mn).toBe(3);
        } catch (error) {
            fail(error);
        } finally {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
        }
 
    });

    it("if the slot not exists, request should fail", async () => {
        try {
            await axios.put(urlBase + "/slot/eeeeeeeeeeeeeeeeeeeeeeee", {});
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
        }  
    });

    /*
    it("if the slot is taken, request should fail", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: beforeAllPost.data.id,
                patientId: ObjectId("aaaaaaaaaaaaaaaaaaaaeeee")
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            await axios.put(urlBase + "/slot/" + postResponse.data.slot._id, {
                ...body,
                startHour: {
                    hh: 13,
                    mn: 3
                }               
            });
            fail();
        } catch (error) {
            expect(error.response.status).toBe(400);
        } 
        //TODO supprimer l'élémeent ajouté
    });
    */
});

describe("delete slot tests: ", () => {
    const urlBase = "http://localhost:3000";

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
            beforeAllPost = await axios.post(urlBase + "/doctor", body);
        } catch(error) {
            fail(error);
        }
 
    });

    afterAll(async () => {
        if (beforeAllPost)
            await axios.delete(urlBase + "/doctor/" + beforeAllPost.data.id);
    });


    it("slot should be deleted", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: beforeAllPost.data.id,
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            const deleteResponse = await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
            expect(deleteResponse.status).toBe(200);
            postResponse = undefined;
        } catch (error) {
            if (postResponse)
                await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
            fail();
        } 
        
    });

    it("if the slot not exists, the request should fail", async () => {
        try {
            await axios.delete(urlBase + "/slot/" + "eeeeeeeeeeeeeeeeeeeeaeae");
            fail();
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.error).toBe("slot not found or occupied by a patient");
        } 
 
    });

    it("if the sltot is occupied by a patient the request should fail", async () => {
        let postResponse;
        try {
            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: beforeAllPost.data.id,
                patientId: ObjectId("eeeeeeeeeeeeeeeeeeeeeeee")
            };
 
            postResponse = await axios.post(urlBase + "/slot", body);
            await axios.delete(urlBase + "/slot/" + postResponse.data.slot._id);
            fail();
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.error).toBe("slot not found or occupied by a patient");
        } 
    });
});

describe("get slot tests: ", () => {
    const urlBase = "http://localhost:3000";
    it("if the slot exists, the request should success", async () => {
        let postDoctorResponse;
        let postSlotResponse;
        try {
            const doctorBody = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "getSlotById@gmail.com",
                password: "toto"
            };
            postDoctorResponse = await axios.post(urlBase + "/doctor", doctorBody);

            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: postDoctorResponse.data.id,
            };
            postSlotResponse = await axios.post(urlBase + "/slot", body);
            const getResponse = await axios.get(urlBase + "/slot/" + postSlotResponse.data.slot._id);
            expect(getResponse.status).toBe(200);
            expect(getResponse.data._id).toBe(postSlotResponse.data.slot._id);
        } catch (error) {
            fail(error);
        } finally {
            if (postDoctorResponse)
                await axios.delete(urlBase + "/doctor/" + postDoctorResponse.data.id);

            if (postSlotResponse)
                await axios.delete(urlBase + "/slot/" + postSlotResponse.data.slot._id);
        }
    });

    it("if the slot not exists, the request should fail", async () => {
        try {
            await axios.get(urlBase + "/slot/" + "eeeeeeeeeeeeeeeeeeeeaeae");
            fail();
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.error).toBe("slot not found");
        } 
 
    });
});


describe("get several slots tests: ", () => {
    const urlBase = "http://localhost:3000";

    it("if the slots exists, the request should return an array whitch contents found slots", async () => {
        let postDoctorResponse;
        let postSlotResponse1, postSlotResponse2;
        try {
            const doctorBody = {
                firstName: "Elhadj Amadou",
                lastName: "Bah",
                adress: "avenue de collégno",
                email: "getSeveralSlots@gmail.com",
                password: "toto"
            };
            postDoctorResponse = await axios.post(urlBase + "/doctor", doctorBody);

            const body = {
                date: {
                    jj: 25,
                    mm: 5,
                    yy: 1900
                },
                startHour: {
                    hh: 12,
                    mn: 5
                },
                doctorId: postDoctorResponse.data.id,
            };
            postSlotResponse1 = await axios.post(urlBase + "/slot", body);
            postSlotResponse2 = await axios.post(urlBase + "/slot", body);
            const getResponse = await axios.get(urlBase + "/slots?id=" + postDoctorResponse.data.id);
            expect(getResponse.status).toBe(200);
            expect(getResponse.data.length).toBe(2);
        } catch(error) {
            fail(error);
        } finally {
            if (postDoctorResponse)
                await axios.delete(urlBase + "/doctor/" + postDoctorResponse.data.id);

            if (postSlotResponse1)
                await axios.delete(urlBase + "/slot/" + postSlotResponse1.data.slot._id);

            if (postSlotResponse2)
                await axios.delete(urlBase + "/slot/" + postSlotResponse2.data.slot._id);
        }
  
    });

    it("if the slot not exists, the request should send an empty array", async () => {
        try {
            const getResponse = await axios.get(urlBase + "/slots?id=eeeeeeeeeeeeeeeeeeeeaeae");
            expect(getResponse.status).toBe(200);
            expect(getResponse.data.length).toBe(0);
        } catch (error) {
            fail();
        } 
        
    });
});
