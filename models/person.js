const mongoose = require ('mongoose');


// create schema person
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String ,
        required : false
    },
    age : {
        type:  Number},
    favoriteFoods :{
        type : [String]
    }    
})

module.exports = mongoose.model("person",personSchema);