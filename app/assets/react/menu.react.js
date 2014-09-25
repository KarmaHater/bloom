/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require stores/selected-item-store
//= require react/menu-form.react
//= require react/menu-items.react
//= require react/edit-links.react
//= require react/list-group.react
//= require actions/menu-actions
//= require actions/selected-item-actions
var Menu = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      items: SelectedItemStore.selectedItems(this.props.menu.id),
      allItems: MenuItemStore.menuItems(),
      errors: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing: false});
    }.bind(this))
    MenuItemStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({allItems: MenuItemStore.menuItems()});
    }.bind(this))
    MenuItemStore.all();
    SelectedItemStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({items: SelectedItemStore.selectedItems(this.props.menu.id)});
    }.bind(this))
    SelectedItemStore.all(this.props.menu.id);
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menu = this.props.menu;
    var editForm = this.state.editing ? <MenuForm menu={menu} editing="true"/> :undefined;
    var panelClass = "panel panel-info";
    if(menu.current) panelClass = 'panel panel-success'
    var editLinks = [
      {handler: this.current, name: 'current', className: 'text-warning'},
      {handler: this.edit, name: 'edit', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];
     var formOptions = {
      name: "Menu Item",
      submit: { value: "Add Menu Item" },
      item: { type: 'select', values: this.allItems()},
      onSubmit: this.addItem
    }
    if(this.props.active) panelClass = "panel panel-success"
    return (
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {menu.title}
            <EditLinks links={editLinks} />
          </h3>
          {editForm}
        </div>
        <div className="panel-body">
          <ListGroup list={this.state.items} removeHandler={this.removeItem}/>
          <FormFor object={{id: menu.id, item: this.allItems()[0]}} options={formOptions} errors={this.state.errors}/>
        </div>
      </div>
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    MenuActions.destroyMenu(this.props.menu.id);
  },
  current: function(e){
    e.preventDefault();
    MenuActions.currentMenu({id: this.props.menu.id, current: true});
  },
  removeItem: function(e) {
    e.preventDefault();
  },
  addItem: function(data) {
    SelectedItemActions.createSelectedItem(data.id, data.item);
  },
  allItems: function() {
    return this.state.allItems.map(function(item) {
      return {value: item.id, show: item.name}
    })
  }
})
