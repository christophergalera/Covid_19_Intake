const CovidController = require ('../controllers/covid.controller');


module.exports = function(app) {
    //get ALL superhero documents from Mongo
    app.get('/api/covid', CovidController.getAll)
    // get one superhero document
    app.get('/api/covid/:id', CovidController.getOne)
    // create a superhero document
    app.post('/api/covid',CovidController.create)
    // update superhero document
    app.put('/api/covid/:id', CovidController.update)
    // delete superhero document
    app.delete('/api/covid/:id', CovidController.delete)
}