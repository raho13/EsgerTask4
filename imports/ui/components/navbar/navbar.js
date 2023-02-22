import './navbar.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'    

Template.navbar.events({
    'click .btn-logout ': function (event, template) {
        Meteor.logout()
        FlowRouter.go('/login')
    }
});

Template.navbar.helpers({
    showUser: function() {
        return Meteor.user().username
    }
});