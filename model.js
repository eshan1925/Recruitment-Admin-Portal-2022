var mongoose = require('mongoose');

var csvSchema = new mongoose.Schema({
    SNo:{
        type:Number
    },
    Question:{
        type:String
    },
    OptionA:{
        type:String
    },
    OptionB:{
        type:String
    },
    OptionC:{
        type:String
    },
    OptionD:{
        type:String
    },
    Answer:{
        type:String
    },
    Name:{
        type:String
    }
});


module.exports = new mongoose.model('technicalQuestion', csvSchema);
