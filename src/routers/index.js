const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

// create new student
router.post("/students", async (req, res)=> {
    try{
        const user = new Student(req.body);
        const newUser = await user.save();
        res.status(200).send(newUser);
        
    }catch(e){
        res.status(400).send(e);
    }

  })

  // get request
  router.get("/students", async (req, res)=> {
    try{
        const studentData = await Student.find();
        res.status(200).send(studentData);
        
    }catch(e){
        res.status(400).send(e);
    }
  })

  // update request
  router.patch("/students/:id", async (req, res)=> {
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
            new: true
        });
        res.status(200).send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }
  })

  // delete request
  router.delete("/students/:id", async (req, res)=> {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.status(200).send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
  })


module.exports = router;