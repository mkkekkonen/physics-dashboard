import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  font-family: monospace;
`;

const DefaultContentView = styled.div`  
  background-color: #ddd;
  color: #222;
  font-family: monospace;
  width: 800px;
  
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
`;

export const DashboardTemplate = ({
  simulationView,
  contentView,
  ...props
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <ContentContainer>
            <TopContainer>{simulationView}</TopContainer>
          </ContentContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <ContentContainer>{contentView}</ContentContainer>
        </Col>
      </Row>
    </Container>
  );
};

DashboardTemplate.defaultProps = {
  simulationView: <DefaultSimulationView>Simulaatio</DefaultSimulationView>,
  contentView: <DefaultContentView>Sisältö</DefaultContentView>,
};

DashboardTemplate.propTypes = {
  simulationView: PropTypes.node,
  contentView: PropTypes.node,
};
