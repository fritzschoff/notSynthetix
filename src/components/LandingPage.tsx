import Button from './Button';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="containerLandingPage">
        <div className="left">
          <h1 className="headerLandingPage transferable">
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
          </h1>
          <h1 className="headerLandingPage futures">
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp;
          </h1>
          <h1 className="headerLandingPage pozitions">
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
          </h1>
          <Button
            onClick={() => {
              navigate('/gallery');
            }}
          >
            Explore
          </Button>
        </div>
        <div className="right">
          <img src="/landing-page.svg" />
        </div>
      </section>
      <section className="pozitionsHeader">
        <h2>Pozitions Gallery</h2>
        <article>... nfts</article>
      </section>
    </>
  );
}
