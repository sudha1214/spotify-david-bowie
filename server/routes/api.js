const express = require('express');
var request = require('request'); // "Request" library
const router = express.Router();

var c_id = 'c220cc73340a48f395756fb7cdcbdb9c'; 
var s_id = '84a0e64243714e469cd020c07248b8ab'; 

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(c_id + ':' + s_id).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/artists', (req, res) => {
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          // use the access token to access the Spotify Web API
          var token = body.access_token,
            query = req.query,
            options = {
                url:'https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums',
                qs: {
                    'offset':query.offset,
                    'limit': query.limit
                },
                headers: {
                'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                res.send(body);
            });
        }
    });
  });

module.exports = router;