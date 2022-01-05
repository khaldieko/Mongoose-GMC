let mongoose = require("mongoose");

//connecting to database
const MONGODB_URI =
  "mongodb+srv://dieko:dieko7158@khaldieko.1buaj.mongodb.net/diegodatabase1?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then((data) => console.log("connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("db connected", () => {
  console.log("connected");
});
//Create a person with this prototype
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model:

let Aguda = new Person({
  name: "aguda",
  age: 22,
  favoriteFoods: ["pizza", "eba"],
});
Aguda.save((error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

//Create Many Records with model.create()


let arrayOfPeople = [
  { name: "deji", age: 25, favoriteFoods: ["pizza", "ice-cream"] },
  { name: "tanto", age: 20, favoriteFoods: ["spag", "chocolate cake"] },
  { name: "idris", age: 22, favoriteFoods: ["rice", "amala"] },
];
Person.create(arrayOfPeople, (error, createdPeople) => {
  if (error) {
    console.log(error);
  } else {
    console.log(createdPeople);
  }
});

//Use model.find() to Search Your Database

Person.find({ name: "tanto" }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});


//Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({favoriteFoods : {$all :["pizza"]}}, (error, data)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

//Use model.findById() to Search Your Database By _id
Person.findById({_id: "61d48961ed575935d3dfd534"}, (error, data)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

//Perform Classic Updates by Running Find, Edit, then Save

Person.findById({_id: "61d48961ed575935d3dfd534"}, (error, updatedRecord)=>{
    if (error) {
        console.log(error);
    } else {
        updatedRecord.favoriteFoods.push("fufu")
        updatedRecord.save((error, result)=>{
            console.log(result);
        })

    }
})


//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate({name: "tanto"}, {age: 32}, {new: true}, (error, result)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
})
//Delete One Document Using model.findByIdAndRemove

Person.findByIdAndRemove("61d48e7335ae1523c749285d", (error, deletedRecord)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(deletedRecord);
    }
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()

Person.remove({age: {$gte: 23}}, (error, data)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})

//Chain Search Query Helpers to Narrow Search Results

Person.find({favoriteFoods: {$all: ["pizza"]}})
.sort({name: 'asc'})
.limit(2)
.select("-age")
.exec((error, filteredResult)=>{
    if (error) {
        console.log(error);
    } else {
        console.log(filteredResult);
    }
})
