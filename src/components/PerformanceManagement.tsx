
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { FaChartLine, FaStar, FaTarget, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PerformanceManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [performanceData, setPerformanceData] = useState([
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      position: 'Software Engineer',
      overallRating: 4.2,
      goalsCompleted: 8,
      totalGoals: 10,
      reviewPeriod: '2024 Q1',
      lastReviewDate: '2024-01-15',
      ratings: {
        technical: 4.5,
        communication: 4.0,
        leadership: 3.8,
        productivity: 4.3,
        teamwork: 4.1
      },
      feedback: 'Excellent technical skills, shows great potential for leadership roles.',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Product',
      position: 'Product Manager',
      overallRating: 4.6,
      goalsCompleted: 9,
      totalGoals: 10,
      reviewPeriod: '2024 Q1',
      lastReviewDate: '2024-01-20',
      ratings: {
        technical: 4.2,
        communication: 4.8,
        leadership: 4.7,
        productivity: 4.5,
        teamwork: 4.6
      },
      feedback: 'Outstanding leadership and communication skills. Drives team success effectively.',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      department: 'Sales',
      position: 'Sales Representative',
      overallRating: 3.8,
      goalsCompleted: 6,
      totalGoals: 10,
      reviewPeriod: '2024 Q1',
      lastReviewDate: '',
      ratings: {
        technical: 3.5,
        communication: 4.2,
        leadership: 3.0,
        productivity: 3.8,
        teamwork: 4.0
      },
      feedback: '',
      status: 'Pending'
    },
  ]);

  const [formData, setFormData] = useState({
    employeeId: '',
    technical: '',
    communication: '',
    leadership: '',
    productivity: '',
    teamwork: '',
    feedback: '',
    goals: ''
  });

  const handleShowModal = (type, employee = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    if (employee && type === 'edit') {
      setFormData({
        employeeId: employee.id.toString(),
        technical: employee.ratings.technical.toString(),
        communication: employee.ratings.communication.toString(),
        leadership: employee.ratings.leadership.toString(),
        productivity: employee.ratings.productivity.toString(),
        teamwork: employee.ratings.teamwork.toString(),
        feedback: employee.feedback,
        goals: `${employee.goalsCompleted}/${employee.totalGoals}`
      });
    } else {
      setFormData({
        employeeId: '',
        technical: '',
        communication: '',
        leadership: '',
        productivity: '',
        teamwork: '',
        feedback: '',
        goals: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this performance review?')) {
      setPerformanceData(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const handleSave = () => {
    const ratings = {
      technical: parseFloat(formData.technical),
      communication: parseFloat(formData.communication),
      leadership: parseFloat(formData.leadership),
      productivity: parseFloat(formData.productivity),
      teamwork: parseFloat(formData.teamwork)
    };
    
    const overallRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 5;
    const [completed, total] = formData.goals.split('/').map(num => parseInt(num));

    if (modalType === 'add') {
      const newId = Math.max(...performanceData.map(p => p.id)) + 1;
      const newPerformance = {
        id: newId,
        name: `Employee ${newId}`,
        department: 'Engineering',
        position: 'Software Engineer',
        overallRating,
        goalsCompleted: completed || 0,
        totalGoals: total || 10,
        reviewPeriod: '2024 Q1',
        lastReviewDate: new Date().toISOString().split('T')[0],
        ratings,
        feedback: formData.feedback,
        status: 'Completed'
      };
      setPerformanceData(prev => [...prev, newPerformance]);
    } else if (modalType === 'edit') {
      setPerformanceData(prev => prev.map(emp => 
        emp.id === selectedEmployee.id 
          ? {
              ...emp,
              overallRating,
              goalsCompleted: completed || emp.goalsCompleted,
              totalGoals: total || emp.totalGoals,
              ratings,
              feedback: formData.feedback,
              lastReviewDate: new Date().toISOString().split('T')[0]
            }
          : emp
      ));
    }
    handleCloseModal();
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'info';
    if (rating >= 3.5) return 'warning';
    return 'danger';
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'Pending': 'warning',
      'In Progress': 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const performanceStats = {
    totalReviews: performanceData.length,
    completed: performanceData.filter(p => p.status === 'Completed').length,
    pending: performanceData.filter(p => p.status === 'Pending').length,
    avgRating: (performanceData.reduce((sum, p) => sum + p.overallRating, 0) / performanceData.length).toFixed(1)
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Performance Management</h2>
          <p className="text-muted">Track and evaluate employee performance</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaChartLine size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{performanceStats.totalReviews}</div>
                  <div className="small opacity-75">Total Reviews</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaTarget size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{performanceStats.completed}</div>
                  <div className="small opacity-75">Completed Reviews</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaStar size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{performanceStats.pending}</div>
                  <div className="small opacity-75">Pending Reviews</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaStar size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{performanceStats.avgRating}</div>
                  <div className="small opacity-75">Average Rating</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Performance Reviews Table */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Performance Reviews</h5>
              <Button 
                variant="primary" 
                className="d-flex align-items-center gap-2"
                onClick={() => handleShowModal('add')}
              >
                <FaPlus /> New Review
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 fw-medium text-muted py-3">Employee</th>
                    <th className="border-0 fw-medium text-muted py-3">Overall Rating</th>
                    <th className="border-0 fw-medium text-muted py-3">Goals Progress</th>
                    <th className="border-0 fw-medium text-muted py-3">Status</th>
                    <th className="border-0 fw-medium text-muted py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((employee) => (
                    <tr key={employee.id}>
                      <td className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="fw-medium">{employee.name}</div>
                            <div className="text-muted small">{employee.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <Badge bg={getRatingColor(employee.overallRating)} className="me-2 px-3 py-2">
                            {employee.overallRating.toFixed(1)}
                          </Badge>
                          <div className="flex-grow-1">
                            <ProgressBar 
                              now={(employee.overallRating / 5) * 100} 
                              variant={getRatingColor(employee.overallRating)}
                              style={{height: '6px'}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border-0 py-3">
                        <div className="small text-muted mb-1">
                          {employee.goalsCompleted}/{employee.totalGoals} goals
                        </div>
                        <ProgressBar 
                          now={(employee.goalsCompleted / employee.totalGoals) * 100} 
                          variant="info"
                          style={{height: '6px'}}
                        />
                      </td>
                      <td className="border-0 py-3">{getStatusBadge(employee.status)}</td>
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
        </Col>

        {/* Performance Distribution */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <h5 className="fw-bold mb-0">Performance Distribution</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-success fw-medium">Excellent (4.5+)</span>
                  <span className="text-muted">1</span>
                </div>
                <ProgressBar now={33.3} variant="success" style={{height: '8px'}} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-info fw-medium">Good (4.0-4.4)</span>
                  <span className="text-muted">1</span>
                </div>
                <ProgressBar now={33.3} variant="info" style={{height: '8px'}} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-warning fw-medium">Average (3.5-3.9)</span>
                  <span className="text-muted">1</span>
                </div>
                <ProgressBar now={33.3} variant="warning" style={{height: '8px'}} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-danger fw-medium">Needs Improvement (< 3.5)</span>
                  <span className="text-muted">0</span>
                </div>
                <ProgressBar now={0} variant="danger" style={{height: '8px'}} />
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-3">
            <Card.Header className="bg-white border-0">
              <h5 className="fw-bold mb-0">Upcoming Reviews</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="border-0 mb-3">
                <small className="fw-medium">Mike Johnson</small>
                <br />
                <small className="text-muted">Q1 Review - Due in 3 days</small>
              </Alert>
              <Alert variant="warning" className="border-0 mb-0">
                <small className="fw-medium">David Brown</small>
                <br />
                <small className="text-muted">Annual Review - Due next week</small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Performance Review Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Performance Review' : 
             modalType === 'edit' ? 'Edit Performance Review' : 'Performance Review Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedEmployee ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Employee Information</h6>
                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                <p><strong>Position:</strong> {selectedEmployee.position}</p>
                <p><strong>Department:</strong> {selectedEmployee.department}</p>
                <p><strong>Review Period:</strong> {selectedEmployee.reviewPeriod}</p>
                <p><strong>Overall Rating:</strong> 
                  <Badge bg={getRatingColor(selectedEmployee.overallRating)} className="ms-2">
                    {selectedEmployee.overallRating.toFixed(1)}
                  </Badge>
                </p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Performance Ratings</h6>
                {Object.entries(selectedEmployee.ratings).map(([skill, rating]) => (
                  <div key={skill} className="mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-capitalize">{skill}:</span>
                      <span className="fw-medium">{rating}</span>
                    </div>
                    <ProgressBar 
                      now={(rating / 5) * 100} 
                      variant={getRatingColor(rating)}
                      style={{height: '6px'}}
                    />
                  </div>
                ))}
              </Col>
              <Col md={12} className="mt-3">
                <h6 className="fw-bold mb-2">Goals Progress</h6>
                <div className="d-flex align-items-center mb-3">
                  <span className="me-3">{selectedEmployee.goalsCompleted}/{selectedEmployee.totalGoals} goals completed</span>
                  <ProgressBar 
                    now={(selectedEmployee.goalsCompleted / selectedEmployee.totalGoals) * 100} 
                    variant="info"
                    style={{height: '8px', width: '200px'}}
                  />
                </div>
                <h6 className="fw-bold mb-2">Feedback</h6>
                <Alert variant="light" className="border">
                  {selectedEmployee.feedback || 'No feedback provided yet.'}
                </Alert>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={12} className="mb-3">
                  <h6 className="fw-bold">Performance Ratings (1-5 scale)</h6>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Technical Skills</Form.Label>
                    <Form.Select
                      value={formData.technical}
                      onChange={(e) => setFormData({...formData, technical: e.target.value})}
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Below Average</option>
                      <option value="1">1 - Poor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Communication</Form.Label>
                    <Form.Select
                      value={formData.communication}
                      onChange={(e) => setFormData({...formData, communication: e.target.value})}
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Below Average</option>
                      <option value="1">1 - Poor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Leadership</Form.Label>
                    <Form.Select
                      value={formData.leadership}
                      onChange={(e) => setFormData({...formData, leadership: e.target.value})}
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Below Average</option>
                      <option value="1">1 - Poor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Productivity</Form.Label>
                    <Form.Select
                      value={formData.productivity}
                      onChange={(e) => setFormData({...formData, productivity: e.target.value})}
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Below Average</option>
                      <option value="1">1 - Poor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Teamwork</Form.Label>
                <Form.Select
                  value={formData.teamwork}
                  onChange={(e) => setFormData({...formData, teamwork: e.target.value})}
                >
                  <option value="">Select Rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Below Average</option>
                  <option value="1">1 - Poor</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Goals Progress (Completed/Total)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  placeholder="e.g., 8/10"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Feedback & Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.feedback}
                  onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                  placeholder="Provide detailed feedback on performance, achievements, and areas for improvement..."
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
              {modalType === 'add' ? 'Save Review' : 'Update Review'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PerformanceManagement;
