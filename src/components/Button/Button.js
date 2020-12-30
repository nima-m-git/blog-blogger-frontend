import { useCycle } from 'framer-motion';
import { useEffect } from 'react';

const Button = ({ button, filters, setFilters, resetFilters }) => {
  const buttonColors = ['blue', 'green'];
  const [color, cycleColor] = useCycle(...buttonColors);
  const [buttonState, cycleButtonState] = useCycle(...button.states);

  useEffect(() => {
    if (buttonState === 'view all') {
      resetFilters();
    }
  }, [buttonState, resetFilters]);

  return (
    <button
      onClick={() => {
        cycleColor();
        cycleButtonState();
        setFilters((prev) => {
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
