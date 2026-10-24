/** Pull a trailing full stop in slightly at display sizes. */
export function Tight({ text }: { text: string }) {
  if (!text.endsWith('.')) return <>{text}</>;
  return (
    <>
      {text.slice(0, -1)}
      <span className="stop">.</span>
    </>
  );
}
