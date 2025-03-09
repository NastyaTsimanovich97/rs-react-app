import { useState } from 'react';

function ErrorButton() {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Error triggered by button click!');
  }

  return (
    <div className="error-button-container">
      <button className="error-button" onClick={handleClick}>
        Error Button
      </button>
    </div>
  );
}

export default ErrorButton;
