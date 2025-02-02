import { Component } from 'react';

export class ErrorBoundary extends Component {
  render() {
    return (
      <div>
        <p>Error Message</p>
      </div>
    );
  }
}
