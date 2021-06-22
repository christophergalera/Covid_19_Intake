const CovidController = require ('../controllers/covid.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {
    //get ALL covid documents from Mongo
    app.get('/api/covid', authenticate, CovidController.getAll)
    // get one covid document
    app.get('/api/covid/:id', authenticate, CovidController.getOne)
    // create a covid document
    app.post('/api/covid',  authenticate, CovidController.create)
    // update covid document
    app.put('/api/covid/:id',  authenticate, CovidController.update)
    // delete covid document
    app.delete('/api/covid/:id', authenticate,  CovidController.delete)
}