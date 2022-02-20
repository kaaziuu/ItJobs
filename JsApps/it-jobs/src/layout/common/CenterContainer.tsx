import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface props {
    children: React.ReactNode | React.ReactNode[];
    containerClass?: string;
}
const CenterContainer = ({ containerClass, children }: props) => {
    return (
        <Container className={containerClass}>
            <Row>
                <Col></Col>
                <Col xs={6}>{children}</Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default CenterContainer;
