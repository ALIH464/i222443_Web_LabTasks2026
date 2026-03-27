const express = require('express');
const app = express();

app.use(express.json());

let requestCount = 0;

function countRequests(req,res,next){
    requestCount++;
    next();
}

app.use(countRequests);

app.get('/stats',(req,res)=>{
    res.send("Total API Requests: " + requestCount);
});

function addRequestTime(req,res,next){
    req.requestTime = new Date().toISOString();
    next();
}

app.get('/request-time',addRequestTime,(req,res)=>{
    res.send("This request was received at: "+req.requestTime);
});

let courses = [

 { id:1 , name:"Data Structures", seats:30 },
 { id:2 , name:"Operating Systems", seats:25 }

];

app.get('/courses',(req,res)=>{
    res.json(courses);
});

app.get('/courses/:id',(req,res)=>{

    const course = courses.find(c=>c.id==req.params.id);

    if(!course)
        return res.status(404).send("Course not found");

    res.json(course);
});

app.post('/courses',(req,res)=>{

    const {id,name,seats} = req.body;

    if(!id || !name || !seats)
        return res.status(400).send("Invalid data");

    courses.push({id,name,seats});

    res.send("Course Added");
});

app.put('/courses/:id',(req,res)=>{

    const course = courses.find(c=>c.id==req.params.id);

    if(!course)
        return res.status(404).send("Course not found");

    course.seats = req.body.seats;

    res.json(course);
});

app.delete('/courses/:id',(req,res)=>{

    const index = courses.findIndex(c=>c.id==req.params.id);

    if(index==-1)
        return res.status(404).send("Course not found");

    courses.splice(index,1);

    res.send("Course deleted");
});

let astronauts = [

 {name:"Ayesha Khan", specialization:"Pilot", skillLevel:"Advanced"},
 {name:"Omar Malik", specialization:"Robotics", skillLevel:"Intermediate"},
 {name:"Ali Raza", specialization:"Medical", skillLevel:"Advanced"},
 {name:"Sara Ahmed", specialization:"Engineering", skillLevel:"Intermediate"}

];

let missions = [];

app.get('/astronauts',(req,res)=>{
    res.json(astronauts);
});

function validateMission(req,res,next){

    const {missionName,crew} = req.body;

    if(!missionName || !crew)
        return res.status(400).send("Invalid Request: Required fields missing");

    next();
}

app.post('/missions',validateMission,(req,res)=>{

    const {missionName,crew} = req.body;

    for(let member of crew){

        const astronaut = astronauts.find(a=>a.name==member);

        if(!astronaut)
            return res.status(404).send(member+" not found");

        const alreadyAssigned = missions.find(m=>m.crew.includes(member));

        if(alreadyAssigned)
            return res.send(member+" already assigned");
    }

    let score = crew.length * 30;

    let mission = {

        missionName,
        crew,
        missionCapabilityScore:score
    };

    missions.push(mission);

    res.json(mission);

});

app.get('/missions/:missionName',(req,res)=>{

    const mission = missions.find(
        m=>m.missionName==req.params.missionName
    );

    if(!mission)
        return res.status(404).send("Mission not found");

    res.json(mission);

});

app.delete('/missions/:missionName',(req,res)=>{

    const index = missions.findIndex(
        m=>m.missionName==req.params.missionName
    );

    if(index==-1)
        return res.status(404).send("Mission not found");

    missions.splice(index,1);

    res.send("Mission cancelled successfully");

});

function animalCheck(req,res,next){

    req.strategy = "standard";

    if(req.body.animalType=="bird")
        req.strategy="Use nets";

    if(req.body.animalType=="mammal")
        req.strategy="Use cage";

    if(req.body.animalType=="reptile")
        req.strategy="Use special gloves";

    next();
}

function severityCheck(req,res,next){

    if(req.body.severity=="severe")
        req.difficulty="high";

    else if(req.body.severity=="moderate")
        req.difficulty="medium";

    else
        req.difficulty="low";

    next();
}

function resourceCheck(req,res,next){

    let resources = {

        team:5,
        vehicles:2
    };

    if(resources.team<3)
        req.outcome="unsuccessful";

    else if(req.difficulty=="high")
        req.outcome="delayed";

    else
        req.outcome="success";

    next();
}

function errorHandler(err,req,res,next){

    res.status(500).send("Error occurred");

}

app.post('/rescue-mission',
animalCheck,
severityCheck,
resourceCheck,
(req,res)=>{

    res.json({

        message:"Rescue mission processed",

        outcome:req.outcome,

        strategy:req.strategy

    });

});

app.use(errorHandler);

let books = [

 {id:1,title:"Clean Code",author:"Robert Martin"},
 {id:2,title:"Introduction to Algorithms",author:"CLRS"}

];

app.get('/books',(req,res)=>{

    res.json(books);

});

app.get('/books/:id',(req,res)=>{

    const book = books.find(b=>b.id==req.params.id);

    if(!book)
        return res.status(404).send("Book not found");

    res.json(book);

});

app.post('/books',(req,res)=>{

    const {id,title,author} = req.body;

    books.push({id,title,author});

    res.send("Book added");

});

app.put('/books/:id',(req,res)=>{

    const book = books.find(b=>b.id==req.params.id);

    if(!book)
        return res.status(404).send("Book not found");

    book.title=req.body.title || book.title;

    book.author=req.body.author || book.author;

    res.json(book);

});

app.delete('/books/:id',(req,res)=>{

    const index = books.findIndex(b=>b.id==req.params.id);

    if(index==-1)
        return res.status(404).send("Book not found");

    books.splice(index,1);

    res.send("Book deleted");

});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
