// Everything the deck says about the night lives here.
// Text in [square brackets] is a placeholder still to be filled in.
// An empty link shows a "link coming" box instead of a QR code.

export const event = {
  hosts: 'Build Club Singapore × AdaL × SMUAI',
  name: 'Build Night',
  theme: { build: 'Build it.', launch: 'Launch it.' },

  // Logos across the top of the Doors slide, left to right. Files live in public/logos/.
  // `src` is for the light theme; `srcOnDark`, when set, replaces it on the dark theme.
  logos: [
    { src: 'logos/build-club.png', alt: 'Build Club', className: 'logo-build-club' },
    { src: 'logos/adal.svg', alt: 'AdaL', className: 'logo-adal' },
    // Official navy and white marks from smuai.org/brand.
    {
      src: 'logos/smuai-navy.png',
      srcOnDark: 'logos/smuai.png',
      alt: 'SMU Artificial Intelligence Club',
      className: 'logo-smuai',
    },
  ],

  // Typed one after another in the prompt on the Doors slide, drawn from the two tracks.
  doorsPrompts: [
    'adal build && adal launch', // the line on the Build Night poster
    'add dark mode, then check it in the browser',
    'explain this repo and write its README',
    'make a 30-second promo video for my app',
    'research my competitors, then sum it up',
    "draft a launch post that doesn't sound like AI",
  ],

  // All times are Singapore time (UTC+8) on this date, whatever the laptop's time zone is.
  date: '2026-10-30',
  venue: '[Venue]',

  wifi: { network: '[Wi-Fi network]', password: '[Wi-Fi password]' },
  help: "Raise a hand and we'll come to you.",
  photography:
    "We're taking photos tonight. If you'd rather not be in them, tell a host and we'll keep you out.",

  installCommand: 'curl -fsSL https://adal.sylph.ai/install.sh | bash',

  links: {
    discord: 'https://discord.gg/adalagent',
    docs: 'https://docs.sylph.ai',
    dashboard: '', // Build Club dashboard submission link
    survey: '', // feedback survey
    nextEvent: '', // next Build Club Singapore event
  },

  schedule: [
    { time: '18:30', title: 'Doors open & food' },
    { time: '19:00', title: 'Welcome' },
    { time: '19:05', title: 'Build Club Singapore' },
    { time: '19:10', title: 'What is AdaL, and a live demo' },
    { time: '19:30', title: 'Build session' },
    { time: '20:45', title: 'Show-and-tell' },
    { time: '21:15', title: 'Feedback, shout-outs and group photo' },
    { time: '21:30', title: 'Wrap' },
  ],

  programmeStart: '19:00',

  buildBlock: {
    start: '19:30',
    signupsOpen: '20:15',
    warning: '20:40',
    submit: '20:45',
    signupHow: 'tell a host',
  },

  showAndTell: {
    minutesEach: 5,
    // Fill in on the night as people sign up. Five slots.
    presenters: [
      { name: '[Presenter 1]', project: '[Project]' },
      { name: '[Presenter 2]', project: '[Project]' },
      { name: '[Presenter 3]', project: '[Project]' },
      { name: '[Presenter 4]', project: '[Project]' },
      { name: '[Presenter 5]', project: '[Project]' },
    ],
  },

  buildClub: {
    about: '[One line on who Build Club Singapore is]',
  },

  adal: {
    // Confirm this wording with SylphAI before the night.
    oneLiner:
      'AdaL is an AI agent that writes and checks your code, then helps you make what launches it.',
  },

  tracks: {
    build: {
      title: 'Build',
      blurb: 'Improve the product itself.',
      prompts: [
        'Add a small feature to your side project, then have AdaL check it in its own browser.',
        'Ask AdaL to explain an unfamiliar repo and write a README for it.',
        'Connect an MCP server or write a custom tool for an API you use.',
        'Build on headless mode or the SDK, such as a CI job or a bot.',
        'Write a custom skill, system prompt or lifecycle hook and share it.',
      ],
    },
    launch: {
      title: 'Launch',
      blurb: 'Build what launches it. No coding needed.',
      prompts: [
        'Generate a launch image and a short promo video for your product.',
        "Rewrite your landing page or launch post so it doesn't sound like AI.",
        'Research competitors with web search and the browser, then write a positioning summary.',
        "Find what's trending in your space and draft launch posts around it.",
        'Set up a scheduled prompt that sends a daily digest of mentions.',
      ],
    },
  },
} as const;

export type Track = keyof typeof event.tracks;
