import WalletConnect from "@walletconnect/client";
import { useConnectWallet } from "../hooks/useConnectWallet";
import QRCodeModal from "@walletconnect/qrcode-modal";
import "./ConnectWallet.css";

export function ConnectWallet() {
  const { setConnector, connector } = useConnectWallet();
  const handleOnClick = () => {
    if (!connector) {
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });
      setConnector(connector);
    }
  };
  return (
    <button onClick={handleOnClick} className="connectWallet">
      Connect Wallet
    </button>
  );
}
