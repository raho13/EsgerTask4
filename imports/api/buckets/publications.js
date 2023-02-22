import { postCol } from "../posts/collections"
import { bucketCol } from "./collections"

Meteor.publishComposite("showBuckets", function (query = {}, limit = 10, skip = 0, sort = {}) {
    return {
        find() {
            return bucketCol.find(query, { limit, skip, sort })
        },
        children: [{
            find(post) {
                return postCol.find({ _id: post.postId })
            }
        }]
    }
})
