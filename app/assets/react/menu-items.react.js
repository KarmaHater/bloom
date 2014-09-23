/** @jsx React.DOM */
//= require react
//= require stores/menu-item-store

var MenuItems = React.createClass({
  getInitialState: function() {
    return {
      menuItems: MenuItemStore.menuItems()
    };
  },
  componentDidMount: function() {
    MenuItemStore.addChangeEvent(function() {
      this.setState({
        menuItems: MenuItemStore.menuItems()
      }.bind(this))
    })
    MenuItemStore.all()
  },
  render:function(){
    var menuItems = []

    this.state.menuItems.forEach(function(item){
      menuItems.push(< MenuItem key={item.id} menuItem={item}/>)
    })
    return (
      <div>
        <h3>Menu Items</h3>
        {menuItems}
      </div>
    )
  }
})
