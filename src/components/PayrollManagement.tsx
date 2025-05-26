
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup, Alert } from 'react-bootstrap';
import { FaMoneyBillWave, FaCalculator, FaDownload, FaSearch, FaEye, FaFileInvoiceDollar } from 'react-icons/fa';

const PayrollManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const payrollData = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      baseSalary: 75000,
      overtime: 2500,
      bonus: 5000,
      deductions: 1200,
      netPay: 81300,
      status: 'Processed',
      payDate: '2024-01-31'
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Product',
      baseSalary: 85000,
      overtime: 1500,
      bonus: 7500,
      deductions: 1400,
      netPay: 92600,
      status: 'Processed',
      payDate: '2024-01-31'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      department: 'Sales',
      baseSalary: 55000,
      overtime: 800,
      bonus: 3000,
      deductions: 950,
      netPay: 57850,
      status: 'Pending',
      payDate: '2024-01-31'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      department: 'Human Resources',
      baseSalary: 60000,
      overtime: 0,
      bonus: 2000,
      deductions: 1000,
      netPay: 61000,
      status: 'Draft',
      payDate: '2024-01-31'
    },
  ];

  const [formData, setFormData] = useState({
    overtime: '',
    bonus: '',
    deductions: '',
    notes: ''
  });

  const handleShowModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      overtime: employee.overtime.toString(),
      bonus: employee.bonus.toString(),
      deductions: employee.deductions.toString(),
      notes: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Processed': 'success',
      'Pending': 'warning',
      'Draft': 'secondary'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const filteredPayroll = payrollData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = payrollData.reduce((sum, emp) => sum + emp.netPay, 0);
  const processedPayroll = payrollData.filter(emp => emp.status === 'Processed').reduce((sum, emp) => sum + emp.netPay, 0);
  const pendingPayroll = payrollData.filter(emp => emp.status !== 'Processed').reduce((sum, emp) => sum + emp.netPay, 0);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Payroll Management</h2>
          <p className="text-muted">Manage employee compensation and benefits</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaMoneyBillWave size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${totalPayroll.toLocaleString()}</div>
                  <div className="small opacity-75">Total Monthly Payroll</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalculator size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${processedPayroll.toLocaleString()}</div>
                  <div className="small opacity-75">Processed Payments</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaFileInvoiceDollar size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${pendingPayroll.toLocaleString()}</div>
                  <div className="small opacity-75">Pending Payments</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Payroll Records - {selectedMonth}</h5>
          <div className="d-flex gap-3 align-items-center">
            <Form.Control
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{width: '180px'}}
            />
            <InputGroup style={{width: '250px'}}>
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
            <Button variant="primary" className="d-flex align-items-center gap-2">
              <FaCalculator /> Process Payroll
            </Button>
            <Button variant="outline-primary" className="d-flex align-items-center gap-2">
              <FaDownload /> Export
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Base Salary</th>
                <th className="border-0 fw-medium text-muted py-3">Overtime</th>
                <th className="border-0 fw-medium text-muted py-3">Bonus</th>
                <th className="border-0 fw-medium text-muted py-3">Deductions</th>
                <th className="border-0 fw-medium text-muted py-3">Net Pay</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((record) => (
                <tr key={record.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{record.name}</div>
                        <div className="text-muted small">{record.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3 fw-medium">${(record.baseSalary / 12).toLocaleString()}</td>
                  <td className="border-0 py-3 text-success">${record.overtime.toLocaleString()}</td>
                  <td className="border-0 py-3 text-info">${record.bonus.toLocaleString()}</td>
                  <td className="border-0 py-3 text-danger">${record.deductions.toLocaleString()}</td>
                  <td className="border-0 py-3 fw-bold text-success">${record.netPay.toLocaleString()}</td>
                  <td className="border-0 py-3">{getStatusBadge(record.status)}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal(record)}
                      >
                        <FaEye />
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <FaDownload />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Payroll Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payroll Details - {selectedEmployee?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Row>
              <Col md={6}>
                <Card className="border-light mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0 fw-bold">Earnings</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Base Salary (Monthly):</span>
                      <span className="fw-medium">${(selectedEmployee.baseSalary / 12).toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Overtime:</span>
                      <span className="fw-medium text-success">${selectedEmployee.overtime.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Bonus:</span>
                      <span className="fw-medium text-info">${selectedEmployee.bonus.toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Gross Pay:</span>
                      <span>${((selectedEmployee.baseSalary / 12) + selectedEmployee.overtime + selectedEmployee.bonus).toLocaleString()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-light mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0 fw-bold">Deductions</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax Withholding:</span>
                      <span className="fw-medium text-danger">${Math.round(selectedEmployee.deductions * 0.6).toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Health Insurance:</span>
                      <span className="fw-medium text-danger">${Math.round(selectedEmployee.deductions * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Other Deductions:</span>
                      <span className="fw-medium text-danger">${Math.round(selectedEmployee.deductions * 0.1).toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Deductions:</span>
                      <span className="text-danger">${selectedEmployee.deductions.toLocaleString()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12}>
                <Alert variant="success" className="border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Net Pay:</span>
                    <span className="h4 fw-bold mb-0">${selectedEmployee.netPay.toLocaleString()}</span>
                  </div>
                </Alert>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            Generate Payslip
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PayrollManagement;
