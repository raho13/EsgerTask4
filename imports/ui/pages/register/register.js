import './register.html'
import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.register.events({
    "submit #registerForm": function (e, t) {
        e.preventDefault()
        let username = $("#exampleInputUsername").val()
        let email = $("#exampleInputEmail").val()
        let password = $("#exampleInputPassword").val();
        console.log("k")
        Accounts.createUser({
            username, email, password
        }, function (err) {
            if (err) console.log(err)
            else{
                $('.toast').toast({ animation: true, delay: 1000 }).toast('show')
                FlowRouter.go('/home')
            }
        })

    }
})