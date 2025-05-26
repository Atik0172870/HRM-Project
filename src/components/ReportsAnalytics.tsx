
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, ProgressBar } from 'react-bootstrap';
import { FaFileAlt, FaDownload, FaChartBar, FaChartPie, FaUsers, FaCalendarCheck } from 'react-icons/fa';

const ReportsAnalytics = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('monthly');

  const reportData = {
    overview: {
      totalEmployees: 247,
      activeEmployees: 230,
      newHires: 12,
      terminations: 3,
      avgSalary: 65000,
      attendanceRate: 94.2,
      performanceRating: 4.1
    },
    attendance: {
      presentToday: 230,
      absentToday: 17,
      onLeaveToday: 15,
      lateArrivals: 8,
      overtimeHours: 145
    },
    payroll: {
      totalPayroll: 485000,
      avgSalary: 65000,
      overtime: 25000,
      bonuses: 45000,
      deductions: 85000
    },
    performance: {
      excellent: 45,
      good: 120,
      average: 65,
      needsImprovement: 17
    }
  };

  const departmentData = [
    { name: 'Engineering', employees: 85, budget: 180000, performance: 4.3 },
    { name: 'Sales', employees: 62, budget: 120000, performance: 4.0 },
    { name: 'Marketing', employees: 38, budget: 95000, performance: 4.2 },
    { name: 'HR', employees: 25, budget: 75000, performance: 4.4 },
    { name: 'Finance', employees: 37, budget: 85000, performance: 4.1 },
  ];

  const recentReports = [
    { name: 'Monthly Attendance Report', date: '2024-01-31', type: 'PDF', size: '2.3 MB' },
    { name: 'Payroll Summary Q4 2023', date: '2024-01-15', type: 'Excel', size: '1.8 MB' },
    { name: 'Performance Review Report', date: '2024-01-10', type: 'PDF', size: '3.1 MB' },
    { name: 'Training Completion Report', date: '2024-01-05', type: 'PDF', size: '1.2 MB' },
  ];

  const getPerformanceColor = (rating) => {
    if (rating >= 4.3) return 'success';
    if (rating >= 4.0) return 'info';
    if (rating >= 3.5) return 'warning';
    return 'danger';
  };

  const renderOverviewCards = () => (
    <Row className="mb-4">
      <Col md={3} className="mb-3">
        <Card className="border-0 shadow-sm stat-card">
          <Card.Body className="text-white">
            <div className="d-flex align-items-center">
              <FaUsers size={30} className="me-3 opacity-75" />
              <div>
                <div className="h4 fw-bold mb-0">{reportData.overview.totalEmployees}</div>
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
              <FaCalendarCheck size={30} className="me-3 opacity-75" />
              <div>
                <div className="h4 fw-bold mb-0">{reportData.overview.attendanceRate}%</div>
                <div className="small opacity-75">Attendance Rate</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} className="mb-3">
        <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)'}}>
          <Card.Body className="text-white">
            <div className="d-flex align-items-center">
              <FaChartBar size={30} className="me-3 opacity-75" />
              <div>
                <div className="h4 fw-bold mb-0">{reportData.overview.performanceRating}</div>
                <div className="small opacity-75">Avg Performance</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} className="mb-3">
        <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
          <Card.Body className="text-white">
            <div className="d-flex align-items-center">
              <FaUsers size={30} className="me-3 opacity-75" />
              <div>
                <div className="h4 fw-bold mb-0">{reportData.overview.newHires}</div>
                <div className="small opacity-75">New Hires (Month)</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Reports & Analytics</h2>
          <p className="text-muted">Generate insights and reports from HR data</p>
        </Col>
      </Row>

      {/* Report Navigation */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="py-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  <Button 
                    variant={selectedReport === 'overview' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setSelectedReport('overview')}
                  >
                    <FaChartBar className="me-2" />Overview
                  </Button>
                  <Button 
                    variant={selectedReport === 'attendance' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setSelectedReport('attendance')}
                  >
                    <FaCalendarCheck className="me-2" />Attendance
                  </Button>
                  <Button 
                    variant={selectedReport === 'payroll' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setSelectedReport('payroll')}
                  >
                    <FaChartPie className="me-2" />Payroll
                  </Button>
                  <Button 
                    variant={selectedReport === 'performance' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setSelectedReport('performance')}
                  >
                    <FaUsers className="me-2" />Performance
                  </Button>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    size="sm"
                    style={{width: '150px'}}
                  >
                    <option value="weekly">This Week</option>
                    <option value="monthly">This Month</option>
                    <option value="quarterly">This Quarter</option>
                    <option value="yearly">This Year</option>
                  </Form.Select>
                  <Button variant="outline-success" size="sm">
                    <FaDownload className="me-2" />Export
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <>
          {renderOverviewCards()}
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0">
                  <h5 className="fw-bold mb-0">Department Overview</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive className="table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 fw-medium text-muted py-3">Department</th>
                        <th className="border-0 fw-medium text-muted py-3">Employees</th>
                        <th className="border-0 fw-medium text-muted py-3">Budget</th>
                        <th className="border-0 fw-medium text-muted py-3">Performance</th>
                        <th className="border-0 fw-medium text-muted py-3">Utilization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentData.map((dept, index) => (
                        <tr key={index}>
                          <td className="border-0 py-3 fw-medium">{dept.name}</td>
                          <td className="border-0 py-3">{dept.employees}</td>
                          <td className="border-0 py-3">${dept.budget.toLocaleString()}</td>
                          <td className="border-0 py-3">
                            <Badge bg={getPerformanceColor(dept.performance)} className="px-3 py-2">
                              {dept.performance}
                            </Badge>
                          </td>
                          <td className="border-0 py-3">
                            <div className="d-flex align-items-center">
                              <ProgressBar 
                                now={Math.random() * 100} 
                                variant="info"
                                style={{height: '8px', width: '100px'}}
                                className="me-2"
                              />
                              <span className="small text-muted">{Math.floor(Math.random() * 40 + 60)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0">
                  <h5 className="fw-bold mb-0">Key Metrics</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small">Employee Retention</span>
                      <span className="small fw-medium">94%</span>
                    </div>
                    <ProgressBar now={94} variant="success" style={{height: '6px'}} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small">Training Completion</span>
                      <span className="small fw-medium">87%</span>
                    </div>
                    <ProgressBar now={87} variant="info" style={{height: '6px'}} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small">Goal Achievement</span>
                      <span className="small fw-medium">78%</span>
                    </div>
                    <ProgressBar now={78} variant="warning" style={{height: '6px'}} />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small">Employee Satisfaction</span>
                      <span className="small fw-medium">91%</span>
                    </div>
                    <ProgressBar now={91} variant="success" style={{height: '6px'}} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Attendance Report */}
      {selectedReport === 'attendance' && (
        <Row>
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">Attendance Analytics</h5>
              </Card.Header>
              <Card.Body>
                <Row className="mb-4">
                  <Col md={3} className="text-center">
                    <div className="h2 fw-bold text-success">{reportData.attendance.presentToday}</div>
                    <div className="small text-muted">Present Today</div>
                  </Col>
                  <Col md={3} className="text-center">
                    <div className="h2 fw-bold text-danger">{reportData.attendance.absentToday}</div>
                    <div className="small text-muted">Absent Today</div>
                  </Col>
                  <Col md={3} className="text-center">
                    <div className="h2 fw-bold text-warning">{reportData.attendance.onLeaveToday}</div>
                    <div className="small text-muted">On Leave</div>
                  </Col>
                  <Col md={3} className="text-center">
                    <div className="h2 fw-bold text-info">{reportData.attendance.lateArrivals}</div>
                    <div className="small text-muted">Late Arrivals</div>
                  </Col>
                </Row>
                <div className="bg-light p-3 rounded">
                  <h6 className="fw-bold">Attendance Trends</h6>
                  <p className="text-muted mb-0">
                    Attendance rate has improved by 2.3% compared to last month. 
                    Engineering department shows the highest attendance rate at 96.2%.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">Department Attendance</h5>
              </Card.Header>
              <Card.Body>
                {departmentData.map((dept, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="small">{dept.name}</span>
                      <span className="small fw-medium">{Math.floor(Math.random() * 10 + 90)}%</span>
                    </div>
                    <ProgressBar 
                      now={Math.floor(Math.random() * 10 + 90)} 
                      variant="success" 
                      style={{height: '6px'}}
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recent Reports */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Recent Reports</h5>
              <Button variant="outline-primary" size="sm">
                <FaFileAlt className="me-2" />Generate New Report
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 fw-medium text-muted py-3">Report Name</th>
                    <th className="border-0 fw-medium text-muted py-3">Generated Date</th>
                    <th className="border-0 fw-medium text-muted py-3">Type</th>
                    <th className="border-0 fw-medium text-muted py-3">Size</th>
                    <th className="border-0 fw-medium text-muted py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report, index) => (
                    <tr key={index}>
                      <td className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <FaFileAlt className="text-primary me-3" size={20} />
                          <span className="fw-medium">{report.name}</span>
                        </div>
                      </td>
                      <td className="border-0 py-3 text-muted">{report.date}</td>
                      <td className="border-0 py-3">
                        <Badge bg={report.type === 'PDF' ? 'danger' : 'success'} className="px-3 py-2">
                          {report.type}
                        </Badge>
                      </td>
                      <td className="border-0 py-3 text-muted">{report.size}</td>
                      <td className="border-0 py-3">
                        <Button variant="outline-primary" size="sm">
                          <FaDownload />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsAnalytics;
