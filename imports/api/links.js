import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('getLinks', () => {
        return Links.find({}, {fields: {title: 1}})
    })

    Meteor.methods({
        'links.add'(title) {
            Links.insert(title)
        },
        'link.edit'(linkId, newTitle) {
            Links.update(
                {
                    _id: linkId
                }, {
                    title: newTitle
                })
        },
    })
}