import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String
})
const Message = mongoose.model('message',messageSchema)
export default Message;