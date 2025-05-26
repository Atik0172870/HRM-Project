
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const EmployeeManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 75000,
      status: 'Active',
      joinDate: '2023-01-15',
      phone: '+1-555-0123'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      position: 'Product Manager',
      department: 'Product',
      salary: 85000,
      status: 'Active',
      joinDate: '2022-08-20',
      phone: '+1-555-0124'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      position: 'Sales Representative',
      department: 'Sales',
      salary: 55000,
      status: 'Active',
      joinDate: '2023-03-10',
      phone: '+1-555-0125'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      position: 'HR Specialist',
      department: 'Human Resources',
      salary: 60000,
      status: 'On Leave',
      joinDate: '2022-11-05',
      phone: '+1-555-0126'
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    phone: '',
    joinDate: ''
  });

  const handleShowModal = (type, employee = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    if (employee && type === 'edit') {
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        salary: employee.salary.toString(),
        phone: employee.phone,
        joinDate: employee.joinDate
      });
    } else {
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        phone: '',
        joinDate: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        salary: parseInt(formData.salary),
        status: 'Active'
      };
      setEmployees([...employees, newEmployee]);
    } else if (modalType === 'edit') {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...formData, salary: parseInt(formData.salary) }
          : emp
      ));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Employee Management</h2>
          <p className="text-muted">Manage your organization's workforce</p>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Employee Directory</h5>
          <div className="d-flex gap-3">
            <InputGroup style={{width: '300px'}}>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search employees..."
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2"
              onClick={() => handleShowModal('add')}
            >
              <FaPlus /> Add Employee
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Position</th>
                <th className="border-0 fw-medium text-muted py-3">Department</th>
                <th className="border-0 fw-medium text-muted py-3">Salary</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{employee.name}</div>
                        <div className="text-muted small">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">{employee.position}</td>
                  <td className="border-0 py-3">{employee.department}</td>
                  <td className="border-0 py-3 fw-medium">${employee.salary.toLocaleString()}</td>
                  <td className="border-0 py-3">
                    <Badge bg={employee.status === 'Active' ? 'success' : 'warning'} className="px-3 py-2">
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', employee)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', employee)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Employee Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'Add New Employee' : 
             modalType === 'edit' ? 'Edit Employee' : 'Employee Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedEmployee ? (
            <Row>
              <Col md={6}>
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                <p><strong>Position:</strong> {selectedEmployee.position}</p>
              </Col>
              <Col md={6}>
                <p><strong>Department:</strong> {selectedEmployee.department}</p>
                <p><strong>Salary:</strong> ${selectedEmployee.salary.toLocaleString()}</p>
                <p><strong>Join Date:</strong> {selectedEmployee.joinDate}</p>
                <p><strong>Status:</strong> 
                  <Badge bg={selectedEmployee.status === 'Active' ? 'success' : 'warning'} className="ms-2">
                    {selectedEmployee.status}
                  </Badge>
                </p>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="Enter position"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Sales">Sales</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      placeholder="Enter annual salary"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Join Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {modalType === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {modalType !== 'view' && (
            <Button variant="primary" onClick={handleSave}>
              {modalType === 'add' ? 'Add Employee' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeManagement;
