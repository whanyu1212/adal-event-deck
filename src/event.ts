// Everything the deck says about the night lives here.
// Text in [square brackets] is a placeholder still to be filled in.
// An empty link shows a "link coming" box instead of a QR code.

export const event = {
  hosts: 'Build Club Singapore × AdaL × SMUAI × NUS Product Club',
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
    {
      src: 'logos/nus-product-club.png',
      srcOnDark: 'logos/nus-product-club-dark.png',
      alt: 'NUS Product Club',
      className: 'logo-nus-product-club',
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
    // Feedback survey ("Build Night Survey"), shown as a QR on the Close slide
    survey: 'https://docs.google.com/forms/d/e/1FAIpQLSeVleYeD1wS8aA4WdT2tVbiubpeZVk3Fh3uIE7RgKH_DJyfqA/viewform',
    nextEvent: '', // next Build Club Singapore event
    community: 'https://adalagent.ai/community',
    // Big-brand launch videos remade with AdaL; shown on the live demo slide as video references.
    launchLibrary: 'https://adalagent.ai/launch-library',
    // Short link to the ambassador application form; it redirects to
    // docs.google.com/forms/d/e/1FAIpQLSceSZL96VmgscNGlykBs58sOrx9C9MpbK6TcuRz-yAfArAlWA/viewform.
    // The short link makes a sparser QR code that scans from further back.
    ambassadorForm: 'https://forms.gle/GmvT1v7Xym3DEZFa8',
  },

  // The promo code: its own slide after the live demo, plus small reminders on the Doors
  // and Build session slides. Redeeming, per docs.sylph.ai/getting-started/pricing-and-usage:
  // new users enter it at "Have a promo or referral code?" after signing up; existing users
  // go to Settings → Billing → "Have a promo code?". One redemption per account.
  promo: {
    code: 'BUILDCLUBSINGAPORE-BJEC',
    offer: '1 month of AdaL Pro',
    validUntil: '13 Nov', // 13 November 2026
    signUp: 'https://adal.sylph.ai/sign-up', // where the QR codes go
    signUpLabel: 'adal.sylph.ai/sign-up',
    install: 'adalagent.ai/install',
  },

  // The ambassador card on the Close slide. Wording follows the FAQ on adalagent.ai/community.
  ambassador: {
    title: ['Global', 'Ambassador', 'Program'],
    pitch: 'Host events, make content, or both.',
    perks: 'Free AdaL plan, merch, event budget and codes for your guests.',
    apply: 'Scan to apply',
    url: 'adalagent.ai/community',
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
    // How many demos fit in the 30-minute slot. No fixed names: people join the Zoom and share.
    slots: 5,
    zoom: {
      // The join link carries the passcode, so scanning the QR goes straight in.
      link: 'https://us04web.zoom.us/j/72913725219?pwd=qT7tASVGqc41Rt6Cnz9W62fVR0fZq4.1',
      chatLink: 'https://us04web.zoom.us/launch/jc/72913725219', // meeting chat
      meetingId: '729 1372 5219',
      passcode: '0mz7PB',
    },
  },

  buildClub: {
    about: '[One line on who Build Club Singapore is]',
  },

  adal: {
    // "Meet AdaL" slide, stepped one key press at a time. Wording follows adalagent.ai,
    // docs.sylph.ai and the adal-cli README.
    intro: 'Every coding agent can build. AdaL also handles the launch, straight from your codebase.',
    byline: { made: 'Created by SylphAI', named: 'Named after Ada Lovelace' },

    // The Ada Lovelace beat. Keep the claim hedged: historians dispute "first programmer",
    // and the Analytical Engine was never built, so her program never ran in her lifetime.
    ada: {
      heading: 'Ada Lovelace, 1843',
      fact: "In Note G she set out, step by step, how Babbage's Analytical Engine could compute Bernoulli numbers. It's widely called the first computer program.",
      card: 'Note G',
      ops: 25,
    },

    // "Run Ada's program": two key presses. The first runs her table up to the bug in op 4,
    // the second swaps the division and finishes. The numbers come from slides/noteG.ts.
    run: {
      label: 'Note G, run today',
      heading: "Let's run Ada's program.",
      columns: ['Op', 'Her operation', 'Meant to give', 'Value (n = 4)'],
      bug: 'divided the wrong way round',
      fix: 'swapped: fixed',
      rest: 'Two loops, ops 13–23',
      restMeant: 'B₇, looping for B₃ and B₅',
      closing: 'The first published program had a bug. Over 180 years later, we have agents for that.',
    },

    // One per key press. `icon` is what floats over her palm while it is on screen.
    pillars: [
      {
        word: 'Builds.',
        proof: 'Review-first, in your terminal. Any model, no lock-in.',
        icon: 'terminal',
        launch: false,
      },
      {
        word: 'Launches.',
        proof: 'Browser use, deep research, image, audio and video.',
        icon: 'globe',
        launch: true,
      },
      {
        word: 'Connects.',
        proof: 'Slack, Notion, Linear, GitHub, Stripe. Plus skills and an SDK.',
        icon: 'plug',
        launch: false,
      },
    ],

    // The closing step types this out. It is a script, not a live session.
    terminal: {
      command: 'adal',
      signedIn: '✓ signed in',
      prompt: 'add dark mode, then draft the launch post',
      hint: 'Run it in any project folder. The first run signs you in.',
    },
    // Confirm this wording with SylphAI before the night.
    oneLiner:
      'AdaL is an AI agent that writes and checks your code, then helps you make what launches it.',
  },

  // Build session slide: a general direction for each, deliberately not a to-do list.
  tracks: {
    build: {
      title: 'Build',
      direction: 'Make your product better.',
    },
    launch: {
      title: 'Launch',
      direction: 'Help it find its people.',
    },
  },
} as const;

export type Track = keyof typeof event.tracks;
