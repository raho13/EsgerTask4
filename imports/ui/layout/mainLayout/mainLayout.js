import './mainLayout.html'
Template.mainLayout.helpers({
    checkUser: function () {
        return Meteor.user()
    }
});