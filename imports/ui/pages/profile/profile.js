import { postCol, postsCountCol } from '../../../api/posts/collections'
import './profile.html'
import 'twbs-pagination'
Template.profile.onCreated(function () {
    const self = this
    self.query = new ReactiveVar({ userId: Meteor.userId() })
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

Template.profile.events({

    'click .openModal': function (event, template) {
        $('#exampleModalLong').modal('show')
    },
    'click .editBtn': function (event, template) {
        $('#exampleModalLong').modal('show')
        template.itemData.set(this)
    }
});

Template.profile.helpers({
    showPosts: function () {
        return postCol.find(Template.instance().query.get(),
            Template.instance().limit.get(),
            Template.instance().skip.get(), Template.instance().sort.get())
    },
    itemData: function () {
        return Template.instance().itemData.get()
    },
    isPug: function () {
        return postCol.find(Template.instance().query.get(),
            Template.instance().limit.get(),
            Template.instance().skip.get(), Template.instance().sort.get()).fetch()[0]
    }
});