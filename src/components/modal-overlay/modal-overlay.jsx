import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default ModalOverlay;