import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Employee() {
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    empnumber: '',
    firstName: '',
    lastName: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    salary: '',
    image: null,
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/getemp')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    axios.post('http://localhost:5000/addemployee', data)
      .then(res => {
        console.log(res);
        window.alert('Successful');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });

    handleClose();
  };

  const handledelete = (id) => {
    axios.delete(`http://localhost:5000/deleteemp/${id}`)
    .then(res => {
        console.log("Delete Response:", res);
        window.location.reload();
      })
      .catch(err => console.error("Delete Error:", err));
  };

  const getInitials = (firstname, lastname) => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`;
  };

  return (
    <div>
      <div>
        <span style={{ paddingLeft:'20px',fontSize:'35px'}}>Employee</span>
        <button style={{ marginLeft: '1500px' }} onClick={handleShow}>+</button>
      </div>

      <div className="gallery-container">
        <Row xs={1} md={2} lg={4} className="g-4">
          {employees.map((employee, idx) => (
            <Col key={idx} className="card-col">
              <Card className="employee-card">
                <div style={{marginLeft:'260px',backgroundColor:'black',color:'#fcfcfc',width:'auto',marginRight:'10px',borderRadius:'10px',marginTop:'20px'}}>{employee.empnumber}</div>
                {employee.image ? (
                  <center><Card.Img variant="top" src={`http://localhost:5000/images/${employee.image}`} className="card-img-top" /></center>
                ) : (
                  <div className="initials-circle">
                    {getInitials(employee.firstname, employee.lastname)}
                  </div>
                )}
                <Card.Body className="card-body">
                  <Card.Title> <h2> <center>{employee.firstname} {employee.lastname} </center> </h2></Card.Title>
                  <center>
                    <span> {employee.email}</span>
                  </center>
                  <br />
                  <div style={{marginBottom:'20px'}}>
                    <Link to={`/update/${employee._id}`} ><span style={{paddingLeft:'15px',color:'black'}}><i className="fa-solid fa-pen-to-square"></i></span></Link> 
                    <span style={{paddingLeft:'110px'}}><i className="fa-solid fa-eye"></i></span>
                    <Link onClick={()=>handledelete(employee._id)}><span style={{paddingLeft:'130px',color:'black'}}><i className="fa-solid fa-trash"></i></span></Link>
                  </div>
                  <hr />
                  <Card.Text>
                    <div className="main">
                      <div className="c1">
                        <p> <b>{employee.department} </b><br />
                          <span>Department </span>
                        </p>
                        <p> <b>{new Date(employee.date).toLocaleDateString()} </b> <br />
                          <span>Date of Joining</span>
                        </p>
                      </div>
                      <div className="c2">
                        <p> <b>{employee.designation} </b><br />
                          <span>Designation</span>
                        </p>
                        <p> <b>${employee.salary} </b><br />
                          <span>Salary</span>
                        </p> 
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmpNumber">
              <Form.Label>Employee Number</Form.Label>
              <Form.Control
                type="text"
                name="empnumber"
                value={formData.empnumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDateOfJoining">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
