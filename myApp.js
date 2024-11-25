
require('dotenv').config();
const mongoose = require('mongoose')
const Schema=mongoose.Schema;
let uri = process.env.MONGO_URI;
mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('connection successful'))
.catch((err)=>console.log('Error connecting',err))
const personSchema = new Schema({
   name:{type:String, required:true},
   age:Number,
   favoriteFoods:[String]
})

const Person = mongoose.model("Person", personSchema);
// const newPerson = new Person({
//   name:'Greg',
//   age:21,
//   favoriteFoods:['pizza','chapati']
// })
// newPerson.save().then(()=>console.log('person1 done'))

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Greg',
    age: 21,
    favoriteFoods: ['ugali stew', 'chapati']
  });

  person.save((err, data) => {
    console.log('Inside save callback'); // Debugging log
    if (err) {
      console.log('Error in save:', err); // Debugging log
      return done(err);
    }
    console.log('Data saved:', data); // Debugging log
    done(null, data);
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data)=>{
    if(err){
      done(err)
    }
    console.log(data)
    done(null , data);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, data)=>{
    console.log(data)
    done(null , data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    done(null, data);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,data)=>{
    done(null, data);
  }) 
};

  const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
  
    Person.findById(personId, (err, person) => {
      if (err) {
        return done(err);
      }
      if (!person) {
        return done(new Error("Person not found"));
      }
  
      person.favoriteFoods.push(foodToAdd);
  
      person.save((err, updatedPerson) => {
        if (err) {
          return done(err);
        }
        done(null, updatedPerson);
      });
    });
  };
  



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name:personName
  },{age:ageToSet}, {new:true},(err,data)=>{
    console.log(data)
done(null, data)
  })
  
};

const removeById = (personId, done) => {
   Person.findByIdAndRemove({_id:personId}, (err,data)=>{
    done(null, data);
   })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove}, (err, data)=>{
    console.log(data)
    done(null , data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec((err, data)=>{
    if(err){
      done(err)
    }
    done(null, data)
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
