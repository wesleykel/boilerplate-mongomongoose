require('dotenv').config();
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
});

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});


const Person = mongoose.model("Person", personSchema);




const createAndSavePerson = (done) => {
 const wesley = new Person({name:"Wesley ",age:43, favoriteFoods:["Chicken", "Pizza"]}) 
  
 wesley.save(function(err,data){
if(err)return console.error(err);
done(null,data)
 });
 
};

const arrayOfPeople = [{name:"Wesley ",age:43, favoriteFoods:["Chicken", "Pizza"]},{name:"Julia ",age:35, favoriteFoods:["Chicken", "Pizza"]}]

const createManyPeople = (arrayOfPeople, done) => {


 Person.create(arrayOfPeople, function(err,data){
   if(err)return console.error(err)
 done(null,data)
 });
};

const findPeopleByName = (personName, done) => {

 Person.find({name: personName}, function(err, personFound){
    if(err)return console.error(err)
    done(null, personFound)
  })

};

const findOneByFood = (food, done) => {
 
  Person.findOne({favoriteFoods: food}, function(err, personFound ) {
  if(err)return console.error(err)
  done(null, personFound)
 })
 
 
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
