import type { ReactNode } from 'react';

export function EditorialHeader({ kicker, children, signature }: {
  kicker: string;
  children: ReactNode;
  signature?: readonly [string, string];
}) {
  return (
    <header className="welcome-header editorial-header">
      <h1 className="title welcome-title">
        <span className="welcome-kicker">{kicker}</span>
        <span className="editorial-title-text">{children}</span>
      </h1>
      {signature && <div className="welcome-signature"><div><span>{signature[0]}</span><span>{signature[1]}</span></div></div>}
    </header>
  );
}
