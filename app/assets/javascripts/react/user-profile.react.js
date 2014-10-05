/**
 * @jsx React.DOM
 */
//= require react
//= require react/memberships.react
//= require stores/subscription-store
//= require stores/promotion-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require stores/payment-store
//= require react/user-addresses.react
//= require react/user-membership-form.react
//= require react/page-header.react
//= require react/user-promotion-form.react
//= require react/alert.react
var UserProfile = React.createClass({displayName: 'UserProfile',
  getInitialState: function() {
    return {
      memberships: [],
      user: {},
      addresses: [],
      errors: [],
      subscriptions: SubscriptionStore.subscriptions()
    };
  },

  componentDidMount: function() {
    this.setUser();
    SubscriptionStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ subscriptions: SubscriptionStore.subscriptions() });
    }.bind(this));

    UserStore.addChangeEvent(function() {
      var user = UserStore.currentUser();
      if (this.isMounted()) {
        this.setState({
          user: user,
          addresses: user.addresses,
          memberships: user.expired_memberships
        });
      }
      AddressStore.setAddresses(this.state.user.addresses)
    }.bind(this));

    AddressStore.addChangeEvent(function() {
      if (this.isMounted()) this.setState({addresses: AddressStore.addresses()})
    }.bind(this))

    PromotionStore.addFailToTakeAction(function() {
      if (this.isMounted()) this.setState({alert: {message: "Invalid Code", danger: true}})
    }.bind(this))
    PromotionStore.addChangeEvent(function(e, data) {
      var discount = data.discount_amount;
      if(data.discount_type === '$') {
        discount = data.discount_type + '' + discount;
      } else {
        discount =  discount + '' + data.discount_type;
      }
      if (this.isMounted()) this.setState({alert: {message: "You saved " + discount, danger: false }})
    }.bind(this))
  },
  render: function() {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            React.DOM.div({className: "user-profile"},
                this.renderSubscription(),
                this.renderAlert(),
                this.renderPromotionForm(),
                this.renderMembershipForm(),
                this.renderUserAddresses(),
                this.renderCurrentMembership(),
                Memberships({memberships: this.state.memberships})
            )
          )
        )
      )
    );
  },
  renderAlert: function() {
    if(this.state.alert) return(Alert({danger: this.state.alert.danger, message: this.state.alert.message}))
  },
  hasAddr: function() {
    return this.state.addresses && this.state.addresses.length > 0;
  },
  renderUserAddresses: function() {
    return(UserAddresses({addresses: this.state.addresses, name: this.fullName()}));
  },
  renderSubscription: function() {
    if(!this.hasActiveMembership()) return (Subscriptions(null));
  },

  hasActiveMembership: function() {
    return this.state.user.active_memberships && this.state.user.active_memberships.length > 0;
  },

  renderMembershipForm: function() {
    if(!this.hasActiveMembership()) return (UserMembershipForm({subscriptions: this.state.subscriptions, hasAddr: this.hasAddr(), errors: this.state.errors}));
  },

  renderPromotionForm: function() {
    if(!this.hasActiveMembership()) return (UserPromotionForm({errors: this.state.errors}));
  },

  renderCurrentMembership: function() {
    if(this.hasActiveMembership()) return (Membership({membership: this.state.user.active_memberships[0]}));
  },

  fullName: function(first, last) {
    var firstName = this.state.user.first_name || '';
    var lastName = this.state.user.last_name || '';
    return firstName + ' ' + lastName;
  },
  setUser: function() {
    if(this.props.admin && this.props.userId) {
      UserStore.getCurrentUserInfo(this.props.userId);
    } else {
      this.setState({user: SessionStore.currentUser});
    }
  }

});
