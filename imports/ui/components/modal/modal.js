import './modal.html'
import Joi from 'joi';

Template.modal.onCreated(function () {
    const self = this
    self.itemData = new ReactiveVar({})
    self.schema = new ReactiveVar(Joi.object({
        title: Joi.string()
            .alphanum()
            .required(),
        description: Joi.string()
            .alphanum()
            .required(),
        userId: Joi.string()
            .alphanum()
            .required(),
        price: Joi.number()
            .integer()
            .required(),
    })
    )
    self.autorun(() => {
        Tracker.afterFlush(function () {
           
            // $('#exampleModalLong').on('hidden.bs.modal', function (e) {
            //     $('#addPost').trigger("reset");
            // })
        });
    })

})
Template.modal.helpers({
    formData: function () {
        return this.data
    }
});

Template.modal.events({
    'click .closeModal': function (e, t) {
        $('#exampleModalLong').modal('hide')
    },

    'click .crtatePost': function (e, t) {
        let title = $("#titleInput").val(),
            description = $("#descriptionInput").val(),
            price = $("#priceInput").val(),
            userId = Meteor.userId()
        let data = t.schema.get().validate({ title, description, price, userId })
        if (!data.error) {
            Meteor.call('addPost', data.value, function (err, res) {
                if (err) console.log(err)
                else {
                    $('#exampleModalLong').modal('hide')
                    $('#addPost').trigger("reset");
                }
            })
        }
        else {
            alert(data.error)
        }
    },
    "click .editPost": function (e, t) {
        let data = {}
        data.title = $("#titleInput").val()
        data.description = $("#descriptionInput").val()
        data.price = $("#priceInput").val()
        data.userId = Meteor.userId()
        data.status = $("#flexSwitchCheckChecked").is(':checked')
        data._id = this.data._id
        Meteor.call('editPost', data, function (err, res) {
            if (err) console.log(err)
            else {
                $('#exampleModalLong').modal('hide')
            }
        })
    }
});