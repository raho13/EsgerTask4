import { postCol, postsCountCol } from '../../../api/posts/collections'
import './home.html'
Template.home.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({ status: true })
    self.limit = new ReactiveVar(10)
    self.sort = new ReactiveVar({ createdAt: -1 })
    self.skip = new ReactiveVar(0)
    self.count = new ReactiveVar(0)
    self.itemData = new ReactiveVar({})
    self.autorun(() => {
        Meteor.subscribe('showPosts', self.query.get(), self.limit.get(), self.skip.get(), self.sort.get())
        Meteor.subscribe('getPostsCount')
        self.count.set(postsCountCol.find().fetch()[0]?.count)
        Tracker.afterFlush(function () {
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

Template.home.helpers({
    showPosts: function () {
        return postCol.find(Template.instance().query.get(),
            Template.instance().limit.get(),
            Template.instance().skip.get(), Template.instance().sort.get())
    },
    itemData: function () {
        return Template.instance().itemData.get()
    },
    isPag: function () {
        return postCol.find(Template.instance().query.get(),
            Template.instance().limit.get(),
            Template.instance().skip.get(), Template.instance().sort.get()).fetch()[0]
    }
});

Template.home.events({
    'click .addBucket': function (event, template) {
        let data = {}
        data.postId = this.data._id;
        data.userId = Meteor.userId();
        data.count = 1;
        Meteor.call('addToBucket', data, function (err, res) {
            if (err) console.log(err)
            else {
                $('.toast').toast({ animation: true, delay: 1000 }).toast('show')

            }
        })
    }
});