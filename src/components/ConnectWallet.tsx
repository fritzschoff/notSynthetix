import WalletConnect from "@walletconnect/client";
import { useConnectWallet } from "../hooks/useConnectWallet";
import QRCodeModal from "@walletconnect/qrcode-modal";
import "./ConnectWallet.css";
import { Link } from "react-router-dom";

export default function ConnectWallet() {
  const { setConnector, connector } = useConnectWallet();
  const handleOnClick = () => {
    if (!connector) {
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });
      setConnector(connector);
    } else {
    }
  };

  if (connector) {
    return (
      <Link to="/profile" className="connectLink">
        {connector.accounts[0]
          .substring(0, 5)
          .concat("...")
          .concat(
            connector.accounts[0].substring(connector.accounts[0].length - 4)
          )}
      </Link>
    );
  } else {
    return (
      <button onClick={handleOnClick} className="connectWallet">
        Connect Wallet
      </button>
    );
  }
}
