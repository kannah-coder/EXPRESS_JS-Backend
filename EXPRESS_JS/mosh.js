const express=require('express');
const Joi=require('joi');
const app=express();
app.use(express.json());
const courses=[
    {name:"python",
     id:1,   
    },
    {
        name:'JS',
        id:2
    },
     {
        name:'Java',
        id:3
    },
     {
        name:'Swift',
        id:4
    }
]

app.get('/',(req,res)=>{

    res.send('HI KANNAH');

});

app.get('/api/courses',(req,res)=>{
    res.send(courses) ; 
});

app.get('/api/courses/:id',(req,res)=>{
    // const yy=req.params.years;
    // const mm=req.params.month;
    // res.send(`${yy}/${mm}`);
    // // res.send(req.query);
   try{ 
    const course=courses.find(c=>c.id===parseInt(req.params.id));
     
    if(!course)return res.status(404).send('NOT FOUND');
    res.send(course);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
});


app.post('/api/courses',(req,res)=>{
    

    const  result= validateCourse(req.body);

    if(result.error) return  res.status(400).send(result.error.details[0].message);
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id',(req,res)=>{
    //look up the course
    // if not existing ,return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
     
    if(!course)return res.status(404).send('NOT FOUND');
 

    //validate 
    //if inn valid ,return 400 

    const result=validateCourse(req.body);
    if(result.error) return  res.status(400).send(result.error.details[0].message);

    

    //update course
    //return updated course

    course.name=req.body.name;
    res.send(course);


});

app.delete('/api/courses/:id',(req,res)=>{
    //look up the course
    //not existing ,return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
     
    if(!course)return res.status(404).send('NOT FOUND');
 
    
    //Delete
    const deleteCourse=courses.indexOf(course);
    courses.splice(deleteCourse,1);

    //return the same course
    return res.send(course);

});
app.listen(3000,()=>{
    console.log('listening on http://localhost:3000');
});

function validateCourse(course){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    });
    return schema.validate(course);
}
