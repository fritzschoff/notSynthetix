import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import NFTPozition from './NFTPozition';
import './Profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  useEffect(() => {
    fetch(
      'https://gateway.pinata.cloud/ipfs/QmVeqSkeE6CKnDf4LmACcaBQn6XbEzF1MK34w5DKpLLXEq'
    ).then((data) => data.json().then((img) => setImage(img.image)));
  }, []);
  return (
    <div className="profileContainer">
      {image ? (
        <NFTPozition
          link={image}
          onClick={() =>
            navigate(
              '/pozition/'.concat(image.split('/')[image.split('/').length - 1])
            )
          }
        />
      ) : (
        <>
          <div
            style={{
              position: 'relative',
              width: '100%',
              marginBottom: '100px',
            }}
          >
            <span>
              Your gallery is empty. Create a new position to see them displayed
              here
            </span>
            <BackButton />
          </div>
        </>
      )}

      {!image && (
        <button
          className="newPositionButton"
          onClick={() => navigate('/create')}
        >
          New Pozition
        </button>
      )}
    </div>
  );
}
