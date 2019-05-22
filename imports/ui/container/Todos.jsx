import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Todos from '../../api/todo';

class Info extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const title = {
      title: e.target.title.value
    }
    Meteor.call('todo.add', title, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    })
  }
 
  render() {
    const { todos } = this.props
    console.log(this.props)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' name="title" />
          <button type='submit'>submit</button>
        </form>
        {todos.map(todo => (
          <div key={todo._id}>
            {todo.title}
          </div>
        ))}
      </div>
    );
  }
}

export default withTracker(() => {
  const load = Meteor.subscribe('todo.get')
  return {
    loading: load.ready(),
    todos: Todos.find({}).fetch(),
  };
})(Info);
