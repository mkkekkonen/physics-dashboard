import React from 'react';

import { SimulationContext } from './ctx';

export class ContextTest extends React.Component {
  render() {
    const { width } = this.context;

    return (
      <div>{width}</div>
    );
  }
}

ContextTest.contextType = SimulationContext;
