/**
 * @jsx React.DOM
 */
//= require react

var TextInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="text" defaultValue={data.defaultValue} placeholder={data.placeholder} />
    );
  }

});