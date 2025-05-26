
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { FaShieldAlt, FaClipboardList, FaExclamationTriangle, FaCheckCircle, FaPlus, FaEye, FaEdit } from 'react-icons/fa';

const ComplianceManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedCompliance, setSelectedCompliance] = useState(null);

  const [complianceData, setComplianceData] = useState([
    {
      id: 1,
      title: 'GDPR Compliance Audit',
      type: 'Data Protection',
      status: 'Active',
      priority: 'High',
      dueDate: '2024-03-15',
      progress: 75,
      assignedTo: 'Legal Team',
      lastUpdated: '2024-01-20',
      requirements: ['Data mapping', 'Privacy policy update', 'Employee training'],
      riskLevel: 'Medium'
    },
    {
      id: 2,
      title: 'Safety Training Compliance',
      type: 'Health & Safety',
      status: 'Completed',
      priority: 'Medium',
      dueDate: '2024-01-30',
      progress: 100,
      assignedTo: 'HR Department',
      lastUpdated: '2024-01-30',
      requirements: ['Safety briefing', 'Equipment training', 'Emergency procedures'],
      riskLevel: 'Low'
    },
    {
      id: 3,
      title: 'Financial Audit 2024',
      type: 'Financial',
      status: 'Pending',
      priority: 'High',
      dueDate: '2024-04-30',
      progress: 25,
      assignedTo: 'Finance Team',
      lastUpdated: '2024-01-15',
      requirements: ['Document review', 'Process audit', 'Compliance report'],
      riskLevel: 'High'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    priority: '',
    dueDate: '',
    assignedTo: '',
    description: ''
  });

  const handleShowModal = (type, compliance = null) => {
    setModalType(type);
    setSelectedCompliance(compliance);
    if (compliance && type === 'edit') {
      setFormData({
        title: compliance.title,
        type: compliance.type,
        priority: compliance.priority,
        dueDate: compliance.dueDate,
        assignedTo: compliance.assignedTo,
        description: compliance.description || ''
      });
    } else {
      setFormData({
        title: '',
        type: '',
        priority: '',
        dueDate: '',
        assignedTo: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompliance(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'Active': 'primary',
      'Pending': 'warning',
      'Overdue': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'info'
    };
    return <Badge bg={variants[priority]}>{priority}</Badge>;
  };

  const getRiskBadge = (risk) => {
    const variants = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'success'
    };
    return <Badge bg={variants[risk]}>{risk} Risk</Badge>;
  };

  const complianceStats = {
    total: complianceData.length,
    completed: complianceData.filter(c => c.status === 'Completed').length,
    active: complianceData.filter(c => c.status === 'Active').length,
    pending: complianceData.filter(c => c.status === 'Pending').length,
    highRisk: complianceData.filter(c => c.riskLevel === 'High').length
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Compliance & Risk Management</h2>
          <p className="text-muted">Monitor compliance requirements and manage organizational risks</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaShieldAlt size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{complianceStats.total}</div>
                  <div className="small opacity-75">Total Compliance Items</div>
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
                  <div className="h4 fw-bold mb-0">{complianceStats.completed}</div>
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
                <FaClipboardList size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{complianceStats.active}</div>
                  <div className="small opacity-75">Active</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaExclamationTriangle size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{complianceStats.highRisk}</div>
                  <div className="small opacity-75">High Risk Items</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Risk Alerts */}
      <Row className="mb-4">
        <Col>
          <Alert variant="warning" className="border-0">
            <FaExclamationTriangle className="me-2" />
            <strong>Compliance Alert:</strong> Financial Audit 2024 is due in 90 days. Please ensure all required documentation is prepared.
          </Alert>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Compliance Tracking</h5>
          <Button 
            variant="primary" 
            className="d-flex align-items-center gap-2"
            onClick={() => handleShowModal('add')}
          >
            <FaPlus /> New Compliance Item
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Compliance Item</th>
                <th className="border-0 fw-medium text-muted py-3">Type</th>
                <th className="border-0 fw-medium text-muted py-3">Progress</th>
                <th className="border-0 fw-medium text-muted py-3">Priority</th>
                <th className="border-0 fw-medium text-muted py-3">Due Date</th>
                <th className="border-0 fw-medium text-muted py-3">Risk Level</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.map((compliance) => (
                <tr key={compliance.id}>
                  <td className="border-0 py-3">
                    <div>
                      <div className="fw-medium">{compliance.title}</div>
                      <div className="text-muted small">Assigned to: {compliance.assignedTo}</div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <Badge bg="secondary" className="px-3 py-2">{compliance.type}</Badge>
                  </td>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <span className="me-2 small">{compliance.progress}%</span>
                      <div className="flex-grow-1">
                        <ProgressBar 
                          now={compliance.progress} 
                          variant={compliance.progress >= 80 ? 'success' : compliance.progress >= 50 ? 'info' : 'warning'}
                          style={{height: '8px', width: '100px'}}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">{getPriorityBadge(compliance.priority)}</td>
                  <td className="border-0 py-3">{compliance.dueDate}</td>
                  <td className="border-0 py-3">{getRiskBadge(compliance.riskLevel)}</td>
                  <td className="border-0 py-3">{getStatusBadge(compliance.status)}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', compliance)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', compliance)}
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

      {/* Compliance Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Compliance Item' : 
             modalType === 'edit' ? 'Edit Compliance Item' : 'Compliance Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedCompliance ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Compliance Information</h6>
                <p><strong>Title:</strong> {selectedCompliance.title}</p>
                <p><strong>Type:</strong> {selectedCompliance.type}</p>
                <p><strong>Priority:</strong> {getPriorityBadge(selectedCompliance.priority)}</p>
                <p><strong>Due Date:</strong> {selectedCompliance.dueDate}</p>
                <p><strong>Assigned To:</strong> {selectedCompliance.assignedTo}</p>
                <p><strong>Last Updated:</strong> {selectedCompliance.lastUpdated}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Status & Progress</h6>
                <p><strong>Status:</strong> {getStatusBadge(selectedCompliance.status)}</p>
                <p><strong>Progress:</strong> {selectedCompliance.progress}%</p>
                <ProgressBar 
                  now={selectedCompliance.progress} 
                  variant={selectedCompliance.progress >= 80 ? 'success' : selectedCompliance.progress >= 50 ? 'info' : 'warning'}
                  className="mb-3"
                />
                <p><strong>Risk Level:</strong> {getRiskBadge(selectedCompliance.riskLevel)}</p>
              </Col>
              <Col md={12} className="mt-3">
                <h6 className="fw-bold mb-2">Requirements</h6>
                {selectedCompliance.requirements.map((req, index) => (
                  <Badge key={index} bg="outline-primary" className="me-2 mb-1">{req}</Badge>
                ))}
              </Col>
            </Row>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter compliance item title"
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="Data Protection">Data Protection</option>
                      <option value="Health & Safety">Health & Safety</option>
                      <option value="Financial">Financial</option>
                      <option value="Legal">Legal</option>
                      <option value="Environmental">Environmental</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assigned To</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      placeholder="Assign to team or individual"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter compliance item description"
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
              {modalType === 'add' ? 'Create Compliance Item' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ComplianceManagement;
