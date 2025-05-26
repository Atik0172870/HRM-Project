
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { FaGraduationCap, FaPlus, FaEye, FaEdit, FaBook, FaCertificate, FaTrash } from 'react-icons/fa';

const TrainingManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedTraining, setSelectedTraining] = useState(null);

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: 'React Advanced Concepts',
      category: 'Technical',
      instructor: 'John Tech',
      duration: '40 hours',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      status: 'Active',
      participants: 15,
      maxParticipants: 20,
      completionRate: 60,
      description: 'Advanced React concepts including hooks, context, and performance optimization'
    },
    {
      id: 2,
      title: 'Leadership Development',
      category: 'Soft Skills',
      instructor: 'Sarah Leader',
      duration: '24 hours',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      status: 'Completed',
      participants: 12,
      maxParticipants: 15,
      completionRate: 100,
      description: 'Developing leadership skills for mid-level managers'
    },
    {
      id: 3,
      title: 'Data Security & Privacy',
      category: 'Compliance',
      instructor: 'Mike Security',
      duration: '16 hours',
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      status: 'Upcoming',
      participants: 8,
      maxParticipants: 25,
      completionRate: 0,
      description: 'Essential data security and privacy training for all employees'
    },
  ]);

  const [employeeTrainings, setEmployeeTrainings] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      trainingTitle: 'React Advanced Concepts',
      progress: 75,
      status: 'In Progress',
      startDate: '2024-02-01',
      expectedCompletion: '2024-02-15',
      certificateIssued: false
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      trainingTitle: 'Leadership Development',
      progress: 100,
      status: 'Completed',
      startDate: '2024-01-15',
      expectedCompletion: '2024-01-30',
      certificateIssued: true
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      trainingTitle: 'React Advanced Concepts',
      progress: 45,
      status: 'In Progress',
      startDate: '2024-02-01',
      expectedCompletion: '2024-02-15',
      certificateIssued: false
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    instructor: '',
    duration: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    description: ''
  });

  const handleShowModal = (type, training = null) => {
    setModalType(type);
    setSelectedTraining(training);
    if (training && type === 'edit') {
      setFormData({
        title: training.title,
        category: training.category,
        instructor: training.instructor,
        duration: training.duration,
        startDate: training.startDate,
        endDate: training.endDate,
        maxParticipants: training.maxParticipants.toString(),
        description: training.description
      });
    } else {
      setFormData({
        title: '',
        category: '',
        instructor: '',
        duration: '',
        startDate: '',
        endDate: '',
        maxParticipants: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTraining(null);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newId = Math.max(...trainings.map(t => t.id)) + 1;
      const newTraining = {
        id: newId,
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
        participants: 0,
        completionRate: 0,
        status: 'Upcoming'
      };
      setTrainings(prev => [...prev, newTraining]);
    } else if (modalType === 'edit') {
      setTrainings(prev => prev.map(training => 
        training.id === selectedTraining.id 
          ? { 
              ...training, 
              ...formData,
              maxParticipants: parseInt(formData.maxParticipants)
            }
          : training
      ));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this training program?')) {
      setTrainings(prev => prev.filter(training => training.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Upcoming': 'info',
      'Completed': 'secondary',
      'Cancelled': 'danger',
      'In Progress': 'warning'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const trainingStats = {
    total: trainings.length,
    active: trainings.filter(t => t.status === 'Active').length,
    completed: trainings.filter(t => t.status === 'Completed').length,
    upcoming: trainings.filter(t => t.status === 'Upcoming').length,
  };

  const getCategoryBadge = (category) => {
    const variants = {
      'Technical': 'primary',
      'Soft Skills': 'success',
      'Compliance': 'warning',
      'Leadership': 'info'
    };
    return <Badge bg={variants[category] || 'secondary'}>{category}</Badge>;
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Training Management</h2>
          <p className="text-muted">Manage employee training programs and certifications</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaGraduationCap size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{trainingStats.total}</div>
                  <div className="small opacity-75">Total Programs</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaBook size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{trainingStats.active}</div>
                  <div className="small opacity-75">Active Training</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaGraduationCap size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{trainingStats.upcoming}</div>
                  <div className="small opacity-75">Upcoming</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCertificate size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{trainingStats.completed}</div>
                  <div className="small opacity-75">Completed</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Training Programs */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Training Programs</h5>
              <Button 
                variant="primary" 
                className="d-flex align-items-center gap-2"
                onClick={() => handleShowModal('add')}
              >
                <FaPlus /> New Program
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 fw-medium text-muted py-3">Training</th>
                    <th className="border-0 fw-medium text-muted py-3">Category</th>
                    <th className="border-0 fw-medium text-muted py-3">Participants</th>
                    <th className="border-0 fw-medium text-muted py-3">Progress</th>
                    <th className="border-0 fw-medium text-muted py-3">Status</th>
                    <th className="border-0 fw-medium text-muted py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training) => (
                    <tr key={training.id}>
                      <td className="border-0 py-3">
                        <div>
                          <div className="fw-medium">{training.title}</div>
                          <div className="text-muted small">By {training.instructor} • {training.duration}</div>
                        </div>
                      </td>
                      <td className="border-0 py-3">{getCategoryBadge(training.category)}</td>
                      <td className="border-0 py-3">
                        <div className="small text-muted mb-1">
                          {training.participants}/{training.maxParticipants} enrolled
                        </div>
                        <ProgressBar 
                          now={(training.participants / training.maxParticipants) * 100} 
                          variant="info"
                          style={{height: '6px'}}
                        />
                      </td>
                      <td className="border-0 py-3">
                        <div className="small text-muted mb-1">
                          {training.completionRate}% completed
                        </div>
                        <ProgressBar 
                          now={training.completionRate} 
                          variant="success"
                          style={{height: '6px'}}
                        />
                      </td>
                      <td className="border-0 py-3">{getStatusBadge(training.status)}</td>
                      <td className="border-0 py-3">
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleShowModal('view', training)}
                          >
                            <FaEye />
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleShowModal('edit', training)}
                          >
                            <FaEdit />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(training.id)}
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
        </Col>

        {/* Employee Training Progress */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <h5 className="fw-bold mb-0">Employee Progress</h5>
            </Card.Header>
            <Card.Body>
              {employeeTrainings.map((training) => (
                <Card key={training.id} className="border-light mb-3">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '30px', height: '30px', fontSize: '12px'}}>
                        {training.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium small">{training.employeeName}</div>
                        <div className="text-muted" style={{fontSize: '11px'}}>{training.trainingTitle}</div>
                      </div>
                      {training.certificateIssued && (
                        <FaCertificate className="text-warning" size={16} />
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span style={{fontSize: '12px'}} className="text-muted">Progress:</span>
                      <span style={{fontSize: '12px'}} className="fw-medium">{training.progress}%</span>
                    </div>
                    <ProgressBar 
                      now={training.progress} 
                      variant={training.progress === 100 ? 'success' : 'info'}
                      style={{height: '4px'}}
                    />
                    <div className="mt-2 d-flex justify-content-between">
                      {getStatusBadge(training.status)}
                      <small className="text-muted">{training.expectedCompletion}</small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <h5 className="fw-bold mb-0">Training Calendar</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="border-0 mb-2">
                <small className="fw-medium">React Advanced Concepts</small>
                <br />
                <small className="text-muted">Feb 1 - Feb 15, 2024</small>
              </Alert>
              <Alert variant="success" className="border-0 mb-2">
                <small className="fw-medium">Data Security Training</small>
                <br />
                <small className="text-muted">Feb 20 - Feb 25, 2024</small>
              </Alert>
              <Alert variant="warning" className="border-0 mb-0">
                <small className="fw-medium">Leadership Workshop</small>
                <br />
                <small className="text-muted">Mar 1 - Mar 10, 2024</small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Training Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Training Program' : 
             modalType === 'edit' ? 'Edit Training Program' : 'Training Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedTraining ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Program Information</h6>
                <p><strong>Title:</strong> {selectedTraining.title}</p>
                <p><strong>Category:</strong> {getCategoryBadge(selectedTraining.category)}</p>
                <p><strong>Instructor:</strong> {selectedTraining.instructor}</p>
                <p><strong>Duration:</strong> {selectedTraining.duration}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedTraining.status)}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Schedule & Enrollment</h6>
                <p><strong>Start Date:</strong> {selectedTraining.startDate}</p>
                <p><strong>End Date:</strong> {selectedTraining.endDate}</p>
                <p><strong>Participants:</strong> {selectedTraining.participants}/{selectedTraining.maxParticipants}</p>
                <p><strong>Completion Rate:</strong> {selectedTraining.completionRate}%</p>
                <div className="mb-2">
                  <ProgressBar 
                    now={selectedTraining.completionRate} 
                    variant="success"
                    style={{height: '10px'}}
                  />
                </div>
              </Col>
              <Col md={12} className="mt-3">
                <h6 className="fw-bold mb-2">Description</h6>
                <Alert variant="light" className="border">
                  {selectedTraining.description}
                </Alert>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Training Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter training title"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="Technical">Technical</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Leadership">Leadership</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Instructor</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      placeholder="Enter instructor name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 40 hours, 2 weeks"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Max Participants</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                  placeholder="Enter maximum number of participants"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter training description and objectives..."
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
              {modalType === 'add' ? 'Create Program' : 'Save Changes'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TrainingManagement;
