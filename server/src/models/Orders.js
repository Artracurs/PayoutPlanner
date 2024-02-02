const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    dueDate: Date, // Дата, к которой заказ должен быть выполнен
    customerDetails: {
        name: String,
        contactInfo: String, // Может включать телефон, email и т.д.
        address: String
    },
    orderStatus: {
        type: String,
        enum: ['обработка', 'выполнение', 'завершен', 'отменен'],
        default: 'обработка'
    },
    items: [{
        itemDescription: String,
        quantity: Number,
        price: Number
        // Можно добавить другие поля, связанные с товаром/услугой
    }],
    totalCost: Number, // Общая стоимость заказа
    assignedEmployees: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Связь с моделью сотрудника
    }],
    notes: String // Примечания к заказу
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
