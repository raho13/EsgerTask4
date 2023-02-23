import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'    

Template.login.events({
    'submit #loginForm': function (event, template) {
        event.preventDefault()
        let username = $("#inputUsername").val(),
            password = $("#inputPassword").val()
        Meteor.loginWithPassword(username, password, function (err, res) {
            if (err) console.log(err)
            else {
                $('.toast').toast({ animation: true, delay: 1000 }).toast('show')
               FlowRouter.go('/home')
            }
        })
    }
});