/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({displayName: 'ListGroupItem',
  render: function() {
    var item = this.props.item;
    console.log('le item', item)
    return (
      React.DOM.div({className: "list-group-item"},
        React.DOM.h4({className: "list-group-item-heading"}, item.name, " ", this.renderEditLinks()),
        React.DOM.p({className: "list-group-item-text"}, item.description)
      )
    );
  },
  removeHandler: function(e) {
    e.preventDefault();
    this.props.removeHandler(this.props.id)
  },
  renderEditLinks: function() {
    if(!this.props.admin) return;
    var itemEditLinks = [
      {handler: this.makeDefault, name: 'make default', className: 'text-ewarning'},
      {handler: this.removeDefault, name: 'remove default', className: 'text-warning'},
      {handler: this.removeItem, name: 'x', className: 'text-danger'}
    ]
    var filter = "remove default";
    console.log(this.props)
    if (this.props.default) filter = "make default";
    return(EditLinks({links: itemEditLinks.filter(function(link) {
      return link.name !== filter;
    })}))
  },
  makeDefault: function(e) {
    e.preventDefault();
    SelectedItemActions.makeDefault(this.props.id, this.props.item.id)
  },
  removeDefault: function(e) {
    e.preventDefault();
    SelectedItemActions.removeDefault(this.props.id, this.props.item.id)
  },
  removeItem: function(e) {
    e.preventDefault();
    SelectedItemActions.destroySelectedItem(this.props.id, this.props.item.id)
  },
});
