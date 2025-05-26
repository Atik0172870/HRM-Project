
import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup } from 'react-bootstrap';
import { FaFile, FaUpload, FaDownload, FaEye, FaTrash, FaSearch, FaFileAlt, FaFilePdf, FaFileWord } from 'react-icons/fa';

const DocumentManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'Policy',
      category: 'HR Policies',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      format: 'PDF',
      uploadedBy: 'HR Admin',
      status: 'Active',
      downloadCount: 45
    },
    {
      id: 2,
      name: 'John Doe - Resume',
      type: 'Personal',
      category: 'Employee Documents',
      uploadDate: '2023-12-10',
      size: '1.2 MB',
      format: 'PDF',
      uploadedBy: 'John Doe',
      status: 'Active',
      downloadCount: 12
    },
    {
      id: 3,
      name: 'Safety Guidelines',
      type: 'Compliance',
      category: 'Safety',
      uploadDate: '2024-01-20',
      size: '3.1 MB',
      format: 'DOCX',
      uploadedBy: 'Safety Officer',
      status: 'Active',
      downloadCount: 28
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    description: ''
  });

  const handleShowModal = (type, document = null) => {
    setModalType(type);
    setSelectedDocument(document);
    if (document && type === 'edit') {
      setFormData({
        name: document.name,
        type: document.type,
        category: document.category,
        description: document.description || ''
      });
    } else {
      setFormData({
        name: '',
        type: '',
        category: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const getFileIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FaFilePdf className="text-danger" />;
      case 'docx': case 'doc': return <FaFileWord className="text-primary" />;
      default: return <FaFileAlt className="text-secondary" />;
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const documentStats = {
    total: documents.length,
    policies: documents.filter(d => d.type === 'Policy').length,
    personal: documents.filter(d => d.type === 'Personal').length,
    compliance: documents.filter(d => d.type === 'Compliance').length
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-dark mb-0">Document Management</h2>
          <p className="text-muted">Manage organizational documents and files</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaFile size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{documentStats.total}</div>
                  <div className="small opacity-75">Total Documents</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaFileAlt size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{documentStats.policies}</div>
                  <div className="small opacity-75">Policy Documents</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaFilePdf size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{documentStats.personal}</div>
                  <div className="small opacity-75">Personal Documents</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex align-items-center">
                <FaFileWord size={30} className="me-3 opacity-75" />
                <div>
                  <div className="h4 fw-bold mb-0">{documentStats.compliance}</div>
                  <div className="small opacity-75">Compliance Documents</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Document Library</h5>
          <div className="d-flex gap-3">
            <InputGroup style={{width: '300px'}}>
              <InputGroup.Text className="bg-light border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search documents..."
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
              <FaUpload /> Upload Document
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 fw-medium text-muted py-3">Document</th>
                <th className="border-0 fw-medium text-muted py-3">Type</th>
                <th className="border-0 fw-medium text-muted py-3">Category</th>
                <th className="border-0 fw-medium text-muted py-3">Upload Date</th>
                <th className="border-0 fw-medium text-muted py-3">Size</th>
                <th className="border-0 fw-medium text-muted py-3">Downloads</th>
                <th className="border-0 fw-medium text-muted py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => (
                <tr key={document.id}>
                  <td className="border-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        {getFileIcon(document.format)}
                      </div>
                      <div>
                        <div className="fw-medium">{document.name}</div>
                        <div className="text-muted small">{document.format} • Uploaded by {document.uploadedBy}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 py-3">
                    <Badge bg="primary" className="px-3 py-2">{document.type}</Badge>
                  </td>
                  <td className="border-0 py-3">{document.category}</td>
                  <td className="border-0 py-3">{document.uploadDate}</td>
                  <td className="border-0 py-3">{document.size}</td>
                  <td className="border-0 py-3">{document.downloadCount}</td>
                  <td className="border-0 py-3">
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm">
                        <FaEye />
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <FaDownload />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(document.id)}
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

      {/* Upload Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Document Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter document name"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    <option value="Policy">Policy</option>
                    <option value="Personal">Personal</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Training">Training</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Enter category"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>File Upload</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter document description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary">
            Upload Document
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DocumentManagement;
