import { bucketCol } from '../../../api/buckets/collections'
import { postCol } from '../../../api/posts/collections'
import './bucket.html'
Template.bucket.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({ userId: Meteor.userId() })
    self.limit = new ReactiveVar(10)
    self.sort = new ReactiveVar({ createdAt: -1 })
    self.skip = new ReactiveVar(0)
    self.count = new ReactiveVar(0)
    self.itemData = new ReactiveVar({})
    self.total = new ReactiveVar(0)
    self.bucketArr = new ReactiveVar({})
    self.autorun(() => {
        Meteor.subscribe('showBuckets', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get())
        self.bucketArr.set(bucketCol.find().fetch())
        Tracker.afterFlush(function () {
            let a = 0
            self.bucketArr.get().map((item) => {
                a = a + postCol.find({ _id: item.postId }).fetch()[0].price * item.count
            })
            self.total.set(a)
            $('#pagination-demo').twbsPagination({
                totalPages: parseInt(self.count.get() / self.limit.get() + 1),
                onPageClick: function (event, page) {
                    if (page > 1) {
                        self.skip.set((page - 1) * 10)
                    }
                    else {
                        self.skip.set(0)
                    }
                }
            });
        });
    })
})
Template.bucket.helpers({
    showBucket: function () {
        return postCol.find()
    },
    itemData: function () {
        return postCol.find().fetch()[0]
    },
    Total: function () {
        return Template.instance().total.get()
    }
});
Template.bucket.events({
    'click .removeBucket': function (event, template) {
        let data = {}
        data.postId = this.data._id
        data.userId = Meteor.userId()
        Meteor.call('removefromBucket', data, function (err, res) {
            if (err) console.log(err)
            else {
                //console.log(res)
            }
        })
    },
    'click .test': function (event, template) {
        console.log(template.total.get())

    },
});