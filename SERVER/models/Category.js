const mongoose = require('mongoose');

//define the tags schema
const categorySchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true,
    },
    description:{ type: 'string' },
    courses:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
         },
    ],
    
});

//export the cateory model
module.exports = mongoose.model('Category', categorySchema);