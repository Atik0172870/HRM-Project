
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { FaComments, FaBullhorn, FaPoll, FaThumbsUp, FaPlus, FaEye, FaEdit, FaStar } from 'react-icons/fa';

const EmployeeEngagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('announcements');

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Company All-Hands Meeting',
      content: 'Join us for our quarterly all-hands meeting this Friday at 2 PM.',
      author: 'HR Team',
      date: '2024-01-25',
      priority: 'High',
      status: 'Active',
      views: 142
    },
    {
      id: 2,
      title: 'New Office Policy Updates',
      content: 'Please review the updated office policies in the employee handbook.',
      author: 'HR Team',
      date: '2024-01-20',
      priority: 'Medium',
      status: 'Active',
      views: 89
    }
  ]);

  const [surveys, setSurveys] = useState([
    {
      id: 1,
      title: 'Employee Satisfaction Survey 2024',
      description: 'Help us improve by sharing your feedback',
      status: 'Active',
      responses: 45,
      totalEmployees: 120,
      deadline: '2024-02-15',
      questions: 15
    },
    {
      id: 2,
      title: 'Remote Work Preferences',
      description: 'Share your thoughts on our remote work policy',
      status: 'Completed',
      responses: 98,
      totalEmployees: 120,
      deadline: '2024-01-30',
      questions: 8
    }
  ]);

  const [recognition, setRecognition] = useState([
    {
      id: 1,
      nominee: 'John Doe',
      nominator: 'Jane Smith',
      category: 'Team Player',
      reason: 'Excellent collaboration on the recent project launch',
      date: '2024-01-22',
      likes: 12
    },
    {
      id: 2,
      nominee: 'Sarah Wilson',
      nominator: 'Mike Johnson',
      category: 'Innovation',
      reason: 'Developed innovative solution that saved 20% development time',
      date: '2024-01-20',
      likes: 18
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: '',
    description: '',
    deadline: '',
    questions: ''
  });

  const handleShowModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    if (item && type === 'edit') {
      setFormData({
        title: item.title || '',
        content: item.content || '',
        priority: item.priority || '',
        description: item.description || '',
        deadline: item.deadline || '',
        questions: item.questions?.toString() || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        priority: '',
        description: '',
        deadline: '',
        questions: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'info'
    };
    return <Badge bg={variants[priority]}>{priority}</Badge>;
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Completed': 'secondary',
      'Draft': 'warning'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const engagementStats = {
    totalAnnouncements: announcements.length,
    activeSurveys: surveys.filter(s => s.status === 'Active').length,
    avgResponseRate: Math.round(surveys.reduce((sum, s) => sum + (s.responses / s.totalEmployees * 100), 0) / surveys.length),
    recognitionCount: recognition.length
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Employee Engagement</h2>
          <p className="text-muted">Foster communication, gather feedback, and recognize achievements</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaBullhorn size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{engagementStats.totalAnnouncements}</div>
                  <div className="small opacity-75">Total Announcements</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaPoll size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{engagementStats.activeSurveys}</div>
                  <div className="small opacity-75">Active Surveys</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaComments size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{engagementStats.avgResponseRate}%</div>
                  <div className="small opacity-75">Avg Response Rate</div>
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
                  <div className="h4 fw-bold mb-0">{engagementStats.recognitionCount}</div>
                  <div className="small opacity-75">Recognition Posts</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <div className="d-flex gap-3">
                <Button 
                  variant={activeTab === 'announcements' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('announcements')}
                >
                  <FaBullhorn className="me-2" /> Announcements
                </Button>
                <Button 
                  variant={activeTab === 'surveys' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('surveys')}
                >
                  <FaPoll className="me-2" /> Surveys
                </Button>
                <Button 
                  variant={activeTab === 'recognition' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('recognition')}
                >
                  <FaStar className="me-2" /> Recognition
                </Button>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      {/* Content based on active tab */}
      {activeTab === 'announcements' && (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Company Announcements</h5>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2"
              onClick={() => handleShowModal('add')}
            >
              <FaPlus /> New Announcement
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive className="table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 fw-medium text-muted py-3">Title</th>
                  <th className="border-0 fw-medium text-muted py-3">Author</th>
                  <th className="border-0 fw-medium text-muted py-3">Date</th>
                  <th className="border-0 fw-medium text-muted py-3">Priority</th>
                  <th className="border-0 fw-medium text-muted py-3">Views</th>
                  <th className="border-0 fw-medium text-muted py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td className="border-0 py-3">
                      <div>
                        <div className="fw-medium">{announcement.title}</div>
                        <div className="text-muted small">{announcement.content.substring(0, 60)}...</div>
                      </div>
                    </td>
                    <td className="border-0 py-3">{announcement.author}</td>
                    <td className="border-0 py-3">{announcement.date}</td>
                    <td className="border-0 py-3">{getPriorityBadge(announcement.priority)}</td>
                    <td className="border-0 py-3">{announcement.views}</td>
                    <td className="border-0 py-3">
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm">
                          <FaEye />
                        </Button>
                        <Button variant="outline-success" size="sm">
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
      )}

      {activeTab === 'surveys' && (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Employee Surveys</h5>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2"
              onClick={() => handleShowModal('add')}
            >
              <FaPlus /> Create Survey
            </Button>
          </Card.Header>
          <Card.Body>
            {surveys.map((survey) => (
              <Card key={survey.id} className="mb-3 border-light">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h6 className="fw-bold">{survey.title}</h6>
                      <p className="text-muted mb-2">{survey.description}</p>
                      <div className="d-flex gap-3">
                        <small className="text-muted">Questions: {survey.questions}</small>
                        <small className="text-muted">Deadline: {survey.deadline}</small>
                        {getStatusBadge(survey.status)}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-end">
                        <div className="h5 fw-bold">{survey.responses}/{survey.totalEmployees}</div>
                        <div className="small text-muted mb-2">Responses</div>
                        <ProgressBar 
                          now={(survey.responses / survey.totalEmployees) * 100} 
                          variant="info"
                          style={{height: '8px'}}
                        />
                        <div className="small text-muted mt-1">
                          {Math.round((survey.responses / survey.totalEmployees) * 100)}% completion
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      )}

      {activeTab === 'recognition' && (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Employee Recognition</h5>
            <Button 
              variant="primary" 
              className="d-flex align-items-center gap-2"
              onClick={() => handleShowModal('add')}
            >
              <FaPlus /> Add Recognition
            </Button>
          </Card.Header>
          <Card.Body>
            {recognition.map((item) => (
              <Card key={item.id} className="mb-3 border-light">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <div className="d-flex align-items-center mb-2">
                        <div className="avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          {item.nominee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="fw-bold">{item.nominee}</div>
                          <div className="small text-muted">Recognized by {item.nominator}</div>
                        </div>
                      </div>
                      <Badge bg="primary" className="mb-2">{item.category}</Badge>
                      <p className="mb-2">{item.reason}</p>
                      <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-primary" size="sm">
                          <FaThumbsUp className="me-1" /> {item.likes}
                        </Button>
                        <small className="text-muted">{item.date}</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Modal for adding/editing items */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? `New ${activeTab.slice(0, -1)}` : `Edit ${activeTab.slice(0, -1)}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter title"
              />
            </Form.Group>
            
            {activeTab === 'announcements' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Enter announcement content"
                  />
                </Form.Group>
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
              </>
            )}

            {activeTab === 'surveys' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter survey description"
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Number of Questions</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.questions}
                        onChange={(e) => setFormData({...formData, questions: e.target.value})}
                        placeholder="Enter number of questions"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary">
            {modalType === 'add' ? 'Create' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeEngagement;
