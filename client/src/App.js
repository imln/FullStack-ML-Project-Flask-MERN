import React, { useState } from 'react';
import './App.css';
import { Container, Form, Col, Row, Alert, Image } from 'react-bootstrap'


function App() {
  const [passengerId, setPassengerId] = useState("");
  const [pclass, setPclass] = useState("1");
  const [sex, setSex] = useState("Sex_male");
  const [age, setAge] = useState("");
  const [sibSp, setSibSp] = useState("");
  const [parch, setParch] = useState("");
  const [fare, setFare] = useState("");
  const [embarked, setEmbarked] = useState("");
  const [passengerSurvived, setPassengerSurvived] = useState("");

  const inputPassengerIdEvent = (event) => {
    setPassengerId(event.target.value);
  };
  const inputPclassEvent = (event) => {
    setPclass(event.target.value);
  };
  const inputSexEvent = (event) => {
    setSex(event.target.value);
  };
  const inputAgeEvent = (event) => {
    setAge(event.target.value);
  };
  const inputSibSpEvent = (event) => {
    setSibSp(event.target.value);
  };
  const inputParchEvent = (event) => {
    setParch(event.target.value);
  };
  const inputfareEvent = (event) => {
    setFare(event.target.value);
  };
  const inputEmbarkedEvent = (event) => {
    setEmbarked(event.target.value);
  };

  const formSubmitEvent = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/api/predict', {
      method: 'POST',
      body: JSON.stringify({ passengerId, pclass, sex, age, sibSp, parch, fare, embarked }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => setPassengerSurvived(json["passengerSurvived"] == "1" ? "Yes" : "No"))
  };

  return (
    <Container>
      <Row><h3>Titanic Survival Prediction</h3></Row>
      <Row>
        <Col xs={5}>

          <Form onSubmit={formSubmitEvent}>
            <Form.Group controlId="Input1">
              <Form.Label>Passenger Id : {passengerId}</Form.Label>
              <Form.Control type="text" placeholder="Enter Passenger Id" onChange={inputPassengerIdEvent} />
            </Form.Group>
            <Form.Group controlId="Select1">
              <Form.Label>Passenger Class : {pclass}</Form.Label>
              <Form.Control as="select" onClick={inputPclassEvent}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="Select2">
              <Form.Label>Sex : {sex}</Form.Label>
              <Form.Control as="select" onClick={inputSexEvent}>
                <option value="Sex_male">Male</option>
                <option value="Sex_female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="Input2">
              <Form.Label>Passenger Age : {age}</Form.Label>
              <Form.Control type="text" placeholder="Enter Passenger Age" onChange={inputAgeEvent} />
            </Form.Group>
            <Form.Group controlId="Input3">
              <Form.Label>SibSp : {sibSp}</Form.Label>
              <Form.Control type="text" placeholder="Enter SibSp" onChange={inputSibSpEvent} />
            </Form.Group>
            <Form.Group controlId="Input4">
              <Form.Label>Parch : {parch}</Form.Label>
              <Form.Control type="text" placeholder="Enter Parch" onChange={inputParchEvent} />
            </Form.Group>
            <Form.Group controlId="Input5">
              <Form.Label>Fare : {fare}</Form.Label>
              <Form.Control type="text" placeholder="Enter Fare" onChange={inputfareEvent} />
            </Form.Group>
            <Form.Group controlId="Select3">
              <Form.Label>Embarked : {embarked}</Form.Label>
              <Form.Control as="select" onClick={inputEmbarkedEvent}>
                <option value="Embarked_S">S</option>
                <option value="Embarked_C">C</option>
                <option value="Embarked_Q">Q</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="Input6">
              <Form.Control type="submit" className="btn btn-primary btn-large centerButton" />
            </Form.Group>
          </Form>
          <Alert variant="primary">
            <h5>Passenger Survived: {passengerSurvived}</h5>
          </Alert>

        </Col>
        <Col>
          <p>Age Histogram</p>
          <Image src="http://127.0.0.1:5000/api/titanic/plot/age_hist_plot.png" thumbnail />
        </Col>
      </Row>
    </Container>

  );
}

export default App;
