const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false,
    default: ''
  },
  phoneNumber: {
    type: String,
    required: false,
    default: ''
  },
  position: {
    type: String,
    enum: ['master', 'assistant', 'manager', 'measurer', 'assembler', 'designer'],
    required: false,
    default: 'assistant'
  },
  status: {
    type: String,
    enum: ['employed', 'terminated'],
    required: false,
    default: 'employed'
  },
  avatar: {
    type: String,
    required: false,
    default: ''
  },
  onVacation: {
    type: Boolean,
    required: false,
    default: false
  },
  birthDate: {
    type: Date,
    required: false,
    default: ''
  },
  employmentDate: {
    type: Date,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'employee'],
    default: 'user'
  }
}, { timestamps: true });

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
