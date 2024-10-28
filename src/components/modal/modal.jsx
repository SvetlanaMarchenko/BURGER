import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalRoot = document.getElementById("react-modals");

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className={styles.header}>
      <h2>{children}</h2>
      <button onClick={onClose} className={styles.closeButton}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
};

class Modal extends React.Component {  
  render() {
    const { children, header, onClose } = this.props;
    return ReactDOM.createPortal(
            (
                <>
                    <div className="Modal">
                    <ModalHeader onClose={onClose}>{header}</ModalHeader>
                        {children}
                    </div>
                    <ModalOverlay/>
                </>
            ), 
            modalRoot
        );
  }
}

export default Modal
