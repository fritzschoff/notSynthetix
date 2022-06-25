import { PropsWithChildren } from 'react';
import './Button.css';

export default function Button({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button onClick={onClick} className="defaultButton">
      <div className="defaultButtonText">{children}</div>
    </button>
  );
}
