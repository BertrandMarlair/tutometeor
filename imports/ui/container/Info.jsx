import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../../api/links';

class Info extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const title = {
      title: e.target.title.value
    }
    Meteor.call('links.add', title, err => {
      if(err){
        console.log(err)
      }else{
        console.log('success')
      }
    })
  }

  handleEditLink(e, linkId) {
    e.preventDefault();
    Meteor.call('link.edit', linkId, e.target.newlink.value, err => {
      if(err){
        console.log(err)
      }else{
        console.log('success')
      }
    })
  }

  render() {
    const { links } = this.props
    console.log(this.props)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type='text' name="title" />
          <button type='submit'>submit</button>
        </form>
        {links.map(link => (
          <div key={link._id}>
            {link.title}
            <form onSubmit={e => this.handleEditLink(e, link._id)}>
              <input type='text' name='newlink'/>
              <button type="submit">edit</button>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default withTracker(() => {
  const load = Meteor.subscribe('getLinks')
  console.log(Links.find({}))
  return {
    loading: load.ready(),
    links: Links.find({}, { fields: { title: 1 } }).fetch(),
  };
})(Info);
