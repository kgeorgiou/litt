var express             = require('express'),
    router              = express.Router(),
    LittController      = require('./controllers/LittController');

/* Gets a word and returns similar words found in the corpus */
router.post('/littup', LittController.getSimilar);

module.exports = router;