/**
 * @jsx React.DOM
 */
 // require react
//= require stores/add-on-store
//= require react/active-add-on.react
//= require react/purchase-add-ons.react

var ActiveAddOns = React.createClass({
  getInitialState: function() {
    return {
      addOns: AddOnStore.addOns()
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({ addOns: AddOnStore.addOns()})
    }.bind(this))
    AddOnStore.active()
  },
  render: function() {
    var addOns = []
    this.state.addOns.forEach(function(item){
      addOns.push(<ActiveAddOn key={item.id} addOn={item} />)
      })
    return (
      <div className="col-lg-6">
        <h3>Add On Options</h3>
        <div className="add-ons">
          {addOns}
          < PurchaseAddOn addOn={this.state.addOns} />
        </div>
      </div>
    );
  }
});

