import mongoose, {Schema} from "mongoose";

const ConversationSchema = new Schema({
    conversation: {
        type: Map,
        of: String
    }
})

const ConversationModel = mongoose.model('conversation', ConversationSchema )

module.exports = ConversationModel
