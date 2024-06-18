import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [empnumber, setEmpnumber] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDept] = useState('');
    const [designation, setDeg] = useState('');
    const [date, setDate] = useState('');
    const [salary, setSalary] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/getemp/${id}`)
            .then(res => {
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setEmpnumber(res.data.empnumber);
                setEmail(res.data.email);
                setDept(res.data.department);
                setDeg(res.data.designation);
                setDate(res.data.date);
                setSalary(res.data.salary);
                setImage(res.data.files && res.data.files.length > 0 ? res.data.files[0] : null);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('empnumber', empnumber);
        formData.append('email', email);
        formData.append('department', department);
        formData.append('designation', designation);
        formData.append('date', date);
        formData.append('salary', salary);
        if (image) {
            formData.append('image', image);
        }

        axios.put(`http://localhost:5000/updateemp/${id}`, formData)
            .then(res => {
                console.log(res);
                navigate('/');
                alert('Updated successfully');
            })
            .catch(err => {
                console.error(err);
                alert('Update failed. Check console for details.');
            });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setImage(files[0]);
        } else {
            switch (name) {
                case 'firstname':
                    setFirstname(value);
                    break;
                case 'lastname':
                    setLastname(value);
                    break;
                case 'empnumber':
                    setEmpnumber(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'department':
                    setDept(value);
                    break;
                case 'designation':
                    setDeg(value);
                    break;
                case 'date':
                    setDate(value);
                    break;
                case 'salary':
                    setSalary(value);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <div >
                <div >
                    <Form onSubmit={handleUpdate} style={{width:'500px',backgroundColor:'#fcfcfc',borderRadius:'20px',padding:'20px',marginLeft:'500px'}}>
                        <Form.Group controlId="formEmpNumber">
                            <Form.Label>Employee Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="empnumber"
                                value={empnumber}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartment">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                type="text"
                                name="department"
                                value={department}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDesignation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                type="text"
                                name="designation"
                                value={designation}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateOfJoining">
                            <Form.Label>Date of Joining</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="salary"
                                value={salary}
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
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
