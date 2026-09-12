export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  date?: string;
  aspect?: string;
  rotation?: number;
}

export interface PhotoWallItem {
  id: string;
  image: string;
  caption: string;
  size: "tall" | "wide" | "square" | "panoramic";
  offsetY?: number;
  rotation?: number;
}

export const siteConfig = {
  bestie: {
    name: "HER", // Change this to your bestie's real name if you like
    nickname: "Bestie",
    specialDate: "2024 — FOREVER",
  },
  
  media: {
    // Primary hero photo of the two friends for the Section 01 reveal
    heroImage: "/media/Snapchat-1106457158.jpg",
    heroFallback: "/media/hero.jpg",
    herVideo: "/media/her-video.mp4",
    
    // Her personal photos from phone's Snapchat folder
    photo01: "/media/Snapchat-413746507.jpg",
    photo02: "/media/Snapchat-873328916.jpg",
    photo03: "/media/Snapchat-972358746.jpg",
    photo04: "/media/Snapchat-571077550.jpg",
    photo05: "/media/Snapchat-1588945733.jpg",
    photo06: "/media/Snapchat-482331247.jpg",
    photo07: "/media/Snapchat-694490365.jpg",
    photo08: "/media/Snapchat-324971514.jpg",
    photo09: "/media/Snapchat-902996947.jpg",
    photo10: "/media/Snapchat-908669016.jpg",

    // Ambient audio
    ambientAudio: "/audio/gymnopedie.ogg",
    ambientAlternative: "/audio/clair-de-lune.ogg",
  },

  story: {
    hero: {
      tag: "A LITTLE PLACE ON THE INTERNET",
      mainTitle: "FOR HER.",
      subtitle: "Some people enter your life. Somehow, they become a part of it.",
      badgeLeft: "01 / HER",
      badgeRight: "SCROLL TO REMEMBER ↓",
      cursorHint: "move slowly…",
      cursorDiscover: "discover",
    },

    howItStarted: {
      chapter: "02 / THE BEGINNING",
      heading: "IT STARTED\nWITH SOMETHING\nORDINARY.",
      revealedHeading: "But somehow,\nordinary became\nunforgettable.",
      paragraph: "We never planned to become inseparable. It was just another day, another conversation, another wave of effortless laughter. And yet, looking back, that ordinary moment was the quiet opening chapter to the best story of my life.",
      quote: "“Sometimes you meet someone and your soul whispers: there you are.”",
      imageTag: "ARCHIVE // MOMENT 01",
    },

    memoryScroll: {
      chapter: "03 / THE MEMORY SCROLL",
      sectionTitle: "FRAGMENTS IN TIME",
      memories: [
        {
          id: "mem-1",
          title: "ONE OF THOSE DAYS",
          subtitle: "No agenda, just infinite warmth and unfiltered laughter.",
          image: "/media/Snapchat-413746507.jpg",
          date: "OCTOBER 14",
          rotation: -1.5,
        },
        {
          id: "mem-2",
          title: "THE RANDOM MOMENTS",
          subtitle: "The quiet in-betweens that ended up meaning everything.",
          image: "/media/Snapchat-873328916.jpg",
          date: "A SUNNY AFTERNOON",
          rotation: 2.2,
        },
        {
          id: "mem-3",
          title: "THE DAYS I STILL REMEMBER",
          subtitle: "When time seemed to freeze, and we didn't care about anything else.",
          image: "/media/Snapchat-972358746.jpg",
          date: "DECEMBER CHILL",
          rotation: -1.8,
        },
        {
          id: "mem-4",
          title: "BESTIE ENERGY",
          subtitle: "A silent look across the room that said a thousand words.",
          image: "/media/Snapchat-571077550.jpg",
          date: "EVERY SINGLE DAY",
          rotation: 1.5,
        },
        {
          id: "mem-5",
          title: "SUNSET ARCHIVES",
          subtitle: "Watching the sky change colors, grateful you were there.",
          image: "/media/Snapchat-1588945733.jpg",
          date: "GOLDEN HOUR",
          rotation: -2,
        },
      ] as MemoryItem[],
      closingStatement: "AND I STILL HAVE\nA THOUSAND MORE\nMEMORIES.",
    },

    herVideo: {
      chapter: "04 / CINEMATIC ARCHIVE",
      heading: "ONE MOMENT.\nA THOUSAND FEELINGS.",
      subquote: "I could watch these moments a hundred times and still find something new in them.",
      tag: "ORIGINAL REEL // MEMORY IN MOTION",
    },

    whatYouChanged: {
      chapter: "05 / THE TRANSFORMATION",
      lines: [
        "YOU DIDN’T\nJUST BECOME\nA FRIEND.",
        "YOU BECAME\nA PART OF\nMY STORY.",
        "YOU MADE\nTHE HARD DAYS\nLIGHTER.",
        "THE RANDOM DAYS\nSPECIAL.",
        "AND SOMEHOW…",
        "YOU TURNED MY LIFE\nINTO SOMETHING\nI CAN CALL BEAUTIFUL.",
      ],
    },

    punjabiLetter: {
      chapter: "06 / ਦਿਲ ਦੀਆਂ ਗੱਲਾਂ",
      heading: "ਕੁਝ ਗੱਲਾਂ ਦਿਲ ਤੋਂ…",
      subtitle: "Dedicated to the purest bond.",
      lines: [
        {
          text: "ਤੂੰ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦਾ ਉਹ ਹਿੱਸਾ ਐਂ, ਜਿਸਦੇ ਬਿਨਾਂ ਕਹਾਣੀ ਅਧੂਰੀ ਜਿਹੀ ਲੱਗਦੀ ਏ।",
          translation: "You are that part of my life without which my story feels incomplete.",
        },
        {
          text: "ਤੂੰ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਨੂੰ ਸਿਰਫ਼ ਸੋਹਣਾ ਨਹੀਂ ਬਣਾਇਆ, ਤੂੰ ਇਸਨੂੰ ਇੱਕ ਨਵਾਂ ਮਤਲਬ ਦਿੱਤਾ ਏ।",
          translation: "You didn't just make my life beautiful, you gave it brand new meaning.",
        },
        {
          text: "ਜਦੋਂ ਜ਼ਿੰਦਗੀ ਨੇ ਕੱਚ ਵਾਂਗ ਟੁੱਟਣਾ ਸਿਖਾਇਆ, ਤੂੰ ਮੈਨੂੰ ਹੀਰੇ ਵਾਂਗ ਚਮਕਣਾ ਸਿਖਾਇਆ।",
          translation: "When life taught me how to break like glass, you taught me how to shine like a diamond.",
        },
        {
          text: "ਤੂੰ ਮੇਰੇ ਲਈ ਸਿਰਫ਼ ਇੱਕ bestie ਨਹੀਂ, ਤੂੰ ਮੇਰੀਆਂ ਯਾਦਾਂ ਦੀ ਸਭ ਤੋਂ ਸੋਹਣੀ ਕਿਤਾਬ ਐਂ।",
          translation: "You aren't just a best friend, you are the most cherished book of my memories.",
        },
        {
          text: "ਮੇਰੀ ਹੱਸਣ ਦੀ ਵਜ੍ਹਾ, ਮੇਰੀਆਂ random ਗੱਲਾਂ ਦੀ partner, ਤੇ ਮੇਰੀਆਂ ਸਭ ਤੋਂ ਸੋਹਣੀਆਂ ਯਾਦਾਂ ਦਾ ਹਿੱਸਾ।",
          translation: "The reason I laugh, my partner in random talks, and part of my sweetest memories.",
        },
      ],
      finalStatement: "ਤੂੰ ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਨੂੰ\nਹੀਰਾ ਨਹੀਂ ਬਣਾਇਆ…\n\nਤੂੰ ਤਾਂ ਉਸ ਹੀਰੇ ਨੂੰ\nਚਮਕਣਾ ਸਿਖਾਇਆ ਏ।",
      finalStatementTranslation: "You didn't turn my life into a diamond... you taught that diamond how to shine.",
      closingLine: "ਬਸ ਐਨਾ ਯਾਦ ਰੱਖੀਂ —\nਤੂੰ ਮੇਰੇ ਲਈ ਬਹੁਤ ਕੁਝ ਐਂ।\nਸ਼ਾਇਦ ਸ਼ਬਦਾਂ ਤੋਂ ਵੀ ਵੱਧ।",
      closingLineTranslation: "Just remember this — you mean so much to me. Far more than words can say.",
    },

    photoWall: {
      chapter: "07 / CURATED EXHIBIT",
      title: "WALL OF MEMORIES",
      subtitle: "Hover over each memory fragment to look closer.",
      items: [
        {
          id: "wall-1",
          image: "/media/Snapchat-482331247.jpg",
          caption: "a memory I didn't know I'd miss",
          size: "tall",
          rotation: -1,
        },
        {
          id: "wall-2",
          image: "/media/Snapchat-694490365.jpg",
          caption: "pure, unfiltered, effortless happiness",
          size: "square",
          rotation: 2,
        },
        {
          id: "wall-3",
          image: "/media/Snapchat-413746507.jpg",
          caption: "when time slowed down for us",
          size: "wide",
          rotation: -2,
        },
        {
          id: "wall-4",
          image: "/media/Snapchat-873328916.jpg",
          caption: "the candid chaos we will always remember",
          size: "tall",
          rotation: 1.5,
        },
        {
          id: "wall-5",
          image: "/media/Snapchat-972358746.jpg",
          caption: "one of those quiet evenings with endless stories",
          size: "square",
          rotation: -1.2,
        },
        {
          id: "wall-6",
          image: "/media/Snapchat-571077550.jpg",
          caption: "the little moments that matter most",
          size: "wide",
          rotation: 2,
        },
      ] as PhotoWallItem[],
    },

    theEverything: {
      chapter: "08 / THE ESSENCE",
      pre: "THERE ARE PEOPLE\nYOU MEET…",
      main: "…AND THEN THERE ARE\nPEOPLE WHO CHANGE\nTHE WAY YOU SEE LIFE.",
      post: "YOU'RE THAT PERSON.",
    },

    marquee: [
      "random conversations",
      "laughing at nothing",
      "stupid jokes",
      "important talks",
      "beautiful memories",
      "late conversations",
      "the little things",
      "bestie energy",
      "forever grateful",
      "unspoken understanding",
      "shared sunsets",
      "safe place",
    ],

    finalExperience: {
      chapter: "10 / FOREVER IN THE ARCHIVE",
      statement1: "THANK YOU\nFOR EXISTING\nIN MY STORY.",
      statement2: "YOU MADE\nLIFE A LITTLE\nBRIGHTER.",
      punjabiStatement: "ਮੇਰੀ ਜ਼ਿੰਦਗੀ ਦੇ ਇਸ ਸੋਹਣੇ ਹਿੱਸੇ ਲਈ —\nਦਿਲੋਂ ਧੰਨਵਾਦ।",
      fadeLine1: "Some memories fade.",
      fadeLine2: "Some people don't.",
      favoriteMemory: "YOU ARE ONE OF\nMY FAVORITE\nMEMORIES.",
    },

    ending: {
      tinyPre: "THIS LITTLE WEBSITE\nIS JUST A SMALL WAY\nOF SAYING…",
      thankYou: "THANK YOU.",
      bottomNote: "made with memories, a little madness, and a lot of gratitude.",
    },
  },

  navigation: [
    { label: "HER", href: "#hero" },
    { label: "BEGINNING", href: "#how-it-started" },
    { label: "MEMORIES", href: "#memory-scroll" },
    { label: "VIDEO", href: "#her-video" },
    { label: "STORY", href: "#what-you-changed" },
    { label: "PUNJABI", href: "#punjabi-letter" },
    { label: "GALLERY", href: "#photo-wall" },
    { label: "ESSENCE", href: "#the-everything" },
    { label: "FINALE", href: "#final-experience" },
  ],
};
