import express from "express";
import apiController from "./../controller/apiController";
import diseaseController from "./../controller/diseaseController";
import treatmentController from "./../controller/treatmentController";
import allCodeController from "./../controller/allCodeController";
import productController from "./../controller/productController";

const router = express.Router();

/**
 * 
 * @param {*} app 
 */

const initApiRoutes = (app) => {

    //service
    router.get('/read', apiController.readFunction);
    router.post('/create', apiController.createFunction);
    router.delete('/delete', apiController.deleteFunction);
    router.put('/update', apiController.updateFunction);
    router.get('/getServiceById/:id', apiController.getServiceByIdFunction)

    //project
    router.get('/disease-read', diseaseController.readFunction);
    router.post('/disease-create', diseaseController.createFunction);
    router.delete('/disease-delete', diseaseController.deleteFunction);
    router.put('/disease-update', diseaseController.updateFunction);
    router.get('/koi-read', diseaseController.getKoiProject);
    router.get('/maintain-read', diseaseController.getMaintainProject);
    router.get('/design-read', diseaseController.getDesignProject);

    //treatment
    router.get('/treatment-read', treatmentController.readFunction);
    router.post('/treatment-create', treatmentController.createFunction);
    router.delete('/treatment-delete', treatmentController.deleteFunction);
    router.put('/treatment-update', treatmentController.updateFunction);

    //product
    router.get('/product-read', productController.readFunction);
    router.post('/product-create', productController.createFunction);
    router.delete('/product-delete', productController.deleteFunction);
    router.put('/product-update', productController.updateFunction);

    //allcode
    router.get('/allcode-project-read', allCodeController.getAllCodeProject);
    router.get('/allcode-product-read', allCodeController.getAllCodeProduct);
    router.get('/allcode-condition-read', allCodeController.getAllCodeCondition);



    return app.use("/api/v1", router)
}

export default initApiRoutes;