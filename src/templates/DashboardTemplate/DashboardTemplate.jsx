import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StyledContainer = styled(Container)`
  font-family: monospace;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TopContainer = styled.div`
  background-color: #339;
  width: 600px;
  height: 600px;

  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: 100vw;
  }
`;

const DefaultSimulationView = styled.div`
  color: #fff;
`;

const DefaultContentView = styled.div`  
  background-color: #ddd;
  color: #222;
  width: 800px;
  
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
`;

const DefaultSimulationViewComponent = ({ ...props }) => {
  return (
    <DefaultSimulationView>Simulaatio</DefaultSimulationView>
  );
};

const DefaultContentViewComponent = ({ ...props }) => {
  return (
    <DefaultContentView>Sisältö</DefaultContentView>
  );
};

export const DashboardTemplate = ({
  SimulationView,
  ContentView,
  ...props
}) => {
  return (
    <StyledContainer>
      <Row>
        <Col>
          <ContentContainer>
            <TopContainer>
              <SimulationView />
            </TopContainer>
          </ContentContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <ContentContainer>
            <ContentView />
          </ContentContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="debugView" />
        </Col>
      </Row>
    </StyledContainer>
  );
};

DashboardTemplate.defaultProps = {
  SimulationView: DefaultSimulationViewComponent,
  ContentView: DefaultContentViewComponent,
};

DashboardTemplate.propTypes = {
  SimulationView: PropTypes.elementType,
  ContentView: PropTypes.elementType,
};
