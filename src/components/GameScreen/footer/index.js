import React from "react";
import { Row, Col } from "react-bootstrap";

const Footer = ({ stopMainGame }) => {
  return (
    <Row className="footer">
      <Col>
        <h4 className="footer-heading" onClick={stopMainGame}>
          <img
            src={require("../../../assets/images/cross-sign.png")}
            alt="Exit"
            className="exit-icon"
          />
          STOP GAME
        </h4>
      </Col>
    </Row>
  );
};

export default Footer;
