const express = require("express")
const path = require("path");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
// const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8093;


//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

  var contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug');
})

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug');
})

app.get('/classinfo', (req, res)=>{
    const params = {}
    res.status(200).render('classinfo.pug');
})

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug');
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{  //promise done.
        res.send("This item has been saved in my database")
    }).catch(()=>{  
        res.status(404).send("Item was not sended to the database")  //if it gives error
    });

    // res.status(200).render('contact.pug', params);
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});