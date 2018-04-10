import React, { Component } from 'react';
import Loading from '../../components/common/Loading';

class Form extends Component {
  state = {
    loading: false,
    error: false,
    user: {},
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      user: { ...this.state.user, [name]: value },
    });

  submit = e => {
    e.preventDefault();

    if (
      !this.props.user &&
      (!this.state.user.name ||
        !this.state.user.email ||
        !this.state.user.password)
    ) {
      this.setState({ error: true });
      return;
    } else if (this.props.user && this.props.user.id) {
      this.setState({ error: false });
    } else {
      this.setState({ error: false });
    }

    if (this.props.user && this.props.user.id) {
      this.setState({ error: false, loading: true });
      this.props.submit({ ...this.props.user, ...this.state.user });
    } else {
      this.setState({ loading: true });
      this.props.submit(this.state.user);
    }
  };

  render() {
    const user = this.props.user || this.state.user;

    return (
      <div>
        {this.state.error && (
          <div className="error">Please enter all of the required fields.</div>
        )}

        <form
          className="form--wrapper"
          method="POST"
          onSubmit={this.submit}
          autoComplete="off"
        >
          {this.state.loading && (
            <Loading
              message={
                user.id
                  ? 'Updating user details...'
                  : 'Adding new user... Please wait.'
              }
            />
          )}

          {!this.state.loading && (
            <div>
              <div className="input">
                <label htmlFor="name">Full Name (required)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name ? user.name : ''}
                  placeholder="John Doe"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input">
                <label htmlFor="email">Email Address (required)</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={user.email ? user.email : ''}
                  placeholder="john.doe@example.com"
                  onChange={this.handleChange}
                />
              </div>

              {!user.id && (
                <div className="input">
                  <label htmlFor="password">Password (required)</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    defaultValue={user.password ? user.password : ''}
                    placeholder="Passw0rd"
                    onChange={this.handleChange}
                  />
                </div>
              )}

              <div className="input">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={user.phone ? user.phone : ''}
                  placeholder="+1 111 2222 333"
                  onChange={this.handleChange}
                />
              </div>

              <div className="input">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={user.address ? user.address : ''}
                  placeholder="Springfield"
                  onChange={this.handleChange}
                />
              </div>

              <div className="input">
                <button
                  type="submit"
                  className="button size--large button--green"
                >
                  {user.id ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Form;
