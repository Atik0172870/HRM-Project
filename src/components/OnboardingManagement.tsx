
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FaUserPlus, FaClipboardCheck, FaCalendarAlt, FaCheckCircle, FaPlus, FaEye, FaEdit } from 'react-icons/fa';

const OnboardingManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedOnboarding, setSelectedOnboarding] = useState(null);

  const [onboardingData, setOnboardingData] = useState([
    {
      id: 1,
      employeeName: 'John Smith',
      position: 'Software Engineer',
      department: 'Engineering',
      startDate: '2024-02-01',
      progress: 75,
      status: 'In Progress',
      buddy: 'Jane Doe',
      completedTasks: 6,
      totalTasks: 8,
      documents: ['Contract', 'Handbook', 'IT Policy'],
      pendingDocuments: ['Emergency Contact', 'Bank Details']
    },
    {
      id: 2,
      employeeName: 'Sarah Wilson',
      position: 'Product Manager',
      department: 'Product',
      startDate: '2024-01-15',
      progress: 100,
      status: 'Completed',
      buddy: 'Mike Johnson',
      completedTasks: 10,
      totalTasks: 10,
      documents: ['Contract', 'Handbook', 'IT Policy', 'Emergency Contact', 'Bank Details'],
      pendingDocuments: []
    },
    {
      id: 3,
      employeeName: 'Alex Chen',
      position: 'UX Designer',
      department: 'Design',
      startDate: '2024-02-15',
      progress: 25,
      status: 'Not Started',
      buddy: 'Lisa Brown',
      completedTasks: 2,
      totalTasks: 8,
      documents: ['Contract'],
      pendingDocuments: ['Handbook', 'IT Policy', 'Emergency Contact', 'Bank Details']
    }
  ]);

  const [formData, setFormData] = useState({
    employeeName: '',
    position: '',
    department: '',
    startDate: '',
    buddy: ''
  });

  const handleShowModal = (type, onboarding = null) => {
    setModalType(type);
    setSelectedOnboarding(onboarding);
    if (onboarding && type === 'edit') {
      setFormData({
        employeeName: onboarding.employeeName,
        position: onboarding.position,
        department: onboarding.department,
        startDate: onboarding.startDate,
        buddy: onboarding.buddy
      });
    } else {
      setFormData({
        employeeName: '',
        position: '',
        department: '',
        startDate: '',
        buddy: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOnboarding(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'In Progress': 'primary',
      'Not Started': 'secondary'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getProgressVariant = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'info';
    if (progress >= 25) return 'warning';
    return 'danger';
  };

  const onboardingStats = {
    total: onboardingData.length,
    completed: onboardingData.filter(o => o.status === 'Completed').length,
    inProgress: onboardingData.filter(o => o.status === 'In Progress').length,
    notStarted: onboardingData.filter(o => o.status === 'Not Started').length
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Onboarding Management</h2>
          <p className="text-muted">Manage employee onboarding process and tasks</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUserPlus size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{onboardingStats.total}</div>
                  <div className="small opacity-75">Total Onboardings</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCheckCircle size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{onboardingStats.completed}</div>
                  <div className="small opacity-75">Completed</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaClipboardCheck size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{onboardingStats.inProgress}</div>
                  <div className="small opacity-75">In Progress</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalendarAlt size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{onboardingStats.notStarted}</div>
                  <div className="small opacity-75">Not Started</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Onboarding Pipeline</h5>
          <Button 
            variant="primary" 
            className="d-flex align-items-center gap-2"
            onClick={() => handleShowModal('add')}
          >
            <FaPlus /> New Onboarding
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Start Date</th>
                <th className="border-0 fw-medium text-muted py-3">Progress</th>
                <th className="border-0 fw-medium text-muted py-3">Tasks</th>
                <th className="border-0 fw-medium text-muted py-3">Buddy</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {onboardingData.map((onboarding) => (
                <tr key={onboarding.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {onboarding.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{onboarding.employeeName}</div>
                        <div className="text-muted small">{onboarding.position} • {onboarding.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">{onboarding.startDate}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <span className="me-2 small">{onboarding.progress}%</span>
                      <div className="flex-grow-1">
                        <ProgressBar 
                          now={onboarding.progress} 
                          variant={getProgressVariant(onboarding.progress)}
                          style={{height: '8px', width: '100px'}}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <span className="fw-medium">{onboarding.completedTasks}/{onboarding.totalTasks}</span>
                    <div className="text-muted small">Tasks completed</div>
                  </td>
                  <td className="border-0 py-3">{onboarding.buddy}</td>
                  <td className="border-0 py-3">{getStatusBadge(onboarding.status)}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', onboarding)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', onboarding)}
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

      {/* Onboarding Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Onboarding' : 
             modalType === 'edit' ? 'Edit Onboarding' : 'Onboarding Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedOnboarding ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Employee Information</h6>
                <p><strong>Name:</strong> {selectedOnboarding.employeeName}</p>
                <p><strong>Position:</strong> {selectedOnboarding.position}</p>
                <p><strong>Department:</strong> {selectedOnboarding.department}</p>
                <p><strong>Start Date:</strong> {selectedOnboarding.startDate}</p>
                <p><strong>Buddy:</strong> {selectedOnboarding.buddy}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Progress Overview</h6>
                <p><strong>Overall Progress:</strong> {selectedOnboarding.progress}%</p>
                <ProgressBar 
                  now={selectedOnboarding.progress} 
                  variant={getProgressVariant(selectedOnboarding.progress)}
                  className="mb-3"
                />
                <p><strong>Tasks:</strong> {selectedOnboarding.completedTasks}/{selectedOnboarding.totalTasks} completed</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedOnboarding.status)}</p>
              </Col>
              <Col md={6} className="mt-3">
                <h6 className="fw-bold mb-2">Completed Documents</h6>
                {selectedOnboarding.documents.map((doc, index) => (
                  <Badge key={index} bg="success" className="me-2 mb-1">{doc}</Badge>
                ))}
              </Col>
              <Col md={6} className="mt-3">
                <h6 className="fw-bold mb-2">Pending Documents</h6>
                {selectedOnboarding.pendingDocuments.map((doc, index) => (
                  <Badge key={index} bg="warning" className="me-2 mb-1">{doc}</Badge>
                ))}
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                      placeholder="Enter employee name"
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
                      <option value="Design">Design</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Onboarding Buddy</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.buddy}
                  onChange={(e) => setFormData({...formData, buddy: e.target.value})}
                  placeholder="Assign an onboarding buddy"
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
            <Button variant="primary">
              {modalType === 'add' ? 'Create Onboarding' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OnboardingManagement;
