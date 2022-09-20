import React from 'react';
import { Provider } from 'react-redux';

import { DashboardTemplate } from '../templates/DashboardTemplate';

import { SimulationView } from './SimulationView';
import { ContentView } from './ContentView';

import store from '../store';

export const App = ({ ...props }) => {
  return (
    <Provider store={store}>
      <DashboardTemplate
        SimulationView={SimulationView}
        ContentView={ContentView}
      />
    </Provider>
  );
};
