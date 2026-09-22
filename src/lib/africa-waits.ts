export type WaitId =
  | "thread"
  | "shore"
  | "prep"
  | "civic"
  | "forge"
  | "hall";

export type ChatLine = {
  from: string;
  text: string;
  time: string;
  mine?: boolean;
};

export type WaitSurface = {
  id: WaitId;
  n: string;
  kicker: string;
  holderType: string;
  holderLine: string;
  name: string;
  channel: string;
  verified?: boolean;
  lastSeen: string;
  initials: string;
  carrier: string;
  clock: string;
  prompt: string;
  placeholder: string;
  answer: string;
  hint: string;
  thread: ChatLine[];
};

export const WAIT_SURFACES: WaitSurface[] = [
  {
    id: "thread",
    n: "01",
    kicker: "Business chat · fintech, telco, e-commerce",
    holderType: "Business chat",
    holderLine:
      "A verified company thread. The lookup is the wait. The brand owns this well.",
    name: "Palms Line",
    channel: "Palms Line",
    verified: true,
    lastSeen: "online",
    initials: "PL",
    carrier: "ShoreNet",
    clock: "10:14",
    prompt: "Abeg wetin be my airtime and data so?",
    placeholder: "Message",
    answer:
      "Tola, airtime na ₦1,240. Data 6.2GB, expires 14 Sep. Reply 1 for ₦500 airtime · 2 for 1.5GB (30 days) · 3 to talk to a person.",
    hint: "A verified business thread. The lookup is the wait. The Hold sits between your message and their reply.",
    thread: [
      {
        from: "Palms Line",
        text: "Your Palms wallet top-up of ₦5,000 landed. Want airtime, data, or the shop?",
        time: "Yesterday",
      },
      {
        from: "You",
        text: "Airtime. Abeg how much remain?",
        time: "Yesterday",
        mine: true,
      },
      {
        from: "Palms Line",
        text: "I dey check am. One second.",
        time: "09:41",
      },
    ],
  },
  {
    id: "shore",
    n: "02",
    kicker: "In-app bank / fintech assistant",
    holderType: "Bank assistant",
    holderLine:
      "Home, balance, then the assistant. Processing is already a full-screen stare.",
    name: "Shore",
    channel: "Tola Adeyemi",
    lastSeen: "Secure session",
    initials: "TA",
    carrier: "5G",
    clock: "10:14",
    prompt: "Send 15k to my landlord, the Lekki Gate one",
    placeholder: "Ask Shore…",
    answer:
      "₦15,000 to ADEWALE KOLAWOLE · 0123481926 · Shore. Name match 96%. Shore Current ₦214,580.00 → ₦199,580.00 after send. Enter your 4-digit PIN to confirm. Nothing has left the account.",
    hint: "Home, balance, then the assistant. ‘Processing’ is already a full-screen stare. That is the well.",
    thread: [
      {
        from: "Shore",
        text: "You hid your balance. I can still move money if you confirm with PIN.",
        time: "08:02",
      },
    ],
  },
  {
    id: "prep",
    n: "03",
    kicker: "School / exam / homework AI",
    holderType: "School",
    holderLine:
      "A tutor in the thread, an exam clock on the phone. The school or app owns this well.",
    name: "Prep Hall",
    channel: "Physics · Paper 1",
    lastSeen: "Amaka · tutor",
    initials: "PH",
    carrier: "MTN-d",
    clock: "10:14",
    prompt: "Abeg explain refraction, the one they like in objective.",
    placeholder: "Ask Amaka…",
    answer:
      "Refraction: light bends when it enters a new medium (air → water) because its speed changes. Exam wants: incident ray, refracted ray, and the normal at the point of incidence. Snell: n = sin i / sin r. Don’t mix it with reflection — that’s same medium, i = r. This is practice, not a board paper.",
    hint: "Cheap phone, exam clock, a tutor in the thread. Keep the Hold small and skippable.",
    thread: [
      {
        from: "Amaka",
        text: "Question 12: A ray of light travels from air into water. Which quantity remains the same? A. Speed  B. Wavelength  C. Frequency  D. Direction",
        time: "10:02",
      },
      {
        from: "You",
        text: "I put C. Frequency.",
        time: "10:06",
        mine: true,
      },
      {
        from: "Amaka",
        text: "Correct. Frequency doesn’t change. You’re on 12/40. Next is refraction — ask if it’s still wahala.",
        time: "10:07",
      },
    ],
  },
  {
    id: "civic",
    n: "04",
    kicker: "Government and telco web chat",
    holderType: "Civic desk",
    holderLine:
      "USSD on the web companion. The operator or ministry owns this well.",
    name: "Service Desk",
    channel: "*734# on the web",
    lastSeen: "Session 2:14",
    initials: "SD",
    carrier: "ShoreNet",
    clock: "10:14",
    prompt: "1",
    placeholder: "Reply 0-4",
    answer:
      "SHORE CONNECT\nSIM replace\nNIN match: OK\nVisit: Palms shop, Admiralty, Lekki\nBring: NIN slip + passport photograph\nEst. time: 20 min\nFee: ₦1,500\n\n0 Menu   00 End",
    hint: "The code is text. The Hold lives on the slow web companion people already open when *734# spins.",
    thread: [],
  },
  {
    id: "forge",
    n: "05",
    kicker: "Local chatbot builders · agencies",
    holderType: "Agency builder",
    holderLine:
      "One preview. Every SME bot they wrap inherits the Hold. The agency is the Holder.",
    name: "Forge",
    channel: "Preview · Palms Shop",
    lastSeen: "Customer view",
    initials: "PS",
    carrier: "Wi-Fi",
    clock: "10:14",
    prompt: "Where is my package? PL-4401",
    placeholder: "Message Palms Shop",
    answer:
      "PL-4401 is out for delivery. Left Ikeja hub 9:12. Rider: Chinedu. Window 2–6pm, Lekki Phase 1. Share gate PIN 4401. Not in? We hold till tomorrow 11am.",
    hint: "The agency ships one preview. Every SME bot they wrap inherits the Hold.",
    thread: [
      {
        from: "Palms Shop",
        text: "Hi Tola — Palms Shop. We have PL-4401 (white sneakers, 42) packed from Ikeja.",
        time: "09:14",
      },
      {
        from: "You",
        text: "Can I still change to 43?",
        time: "09:16",
        mine: true,
      },
      {
        from: "Palms Shop",
        text: "Too late to resize — it’s on the bike. I can start a return once it lands. Track it here anytime.",
        time: "09:18",
      },
    ],
  },
  {
    id: "hall",
    n: "06",
    kicker: "Self-hosted campus / company chat",
    holderType: "Campus hall",
    holderLine:
      "A university or company owns this well. LibreChat-class software. They can install Interlude.",
    name: "Hall",
    channel: "ECO 101 · Dr. Bello",
    lastSeen: "Notes · campus Wi-Fi",
    initials: "H",
    carrier: "eduroam",
    clock: "10:14",
    prompt: "Summarise yesterday’s notes on demand. Short.",
    placeholder: "Ask Hall…",
    answer:
      "Demand = willingness and ability to buy at a price. Quantity demanded = one point on the curve. The curve shifts when income, taste, or the price of substitutes change (ceteris paribus). Price itself causes a movement along the curve, not a shift. Dr. Bello’s slide 7 is the diagram to redraw.",
    hint: "A university owns this well. LibreChat-class software. They can install Interlude. ChatGPT cannot.",
    thread: [
      {
        from: "Hall",
        text: "Uploaded: ECO101_lecture_04.pdf (2.4 MB) · yesterday 16:40 · Faculty of Social Sciences.",
        time: "Yesterday",
      },
      {
        from: "You",
        text: "I’ll read it later. Can you keep it to the definitions? I have a test.",
        time: "08:55",
        mine: true,
      },
      {
        from: "Hall",
        text: "Ready when you are. Ask for demand, supply, or the whole hour.",
        time: "08:55",
      },
    ],
  },
];

export const WAIT_MS = 7000;

export const SHORE_TXNS = [
  { name: "Uber Trip", meta: "Today, 07:41", amount: "−₦3,200.00" },
  { name: "Chioma E.", meta: "Yesterday · Shore", amount: "+₦40,000.00" },
  { name: "DSTV Compact", meta: "28 Aug", amount: "−₦24,500.00" },
];
