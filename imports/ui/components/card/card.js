import { bucketCol } from '../../../api/buckets/collections';
import './card.html'

Template.card.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({ userId: Meteor.userId() })
    self.limit = new ReactiveVar(0)
    self.sort = new ReactiveVar({ createdAt: -1 })
    self.skip = new ReactiveVar(0)
    self.count = new ReactiveVar(1)
    self.autorun(() => {
        Meteor.subscribe('showBuckets', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get())
        self.count.set(bucketCol.find({ postId: this.data.data._id }).fetch()[0]?.count)
    })
})

Template.card.helpers({
    showBtn: function () {
        if (bucketCol.find({ postId: this.data._id }).fetch()[0]) {
            return true
        }
        else {
            return false
        }
    },
    showCount: function () {
        return Template.instance().count.get()
    }
});
Template.card.events({
    "click .plusBtn": function (e, t) {
        t.count.set(t.count.get() + 1)
        let id = bucketCol.find({ postId: this.data._id }).fetch()[0]._id
        let newCount = t.count.get()
        Meteor.call("incCount", id, newCount, function (err, res) {
            if (err) console.log(err)
            else {
                console.log(res)
            }
        })
    },
    "click .minusBtn": function (e, t) {
        if (t.count.get() > 1) {
            t.count.set(t.count.get() - 1)
            let id = bucketCol.find({ postId: this.data._id }).fetch()[0]._id
            let newCount = t.count.get()
            Meteor.call("incCount", id, newCount, function (err, res) {
                if (err) console.log(err)
                else {
                    console.log(res)
                }
            })
        }

    }

})