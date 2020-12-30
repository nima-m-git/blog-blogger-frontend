import { motion, useCycle } from 'framer-motion';
import { useEffect, useState } from 'react';

import './Button.scss';

const Button = ({ button, filters, setFilters, resetFilters }) => {
  const [buttonState, cycleButtonState] = useCycle(...button.states);
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
    cycleButtonState();
    setFilters((prev) => {
      return { ...prev, [button.filter]: !filters[button.filter] };
    });
  };

  useEffect(() => {
    if (buttonState === 'view all') {
      resetFilters();
    }
  }, [buttonState, resetFilters]);

  return (
    <motion.div
      layout
      className={`switch ${isOn ? 'on' : 'off'}`}
      onClick={handleClick}
    >
      <motion.button layout></motion.button>
      <motion.div layout className="toggle-text">
        <div>{buttonState}</div>
      </motion.div>
    </motion.div>
  );
};

export default Button;
