import { useContext } from 'react';
import classNames from 'classnames';
import ThemeContext from '../context/themeContext';

interface IThemeRadioButtonProps {
  value: string;
  handleChange: (data: string) => void;
}

export function ThemeRadioButton({
  value,
  handleChange,
}: IThemeRadioButtonProps) {
  const theme = useContext(ThemeContext);

  return (
    <div className={classNames('theme-container', theme)}>
      <div>
        <input
          type="radio"
          name="light"
          id="light"
          value="light"
          onChange={(event) => handleChange(event.target.value)}
          checked={value === 'light'}
        />
        <label htmlFor="light">Light Theme</label>
      </div>
      <div>
        <input
          type="radio"
          name="dark"
          id="dark"
          value="dark"
          onChange={(event) => handleChange(event.target.value)}
          checked={value === 'dark'}
        />
        <label htmlFor="dark">Dark Theme</label>
      </div>
    </div>
  );
}
