
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, InputGroup, Alert } from 'react-bootstrap';
import { FaClock, FaCalendarDay, FaDownload, FaSearch, FaPlay, FaStop } from 'react-icons/fa';

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedInEmployees, setCheckedInEmployees] = useState(new Set([1, 2, 3]));

  const attendanceData = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      checkIn: '09:15 AM',
      checkOut: '',
      status: 'Present',
      workingHours: '6h 45m',
      overtime: '0h',
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Product',
      checkIn: '08:45 AM',
      checkOut: '',
      status: 'Present',
      workingHours: '7h 15m',
      overtime: '0h',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      department: 'Sales',
      checkIn: '09:30 AM',
      checkOut: '',
      status: 'Present',
      workingHours: '6h 30m',
      overtime: '0h',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      department: 'Human Resources',
      checkIn: '',
      checkOut: '',
      status: 'On Leave',
      workingHours: '0h',
      overtime: '0h',
    },
    {
      id: 5,
      name: 'David Brown',
      department: 'Finance',
      checkIn: '',
      checkOut: '',
      status: 'Absent',
      workingHours: '0h',
      overtime: '0h',
    },
  ];

  const handleCheckIn = (employeeId) => {
    setCheckedInEmployees(prev => new Set([...prev, employeeId]));
  };

  const handleCheckOut = (employeeId) => {
    setCheckedInEmployees(prev => {
      const newSet = new Set(prev);
      newSet.delete(employeeId);
      return newSet;
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Present': 'success',
      'Absent': 'danger',
      'On Leave': 'warning',
      'Late': 'info'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const filteredAttendance = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalEmployees: attendanceData.length,
    present: attendanceData.filter(emp => emp.status === 'Present').length,
    absent: attendanceData.filter(emp => emp.status === 'Absent').length,
    onLeave: attendanceData.filter(emp => emp.status === 'On Leave').length,
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Attendance Management</h2>
          <p className="text-muted">Track and manage employee attendance</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm stat-card">
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaClock size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{stats.totalEmployees}</div>
                  <div className="small opacity-75">Total Employees</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalendarDay size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{stats.present}</div>
                  <div className="small opacity-75">Present Today</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaClock size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{stats.absent}</div>
                  <div className="small opacity-75">Absent Today</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaCalendarDay size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{stats.onLeave}</div>
                  <div className="small opacity-75">On Leave</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Daily Attendance - {selectedDate}</h5>
          <div className="d-flex gap-3 align-items-center">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{width: '180px'}}
            />
            <InputGroup style={{width: '250px'}}>
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
            <Button variant="outline-primary" className="d-flex align-items-center gap-2">
              <FaDownload /> Export
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Employee</th>
                <th className="border-0 fw-medium text-muted py-3">Check In</th>
                <th className="border-0 fw-medium text-muted py-3">Check Out</th>
                <th className="border-0 fw-medium text-muted py-3">Working Hours</th>
                <th className="border-0 fw-medium text-muted py-3">Overtime</th>
                <th className="border-0 fw-medium text-muted py-3">Status</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="fw-medium">{record.name}</div>
                        <div className="text-muted small">{record.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <span className={record.checkIn ? 'text-success fw-medium' : 'text-muted'}>
                      {record.checkIn || '--:--'}
                    </span>
                  </td>
                  <td className="border-0 py-3">
                    <span className={record.checkOut ? 'text-danger fw-medium' : 'text-muted'}>
                      {record.checkOut || '--:--'}
                    </span>
                  </td>
                  <td className="border-0 py-3 fw-medium">{record.workingHours}</td>
                  <td className="border-0 py-3">{record.overtime}</td>
                  <td className="border-0 py-3">{getStatusBadge(record.status)}</td>
                  <td className="border-0 py-3">
                    {record.status === 'Present' && (
                      <div className="d-flex gap-2">
                        {!checkedInEmployees.has(record.id) ? (
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleCheckIn(record.id)}
                            className="d-flex align-items-center gap-1"
                          >
                            <FaPlay size={12} /> Check In
                          </Button>
                        ) : (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleCheckOut(record.id)}
                            className="d-flex align-items-center gap-1"
                          >
                            <FaStop size={12} /> Check Out
                          </Button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col>
          <Alert variant="info" className="border-0">
            <Alert.Heading className="h6">Attendance Summary</Alert.Heading>
            Today's attendance rate: <strong>{((stats.present / stats.totalEmployees) * 100).toFixed(1)}%</strong>
            <br />
            Working hours policy: Standard 8 hours (9:00 AM - 6:00 PM)
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceManagement;
