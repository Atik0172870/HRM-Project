
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup, Alert } from 'react-bootstrap';
import { FaUserPlus, FaSearch, FaEye, FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';

const RecruitmentManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+1-555-0130',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      experience: '5 years',
      status: 'Interview Scheduled',
      applicationDate: '2024-01-15',
      resume: 'alex_johnson_resume.pdf',
      notes: 'Strong technical background in React and Node.js'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1-555-0131',
      position: 'Product Manager',
      department: 'Product',
      experience: '7 years',
      status: 'Hired',
      applicationDate: '2024-01-10',
      resume: 'maria_garcia_resume.pdf',
      notes: 'Excellent product strategy experience'
    },
    {
      id: 3,
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1-555-0132',
      position: 'UI/UX Designer',
      department: 'Design',
      experience: '3 years',
      status: 'Under Review',
      applicationDate: '2024-01-20',
      resume: 'robert_chen_resume.pdf',
      notes: 'Creative portfolio with strong design fundamentals'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1-555-0133',
      position: 'Sales Representative',
      department: 'Sales',
      experience: '2 years',
      status: 'Rejected',
      applicationDate: '2024-01-18',
      resume: 'emily_davis_resume.pdf',
      notes: 'Good communication skills but lacks required experience'
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    experience: '',
    notes: ''
  });

  const handleShowModal = (type, candidate = null) => {
    setModalType(type);
    setSelectedCandidate(candidate);
    if (candidate && type === 'edit') {
      setFormData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        department: candidate.department,
        experience: candidate.experience,
        notes: candidate.notes
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        experience: '',
        notes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newId = Math.max(...candidates.map(c => c.id)) + 1;
      const newCandidate = {
        id: newId,
        ...formData,
        status: 'Applied',
        applicationDate: new Date().toISOString().split('T')[0],
        resume: `${formData.name.toLowerCase().replace(' ', '_')}_resume.pdf`
      };
      setCandidates(prev => [...prev, newCandidate]);
    } else if (modalType === 'edit') {
      setCandidates(prev => prev.map(candidate => 
        candidate.id === selectedCandidate.id 
          ? { ...candidate, ...formData }
          : candidate
      ));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(prev => prev.filter(candidate => candidate.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Applied': 'secondary',
      'Under Review': 'info',
      'Interview Scheduled': 'warning',
      'Hired': 'success',
      'Rejected': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const recruitmentStats = {
    total: candidates.length,
    underReview: candidates.filter(c => c.status === 'Under Review').length,
    interviewed: candidates.filter(c => c.status === 'Interview Scheduled').length,
    hired: candidates.filter(c => c.status === 'Hired').length,
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Recruitment Management</h2>
          <p className="text-muted">Manage job applications and candidate pipeline</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUserPlus size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{recruitmentStats.total}</div>
                  <div className="small opacity-75">Total Applications</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaSearch size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{recruitmentStats.underReview}</div>
                  <div className="small opacity-75">Under Review</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUserPlus size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{recruitmentStats.interviewed}</div>
                  <div className="small opacity-75">Interviews Scheduled</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUserPlus size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{recruitmentStats.hired}</div>
                  <div className="small opacity-75">Hired This Month</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Candidate Pipeline</h5>
          <div className="d-flex gap-3">
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '200px'}}
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
            <InputGroup style={{width: '250px'}}>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search candidates..."
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
              <FaPlus /> Add Candidate
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Candidate</th>
                <th className="border-0 fw-medium text-muted py-3">Position</th>
                <th className="border-0 fw-medium text-muted py-3">Experience</th>
                <th className="border-0 fw-medium text-muted py-3">Applied Date</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{candidate.name}</div>
                        <div className="text-muted small">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <div className="fw-medium">{candidate.position}</div>
                    <div className="text-muted small">{candidate.department}</div>
                  </td>
                  <td className="border-0 py-3">{candidate.experience}</td>
                  <td className="border-0 py-3 text-muted">{candidate.applicationDate}</td>
                  <td className="border-0 py-3">{getStatusBadge(candidate.status)}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', candidate)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => handleShowModal('edit', candidate)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(candidate.id)}
                      >
                        <FaTrash />
                      </Button>
                      <Button variant="outline-info" size="sm">
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

      {/* Candidate Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'Add New Candidate' : 
             modalType === 'edit' ? 'Edit Candidate' : 'Candidate Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedCandidate ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Personal Information</h6>
                <p><strong>Name:</strong> {selectedCandidate.name}</p>
                <p><strong>Email:</strong> {selectedCandidate.email}</p>
                <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
                <p><strong>Application Date:</strong> {selectedCandidate.applicationDate}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Position Details</h6>
                <p><strong>Position:</strong> {selectedCandidate.position}</p>
                <p><strong>Department:</strong> {selectedCandidate.department}</p>
                <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedCandidate.status)}</p>
              </Col>
              <Col md={12} className="mt-3">
                <h6 className="fw-bold mb-2">Resume</h6>
                <Alert variant="light" className="border d-flex justify-content-between align-items-center">
                  <span>{selectedCandidate.resume}</span>
                  <Button variant="outline-primary" size="sm">
                    <FaDownload /> Download
                  </Button>
                </Alert>
                <h6 className="fw-bold mb-2">Notes</h6>
                <Alert variant="light" className="border">
                  {selectedCandidate.notes || 'No notes available.'}
                </Alert>
                <h6 className="fw-bold mb-2">Update Status</h6>
                <div className="d-flex gap-2">
                  <Button 
                    variant="info" 
                    size="sm"
                    onClick={() => handleStatusChange(selectedCandidate.id, 'Under Review')}
                  >
                    Under Review
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => handleStatusChange(selectedCandidate.id, 'Interview Scheduled')}
                  >
                    Schedule Interview
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => handleStatusChange(selectedCandidate.id, 'Hired')}
                  >
                    Hire
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleStatusChange(selectedCandidate.id, 'Rejected')}
                  >
                    Reject
                  </Button>
                </div>
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
                      placeholder="Enter candidate name"
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
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="e.g., 5 years"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
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
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Add notes about the candidate..."
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
              {modalType === 'add' ? 'Add Candidate' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecruitmentManagement;
