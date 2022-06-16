import React from 'react';

import { DashboardTemplate } from '../../templates/DashboardTemplate';

import { SimulationView } from '../SimulationView';

export const App = ({ ...props }) => {
  return (
    <DashboardTemplate
      SimulationView={SimulationView}
    />
  );
};
