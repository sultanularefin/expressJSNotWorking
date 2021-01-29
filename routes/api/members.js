const express = require('express');
const router = express.Router();

const members = require ('./../../models/Members');
const uuid =require('uuid');


// app.get('/api/members',(req,res)=>{
// router.get('/api/members',(req,res)=>{
router.get('/',(req,res)=>{
    res.json(members);
});

// app.get('/api/members/:id',(req,res)=>{
// router.get('/api/members/:id',(req,res)=>{
router.get('/:id',(req,res)=>{
    // res.send(req.params.id);

    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter(member=> member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`Member not found where member id=== ${req.params.id}`});
    }

    // res.json(members);
});


// create Member

router.post('/',(req,res)=> {
    // res.send(req.body);


    console.log("req.body", req.body);

    console.log("at post method: ");

    const newMember = {
        // id: uuid.v4(),
        // name: req.body.name,
        // email: req.body.email,
        // status: 'active',


        "id": members.length + 1,
        "name": req.body.name,
        "username": req.body.username,
        "email": req.body.email,
        "address": {
            "street": "Kattie Turnpike",
            "suite": "Suite 198",
            "city": "Lebsackbury",
            "zipcode": "31428-2261",
            "geo": {
                "lat": "-38.2386",
                "lng": "57.2232"
            }
        },
        "phone": "024-648-3804",
        "website": "ambrose.net",
        "company": {
            "name": "Hoeger LLC",
            "catchPhrase": "Centralized empowering task-force",
            "bs": "target end-to-end models"
        }
    }

    if (!newMember.name || !newMember.email) {

        return res.status(400).json({msg: 'please include a name and email'});

    }
// else{
//
// }

    else {
        // "email": "arefinde@gmail.com"

        console.log ("at else statement for /api/members/ --post");
        members.push(newMember);
        res.redirect('/');
        //res.json(members);
    }
});




// updated method
router.put('/:id',(req,res)=>{
    // res.send(req.params.id);
    const found = members.some(member=> member.id === parseInt(req.params.id));

    if(found) {
        const updateMember = req.body;

        members.forEach(member => {
                if(member.id ===parseInt (req.params.id)){
                    member.name =updateMember.name ? updateMember.name:req.body.name;
                    member.email = updateMember.email ?updateMember.name: req.body.email;
                    member.username= "username is test update";
                    member.address ={
                        "street": "Kattie Turnpike",
                        "suite": "Suite 198",
                        "city": "Lebsackbury",
                        "zipcode": "31428-2261",
                        "geo": {
                            "lat": "-38.2386",
                            "lng": "57.2232"
                        }
                    };
                    member.phone = "024-648-3804";
                    member.website = "ambrose.net";
                    member.company = {
                        "name": "Hoeger LLC",
                        "catchPhrase": "Centralized empowering task-force",
                        "bs": "target end-to-end models"
                    };
                    res.json({msg: 'member updated',member});
                }
            }
        );
    }
    else{
        res.status(400).json({msg:`Member not found where member id=== ${req.params.id}`});
    }
    // res.json(members);
});


// delete member

router.delete('/:id',(req,res)=>{
    // res.send(req.params.id);

    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found) {

        res.json({msg:'Member deleted', members:
        members.filter(member=> member.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg:`Member not found where member id=== ${req.params.id}`});
    }

    // res.json(members);
});





module.exports = router;
