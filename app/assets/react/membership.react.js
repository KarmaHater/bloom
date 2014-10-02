/**
 * @jsx React.DOM
 */
//= require react

var Membership = React.createClass({
  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var mem = this.props.membership;
    return (
      <div>
        {this.renderActiveMembershipHeader()}
        <ul>
          {this.renderUserId()}
          <li className="list-group-item">Weeks Remaining: {mem.weeks_remaining}</li>
          <li className="list-group-item">Meals Remaining: {mem.meals_remaining}</li>
          <li className="list-group-item">Meals per Week: {mem.meals_per_week}</li>
          <li className="list-group-item">Start Date: {mem.start_date}</li>
          <li className="list-group-item">End Date: {mem.end_date}</li>
          <li className="list-group-item">Status: {mem.status}</li>
        </ul>
      </div>
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (<h4>Active Membership Details</h4>);
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (<li className="list-group-item">User Id: {this.props.membership.id}</li>);
  }
});
