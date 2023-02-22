import { bucketCol } from "./collections"

Meteor.methods({
    addToBucket: function ({ userId, postId, count }) {
        return bucketCol.insert({
            userId, postId, count
        })
    },
    removefromBucket: function ({ postId, userId }) {
        return bucketCol.remove({ postId, userId })
    },

    incCount: function (id, newCount) {
        return bucketCol.update({ _id: id }, {
            $set: {
                count: newCount
            }
        });

    }

})