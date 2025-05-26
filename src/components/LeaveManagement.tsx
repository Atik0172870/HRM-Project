
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaPlus, FaCheck, FaTimes, FaSearch, FaEye } from 'react-icons/fa';

const LeaveManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 6,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: '2024-01-20',
      approvedBy: ''
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      department: 'Product',
      leaveType: 'Sick Leave',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      reason: 'Medical treatment',
      status: 'Approved',
      appliedDate: '2024-01-25',
      approvedBy: 'HR Manager'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      department: 'Sales',
      leaveType: 'Personal Leave',
      startDate: '2024-02-25',
      endDate: '2024-02-25',
      days: 1,
      reason: 'Personal matters',
      status: 'Rejected',
      appliedDate: '2024-01-28',
      approvedBy: 'Department Head'
    },
  ]);

  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleShowModal = (type, leave = null) => {
    setModalType(type);
    setSelectedLeave(leave);
    if (leave && type === 'view') {
      // View mode - no form data needed
    } else {
      setFormData({
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLeave(null);
  };

  const handleApproveReject = (id, status) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status, approvedBy: 'HR Manager' }
          : request
      )
    );
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Approved': 'success',
      'Pending': 'warning',
      'Rejected': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const filteredLeaves = leaveRequests.filter(leave =>
    leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leaveStats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(l => l.status === 'Pending').length,
    approved: leaveRequests.filter(l => l.status === 'Approved').length,
    rejected: leaveRequests.filter(l => l.status === 'Rejected').length,
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Leave Management</h2>
          <p className="text-muted">Manage employee leave requests and approvals</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalendarAlt size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{leaveStats.total}</div>
                  <div className="small opacity-75">Total Requests</div>
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
                  <div className="h4 fw-bold mb-0">{leaveStats.pending}</div>
                  <div className="small opacity-75">Pending Approval</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCheck size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{leaveStats.approved}</div>
                  <div className="small opacity-75">Approved</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaTimes size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{leaveStats.rejected}</div>
                  <div className="small opacity-75">Rejected</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Leave Requests</h5>
          <div className="d-flex gap-3">
            <InputGroup style={{width: '250px'}}>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search requests..."
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
              <FaPlus /> New Request
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Leave Type</th>
                <th className="border-0 fw-medium text-muted py-3">Duration</th>
                <th className="border-0 fw-medium text-muted py-3">Days</th>
                <th className="border-0 fw-medium text-muted py-3">Applied Date</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {leave.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{leave.employeeName}</div>
                        <div className="text-muted small">{leave.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <Badge bg="info" className="px-3 py-2">{leave.leaveType}</Badge>
                  </td>
                  <td className="border-0 py-3">
                    <div className="small">
                      <div><strong>From:</strong> {leave.startDate}</div>
                      <div><strong>To:</strong> {leave.endDate}</div>
                    </div>
                  </td>
                  <td className="border-0 py-3 fw-medium">{leave.days} days</td>
                  <td className="border-0 py-3 text-muted">{leave.appliedDate}</td>
                  <td className="border-0 py-3">{getStatusBadge(leave.status)}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal('view', leave)}
                      >
                        <FaEye />
                      </Button>
                      {leave.status === 'Pending' && (
                        <>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleApproveReject(leave.id, 'Approved')}
                          >
                            <FaCheck />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleApproveReject(leave.id, 'Rejected')}
                          >
                            <FaTimes />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Leave Request Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Leave Request' : 'Leave Request Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedLeave ? (
            <Row>
              <Col md={6}>
                <p><strong>Employee:</strong> {selectedLeave.employeeName}</p>
                <p><strong>Department:</strong> {selectedLeave.department}</p>
                <p><strong>Leave Type:</strong> 
                  <Badge bg="info" className="ms-2">{selectedLeave.leaveType}</Badge>
                </p>
                <p><strong>Duration:</strong> {selectedLeave.startDate} to {selectedLeave.endDate}</p>
                <p><strong>Total Days:</strong> {selectedLeave.days} days</p>
              </Col>
              <Col md={6}>
                <p><strong>Applied Date:</strong> {selectedLeave.appliedDate}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedLeave.status)}</p>
                {selectedLeave.approvedBy && (
                  <p><strong>Approved By:</strong> {selectedLeave.approvedBy}</p>
                )}
                <p><strong>Reason:</strong></p>
                <Alert variant="light" className="border">
                  {selectedLeave.reason}
                </Alert>
              </Col>
            </Row>
          ) : (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee</Form.Label>
                    <Form.Select
                      value={formData.employeeName}
                      onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                    >
                      <option value="">Select Employee</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Smith">Jane Smith</option>
                      <option value="Mike Johnson">Mike Johnson</option>
                      <option value="Sarah Wilson">Sarah Wilson</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Leave Type</Form.Label>
                    <Form.Select
                      value={formData.leaveType}
                      onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Maternity Leave">Maternity Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                    </Form.Select>
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
                <Form.Label>Reason for Leave</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Please provide a reason for your leave request..."
                />
              </Form.Group>
              {formData.startDate && formData.endDate && (
                <Alert variant="info">
                  <strong>Total Days:</strong> {calculateDays(formData.startDate, formData.endDate)} days
                </Alert>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {modalType === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {modalType === 'add' && (
            <Button variant="primary">
              Submit Request
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeaveManagement;
