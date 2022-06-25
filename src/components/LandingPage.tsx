import Button from './Button';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="containerLandingPage">
        <div className="left">
          <h1 className="headerLandingPage">Transferable Future Pozitions</h1>
          <Button
            onClick={() => {
              navigate('/gallery');
            }}
          >
            Explore
          </Button>
        </div>
        <div className="right">
          <img src="http://via.placeholder.com/360x640" />
        </div>
      </section>
      <section className="pozitionsHeader">
        <h2>Pozitions Gallery</h2>
        <article>... nfts</article>
      </section>
    </>
  );
}
