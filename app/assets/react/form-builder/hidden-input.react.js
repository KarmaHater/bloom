/**
 * @jsx React.DOM
 */
//= require react

var HiddenInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="hidden" value={data.value} />
    );
  }

});