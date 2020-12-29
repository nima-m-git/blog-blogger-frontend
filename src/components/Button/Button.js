import { useCycle } from 'framer-motion';
import { useEffect } from 'react';

const Button = ({ button, filters, setSettings, resetSettings }) => {
  const buttonColors = ['blue', 'green'];
  const [color, cycleColor] = useCycle(...buttonColors);
  const [buttonState, cycleButtonState] = useCycle(...button.states);

  useEffect(() => {
    if (buttonState === 'view all') {
      resetSettings();
    }
  }, [buttonState, resetSettings]);

  return (
    <button
      onClick={() => {
        cycleColor();
        cycleButtonState();
        setSettings((prev) => {
          return { ...prev, [button.filter]: !filters[button.filter] };
        });
      }}
      style={{ backgroundColor: color, color: 'white' }}
    >
      {buttonState}
    </button>
  );
};

export default Button;
