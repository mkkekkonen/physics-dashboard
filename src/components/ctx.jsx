import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

export const SimulationContext = React.createContext({ width: 500 });

export const SimulationContextProvider = ({ children, width, ...props }) => {
  const value = useMemo(
    () => {
      return { width };
    },
    [width],
  );

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

SimulationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};
