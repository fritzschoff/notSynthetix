import { useEffect, useState } from "react";
import { useConnectWallet } from "../hooks/useConnectWallet";
import ConnectWallet from "./ConnectWallet";
import "./LandingPage.css";

export default function LandingPage() {
  const { connector } = useConnectWallet();
  const [hideButton, setHideButton] = useState(false);
  useEffect(() => {
    if (connector) setHideButton(true);
  }, [connector]);
  return (
    <div className="containerLandingPage">
      <div className="left">
        <h1>Transferable Future Pozitions</h1>
        {!hideButton && <ConnectWallet />}
      </div>
      <div className="right">
        <img src="http://via.placeholder.com/360x640" />
      </div>
    </div>
  );
}
