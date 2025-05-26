
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FaHeartbeat, FaPlus, FaEye, FaEdit, FaTrash, FaUmbrella, FaMoneyBillWave } from 'react-icons/fa';

const BenefitsManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const [benefits, setBenefits] = useState([
    {
      id: 1,
      name: 'Health Insurance Premium',
      type: 'Health',
      provider: 'BlueCross BlueShield',
      coverage: 'Medical, Dental, Vision',
      monthlyCost: 450,
      employeeContribution: 150,
      companyContribution: 300,
      eligibleEmployees: 247,
      enrolledEmployees: 198,
      status: 'Active'
    },
    {
      id: 2,
      name: '401(k) Retirement Plan',
      type: 'Retirement',
      provider: 'Fidelity',
      coverage: 'Company Match up to 6%',
      monthlyCost: 0,
      employeeContribution: 0,
      companyContribution: 0,
      eligibleEmployees: 247,
      enrolledEmployees: 165,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Life Insurance',
      type: 'Insurance',
      provider: 'MetLife',
      coverage: '2x Annual Salary',
      monthlyCost: 25,
      employeeContribution: 0,
      companyContribution: 25,
      eligibleEmployees: 247,
      enrolledEmployees: 247,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Flexible Spending Account',
      type: 'Health',
      provider: 'WageWorks',
      coverage: 'Medical & Dependent Care',
      monthlyCost: 5,
      employeeContribution: 0,
      companyContribution: 5,
      eligibleEmployees: 247,
      enrolledEmployees: 89,
      status: 'Active'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    provider: '',
    coverage: '',
    monthlyCost: '',
    employeeContribution: '',
    companyContribution: ''
  });

  const handleShowModal = (type, benefit = null) => {
    setModalType(type);
    setSelectedBenefit(benefit);
    if (benefit && type === 'edit') {
      setFormData({
        name: benefit.name,
        type: benefit.type,
        provider: benefit.provider,
        coverage: benefit.coverage,
        monthlyCost: benefit.monthlyCost.toString(),
        employeeContribution: benefit.employeeContribution.toString(),
        companyContribution: benefit.companyContribution.toString()
      });
    } else {
      setFormData({
        name: '',
        type: '',
        provider: '',
        coverage: '',
        monthlyCost: '',
        employeeContribution: '',
        companyContribution: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBenefit(null);
  };

  const handleSave = () => {
    const monthlyCost = parseFloat(formData.monthlyCost) || 0;
    const employeeContribution = parseFloat(formData.employeeContribution) || 0;
    const companyContribution = parseFloat(formData.companyContribution) || 0;

    if (modalType === 'add') {
      const newId = Math.max(...benefits.map(b => b.id)) + 1;
      const newBenefit = {
        id: newId,
        ...formData,
        monthlyCost,
        employeeContribution,
        companyContribution,
        eligibleEmployees: 247,
        enrolledEmployees: 0,
        status: 'Active'
      };
      setBenefits(prev => [...prev, newBenefit]);
    } else if (modalType === 'edit') {
      setBenefits(prev => prev.map(benefit => 
        benefit.id === selectedBenefit.id 
          ? { 
              ...benefit, 
              ...formData,
              monthlyCost,
              employeeContribution,
              companyContribution
            }
          : benefit
      ));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      setBenefits(prev => prev.filter(benefit => benefit.id !== id));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Health': return <FaHeartbeat className="text-danger" />;
      case 'Insurance': return <FaUmbrella className="text-info" />;
      case 'Retirement': return <FaMoneyBillWave className="text-success" />;
      default: return <FaHeartbeat className="text-secondary" />;
    }
  };

  const getTypeBadge = (type) => {
    const variants = {
      'Health': 'danger',
      'Insurance': 'info',
      'Retirement': 'success',
      'Other': 'secondary'
    };
    return <Badge bg={variants[type] || 'secondary'}>{type}</Badge>;
  };

  const benefitsStats = {
    totalBenefits: benefits.length,
    totalCost: benefits.reduce((sum, b) => sum + (b.monthlyCost * b.enrolledEmployees), 0),
    avgEnrollment: Math.round(benefits.reduce((sum, b) => sum + (b.enrolledEmployees / b.eligibleEmployees * 100), 0) / benefits.length),
    companyContribution: benefits.reduce((sum, b) => sum + (b.companyContribution * b.enrolledEmployees), 0)
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Benefits Administration</h2>
          <p className="text-muted">Manage employee benefits and insurance programs</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaHeartbeat size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{benefitsStats.totalBenefits}</div>
                  <div className="small opacity-75">Total Benefits</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaMoneyBillWave size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${benefitsStats.totalCost.toLocaleString()}</div>
                  <div className="small opacity-75">Monthly Cost</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUmbrella size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{benefitsStats.avgEnrollment}%</div>
                  <div className="small opacity-75">Avg Enrollment</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaMoneyBillWave size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">${benefitsStats.companyContribution.toLocaleString()}</div>
                  <div className="small opacity-75">Company Contribution</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Benefits Programs</h5>
          <Button 
            variant="primary" 
            className="d-flex align-items-center gap-2"
            onClick={() => handleShowModal('add')}
          >
            <FaPlus /> Add Benefit
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Benefit</th>
                <th className="border-0 fw-medium text-muted py-3">Type</th>
                <th className="border-0 fw-medium text-muted py-3">Provider</th>
                <th className="border-0 fw-medium text-muted py-3">Monthly Cost</th>
                <th className="border-0 fw-medium text-muted py-3">Enrollment</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit) => (
                <tr key={benefit.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        {getTypeIcon(benefit.type)}
                      </div>
                      <div>
                        <div className="fw-medium">{benefit.name}</div>
                        <div className="text-muted small">{benefit.coverage}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">{getTypeBadge(benefit.type)}</td>
                  <td className="border-0 py-3">{benefit.provider}</td>
                  <td className="border-0 py-3">
                    <div className="fw-medium">${benefit.monthlyCost}/month</div>
                    <div className="text-muted small">
                      Employee: ${benefit.employeeContribution} | Company: ${benefit.companyContribution}
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <div className="small text-muted mb-1">
                      {benefit.enrolledEmployees}/{benefit.eligibleEmployees} enrolled
                    </div>
                    <ProgressBar 
                      now={(benefit.enrolledEmployees / benefit.eligibleEmployees) * 100} 
                      variant="info"
                      style={{height: '6px'}}
                    />
                    <div className="small text-muted">
                      {Math.round((benefit.enrolledEmployees / benefit.eligibleEmployees) * 100)}%
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', benefit)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', benefit)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(benefit.id)}
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

      {/* Benefit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'Add New Benefit' : 
             modalType === 'edit' ? 'Edit Benefit' : 'Benefit Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedBenefit ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Benefit Information</h6>
                <p><strong>Name:</strong> {selectedBenefit.name}</p>
                <p><strong>Type:</strong> {getTypeBadge(selectedBenefit.type)}</p>
                <p><strong>Provider:</strong> {selectedBenefit.provider}</p>
                <p><strong>Coverage:</strong> {selectedBenefit.coverage}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Cost & Enrollment</h6>
                <p><strong>Monthly Cost:</strong> ${selectedBenefit.monthlyCost}</p>
                <p><strong>Employee Contribution:</strong> ${selectedBenefit.employeeContribution}</p>
                <p><strong>Company Contribution:</strong> ${selectedBenefit.companyContribution}</p>
                <p><strong>Enrollment:</strong> {selectedBenefit.enrolledEmployees}/{selectedBenefit.eligibleEmployees}</p>
                <div className="mt-2">
                  <ProgressBar 
                    now={(selectedBenefit.enrolledEmployees / selectedBenefit.eligibleEmployees) * 100} 
                    variant="info"
                    style={{height: '10px'}}
                  />
                  <small className="text-muted">
                    {Math.round((selectedBenefit.enrolledEmployees / selectedBenefit.eligibleEmployees) * 100)}% enrollment rate
                  </small>
                </div>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Benefit Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter benefit name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="Health">Health</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      placeholder="Enter provider name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Monthly Cost</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.monthlyCost}
                      onChange={(e) => setFormData({...formData, monthlyCost: e.target.value})}
                      placeholder="0.00"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Contribution</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.employeeContribution}
                      onChange={(e) => setFormData({...formData, employeeContribution: e.target.value})}
                      placeholder="0.00"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Contribution</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.companyContribution}
                      onChange={(e) => setFormData({...formData, companyContribution: e.target.value})}
                      placeholder="0.00"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Coverage Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.coverage}
                  onChange={(e) => setFormData({...formData, coverage: e.target.value})}
                  placeholder="Describe what this benefit covers..."
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
              {modalType === 'add' ? 'Add Benefit' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BenefitsManagement;
