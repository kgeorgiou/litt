var Utils = require('../utils/Utilities');
var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4004");

var LittController = {

    getSimilar: function (req, res) {

        var searchTerm = req.body.term;

        if (!searchTerm || !searchTerm.length) {
            res.json({
                status: 'error',
                error: 'Parameter [term] is missing.',
                short_url: ''
            });

            return;
        }

        // sends a message to the Python script via stdin
        client.invoke("findSimilarWords", searchTerm, function (error, result, more) {
            var processed = Utils.filterWord2VecWords(JSON.parse(result), searchTerm);
            res.json({
                status: 'ok',
                words: processed
            });
        });
    }

};

module.exports = LittController;