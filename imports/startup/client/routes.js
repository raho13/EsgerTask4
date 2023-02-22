import { FlowRouter } from 'meteor/ostrio:flow-router-extra'    
import "../../ui/layout/mainLayout/mainLayout"
import '../../ui/pages/home/home'
import '../../ui/pages/register/register'
import '../../ui/pages/login/login'
import '../../ui/components/navbar/navbar'
import '../../ui/pages/profile/profile'
import '../../ui/components/modal/modal'
import '../../ui/components/card/card'
import '../../ui/pages/bucket/bucket'

FlowRouter.route('/home', {
    name: 'home',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'home'
        })
    }
})
FlowRouter.route('/profile', {
    name: 'profile',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'profile'
        })
    }
})
FlowRouter.route('/bucket', {
    name: 'bucket',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'bucket'
        })
    }
})
FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'register'
        })
    }
})
FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render("mainLayout", {
            main: 'login'
        })
    }
})

FlowRouter.route('/', {
    action() {
        FlowRouter.go('/home');
    }
})

function trackRouteEntry(context, redirect) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        redirect('/login')
    }
}
FlowRouter.triggers.enter([trackRouteEntry], {
    except: ['login', 'register']
})
FlowRouter.route('*', {
    action: function () {
        redirect('/login')
    }
});