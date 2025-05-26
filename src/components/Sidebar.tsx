
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaClock, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaChartLine, 
  FaUserPlus, 
  FaGraduationCap, 
  FaFileAlt 
} from 'react-icons/fa';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { key: 'dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { key: 'employees', icon: FaUsers, label: 'Employees' },
    { key: 'attendance', icon: FaClock, label: 'Attendance' },
    { key: 'payroll', icon: FaMoneyBillWave, label: 'Payroll' },
    { key: 'leave', icon: FaCalendarAlt, label: 'Leave Management' },
    { key: 'performance', icon: FaChartLine, label: 'Performance' },
    { key: 'recruitment', icon: FaUserPlus, label: 'Recruitment' },
    { key: 'training', icon: FaGraduationCap, label: 'Training' },
    { key: 'reports', icon: FaFileAlt, label: 'Reports' },
  ];

  return (
    <div className="sidebar d-flex flex-column">
      <Navbar.Brand className="text-white text-center py-4 border-bottom border-light">
        <h4 className="mb-0 fw-bold">HRM System</h4>
      </Navbar.Brand>
      
      <Nav className="flex-column px-3 py-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Nav.Link
              key={item.key}
              className={`text-white mb-2 rounded p-3 d-flex align-items-center ${
                activeModule === item.key ? 'bg-white bg-opacity-20' : ''
              }`}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => setActiveModule(item.key)}
              onMouseEnter={(e) => {
                if (activeModule !== item.key) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeModule !== item.key) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <IconComponent className="me-3" size={18} />
              <span className="fw-medium">{item.label}</span>
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
