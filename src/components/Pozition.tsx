import Card from './Card';
import NFTPozition from './NFTPozition';
import './Pozition.css';

export default function Pozition() {
  return (
    <div className="pozitionContainer">
      <h1>
        <div className="greyCircles"></div>MY Pozition
        <div className="greyCircles"></div>
      </h1>
      <div className="spacer"></div>
      <NFTPozition link="http://via.placeholder.com/449x449" />
      <div>
        {/* TODO @MF implement function */}
        <button onClick={() => {}} className="actionButton">
          Transfer
        </button>
        {/* TODO @MF implement function */}
        <button onClick={() => {}} className="actionButton">
          Close Position
        </button>
      </div>
      <div className="spacer"></div>
      {/* TODO @MF fill in the information from the NFT */}
      <Card>tets</Card>
    </div>
  );
}
