import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import NFTPozition from './NFTPozition';
import './Profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="profileContainer">
      <div
        style={{ position: 'relative', width: '100%', marginBottom: '100px' }}
      >
        <span>
          Your gallery is empty. Create a new position to see them displayed
          here
        </span>
        <BackButton />
      </div>

      <button className="newPositionButton" onClick={() => navigate('/create')}>
        New Pozition
      </button>
    </div>
  );
}
