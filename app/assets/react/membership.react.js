/**
 * @jsx React.DOM
 */
//= require react
//= require react/page-header.react
//= require stores/membership-store
//= require react/membership-hold-form.react
//= require actions/membership-actions

var Membership = React.createClass({
  getInitialState: function() {
    return {
      holdInfo: MembershipStore.membershipHoldDateInfo(),
      holdFormVisible: false
    };
  },

  componentDidMount: function() {
    MembershipStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          holdInfo: MembershipStore.membershipHoldDateInfo()
        });
      }
    }.bind(this));
  },

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
        {this.renderOnHoldMembershipHeader()}
        <ul className="list-group">
          {this.renderUserId()}
          <li className="list-group-item">
            <p>Weeks Remaining: {mem.weeks_remaining}</p>
            <p>Meals Remaining: {mem.meals_remaining}</p>
            <p>Meals per Week: {mem.meals_per_week}</p>
            <p>Start Date: {mem.start_date}</p>
            <p>End Date: {mem.end_date}</p>
            <p>Status: {mem.status}</p>
          </li>
        </ul>
        {this.renderOnHoldButton()}
        {this.renderOnHoldDateOptions()}
        {this.renderRemoveMembershipHold()}
      </div>
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  membershipOnHold: function() {
    return this.props.membership.status && this.props.membership.status === 'on_hold';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (<PageHeader title="Active Membership Details" />);
    }
  },

  renderOnHoldMembershipHeader: function() {
    if(this.membershipOnHold() && !this.props.admin) {
      return (<h4>On Hold Membership Details</h4>);
    }
  },

  renderOnHoldButton: function() {
    if(this.membershipActive() && !this.state.holdFormVisible && this.props.showHoldButton)
      return (<a className='btn btn-default' onClick={this.getOnHoldDateOptions}>Put Membership On Hold</a>);
  },

  getOnHoldDateOptions: function() {
    MembershipStore.getHoldStartDateOptions(this.props.membership.id);
  },

  renderOnHoldDateOptions: function() {
    if(this.membershipActive() && this.state.holdFormVisible === false && this.hasDateOptions()) {
      this.state.holdFormVisible = true;
      return (<MembershipHoldForm holdInfo={this.state.holdInfo} holdMembership={this.putMembershipOnHold} />)
    }
  },

  hasDateOptions: function() {
    return this.state.holdInfo.date_options && this.state.holdInfo.date_options.length > 0;
  },

  renderRemoveMembershipHold: function() {
    if(this.membershipOnHold()) {
      return (<a className='btn btn-default' onClick={this.removeHold}>Remove Membership Hold</a>);
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (<li className="list-group-item">User Id: {this.props.membership.id}</li>);
  },

  putMembershipOnHold: function(holdData) {
    this.setState({ holdFormVisible: false });
    var membershipInfo = {  status: 'active',
                            membershipId: this.props.membership.id,
                            holdStart: holdData.holdDates,
                            numOfWeeksToHold: holdData.maxWeeks };
    MembershipActions.changeMembership(membershipInfo);
  },
});
