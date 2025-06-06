
import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import EmployeeManagement from '../components/EmployeeManagement';
import DocumentManagement from '../components/DocumentManagement';
import OnboardingManagement from '../components/OnboardingManagement';
import AttendanceManagement from '../components/AttendanceManagement';
import PayrollManagement from '../components/PayrollManagement';
import CompensationManagement from '../components/CompensationManagement';
import BenefitsManagement from '../components/BenefitsManagement';
import LeaveManagement from '../components/LeaveManagement';
import PerformanceManagement from '../components/PerformanceManagement';
import RecruitmentManagement from '../components/RecruitmentManagement';
import TrainingManagement from '../components/TrainingManagement';
import EmployeeEngagement from '../components/EmployeeEngagement';
import ComplianceManagement from '../components/ComplianceManagement';
import ReportsAnalytics from '../components/ReportsAnalytics';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'documents':
        return <DocumentManagement />;
      case 'onboarding':
        return <OnboardingManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'payroll':
        return <PayrollManagement />;
      case 'compensation':
        return <CompensationManagement />;
      case 'benefits':
        return <BenefitsManagement />;
      case 'leave':
        return <LeaveManagement />;
      case 'performance':
        return <PerformanceManagement />;
      case 'recruitment':
        return <RecruitmentManagement />;
      case 'training':
        return <TrainingManagement />;
      case 'engagement':
        return <EmployeeEngagement />;
      case 'compliance':
        return <ComplianceManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col md={3} lg={2}>
          <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        </Col>
        <Col md={9} lg={10} className="main-content">
          {renderActiveModule()}
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
