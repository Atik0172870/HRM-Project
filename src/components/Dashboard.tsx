
import React from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { FaUsers, FaClock, FaMoneyBillWave, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { icon: FaUsers, title: 'Total Employees', value: '247', color: 'primary', change: '+12%' },
    { icon: FaClock, title: 'Present Today', value: '230', color: 'success', change: '+5%' },
    { icon: FaMoneyBillWave, title: 'Monthly Payroll', value: '$485,000', color: 'warning', change: '+8%' },
    { icon: FaCalendarCheck, title: 'Pending Leaves', value: '15', color: 'info', change: '-3%' },
  ];

  const recentActivities = [
    { employee: 'John Doe', action: 'Checked In', time: '09:15 AM', type: 'success' },
    { employee: 'Jane Smith', action: 'Leave Request', time: '08:45 AM', type: 'warning' },
    { employee: 'Mike Johnson', action: 'Performance Review', time: '08:30 AM', type: 'info' },
    { employee: 'Sarah Wilson', action: 'Training Completed', time: '08:00 AM', type: 'success' },
    { employee: 'David Brown', action: 'Payroll Generated', time: '07:45 AM', type: 'primary' },
  ];

  const departmentStats = [
    { name: 'Engineering', employees: 85, percentage: 34 },
    { name: 'Sales', employees: 62, percentage: 25 },
    { name: 'Marketing', employees: 38, percentage: 15 },
    { name: 'HR', employees: 25, percentage: 10 },
    { name: 'Finance', employees: 37, percentage: 16 },
  ];

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Dashboard</h2>
          <p className="text-muted">Welcome back! Here's what's happening today.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Col xl={3} md={6} className="mb-3" key={index}>
              <Card className={`border-0 shadow-sm card-hover stat-card`}>
                <Card.Body className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <IconComponent size={40} className="text-white opacity-75" />
                  </div>
                  <div className="ms-3 text-white">
                    <div className="text-sm opacity-75">{stat.title}</div>
                    <div className="h4 fw-bold mb-0">{stat.value}</div>
                    <div className="text-sm opacity-75">{stat.change} from last month</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row>
        {/* Recent Activities */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm card-hover">
            <Card.Header className="bg-white border-0 pb-0">
              <h5 className="fw-bold mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive className="table-hover mb-0">
                <thead>
                  <tr>
                    <th className="border-0 text-muted fw-medium">Employee</th>
                    <th className="border-0 text-muted fw-medium">Action</th>
                    <th className="border-0 text-muted fw-medium">Time</th>
                    <th className="border-0 text-muted fw-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index}>
                      <td className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            {activity.employee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="fw-medium">{activity.employee}</div>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 py-3">{activity.action}</td>
                      <td className="border-0 py-3 text-muted">{activity.time}</td>
                      <td className="border-0 py-3">
                        <Badge bg={activity.type} className="px-3 py-2">
                          {activity.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Department Distribution */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm card-hover">
            <Card.Header className="bg-white border-0 pb-0">
              <h5 className="fw-bold mb-0">Department Distribution</h5>
            </Card.Header>
            <Card.Body>
              {departmentStats.map((dept, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-medium">{dept.name}</span>
                    <span className="text-muted">{dept.employees}</span>
                  </div>
                  <ProgressBar 
                    now={dept.percentage} 
                    variant="primary" 
                    style={{height: '8px'}}
                    className="rounded"
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
