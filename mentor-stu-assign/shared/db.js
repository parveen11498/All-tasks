const mongoose = require("mongoose");
const schema = mongoose.Schema;

const dbConnect = async () => {
  try {
    await mongoose.connect(
       "mongodb://guvi:P0Xbl3bTPWfeBwGt@ac-peaetll-shard-00-00.ed9rjmz.mongodb.net:27017,ac-peaetll-shard-00-01.ed9rjmz.mongodb.net:27017,ac-peaetll-shard-00-02.ed9rjmz.mongodb.net:27017/?ssl=true&replicaSet=atlas-863vvd-shard-0&authSource=admin&retryWrites=true&w=majority",      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    );
    console.log("DB Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};

const studentSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: schema.Types.ObjectId,
    default: null,
    ref: "mentor",
  },
});

const student = mongoose.model("student", studentSchema, "student");

const mentorSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentor", mentorSchema, "mentor");

module.exports = { dbConnect, student, mentor };