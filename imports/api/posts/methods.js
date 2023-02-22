import { postCol } from "./collections"

Meteor.methods({
    addPost: function ({ title, description, price, userId }) {
        return postCol.insert({
            title, description, price, userId, createdAt: new Date(), status: true
        })
    },
    editPost: function ({ _id, title, description, price, status }) {
        return postCol.update({ _id }, {
            $set: {
                title, description, price, status
            }
        })
    }
})