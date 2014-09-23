/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu-form.react
//= require actions/menu-actions
var Menu = React.createClass({displayName: 'Menu',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menu = this.props.menu;
    var editForm = this.state.editing ? MenuForm({menu: menu, editing: "true"}) :undefined;
    return (
      React.DOM.li(null, 
        React.DOM.p(null, menu.title), 
        React.DOM.span(null, React.DOM.a({href: "#", onClick: this.edit}, "edit")), 
        React.DOM.span(null, React.DOM.a({href: "#", onClick: this.delete}, "delete"))

      )
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    MenuActions.destroyMenu(this.props.menu.id);
  }
})
