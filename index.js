const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  description: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  typeRooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeRoom'
  }],
  dataRooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataRoom'
  }]
});

module.exports = mongoose.model('Property', propertySchema);
