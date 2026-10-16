/** Plus Jakarta's full stop sits wide at display sizes; this pulls a trailing one in. */
export function Tight({ text }: { text: string }) {
  if (!text.endsWith('.')) return <>{text}</>;
  return (
    <>
      {text.slice(0, -1)}
      <span className="stop">.</span>
    </>
  );
}
