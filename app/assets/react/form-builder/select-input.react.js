/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/options-for-select.react
var SelectInput = React.createClass({
  render: function() {
    var data = this.props.data;
    var options = [];
    data.values.forEach(function(value) {
      options.push(<OptionForSelect value={value.value} show={value.show}/>)
    }.bind(this))
    console.log(data.value)
    return (
      <select ref={data.name} value={data.value} className={data.className}>
        {options}
      </select>
    );
  }

});
