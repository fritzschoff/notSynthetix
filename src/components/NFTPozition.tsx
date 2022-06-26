import './NFTPozition.css';

export default function NFTPozition({
  link,
  onClick,
}: {
  link: string;
  onClick?: () => void;
}) {
  return (
    <div>
      <img src={link} onClick={onClick} />
    </div>
  );
}
