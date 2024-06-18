import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Employee from './Employee'; // Import your Employee component here

function MainNav() {
  const [button, setButton] = useState(null);
  const navigate = useNavigate();

  const renderPage = () => {
    switch (button) {
      case 'employee':
        return <Employee />;
      default:
        return <Employee />; 
    }
  };

  const handleButtonClick = (buttonName) => {
    setButton(buttonName);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, zIndex: '1000', width: '100%' }}>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand
            href="#"
            style={{
              fontSize: '30px',
              fontWeight: 'bolder',
              paddingLeft: '20px',
              padding: '10px',
              color: '#09567a',
            }}
          >
            <span>
              <i>Rajodhiya</i>
              <strong>Infotech</strong>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link
                style={{
                  fontSize: '25px',
                  padding: '5px',
                  paddingTop: '10px',
                  color: '#09567a',
                }}
                onClick={() => handleButtonClick('home')}
              >
                Home
              </Nav.Link>
              <Nav.Link
                style={{
                  fontSize: '25px',
                  paddingLeft: '25px',
                  paddingTop: '10px',
                  color: '#09567a',
                }}
                onClick={() => handleButtonClick('employee')}
              >
                Employee
              </Nav.Link>
              {/* Other Nav.Link components */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ width: '400px' }}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div style={{ paddingTop: '80px' }}>{renderPage()}</div>
    </>
  );
}

export default MainNav;
