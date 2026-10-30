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
  venue: 'SMU SCIS1, Seminar Room 2-2',

  // Leave the password empty for an open network; the Welcome slide then shows the name only
  wifi: { network: 'SMU_Visitor', password: '' },
  help: "Raise a hand and we'll come to you.",
  photography:
    "We're taking photos tonight. If you'd rather not be in them, tell a host and we'll keep you out.",

  installCommand: 'curl -fsSL https://adal.sylph.ai/install.sh | bash',

  links: {
    discord: 'https://discord.gg/adalagent',
    docs: 'https://docs.sylph.ai',
    dashboard: 'https://campus.buildclub.ai/challenges/01a1895f-e141-7481-beaf-ebdd9d462b95', // Build Club challenge: enrol and submit here
    // Feedback survey ("Build Night Survey"), shown as a QR on the Close slide
    survey: 'https://docs.google.com/forms/d/e/1FAIpQLSeVleYeD1wS8aA4WdT2tVbiubpeZVk3Fh3uIE7RgKH_DJyfqA/viewform',
    volunteers: 'https://chat.whatsapp.com/JLlGnTTg6N6K9RzW6k69NR?mode=gi_t', // Build Club SG Volunteers WhatsApp group
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
    { time: '19:10', title: 'SMU AI Club' },
    { time: '19:15', title: 'NUS Product Club' },
    { time: '19:20', title: 'What is AdaL, and a live demo' },
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

  // "Meet tonight's speakers" slide, left to right. Photos live in public/photos/hosts/.
  // `logo` is the className of the community's entry in `logos` above.
  team: [
    {
      name: 'Wu Hanyu',
      org: 'AdaL',
      logo: 'logo-adal',
      role: ['AdaL Ambassador in Singapore', 'Senior Data Scientist @ Micron'],
      photo: 'photos/hosts/wu-hanyu.jpg',
      linkedin: 'https://www.linkedin.com/in/hanyu-wu-6a610b165/',
    },
    {
      name: 'Haorui Chen',
      org: 'Build Club',
      logo: 'logo-build-club',
      role: ['Build Club City Lead', 'Forward Deployed Engineer @ Singtel'],
      photo: 'photos/hosts/haorui-chen.jpg',
      linkedin: 'https://www.linkedin.com/in/haorui-chen-834187247/',
    },
    {
      name: 'Darrius Ng',
      org: 'SMU AI Club',
      logo: 'logo-smuai',
      role: ['SMU AI Club Research Lead', 'Data Scientist @ GovTech'],
      photo: 'photos/hosts/darrius-ng.jpg',
      linkedin: 'https://www.linkedin.com/in/darriusng/',
    },
    {
      name: 'Sharan Balaji Manickamoorthy',
      org: 'NUS Product Club',
      logo: 'logo-nus-product-club',
      role: ['President, NUS Product Club', 'Co-founder @ BoardingPass'],
      photo: 'photos/hosts/sharan-balaji-manickamoorthy.jpg',
      linkedin: 'https://www.linkedin.com/in/sharan-balaji-manickamoorthy/',
    },
  ],

  // SMU AI Club's 7:10 segment: the first three slides of their "SMUAI CCA Promo" deck, on this
  // deck's background with their blue, and without the event descriptions. The laptop art and
  // event photos come from their PDF and live in public/media/smuai/.
  smuai: {
    hook: ["AI Won't Replace You.", 'But Someone Using AI Might.'],
    motto: 'SMUAI | Learn. Build. Connect. Explore.',
    tagline: 'Think. Build. Lead.',
    laptop: 'media/smuai/laptop.png',
    what: [
      { text: 'SMUAI is a ' },
      { text: 'student-led think tank', strong: true },
      { text: ' facilitating the sharing of ideas in the field of ' },
      { text: 'Artificial Intelligence', strong: true },
      { text: '.' },
    ],
    aim: 'We aim to cultivate and spread ideas about AI, and provide students with the tools, knowledge, and opportunities to excel in AI.',
    eventsTitle: 'Featured Events AY25/26',
    events: [
      { category: 'Sharing + Networking', name: 'SMUAI x Openclaw Agentic Night', photo: 'media/smuai/agentic-night.jpg' },
      { category: 'Hackathons', name: 'SMUAI x AI Builders Agent Forge Hackathon', photo: 'media/smuai/agent-forge-hackathon.jpg' },
      { category: 'Workshops', name: 'AWS Bedrock Workshop', photo: 'media/smuai/aws-bedrock-workshop.jpg' },
      { category: 'Career', name: 'NCS Company Tour', photo: 'media/smuai/ncs-company-tour.jpg' },
    ],
  },

  // "AI for everyone in Singapore" slide, after the Build Club intro. AI Pass facts are from
  // singtel.com/personal/products-services/lifestyle-services/ai-pass; tools may change.
  // The page screenshot in public/media/singtel/ was taken from that page on 30 Oct 2026.
  community: {
    lead: 'This year we work closely with Singapore enterprises to bring AI to the public.',
    training: {
      image: 'media/singtel/train-the-trainer-cartoon.jpg',
      alt: 'Cartoon of the Singtel AI Pass Train-the-Trainer session: two speakers in front of the title slide, trainers seated below',
      title: 'Train-the-Trainer with Singtel',
      detail: 'For the trainers behind the SkillsFuture AI courses. More sessions and events coming.',
    },
    aiPass: {
      url: 'https://www.singtel.com/personal/products-services/lifestyle-services/ai-pass',
      how: 'Free with selected SWDA-supported SkillsFuture AI courses. Scan for the eligible courses.',
      screenshot: 'media/singtel/ai-pass-page.jpg',
      alt: 'Singtel AI Pass page: around S$600 of AI tools through SWDA-supported AI courses. Seven tools: Manus, Canva, Hailuo AI, Otter.ai, MiniMax Code, MiniMax Audio and Akool, free for 3 months, then keep your favourite for 3 more.',
    },
  },

  // Prizes on the "Tonight's challenge" slide, as offered by the AdaL team.
  // AdaL grants credits only after the builder posts about it, so keep the claim line.
  prizes: {
    places: [
      { rank: '1st', prize: '1 year of AdaL Pro', extra: '$240 value · featured on AdaL channels' },
      { rank: '2nd', prize: '6 months of AdaL Pro' },
      { rank: '3rd', prize: '3 months of AdaL Pro' },
    ],
    bonus: {
      prize: '+1 month of AdaL Pro',
      how: 'Post your video tagging @adalagent and drop the link in Discord.',
    },
    claim: 'To claim any prize, post about your build and tag @adalagent.',
  },

  // Build Club intro slide. Member and city counts are from Build Club's own event copy.
  buildClub: {
    about: 'The most collaborative AI learning community in the world.',
    stats: [
      { value: '70K+', label: 'members' },
      { value: '60+', label: 'cities' },
    ],
    activities: ['Build nights and hack labs', 'VC and founder firesides', 'Industry roundtables'],
    // Past Singapore events. Photos live in public/photos/. The first one is shown largest.
    past: [
      {
        photo: 'photos/gtm-build-lab-group.jpg',
        alt: 'The room at the Go-to-Market Builders AI Build Lab, everyone waving at the camera',
        date: '12 Jun',
        title: 'Go-to-Market Builders AI Build Lab',
        detail: '200+ builders with Singtel, SMU AI Club, Manus, Exa, Mem0 and Vapi',
      },
      {
        photo: 'photos/great-ai-showcase-roundtable.jpg',
        alt: 'Industry roundtable on stage at The Great AI Showcase, Build Club’s Singapore launch',
        date: '21 May',
        title: 'The Great AI Showcase',
        detail: 'Our Singapore launch at Singtel, with Lightspeed and AI Collective',
      },
      {
        photo: 'photos/aspire-vc-fireside.jpg',
        alt: 'VC panel seated in a circle at Aspire HQ',
        date: '4 Sep',
        title: 'VC Fireside with Aspire',
        detail: "Golden Gate, Openspace, GHARAGE and Monk's Hill on APAC startups in 2027",
      },
    ],
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
