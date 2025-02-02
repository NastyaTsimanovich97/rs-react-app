import React from 'react';

interface IErrorButtonState {
  throwError: boolean;
}

class ErrorButton extends React.Component<object, IErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { throwError: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Error triggered by button click!');
    }

    return (
      <div className="error-button-container">
        <button className="error-button" onClick={this.handleClick}>
          Error Button
        </button>
      </div>
    );
  }
}

export default ErrorButton;
