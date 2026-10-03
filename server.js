
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const Exam = require("./models/Exam");


const app = express();

app.use(cors())

app.use(express.json())



app.get("/",((req,res)=>{
    res.send("API is running succesfully!");
}))

app.post("/api/exams", async (req,res)=>{
    try{
       const {name, date} = req.body

       if(!name  || !date ){
        
        return res.status(400).json({
            message:"Please provide all the fields"

        })}

        const newExam = await Exam.create({
            name, date
        })
        res.status(201).json(newExam);
       }
       catch(err){
        res.status(500).json(err.message)
       }
});

app.get("/api/exams", async (req,res)=>{
    try{
         const exams = await Exam.find().sort({date:-1});
         res.status(200).json(exams);
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

app.delete("/api/exams/:id",async (req,res)=>{

    try{

    const {id} = req.params

    const deletedExam = await Exam.findByIdAndDelete(id)

    
      if(!deletedExam){
        return res.status(404).json({
            message:"Exam not Found"
        })
      }

       res.status(200).json({
        message: "Deleted"
       })


    }

    catch(err){
        res.status(500).json({
            message: err.message
        })
    }

})


app.put("/api/exams/:id", async (req,res)=>{
    
    try{
        const {id} = req.params
        const{name, date} = req.body

        const updateExam  = await Exam.findByIdAndUpdate(id,
            {name, date},
            {new: true,
                runValidators: true}
        )

        if(!updateExam){
            return res.status(404).json({
                message: "Exam not Found"
            })
        }

        res.status(200).json({
            message: "Updated",
            Exam: updateExam


        })
          
        }

        catch(err){
            res.status(500).json({
                message: err.message
            })

        }
    }
)



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI).
then(()=>{
    console.log("Mongodb connected Succesfully")
    app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT);
})

})
   .catch((err)=>{
    console.log(err.message)
})








