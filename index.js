const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

/*
//middleware1
app.use(function(req,res,next){
    console.log('middleware 1 called');
    next();
});

//middleware2
app.use(function(req,res,next){
    console.log('middleware 2 called');
    next();
});
*/

 /*var contactList=[
    {
        name:"Milan",
        phone:"9876543210"
    },
    {
        name:"Tony",
        phone:"9784561230"
    },
    {
        name:"Shilu",
        phone:"9784511623"
    }
]*/

app.get('/', function(req, res) {
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: "Contacts_List",
                contacts_List: contacts
            });
        })
        .catch(err => {
            console.log('Error in fetching contacts from database:', err);
            return res.redirect('back'); // You can also render an error page here
        });
});


/*contactList.push({
    name:req.body.name,
    phone:req.body.phone
   });*/

   app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('New contact created:', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('Error in creating a contact!', err);
        return res.redirect('back');
    });
});


//for deleting a contact
app.get('/delete-contact', function(req, res) {
    let id = req.query.id;
    console.log('Deleting contact with ID:', id); // Log the ID

    Contact.findByIdAndDelete(id)
        .then(() => {
            console.log('Contact deleted successfully');
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in deleting object from database:', err);
            return res.redirect('back');
        });
});



app.listen(port, function(err){
    if(err){
        console.log('error in running server',err);
    }
    console.log('My Express srver is running on port: ', port);
}); 