const parts = {
  build: {
    part: 'Live demo, part one',
    word: 'Build',
    what: 'A small feature added to a repo, then checked by AdaL in its own browser.',
  },
  launch: {
    part: 'Live demo, part two',
    word: 'Launch',
    what: 'The promo video and competitor research we started at the top, then launch copy written live.',
  },
};

export function DemoPart({ track }: { track: keyof typeof parts }) {
  const p = parts[track];
  return (
    <div className={`slide demo-part demo-${track}`}>
      <p className="demo-kicker">{p.part}</p>
      <h1 className="demo-word">{p.word}</h1>
      <p className="lead">{p.what}</p>
    </div>
  );
}
