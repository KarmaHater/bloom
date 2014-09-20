/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/input.react
var FormFor = React.createClass({
  render: function() {
    if(Object.keys(this.props.object).length === 0) return(<div />);
    var submit = this.props.object.id ? 'Update' : 'Create'
    return (
      <form onSubmit={this.handleSubmit}>
        {this.inputs()}
        <input type="submit"  value={submit} />
      </form>
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key, i) {
      var value = object[key];
      var dataForInput = {value: value, name: key}
      var options = this.options()[key] || {};
      inputs.push(<Input key={key} ref={key} data={dataForInput} options={options}/>);
    }.bind(this));
    return inputs;
  },
  options: function() {
    return this.props.options || {};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var submitHandler = this.props.options.onSubmit
    if(submitHandler) {
      var data = {};
      Object.keys(this.refs).forEach(function(ref) {
        var value = this.refs[ref].refs.input.getDOMNode().value;
        data[ref] = value;
      }.bind(this))
      console.log(data)
      submitHandler(data);
    }
  }

});

// $(document).ready(function() {
//   var todo = {
//     id: 1,
//     title: "yo",
//     age: 20,
//     completed: true,
//     rating: 2,
//     password: "yasalam"
//   }
//   var options = {
//     rating: {
//       type: 'select',
//       values: [1, 2, 3, 4, 5]
//     }
//   }
//   React.renderComponent(<FormFor object={todo} options={options}/>, $('body')[0])
// })