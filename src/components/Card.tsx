import { PropsWithChildren } from 'react';
import './Card.css';

export default function Card({ children }: PropsWithChildren<{}>) {
  return <div className="card">{children}</div>;
}
