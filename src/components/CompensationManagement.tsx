
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup } from 'react-bootstrap';
import { FaDollarSign, FaTrophy, FaChartBar, FaPlus, FaEye, FaEdit, FaSearch } from 'react-icons/fa';

const CompensationManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedCompensation, setSelectedCompensation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [compensationData, setCompensationData] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      baseSalary: 95000,
      band: 'Senior Level',
      bonus: 12000,
      incentives: 5000,
      totalCompensation: 112000,
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      performanceRating: 4.2
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      position: 'Product Manager',
      department: 'Product',
      baseSalary: 110000,
      band: 'Manager Level',
      bonus: 18000,
      incentives: 8000,
      totalCompensation: 136000,
      lastReview: '2024-01-20',
      nextReview: '2024-07-20',
      performanceRating: 4.6
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      position: 'Sales Representative',
      department: 'Sales',
      baseSalary: 60000,
      band: 'Mid Level',
      bonus: 15000,
      incentives: 12000,
      totalCompensation: 87000,
      lastReview: '2023-12-10',
      nextReview: '2024-06-10',
      performanceRating: 3.8
    }
  ]);

  const [formData, setFormData] = useState({
    employeeName: '',
    baseSalary: '',
    band: '',
    bonus: '',
    incentives: ''
  });

  const handleShowModal = (type, compensation = null) => {
    setModalType(type);
    setSelectedCompensation(compensation);
    if (compensation && type === 'edit') {
      setFormData({
        employeeName: compensation.employeeName,
        baseSalary: compensation.baseSalary.toString(),
        band: compensation.band,
        bonus: compensation.bonus.toString(),
        incentives: compensation.incentives.toString()
      });
    } else {
      setFormData({
        employeeName: '',
        baseSalary: '',
        band: '',
        bonus: '',
        incentives: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompensation(null);
  };

  const getBandBadge = (band) => {
    const variants = {
      'Entry Level': 'secondary',
      'Mid Level': 'info',
      'Senior Level': 'primary',
      'Manager Level': 'success',
      'Executive Level': 'warning'
    };
    return <Badge bg={variants[band]}>{band}</Badge>;
  };

  const filteredCompensation = compensationData.filter(comp =>
    comp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const compensationStats = {
    totalEmployees: compensationData.length,
    avgSalary: Math.round(compensationData.reduce((sum, emp) => sum + emp.baseSalary, 0) / compensationData.length),
    totalBonuses: compensationData.reduce((sum, emp) => sum + emp.bonus, 0),
    avgTotal: Math.round(compensationData.reduce((sum, emp) => sum + emp.totalCompensation, 0) / compensationData.length)
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Compensation Management</h2>
          <p className="text-muted">Manage salary structures, bonuses, and incentives</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaDollarSign size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${compensationStats.avgSalary.toLocaleString()}</div>
                  <div className="small opacity-75">Average Salary</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaTrophy size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${compensationStats.totalBonuses.toLocaleString()}</div>
                  <div className="small opacity-75">Total Bonuses</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaChartBar size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${compensationStats.avgTotal.toLocaleString()}</div>
                  <div className="small opacity-75">Avg Total Compensation</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaDollarSign size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{compensationStats.totalEmployees}</div>
                  <div className="small opacity-75">Total Employees</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Compensation Overview</h5>
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
              <FaPlus /> Add Compensation
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Base Salary</th>
                <th className="border-0 fw-medium text-muted py-3">Band</th>
                <th className="border-0 fw-medium text-muted py-3">Bonus</th>
                <th className="border-0 fw-medium text-muted py-3">Incentives</th>
                <th className="border-0 fw-medium text-muted py-3">Total</th>
                <th className="border-0 fw-medium text-muted py-3">Next Review</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompensation.map((compensation) => (
                <tr key={compensation.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {compensation.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{compensation.employeeName}</div>
                        <div className="text-muted small">{compensation.position} • {compensation.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3 fw-medium">${compensation.baseSalary.toLocaleString()}</td>
                  <td className="border-0 py-3">{getBandBadge(compensation.band)}</td>
                  <td className="border-0 py-3 text-success">${compensation.bonus.toLocaleString()}</td>
                  <td className="border-0 py-3 text-info">${compensation.incentives.toLocaleString()}</td>
                  <td className="border-0 py-3 fw-bold text-primary">${compensation.totalCompensation.toLocaleString()}</td>
                  <td className="border-0 py-3">{compensation.nextReview}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', compensation)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', compensation)}
                      >
                        <FaEdit />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Compensation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'Add Compensation' : 
             modalType === 'edit' ? 'Edit Compensation' : 'Compensation Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedCompensation ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Employee Information</h6>
                <p><strong>Name:</strong> {selectedCompensation.employeeName}</p>
                <p><strong>Position:</strong> {selectedCompensation.position}</p>
                <p><strong>Department:</strong> {selectedCompensation.department}</p>
                <p><strong>Band:</strong> {getBandBadge(selectedCompensation.band)}</p>
                <p><strong>Performance Rating:</strong> {selectedCompensation.performanceRating}/5</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Compensation Details</h6>
                <p><strong>Base Salary:</strong> ${selectedCompensation.baseSalary.toLocaleString()}</p>
                <p><strong>Annual Bonus:</strong> ${selectedCompensation.bonus.toLocaleString()}</p>
                <p><strong>Incentives:</strong> ${selectedCompensation.incentives.toLocaleString()}</p>
                <p><strong>Total Compensation:</strong> <span className="fw-bold text-success">${selectedCompensation.totalCompensation.toLocaleString()}</span></p>
                <p><strong>Last Review:</strong> {selectedCompensation.lastReview}</p>
                <p><strong>Next Review:</strong> {selectedCompensation.nextReview}</p>
              </Col>
            </Row>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                  placeholder="Enter employee name"
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Base Salary</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.baseSalary}
                      onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                      placeholder="Enter base salary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Salary Band</Form.Label>
                    <Form.Select
                      value={formData.band}
                      onChange={(e) => setFormData({...formData, band: e.target.value})}
                    >
                      <option value="">Select Band</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Manager Level">Manager Level</option>
                      <option value="Executive Level">Executive Level</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Annual Bonus</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.bonus}
                      onChange={(e) => setFormData({...formData, bonus: e.target.value})}
                      placeholder="Enter annual bonus"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Incentives</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.incentives}
                      onChange={(e) => setFormData({...formData, incentives: e.target.value})}
                      placeholder="Enter incentives"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {modalType === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {modalType !== 'view' && (
            <Button variant="primary">
              {modalType === 'add' ? 'Add Compensation' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CompensationManagement;
