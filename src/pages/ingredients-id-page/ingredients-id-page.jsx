import styles from './ingredients-id-page.module.css';
import PropTypes from 'prop-types';

const IngredientsIdPage = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default IngredientsIdPage;