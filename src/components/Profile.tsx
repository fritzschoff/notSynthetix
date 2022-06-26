import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import NFTPozition from './NFTPozition';
import './Profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="profileContainer">
      <BackButton />
      <NFTPozition
        link="http://via.placeholder.com/779x779"
        onClick={() => {
          // TODO @MF add correct link
          navigate('/pozition/:address');
        }}
      />
      <button className="newPositionButton" onClick={() => navigate('/create')}>
        New Pozition
      </button>
    </div>
  );
}