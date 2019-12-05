const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const webRoutes = express.Router();

let Webs = require('./website.model');

app.use(cors());
app.use(bodyParser.json());

app.use('/websiteData', webRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/websiteData', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

webRoutes.route('/').get(function(req, res) {
  Webs.find(function (err, webs) {
      if (err) {
          console.log(err);
      } else {
          res.json(webs);
      }
  });

});

webRoutes.route('/GetURL').post(function (req, res) {
 
 console.log(req.body.webUrl);
 
 request(req.body.webUrl, function (error, response, body) {

    let css=[];
    let js=[];
     if (!error && response.statusCode == 200) {
             
             var $ = cheerio.load(body);
            
             $('link').each(function(i, element){
                 let a=$(this).attr('rel');
                 if( a === 'stylesheet'){
                     console.log($(this).attr('href'));
                     css.push($(this).attr('href'));
                     
                 }
             });

             $('script').each(function(i, element){
                 let b = $(this).attr('src')
                 if(typeof b !== 'undefined'){
                    console.log(b);
                    js.push(b);
                 }
                    
            });
            

       }

             console.error('error:', error)
             console.log('statusCode:', response && response.statusCode);
             console.log(css);
            console.log(js);
            let currentWeb={
                web_link:req.body.webUrl,
                web_css_link:css,
                web_js_link:js,
                counter:'0'
            }
             res.json(currentWeb);
         });
});

webRoutes.route('/add').post(function(req, res) {
 let webs = new Webs(req.body);
 webs.save()
     .then(todo => {
         res.status(200).json({'todo': 'todo added successfully'});
     })
     .catch(err => {
         res.status(400).send('adding new link failed');
     });
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});