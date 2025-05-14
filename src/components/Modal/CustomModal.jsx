import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, onHide, title, children }) => (
  <Modal
    show={show}
    onHide={onHide}
    centered
    contentClassName="custom-modal-content"
  >
    <Modal.Header
      closeButton
      style={{
        background: '#009fc3',
        color: '#fff',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottom: 'none'
      }}
      closeVariant="white"
    >
      <Modal.Title style={{ color: '#fff', fontWeight: 700 }}>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ borderTop: '4px solid #00AEEF', borderRadius: '0 0 8px 8px' }}>
      {children}
    </Modal.Body>
  </Modal>
);

export default CustomModal;