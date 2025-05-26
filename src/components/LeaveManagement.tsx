
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, ProgressBar, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaUserClock, FaClipboardList, FaPlus, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface LeaveRequest {
  id: number;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: string;
  appliedDate: string;
}

const LeaveManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  const [leaveData, setLeaveData] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: 'John Doe',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2024-01-20'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      department: 'Product',
      leaveType: 'Sick Leave',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      reason: 'Medical appointment',
      status: 'Pending',
      appliedDate: '2024-02-08'
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
      appliedDate: '2024-02-20'
    }
  ]);

  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleShowModal = (type: string, leave: LeaveRequest | null = null) => {
    setModalType(type);
    setSelectedLeave(leave);
    if (leave && type === 'edit') {
      setFormData({
        employeeName: leave.employeeName,
        department: leave.department,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason
      });
    } else {
      setFormData({
        employeeName: '',
        department: '',
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

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaveData(prev => prev.filter(leave => leave.id !== id));
    }
  };

  const handleApprove = (id: number) => {
    setLeaveData(prev => prev.map(leave => 
      leave.id === id ? { ...leave, status: 'Approved' } : leave
    ));
  };

  const handleReject = (id: number) => {
    setLeaveData(prev => prev.map(leave => 
      leave.id === id ? { ...leave, status: 'Rejected' } : leave
    ));
  };

  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSave = () => {
    const days = calculateDays(formData.startDate, formData.endDate);

    if (modalType === 'add') {
      const newId = Math.max(...leaveData.map(l => l.id)) + 1;
      const newLeave: LeaveRequest = {
        id: newId,
        employeeName: formData.employeeName,
        department: formData.department,
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason,
        status: 'Pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      setLeaveData(prev => [...prev, newLeave]);
    } else if (modalType === 'edit' && selectedLeave) {
      setLeaveData(prev => prev.map(leave => 
        leave.id === selectedLeave.id 
          ? {
              ...leave,
              employeeName: formData.employeeName,
              department: formData.department,
              leaveType: formData.leaveType,
              startDate: formData.startDate,
              endDate: formData.endDate,
              days,
              reason: formData.reason
            }
          : leave
      ));
    }
    handleCloseModal();
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Approved': 'success',
      'Pending': 'warning',
      'Rejected': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const leaveStats = {
    totalRequests: leaveData.length,
    approved: leaveData.filter(l => l.status === 'Approved').length,
    pending: leaveData.filter(l => l.status === 'Pending').length,
    rejected: leaveData.filter(l => l.status === 'Rejected').length
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
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalendarAlt size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{leaveStats.totalRequests}</div>
                  <div className="small opacity-75">Total Requests</div>
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
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaUserClock size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{leaveStats.pending}</div>
                  <div className="small opacity-75">Pending</div>
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

      {/* Leave Requests Table */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Leave Requests</h5>
          <Button 
            variant="primary" 
            className="d-flex align-items-center gap-2"
            onClick={() => handleShowModal('add')}
          >
            <FaPlus /> New Request
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Leave Type</th>
                <th className="border-0 fw-medium text-muted py-3">Duration</th>
                <th className="border-0 fw-medium text-muted py-3">Days</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave) => (
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
                      <div>{leave.startDate}</div>
                      <div className="text-muted">to {leave.endDate}</div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <span className="fw-medium">{leave.days} days</span>
                  </td>
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
                            onClick={() => handleApprove(leave.id)}
                          >
                            <FaCheck />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleReject(leave.id)}
                          >
                            <FaTimes />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleShowModal('edit', leave)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(leave.id)}
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

      {/* Leave Request Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add' ? 'New Leave Request' : 
             modalType === 'edit' ? 'Edit Leave Request' : 'Leave Request Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' && selectedLeave ? (
            <Row>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Request Information</h6>
                <p><strong>Employee:</strong> {selectedLeave.employeeName}</p>
                <p><strong>Department:</strong> {selectedLeave.department}</p>
                <p><strong>Leave Type:</strong> {selectedLeave.leaveType}</p>
                <p><strong>Applied Date:</strong> {selectedLeave.appliedDate}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedLeave.status)}</p>
              </Col>
              <Col md={6}>
                <h6 className="fw-bold mb-3">Leave Details</h6>
                <p><strong>Start Date:</strong> {selectedLeave.startDate}</p>
                <p><strong>End Date:</strong> {selectedLeave.endDate}</p>
                <p><strong>Total Days:</strong> {selectedLeave.days}</p>
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
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
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
                  <option value="Paternity Leave">Paternity Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </Form.Select>
              </Form.Group>
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
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Provide reason for leave request..."
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
              {modalType === 'add' ? 'Submit Request' : 'Update Request'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeaveManagement;
