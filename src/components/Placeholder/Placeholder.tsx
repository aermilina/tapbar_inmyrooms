import PhonePicture from '../assets/phone.gif';
import styles from './styles.module.scss';

export default function Placholder() {
  return (
    <div className={styles.placeholder}>
      <h1>Please turn your device in mobile view mode</h1>
      <img src={PhonePicture} width={150} alt="mobile" />
    </div>
  );
}
