/**
 * @jsx React.DOM
 */
//= require react
//= require stores/menu-store
var MenuForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    MenuStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  componentWillUnmount: function() {
    MenuStore.removeChangeEvent(this);
    MenuStore.removeFailToTakeAction(this);
  },

  render: function() {
    var menu = this.props.menu || MenuStore.new();
    var formOptions = {
      name: "Menu",
      onSubmit: this.handleSubmit
    }
    return (
      <div>
        {this.renderErrors()}
        <FormFor object={menu} options={formOptions}/>
      </div>
    );
  },
  renderErrors: function() {
    var errors = [];
    this.state.errors.forEach(function(err) {
      errors.push(<li>{err}</li>)
    })
    return (
      <ul className="form-errors">{errors}</ul>
    )
  },
  handleSubmit: function(data) {
    MenuStore.submit({editing: this.props.editing, menu: data});
  }
})
