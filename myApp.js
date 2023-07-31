require('dotenv').config();
const mongoose = require("mongoose");
const mySecret = process.env.MONGO_URI;
mongoose.connect(mySecret,{ useNewUrlParser: true, useUnifiedTopology: true });
let validator = require('validator');

let personSchema = new mongoose.Schema({
  name:String, 
  age: Number, 
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let prsn = new Person({
    name: "Bob",
    age: "25",
    favoriteFoods: ["Fruit Loops", "Milk"]
  })
  prsn
    .save((err,data)=>{
      if(err){ 
        console.log(err)
      } 
      else { 
        console.log(data) 
      } 
      done(null, data);
    }
    )
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      console.log(data) 
    } 
    done(null, data);
    }      
  )
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, data)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      console.log(data) 
    } 
    done(null, data);
    }
  )                          
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err, data)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      console.log(data) 
    } 
    done(null, data);
    }
  )  
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err, data)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      console.log(data) 
    } 
    done(null, data);
    }
  )
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err, doc)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      doc.favoriteFoods.push(foodToAdd);
      doc.save((err,data)=>{
        if(err){ 
          console.log(err)
        } 
        else { 
          console.log(data) 
        } 
        done(null, data);
      }) 
    }
  })                  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    { new: true }, (err, data)=>{
    if(err){ 
      console.log(err)
    } 
    else { 
      console.log(data) 
    } 
    done(null, data);
    }
  ) 
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) { 
      console.log(err);
      done(err); 
    } else { 
      console.log(data); 
      done(null, data); 
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err, data) => {
    if (err) { 
      console.log(err);
      done(err); 
    } else { 
      console.log(data); 
      done(null, data); 
    }
  });       
};

const queryChain = (done) => {

  /*var findBurrito = Person.find({favoriteFoods:foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select('-age')
  findBurrito.exec(function(err, data){
    if(err) return console.error(err)
    done(null , data);
  });

  */
  
  const foodToSearch = "burrito";
  var findBurrito = Person.find({favoriteFoods:foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select('-age')
    findBurrito.exec((err,data)=>{
      if (err) { 
        console.log(err);
        done(err); 
      } 
      else { 
        console.log(data); 
        done(null, data); 
      }
    })  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
