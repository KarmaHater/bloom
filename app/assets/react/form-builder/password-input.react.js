/**
 * @jsx React.DOM
 */
//= require react

var PasswordInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="password" defaultValue={data.defaultValue} placeholder={data.placeholder} className={data.className}/>
    );
  }

});
