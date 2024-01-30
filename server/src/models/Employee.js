const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    registrationDate: {
        type: Date,
        default: Date.now
    },
    birthDate: Date,
    employmentDate: Date,
    position: {
        type: String,
        enum: ['мастер', 'помощник', 'руководитель', 'замерщик', 'сборщик', 'дизайнер'],
        required: true
    },
    terminationDate: Date,
    isInArchive: {
        type: Boolean,
        default: false
    },
    avatar: String, // Можете хранить URL к изображению
    currentOrder: {
        type: Schema.Types.ObjectId,
        ref: 'Order' // Название модели заказа
    },
    debts: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt' // Название модели долга
    }]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
