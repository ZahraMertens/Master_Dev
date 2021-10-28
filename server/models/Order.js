const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  tutors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tutor'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;