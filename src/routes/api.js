import express from "express";
import apiController from "./../controller/apiController";
import diseaseController from "./../controller/diseaseController";
import treatmentController from "./../controller/treatmentController";

const router = express.Router();

/**
 * 
 * @param {*} app 
 */

const initApiRoutes = (app) => {

    //organ
    router.get('/read', apiController.readFunction);
    router.post('/create', apiController.createFunction);
    router.delete('/delete', apiController.deleteFunction);
    router.put('/update', apiController.updateFunction);

    //disease
    router.get('/disease-read', diseaseController.readFunction);
    router.post('/disease-create', diseaseController.createFunction);
    router.delete('/disease-delete', diseaseController.deleteFunction);
    router.put('/disease-update', diseaseController.updateFunction);

    //treatment
    router.get('/treatment-read', treatmentController.readFunction);
    router.post('/treatment-create', treatmentController.createFunction);
    router.delete('/treatment-delete', treatmentController.deleteFunction);
    router.put('/treatment-update', treatmentController.updateFunction);

    return app.use("/api/v1", router)
}

export default initApiRoutes;