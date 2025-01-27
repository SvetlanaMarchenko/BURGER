import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// If whole react-modals element is not define, it's good if whole app will just blow up
const modalRoot = document.getElementById("react-modals")!;
 
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC <ModalProps> = ({ children, onClose }) => {
  React.useEffect(() => {
    
    const handleEsc = (event: KeyboardEvent) => {
      console.log("this: ", this)
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
      

        {children}
        <button
        onClick={() => {
          console.log("Modal close button clicked");
          onClose();
        }}
        className={`${styles.closeButton} mt-15 mr-10 mb-0 ml-0`}
      >
        <CloseIcon type="primary" />AAA

      </button>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
