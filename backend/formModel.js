import mongoose from "mongoose"

const Schema = mongoose.Schema;

const formSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    emergency_contact_number: {
        type: String,
        required: true
    },
    govtId: {
        type: String,
        required: true
    },
    govtIdType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    blood_group: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    guardian_details: {
        type: String,
        required: false
    },
    guardian_name: {
        type: String,
        required: false
    },
    marital_status: {
        type: String,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    religion: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    }
}, { timestamp: true });

const Form = mongoose.model('Form', formSchema);
export default Form;
