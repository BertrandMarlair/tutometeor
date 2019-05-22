import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
    Meteor.publish('todo.get', () => {
        return Todos.find({})
    })

    Meteor.methods({
        'todo.add'(title) {
            Todos.insert(title)
        },
    })
}