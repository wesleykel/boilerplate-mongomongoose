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
Person.findById({_id:personId}, (err, personFound)=>{
  if(err)return console.error(err)
  done(null, personFound)

})

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, (err, personFound)=>{
    if(err)return console.error(err);
   personFound.favoriteFoods.push(foodToAdd)

   personFound.save((err, updatedPerson)=>{
    if(err) return console.log(err);
    done(null, updatedPerson)

   })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name:personName},{age: ageToSet},{new:true},(err, updatedPerson)=>{
if(err) return console.log(err);
done(null, updatedPerson)
});

};

const removeById = (personId, done) => {
 Person.findByIdAndRemove(personId,(err, personToDelete)=>{
  if(err) return console.log(err);
 done(null ,personToDelete);
 })
 
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name:nameToRemove},(err, response)=>{
  if(err) return console.log(err);
  done(null , response);
})

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
Person.find({favoriteFoods:foodToSearch})
.sort({name: 1})//1 is  to sort ascending 
.limit(2)//limit the results  to 2 records
.select({ name:1, favoriteFoods:1})//select only the ones you want or the the records you don't want , if your selecting using 1 then only the fields with 1 will be selected
.exec(function(err,data){
 if(err)return console.log(err);
    done(null ,data);
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
