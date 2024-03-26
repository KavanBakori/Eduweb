const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const signupSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
}); 


const suggestionSchema = new Schema({
    topicname:{
        type: String,
        required:true
    },
    topicdes:{
        type: String,
        required:true
    }
});


const profileSchema = new Schema({
    username:{
        type:String,
    },
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    occupation:{
        type:String,
    },
})


const PickedtopicsSchema = new Schema({
    Educatoremail:{
        type: String,
    },
    picked:{
        type: Boolean,
    },
    topicname:{
        type: String,
    },
    topicdes: {
        type:String,
    }
})


module.exports = { 
    Signup: mongoose.model('Signup', signupSchema),
    Suggestion: mongoose.model('suggestion', suggestionSchema),
    Profile: mongoose.model('profile', profileSchema),
    Pickedtopic: mongoose.model('Pickedtopic', PickedtopicsSchema),
    connectToDatabase: async () => {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/anilearn', {

            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    },
};