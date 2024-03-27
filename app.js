const mongoose = require ('mongoose');
const dotenv =  require('dotenv');
const Person = require ('./models/person');
dotenv.config();


//connect database to server
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to database'))
.catch((err) => console.log('Database connection error ',err));

//Create and Save a Record of a Model
async function createPerson(){
    const newPerson = new Person ({
        name : 'nabil',
        email:'nabil@gmail.com',
        age :25,
        favoriteFoods:['spagetti','pizza']
    })
    const result =await newPerson.save();
    console.log(result);
}
createPerson();

//Create Many Records 
const arrayOfPeople=[
    {name :'ali',email:'ali@gmail.com',age:40,favoriteFoods:['kosksi','sandwitch']},
    {name :'sarra',email:'sarra@gmail.com',age:30,favoriteFoods:['omlette','salade']},
    {name :'randa',age:15,favoriteFoods:['kosksi','pizza','riz']},
    {name :'mohamed',email:'mohamed@gmail.com',age:20,favoriteFoods:['sandwitch']}
];
const createManyPerson = async  (arrayOfPeople)=>{
    try {
        const createdPeople = await Person.create(arrayOfPeople);
        console.log("People created successfully:", createdPeople);
    } catch (err) {
        console.error(err);
    }
};
createManyPerson(arrayOfPeople);


//Use model.find() to Search Database with name
const searchName = async (name) => {
    try {
        const people = await Person.find({ name: name });
        console.log(`People with name '${name}':`, people);
    } catch (err) {
        console.error(err);
    }
};
searchName('ali');



 //Use model.findOne() to Return a Single Matching Document
const findOnePerson = async(favoriteFoods) =>{                  //search by food
    try{
        const person = await Person.findOne({favoriteFoods: {$in : [favoriteFoods]}});
        console.log(`the person who loves this food: '${favoriteFoods}':`, person);
    } catch (err){
        console.error(err);
    }
}

findOnePerson('pizza');


//Use model.findById() to Search Database By _id
const findIdPerson = async (_id) =>{
    try{
        const personId = await Person.findById({_id : _id});
        console.log (` the person with ID is : '${_id}'`,personId);
    } catch (err){
        console.error(err);
    }
}
findIdPerson('6596796a71623e839b8131c6');


//Add Hamburger : update search by id
const updateFoods = async (_id) =>{
    try{
        const  personfind = await Person.findById(_id); //@search with ID the person
        personfind.favoriteFoods.push('Hamburger'); //@add hamburger to the list favoritefoods
        const updatePerson = await personfind.save(); //@save update
        console.log(' food updated suucefully:', updatePerson);
    }catch (err){
        console.error(err);
    }
}
updateFoods('6596796a71623e839b8131c6');


//Updates Using model.findOneAndUpdate() searching by name
const updateOnePerson = async (name) => {
    try {
        const findIdPerson = await Person.findOneAndUpdate({ name: name }, { $set: { age: 20 } }, { new: true })
        console.log('The person found is ', findIdPerson);
    } catch (err) {
        console.error(err);
    }
};
updateOnePerson('randa');


//Delete One Document Using model.findByIdAndDelete searching id
const deletePerson = async (_id) => {
    try {
        const personDelete = await Person.findByIdAndDelete({ _id })
        console.log('We deleted this person:', personDelete);
    } catch (err) {
        console.error(err);
    }
};
deletePerson('6596796a71623e839b8131c5')




//Delete Many Documents with model.deleteMany() searching by name
const deleteManyPeople = async (name) => {
    try {
        const deletePeople = await Person.deleteMany({ name: 'Mary' });
        console.log('People deleted:', deletePeople);
    } catch (err) {
        console.error(err);
    }
};
deleteManyPeople();




//Chain Search Query Helpers 
const chainMethods =() =>{
    Person.find({favoriteFoods: 'burritos'})
    .sort({name : 1})    // sort ascending by name
    .limit(2)  // limit to 2 items
    .select("-age") // Hide The Ages
    .exec()    // execute the query
    .then(() =>{
        console.log('Query chain complited')
    })
    .catch (err =>{
        console.error(err)
    })
}
chainMethods();