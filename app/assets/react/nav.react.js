/**
  * @jsx React.DOM
*/
//= require react
//= require react/login-signup.react
var Nav = React.createClass({
  getInitialState: function() {
    return {
      showSignupLogin: false
    };
  },
  render: function() {
    var signupLoginForm = this.state.showSignupLogin ? <LoginSignup /> : undefined
    return (
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#page-top">
            <h3>Blooming Spoon</h3>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="hidden">
              <a href="#page-top"></a>
            </li>
            <li>
              <a href="#delivery">Meal Delivery</a>
            </li>
            <li>
              <a href="#values">Values</a>
            </li>
            <li>
              <a href="#people">People</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#" onClick={this.showLoginSignup}>Login / Signup</a>
            </li>
          </ul>
        </div>
          {signupLoginForm}
      </div>
    );
  },

  showLoginSignup: function(e) {
    e.preventDefault();
    if(this.isMounted()) this.setState({showSignupLogin: !this.state.showSignupLogin});
  }
});

