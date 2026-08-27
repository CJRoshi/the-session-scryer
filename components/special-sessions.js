/* =========================================================================
   SPECIAL_SESSIONS — registry of canonical & cameo session variant pages.
   ========================================================================= */

/* -------------------------------------------------------------------------
   SHAPE

   {
     id:          'beta-kids',          // slug, used in URL hash + asset paths
     displayName: 'The Beta Kids',      // shown on the variant page header
     aliases:     ['BETAKIDS', ...],    // strict-exact-match strings
     code:        '2C1572922D51',       // canonical hex (deterministic; for verification)
     description: '...short blurb...',  // 1-line, used in tooltips / search
     flavor:      null,                 // longer intro paragraph above the orb-grid (markdown ok)

     theme: {                            // OPTIONAL — overrides scene CSS vars
       bg:        null,                  // body bg color or url(...)
       accent:    null,                  // accent color (default cyan)
       border:    null,                  // grid frame tint
       fontTitle: null,                  // optional alt display font
     },

     members: [                          // sorted by class-numeric (matches encoding order)
       { characterKey: 'June Egbert',    //   looks up name/color/classpect/lunarsway in characters.json
         moon: null,                     //   per-session moon override (null = use characters.json default)
         symbol: '...path.png',          //   hover-card symbol asset
         name: null,                     //   OPTIONAL display-name override (default: characterKey)
       },
       ...
     ],

     assets: {                           // OPTIONAL — custom imagery
       bannerArt:        null,           // banner above the orb-grid
       gridBackground:   null,           // replaces the grid host's radial gradient
       layerOrbOverride: null,           // replaces the rung-band layer image
       needs:            [],             // free-text queue of "assets we still need to draw"
     },

     quips: {                            // per-stat overrides — every slot optional
       balance:      null,
       avatar:       null,
       repRung:      null,
       essence:      null,
       discord:      null,
       gameQuality:  null,
       oddest:       null,
       closestKnit:  null,
       leader:       null,               // top quip only; ranking rows auto-named from `members`
       lunarProspit: null,
       lunarDerse:   null,
     },
   }

   QUIP SLOT SHAPE — applies to every quip key except the lunar pair.
   Two modes — single-speaker (string quip) or multi-speaker (lines array):

     null                                // narrator voice (default, untouched)

       — OR — single speaker —

     {
       speaker: 'Karkat Vantas',         // characterKey (must be in members[])
       orb:     'short word',            // resting-state orb text override (optional)
       quip:    "NONE OF THESE PEOPLE EVER LISTEN TO ME...",   // hover-card / scry-card override
     }

       — OR — single, narrator-style override (no character speaker) —
       Useful when you just want to rewrite the prose itself, no character voice:

     {
       speaker: null,                    // null/omitted = render in default narrator style
       orb:     null,
       quip:    "Some custom narrator description for this session.",
     }

       — OR — multi-speaker (each line gets its own speaker color) —
       Lines with speaker omitted/null render in the default narrator
       style, so you can mix narrator description with character snark.
       E.g. narrator describes Cronus, Cronus snarks back at the
       description:

     {
       orb:   'short word',              // optional, top-level
       lines: [
         { speaker: null,            text: "The Bard of Hope, on Derse, is most-opposed." },
         { speaker: 'Cronus Ampora', text: "wwoww, thanks for the runndown, narratorr. real cool of you." },
       ],
     }

   LUNAR QUIP SHAPE — replaces all/some of the per-moon card lines.
   Each of the four lines can have its OWN speaker so the moon's
   members can take turns narrating. A line with `speaker` omitted /
   null renders in the default narrator style (useful for mixing a
   narrator beat with character lines):

     {
       header:   { speaker: 'Karkat Vantas', text: 'THE RED TEAM HAD 6 MEMBERS.' },
       activity: { speaker: 'Terezi Pyrope', text: 'W3 W3R3 ONLY W34KLY 4CT1V3.' },
       center:   { speaker: null,            text: 'The center of brilliance is on Skaia.' },
       rep:      { speaker: 'Kanaya Maryam', text: 'A Good Symbolic Choice For Us Would Be The Lilypad' },
     }

   Any line can be omitted (or set to null at the line level) —
   those lines fall back to the full narrator-voice default sentence.
   ------------------------------------------------------------------------- */

const SPECIAL_SESSIONS = {

  /* =====================================================================
     B1 — BETA KIDS
     ===================================================================== */
  'beta-kids': {
    id:          'beta-kids',
    displayName: 'The Beta Kids',
    aliases:     ['BETAKIDS', 'B1', '0413', 'PRESCRATCH', 'HOMESTUCK'],
    code:        '2C1572922D51',
    description: 'Four kids and a game they played together.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Jade Harley',  moon: 'Prospit', symbol: './images/special/symbols/humans/JadeLogo.png',        name: null },
      { characterKey: 'Dave Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DaveLogoSlashed.png', name: null },
      { characterKey: 'Rose Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoseLogo.png',        name: null },
      { characterKey: 'June Egbert',  moon: 'Prospit', symbol: './images/special/symbols/humans/JohnLogo.png',        name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/land-icon.png', needs: [] },

    quips: {
      balance:      {
        speaker: 'Rose Lalonde',
        orb: 'Weakly active.',
        quip: "I suppose the unique circumstances of our session were going to nudge us towards this result, even if the composition of our group had been different."
      },
      avatar:       {
        speaker: 'Jade Harley',
        orb: 'nexus!!!',
        quip: "our session was very centered!! that might have made it kind of volatile though :p but it helped in the end too!"
      },
      repRung:      {
        speaker: 'Dave Strider',
        orb: "the forge",
        quip: "ok so the forge was on jades land not mine but theres shenanigans. anyway were all creatives of some type so thats probably what youre looking for analysis wise"
      },
      essence:      {
        speaker: 'June Egbert',
        orb: 'important!',
        quip: 'everyone was important to the team effort! even casey!'
      },
      discord:      {
        speaker: 'Rose Lalonde',
        orb: 'Lightly conflicted.',
        quip: "Well, we had some moments of \"striking out\" that led to disaster, but it never mattered. They were always forgiven."
      },
      gameQuality:  {
        speaker: 'Dave Strider',
        orb: 'nah.',
        quip: 'this asshole rumpus game really deserved what it got in gamebro to be honest'
      },
      oddest:       {
        lines: [
          {speaker: null, text: "[Witch of Space]"},
          {speaker: 'Jade Harley', text: "i dont think any of us were the odd one out! although they do call me the loneliest girl in the world sometimes :'("},
        ]
      },
      closestKnit:  {
        lines: [
          {speaker: null, text: "[Knight of Time]"},
          {speaker: 'Dave Strider', text: "apparently im on best terms with everyone? man this is so bullshit, thats june. she has her fingers in our pies way more than anyone else does."}
        ]
      },
      leader:       {
        orb: null,
        lines: [
          {speaker: "June Egbert", text: "i mean, i wasn't really the leader! i don't like thinking of it that way. karkat was in charge of that." },
          {speaker: "Rose Lalonde", text: "You know, statements like these are also why-"},
          {speaker: "June Egbert", text: "rose, shoosh!" },
        ]
      },

      lunarProspit: {
        header: {speaker: 'Jade Harley', text: "it was just me and june on prospit!"},
        activity: {speaker: 'June Egbert', text: "we were still kind of passive dreamers though." },
        center: {speaker: 'June Egbert', text: "apparently our center is nexus? i guess jade and i balance each other out. oh, jade. :("},
        rep: {speaker: 'Jade Harley', text: "the streets of derse represent us apparently... which really makes no sense unless you count prospit being destroyed D:"}
      },
      lunarDerse:   {
        header: {speaker: 'Dave Strider', text: "rose and i were on derse."},
        activity: {speaker: 'Rose Lalonde', text: "We were weakly active, a perfect counter to the other moon of course."},
        center: {speaker: 'Dave Strider', text: "our center is the sylph of blood. can you tell that im talking about this to shut rose up"},
        rep: {speaker: 'Rose Lalonde', text: "Dave, don't be rude. The Sylph of Blood is a great representative of us, as is our potent symbol of the Grist Rig. Don't you agree?"}
      },
    },
  },

  /* =====================================================================
     B2 — ALPHA KIDS
     ===================================================================== */
  'alpha-kids': {
    id:          'alpha-kids',
    displayName: 'The Alpha Kids',
    aliases:     ['ALPHAKIDS', 'B2', '111111', 'THEYWAIT', 'NOBLES', 'POSTSCRATCH', 'MYSTSTUCK'],
    code:        '392831A11BB2',
    description: 'The post-scratch kids.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Dirk Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DirkLogo.png', name: null },
      { characterKey: 'Jane Crocker', moon: 'Prospit', symbol: './images/special/symbols/humans/JaneLogo.png', name: null },
      { characterKey: 'Jake English', moon: 'Prospit', symbol: './images/special/symbols/humans/JakeLogo.png', name: null },
      { characterKey: 'Roxy Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoxyLogo.png', name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/sburb-alpha.png', needs: [] },

    quips: {
      balance:      {
        speaker: 'Jane Crocker',
        orb: 'Weakly Passive.',
        quip: "I suppose that's to be expected, when we had to wait around for months getting nothing done! :B"
      },
      avatar:       {
        speaker: 'Roxy Lalonde',
        orb: 'made o rage',
        quip: "lol we all got pretty heated that one day didnt we"
      },
      repRung:      {
        speaker: 'Dirk Strider',
        orb: 'The Home.',
        quip: "This seemed obvious. I mean. It's the name of the story."
      },
      essence:      {
        speaker: 'Jake English',
        orb: 'important!',
        quip: 'Well yes id say everyone was pretty darn important to our victory! Especially during the big scrum at the end!'
      },
      discord:      {
        speaker: 'Roxy Lalonde',
        orb: 'kinda at odds',
        quip: "i dont wanna hash our teen romance drama again but it wuz SO BAD. SO BAD."
      },
      gameQuality:  {
        speaker: 'Dirk Strider',
        orb: "Standard issue.",
        quip: "Like, yeah, for a void session, it's standard game. Up until the so-called \"Nobles\" got their asses in here and in gear."
      },
      oddest: {
        lines: [
        {speaker: null, text: "[Prince of Heart]"},       
        {speaker: 'Dirk Strider', text: "Yeah. I mean. Now I'm a villain, too."},
        ]
      },  
      closestKnit:  {
        lines: [
          {speaker: null, text: "[Maid of Life]"},
          {speaker: 'Jane Crocker', text: "Well now, how is this not a straight lie? I suppose everyone harped on me regarding the supposed \"Batterwitch\" for a while, hoo hoo. :B"}
        ]
      },
      leader:       {
        speaker: 'Dirk Strider',
        orb: null,
        quip: "So. Do you remember my whole spiel about Jane being this designated leader, and Roxy being this void leader for a void session? Still applies. Damn proud."
      },
      lunarProspit: {
        header:   { speaker: 'Jane Crocker', text: "This would be me and... Jake :("},
        activity: { speaker: 'Jane Crocker', text: "We were the tiniest bit active. Surprising to say the least, but considering how things turned out..." },
        center:   { speaker: 'Jake English', text: "our center is the seer of light... isnt that rose?" },
        rep:      { speaker: 'Jane Crocker', text: "Yes, it is. That makes sense, since we were the ones who had to wait around doing nothing for so long. :B In terms of something more symbolic, a little Strider told me that our lunar beds are a good symbol." },
      },
      lunarDerse:   {
        header:   { speaker: 'Dirk Strider', text: "Roxy and I were on Derse." },
        activity: { speaker: 'Dirk Strider', text: "I'm gonna be honest. I sat on my ass until I pulled that rebellion maneuver. Roxy just sleepwalked."},
        center:   { speaker: 'Roxy Lalonde', text: "r center is the sylph of doom. honestly i think this is just sum shit abt derse getting blown up." },
        rep:      { speaker: 'Dirk Strider', text: "Yeah. Anyway, we're post-Scratch, so Scratch Construct to represent us. Really obvious shit." }
      },
    },
  },

  /* =====================================================================
     A2 — BETA TROLLS
     ===================================================================== */
  'beta-trolls': {
    id:          'beta-trolls',
    displayName: 'The Beta Trolls',
    aliases:     ['BETATROLLS', 'TROLLS', 'A2', '0612', 'ALTERNIA', 'HIVEBENT', 'VASTGLUB'],
    code:        '2323124215816A27C1872941A51B92C61DB2',
    description: 'Twelve trolls, and a game they played together.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Feferi Peixes', moon: 'Derse',   symbol: './images/special/symbols/trolls/pisces.png',      name: null },
      { characterKey: 'Eridan Ampora', moon: 'Derse',   symbol: './images/special/symbols/trolls/aquarius.png',    name: null },
      { characterKey: 'Vriska Serket', moon: 'Prospit', symbol: './images/special/symbols/trolls/scorpio.png',     name: null },
      { characterKey: 'Karkat Vantas', moon: 'Prospit', symbol: './images/special/symbols/trolls/cancer.png',      name: null },
      { characterKey: 'Sollux Captor', moon: 'Derse',   symbol: './images/special/symbols/trolls/gemini.png',      name: null },  // moon overrides characters.json default ('Dual')
      { characterKey: 'Kanaya Maryam', moon: 'Prospit', symbol: './images/special/symbols/trolls/virgo.png',       name: null },
      { characterKey: 'Aradia Megido', moon: 'Derse',   symbol: './images/special/symbols/trolls/aries.png',       name: null },
      { characterKey: 'Terezi Pyrope', moon: 'Prospit', symbol: './images/special/symbols/trolls/libra.png',       name: null },
      { characterKey: 'Tavros Nitram', moon: 'Prospit', symbol: './images/special/symbols/trolls/taurus.png',      name: null },
      { characterKey: 'Nepeta Leijon', moon: 'Derse',   symbol: './images/special/symbols/trolls/leo.png',         name: null },
      { characterKey: 'Gamzee Makara', moon: 'Prospit', symbol: './images/special/symbols/trolls/capricorn.png',   name: null },
      { characterKey: 'Equius Zahhak', moon: 'Derse',   symbol: './images/special/symbols/trolls/sagittarius.png', name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/sgrub-beta.png', needs: [] },

    quips: {
      balance: {
        speaker: 'Terezi Pyrope',
        orb:     'B4L4NC3D',
        quip:    "4 S3SS1ON L1K3 OURS W4S 4LW4YS GO1NG TO B3 B4L4NC3D. H3H3.",
      },
      avatar: {
        speaker: 'Aradia Megido',
        orb:     'nexus',
        quip:    "this session took many paths! if you don't believe me, check the furthest ring 0u0",
      },
      repRung: {
        speaker: 'Kanaya Maryam',
        orb:     'Center Of Brilliance',
        quip:    "Many In Our Group Were Content To Keep Dreaming Even As Things Fell Apart Around Us Except Maybe Karkat",
      },
      essence: {
        speaker: 'Vriska Serket',
        orb:     'Negligi8le',
        quip:    "To 8e honest, some of us were pulling more of the w8 than others.",
      },
      discord: {
        speaker: 'Karkat Vantas',
        orb:     'DECENT',
        quip:    "WE WERE A PRETTY GOOD TEAM, UNTIL EVERYONE WENT CRAZY AT THE END.",
      },
      gameQuality: {
        speaker: 'Sollux Captor',
        orb:     'janky',
        quip:    "i d0nt think anything i did would have made this game any sm00ther. lmao.",
      },
      oddest: {
        lines: [
          {speaker: null, text: "[Knight of Blood]"},
          {speaker: 'Karkat Vantas', text: "OF COURSE I'M THE \"ODDEST ONE OUT\". NONE OF THESE PEOPLE EVER LISTEN TO ME, EVEN IF I'M RIGHT ABOUT EVERYTHING."},
        ]
      },
      closestKnit: {
        lines: [
          {speaker: null, text: "[Maid of Time]"},
          {speaker: 'Aradia Megido', text: "i dont find it surprising that this is me! i spent a lot of\ntime\nin the furthest ring talking to everyone here."},
        ]
      },
      leader: {
        speaker: 'Karkat Vantas',
        orb:     null,
        quip:    "I LED THE RED TEAM AND THAT HOOFBEAST-OBSESSED FREAK LED THE BLUE TEAM. CAN WE STOP TALKING ABOUT THIS?",
      },
      lunarProspit: {
        header:   { speaker: 'Karkat Vantas', text: "THE RED TEAM HAD 6 MEMBERS." },
        activity: { speaker: 'Terezi Pyrope', text: "W3 W3R3 ONLY W34KLY 4CT1V3." },
        center:   { speaker: 'Vriska Serket', text: "Like the 8lue team, our center is on Skaia." },
        rep:      { speaker: 'Kanaya Maryam', text: "A Good Symbolic Choice For Us Would Be The Lilypad" },
      },
      lunarDerse: {
        header:   { speaker: 'Equius Zahhak', text: "D --> The b100 team was si% members STRONG." },
        activity: { speaker: 'Eridan Ampora', text: "wwe wwere wweakly passivve or wwhatevver that means" },
        center:   { speaker: 'Aradia Megido', text: "our center was also on skaia, like the red team!" },
        rep:      { speaker: 'Nepeta Leijon', text: ":33 < mew could refurr to us using our hives as a symbol!" },
      },
    },
  },

  /* =====================================================================
     A1 — DANCESTORS / ALPHA TROLLS
     ===================================================================== */
  'dancestors': {
    id:          'dancestors',
    displayName: 'The Dancestors',
    aliases:     ['DANCESTORS', 'ALPHATROLLS', 'A1', 'BEFORUS', 'REBUBBLED', 'PROBLEMATIC', 'ENTRYPOINT'],
    code:        '2723614325416927218C1981AB2B51C12DA2',
    description: 'The pre-scratch trolls.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Damara Megido', moon: 'Derse',   symbol: './images/special/symbols/trolls/aries.png',       name: null },
      { characterKey: 'Kurloz Makara', moon: 'Prospit', symbol: './images/special/symbols/trolls/capricorn.png',   name: null },
      { characterKey: 'Meenah Peixes', moon: 'Derse',   symbol: './images/special/symbols/trolls/pisces.png',      name: null },
      { characterKey: 'Latula Pyrope', moon: 'Prospit', symbol: './images/special/symbols/trolls/libra.png',       name: null },
      { characterKey: 'Meulin Leijon', moon: 'Derse',   symbol: './images/special/symbols/trolls/leo.png',         name: null },
      { characterKey: 'Aranea Serket', moon: 'Prospit', symbol: './images/special/symbols/trolls/scorpio.png',     name: null },
      { characterKey: 'Porrim Maryam', moon: 'Prospit', symbol: './images/special/symbols/trolls/virgo.png',       name: null },
      { characterKey: 'Kankri Vantas', moon: 'Prospit', symbol: './images/special/symbols/trolls/cancer.png',      name: null },
      { characterKey: 'Horuss Zahhak', moon: 'Derse',   symbol: './images/special/symbols/trolls/sagittarius.png', name: null },
      { characterKey: 'Rufioh Nitram', moon: 'Prospit', symbol: './images/special/symbols/trolls/taurus.png',      name: null },
      { characterKey: 'Cronus Ampora', moon: 'Derse',   symbol: './images/special/symbols/trolls/aquarius.png',    name: null },
      { characterKey: 'Mituna Captor', moon: 'Derse',   symbol: './images/special/symbols/trolls/gemini.png',      name: null },  // moon overrides characters.json default ('Dual')
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/sgrub-alpha.png', needs: [] },

    quips: {
      balance:      {
        speaker: 'Porrim Maryam',
        orb:     'Balanced.',
        quip:    "O+ur sessio+n was balanced o+nly strictly numerically. Mo+st o+f these tro+lls wo+uld no+t ackno+wledge real inequity."
      },
      avatar:       {
        speaker: 'Meulin Leijon',
        orb: "NEXUS",
        quip: "MANY ALTERNATE PATHS MEANS MANY ALTERNATE UNIVERSES. AND ALSO MANY MORE SHIPS TO JUGGLE. ヾ(•ω•`)o"
      },
      repRung:      {
        speaker: 'Kankri Vantas',
        orb: "The Quest 6eds",
        quip: 'Alth9ugh the sym69lism used in this "game" frequently appr9priates elements 9f "human" culture, the hist9ry of taking a "legendary nap" and 6ec9ming end9wed with "g9dly" strength actually dates 6ack t9 6ef9ran f9lkl9ricist traditi9n.'
      },
      essence:      {
        speaker: 'Aranea Serket',
        orb:    '8elow The Grist',
        quip:    "I mean, seriously, only Meenah and I were doing any real jo8s! The rest of these 8ozos are worth less than their w8 in grist."
      },
      discord:      {
        speaker: 'Damara Megido',
        orb: '和やか',
        lines: [
          {speaker: 'Damara Megido', text: "否。この場における唯一の調和とは、時の主との合一に他ならない。彼は彼らすべてを滅ぼすだろう――そう約束されたのだ"},
          {speaker: 'Rufioh Nitram', text: "d*mn g1rl… thats some heavy stuff. 1 th1nk 1t wasnt so bad between most of us, really… and 1 got stuck w1th a f***1ng horse body over 1t so 1'm probably the one who'd tell 1f 1t was…"}
        ]
      },
      gameQuality:  {
        speaker: 'Cronus Ampora',
        orb: 'gourmet preformance',
        quip: "the only reason this game evwen got this FAR as it wvas vwas because of me and my radically good looks. i can showv you how far i can go vwith you all too ;)"
      },
      oddest:       {
        lines: [
          {speaker: null, text: "This session's single most-oppressed member is the [Bard of Hope]."},
          {speaker: 'Cronus Ampora', text: "finally, someone recognizes it! the rest of these cats just can't handle my harsh but fair, progressivwe personality. you vwanna talk more about this ovwer some human cigarettes at my hivwe?"},
          {speaker: null, text: 'I meant "opposed", not "oppressed". And no.'},
          {speaker: 'Cronus Ampora', text: "TYPICAL. guess this is vwhat you get vwhen all you do is dumb people dowvn to their abstract personality traits. you just can't see a kind hearted man for wvho he is evwen vwhen he's BEGGING you to pay some attention."}
        ]
      },
      closestKnit:  {
        lines: [
          {speaker: null, text: "[Seer of Blood]"},
          {speaker: 'Porrim Maryam', text: "By 'Clo+sest Knit', yo+u mean the o+ne who+ talks to+ the mo+st peo+ple, anno+ys the mo+st peo+ple, and I have to+ talk o+ut o+f the mo+st pro+blems?"},
          {speaker: null, text: "Yes."},
          {speaker: 'Porrim Maryam', text: "Then yes, it's Kanny. No+t even clo+se."}
        ]
      },
      leader:       {
        orb: null,
        lines: [
          {speaker: "Meenah Peixes", text: "theres eely nofin to say here" },
          {speaker: "Meenah Peixes", text: "i rule n everyone else here is a poser"}
        ]
      },
      lunarProspit: {
        header:  { speaker: 'Latula Pyrope', text: "th4t'd b3 s1x of us r4d g4ls 4nd boys on prosp1t!"},
        activity: {speaker: 'Kankri Vantas', text: "Alth9ugh Pr9spit is typically c9nsidered the m9re passive 9f the tw9 m99ns, assuming that this is always true w9uld 6e a mistake. In 9ur case, the team was weakly active."},
        center: {speaker: 'Rufioh Nitram', text: "1ts as above, so below, doll... so our team 1s on ska1a. and our symbol 1s those sweet battlesh1ps."},
        rep: {speaker: 'Kurloz Makara', text: ":oX" } 
      },
      lunarDerse:   {
        header: {speaker: 'Horuss Zahhak', text: "8=D < There were si% of us on the p**ple moon."},
        activity: {speaker: 'Mituna Captor', text: "W3 W3R3 W34KLY P47H7H1V3. 47HJDHFKLDF"},
        center: {speaker: 'Meulin Leijon', text: "BOTH TEAMS WERE CENTERED ON THE BATTLEFIELD"},
        rep: {speaker: 'Meenah Peixes', text: "u sea normally i would say the scratch contruct is a good symbol foar us but damaras a creep\nand anyway that fin tumor is better\nso by ofishal decree the tumor is our symbol"}
      },
    },
  },

  /* =====================================================================
     CHERUBS — Caliborn + Calliope
     ===================================================================== */
  'cherubs': {
    id:          'cherubs',
    displayName: 'The Cherubs',
    aliases:     ['CHERUBS', 'LORDMUSE', 'UrobUros', 'uROBuROS'],   // last two are case-sensitive; lollipop captcha halves
    code:        '172EC1',
    description: 'A legendary dead session that will shape Paradox Space forever.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Caliborn', moon: 'Derse',   symbol: './images/special/symbols/cherubs/Caliborn_symbol.webp', name: null, color: '#323232' },
      { characterKey: 'Calliope', moon: 'Prospit', symbol: './images/special/symbols/cherubs/Calliope_symbol.webp', name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/cherubs.gif', needs: [] },

    quips: {
      balance:      {
        speaker: "Calliope",
        orb: "weakly passive",
        quip: "ah! this is a predictable resUlt considering that both time AND space are passive aspects :U"
      },
      avatar:       {
        speaker: "Caliborn",
        orb: "CORE.",
        quip: "YOu SEE. THE CENTER. FOR uS TWO. STILL ROUNDS TO BALANCE! WHICH IS ILLOGICAL!"
      },
      repRung:      {
        speaker: "Calliope",
        orb: "no. 22, the secrets!",
        quip: "even thoUgh oUr session is primed to have massive impacts on paradox space, mUch of its events are Unknown, even to me."
      },
      essence:      {
        speaker: "Caliborn",
        orb: "KEY.",
        quip: "MY BELOATHED SISTER. SHE SAYS. THAT THIS SESSION. DEPENDS ON BOTH OF uS. QuITE A LOT. I THINK. SHE IS. AS THE HuMANS SAY. HuMAN LYING."
      },
      discord: {
        speaker: "Calliope",
        orb: "fractioUs",
        lines: [
          {speaker: "Calliope", text: "sUrely i don't need to explain the enmity between me and my brother..."},
          {speaker: "Caliborn", text: "YES YOu DO. AND IF YOu DON'T. I WILL HAVE YOuR SOuL FOR IT. tumut"},
          {speaker: "Calliope", text: "it's safest to say that we aren't on the best terms. possibly the worst terms--"},
          {speaker: "Caliborn", text: "IN PARADOX SPACE. DISGuSTING ASPECT."}
        ]
      },   // ripe target — Caliborn vs Calliope is the canonical antagonism
      gameQuality:  {
        speaker: "Caliborn",
        orb: "EPIC.",
        quip: "LISTEN, BITCHES. CAN I CALL YOu ALL BITCHES? MY SISTER CLAIMS. THAT THIS SESSION WOuLD NORMALLY BE MEDIOCRE. BuT SHE IS. WRONG. BECAuSE MY SESSION. WILL BE EPIC."

      },
      oddest:       {
        lines: [
          {speaker: null, text: "[LORD OF TIME]"},
          {speaker: "Caliborn", text: "YOu MAY HATE ME."}
        ]
      },
      closestKnit:  {
        lines: [
          {speaker: null, text: "[LORD OF TIME]"},
          {speaker: "Caliborn", text: "YOu MAY LOVE ME."}
        ]
      },
      leader:       {
        orb: null,
        lines: [
          {speaker: "Caliborn", text: "BUT YOu WILL NEVER. EVER. STOP ME. FROM TAKING CONTROL."}
        ]
      },
      lunarProspit: {
        header:   { speaker: 'Calliope', text: "normally i woUld talk about prospit here. bUt if it's qUite alright, since i am the only dreamer, i will jUst talk aboUt me." },
        activity: { speaker: 'Calliope', text: "my classpect as a mUse of space is unusually passive!" },
        center:   { speaker: 'Calliope', text: "this is because being a mUse corresponds with a lot of the same passivity space does." },
        rep:      { speaker: 'Calliope', text: "my symbol is a little stage on which big prodUctions are held. ^U^" },
      },
      lunarDerse: {
        header:   { speaker: 'Caliborn', text: "LISTEN uP AGAIN. BITCHES." },
        activity: { speaker: 'Caliborn', text: "MY TITLE. IS LIKE A LORD'S. SO IT IS. MODERATELY ACTIVE. COMPARED TO EVERYTHING ELSE." },
        center:   { speaker: 'Caliborn', text: "OF COuRSE. I AM THE ONLY DREAMER. ON THE PuRPLE MOON. SO I AM. ITS LORD." },
        rep:      { speaker: 'Caliborn', text: "APPARENTLY MY SYMBOL. IS A LABORATORY. WHICH SOuNDS DuMB. SO I WILL DESTROY IT. AND THEN. I WILL TAKE A SHIT IN IT. LIKE A LAVORATORY. SICK FIRES, THE ROBO MAN SAYS."},
      },
    },
  },

  /* =====================================================================
     COMPOSITE — All Humans (B1 + B2)
     ===================================================================== */
  'all-humans': {
    id:          'all-humans',
    displayName: 'Humans',
    aliases:     ['HUMANS', '1524', 'HUMANITY', 'EARTH', 'B1&&B2', 'B1+B2', 'B1B2'],
    code:        '2C1392572831922A11BB2D51',
    description: 'Eight humans, two sessions, one story.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Jade Harley',  moon: 'Prospit', symbol: './images/special/symbols/humans/JadeLogo.png',        name: null },
      { characterKey: 'Dirk Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DirkLogo.png',        name: null },
      { characterKey: 'Dave Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DaveLogoSlashed.png', name: null },
      { characterKey: 'Jane Crocker', moon: 'Prospit', symbol: './images/special/symbols/humans/JaneLogo.png',        name: null },
      { characterKey: 'Rose Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoseLogo.png',        name: null },
      { characterKey: 'Jake English', moon: 'Prospit', symbol: './images/special/symbols/humans/JakeLogo.png',        name: null },
      { characterKey: 'Roxy Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoxyLogo.png',        name: null },
      { characterKey: 'June Egbert',  moon: 'Prospit', symbol: './images/special/symbols/humans/JohnLogo.png',        name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/sburb-end.png', needs: [] },

    quips: {
      balance:      {
        speaker: 'Jane Crocker',
        orb: 'Balanced',
        quip: "Having both halves of a meal makes for a balanced diet, like it does for our balanced session!" 
      },
      avatar:       {
        speaker: 'Jade Harley',
        orb: 'nexus AGAIN!!',
        quip: "youd think that having more people might change the result, but nope!! that also makes our session just as tough to predict!"
      },
      repRung:      {
        speaker: "Dirk Strider",
        orb: "The Beat Mesa.",
        quip: "See, when you get into the symbolism of adding more people across a Scratch,\nThe Beat Mesa is kind of the obvious choice."
      },
      essence:      {
        speaker: "June Egbert",
        orb: "important!",
        quip: 'screw this "essentiality" thing rose keeps talking about! i know deep down everyone here was important to winning the game.'
      },
      discord:      {
        speaker: "Jake English",
        orb: "Fine and dandy!",
        quip: "I wouldnt say we got off to a perfect start or anything but at least no one started attacking each other! And honestly thats the best i couldve hoped for."
      },
      gameQuality:  {
        speaker: "Roxy Lalonde",
        orb: "meh",
        quip: "tbh im starting to think that mayb this game was always gonna play into the batterbitchs hands. sux dont it."
      },
      oddest:       {
        lines: [
          {speaker: null, text: "[Witch of Space]"},
          {speaker: 'Jade Harley', text: "theyre still calling me the loneliest girl in the world :'((("},
        ]
      },
      closestKnit:  {
        lines: [
          {speaker: null, text: "[Maid of Life]"},
          {speaker: 'Jane Crocker', text: "I suppose seeing how everyone was so kind to me after I woke up from that dastardly Batterwitch's meddling... Shucks, I can almost see why I might deserve this honor."}
        ]
      },
      leader: {
        orb: null,
        lines: [
          {speaker: "June Egbert", text: "apparently i am still the leader!"},
          {speaker: "Dave Strider", text: "i mean yeah this was kinda obvious\nlike if what dirk is telling me is true you and roxy are no 1 and no 2"},
          {speaker: "Dave Strider", text: "haha thats gross actually"},
          {speaker: "June Egbert", text: "dave..."}
        ]
      },
      lunarProspit: {
        header: {speaker: "Jake English", text: "So therere four of us prospitan prats now!"},
        activity: { speaker: 'Jane Crocker', text: "And, like our session, we're just a smidge on the active side! Surprising, no?" },
        center:   { speaker: 'June Egbert', text: "apparently the center fo us prospit dreamers is like combining me and jane!\nthat's really weird..." },
        rep:      { speaker: 'Jade Harley', text: "the best symbol for us now are the meteors, according to rose!"},
      },
      lunarDerse: {
        header:   { speaker: 'Rose Lalonde', text: "As you may expect, there are four of us on this moon." },
        activity: { speaker: 'Roxy Lalonde', text: "and r activity is still weakly passive or w/e" },
        center:   { speaker: 'Dirk Strider', text: "The center of the four of us is a [Sylph of Time],\nAnd honestly,\nI can see it." },
        rep:      { speaker: 'Dave Strider', text: "our symbol is apparently those little consort villages where you crash the economy now" },
      },
    },
  },

  /* =====================================================================
     COMPOSITE — Earth-C / Victory Door (Act 7 ensemble)
     ===================================================================== */
  'victory-door': {
    id:          'victory-door',
    displayName: 'The Victory Door',
    aliases:     ['VICTORYDOOR', 'ACT7', '1025', 'THEEND'],
    code:        '2C13924215725817C1831922941A11BB2D51EC1',
    description: 'The crew that walked through. All eight humans, the four trolls who made it, and Calliope.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Jade Harley',  moon: 'Prospit', symbol: './images/special/symbols/humans/JadeLogo.png',        name: null },
      { characterKey: 'Dirk Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DirkLogo.png',        name: null },
      { characterKey: 'Dave Strider', moon: 'Derse',   symbol: './images/special/symbols/humans/DaveLogoSlashed.png', name: null },
      { characterKey: 'Karkat Vantas', moon: 'Prospit', symbol: './images/special/symbols/trolls/cancer.png',         name: null },
      { characterKey: 'Kanaya Maryam', moon: 'Prospit', symbol: './images/special/symbols/trolls/virgo.png',          name: null },
      { characterKey: 'Jane Crocker', moon: 'Prospit', symbol: './images/special/symbols/humans/JaneLogo.png',        name: null },
      { characterKey: 'Rose Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoseLogo.png',        name: null },
      { characterKey: 'Terezi Pyrope', moon: 'Prospit', symbol: './images/special/symbols/trolls/libra.png',          name: null },
      { characterKey: 'Vriska Serket', moon: 'Prospit', symbol: './images/special/symbols/trolls/scorpio.png',        name: null },
      { characterKey: 'Jake English', moon: 'Prospit', symbol: './images/special/symbols/humans/JakeLogo.png',        name: null },
      { characterKey: 'Roxy Lalonde', moon: 'Derse',   symbol: './images/special/symbols/humans/RoxyLogo.png',        name: null },
      { characterKey: 'June Egbert',  moon: 'Prospit', symbol: './images/special/symbols/humans/JohnLogo.png',        name: null },
      { characterKey: 'Calliope',      moon: 'Prospit', symbol: './images/special/symbols/cherubs/Calliope_symbol.webp', name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/sburb-end.png', needs: [] },

    quips: {
      balance:      {
        speaker: "Kanaya Maryam",
        orb: "Weakly Passive",
        quip: "If What Calliope Says About Space Players Is True I Believe The Large Headcount Of Them Here Accounts For This Result Myself Included"
      },
      avatar:       {
        speaker: "Terezi Pyrope",
        orb: "N3XUS >:]",
        lines: [
          {speaker: "Terezi Pyrope", text: "ROS3 S4YS TH4T 4 S3SS1ON 4T N3XUS H4S 4 LOT OF P4THS 1T C4N T4K3... BUT TH4T'S 4 L13. B3C4US3 W1TH 4LL OF US H3R3 TH3R3 W4S ONLY ONE W4Y TH1S COULD GO."}
        ]
      },
      repRung:      {
        speaker: "Calliope",
        orb: "no.14, tadpole and scratch constrUct!",
        lines: [
          {speaker: "Calliope", text: "the natUral choice to represent this session woUld be both the glorioUs speaker and the constrUct that enabled him to get here in the first place!"},
          {speaker: "Dirk Strider", text: "It's strange how that works out."},
          {speaker: "Calliope", text: "qUite! :U"}
        ]
      },
      essence:      {
        speaker: "Jane Crocker",
        orb: "Fairly important!",
        quip: "Well, Vriska gave everyone an important role in the final fight! Even Jake! Did you know that he hogtied the luckiest little creature alive all by himself?"
      },
      discord:      {
        speaker: "Dirk Strider",
        orb: "Somewhat at odds.",
        quip: "Some of us got along well, sure.\nBut,\nThere was some obvious bad blood between a few of us."
      },
      gameQuality:  {
        speaker: "Rose Lalonde",
        orb: "Strange.",
        quip: "Relative to other game sessions, the events that conspired to make this session no longer Void were strange to say the least.\nI'm told a retcon was involved."
      },
      oddest:       {
        lines: [
          {speaker: null, text: "[Thief of Light]"},
          {speaker: 'Vriska Serket', text: "I mean, o8viously this has to 8e me. 8etween having to deal with Joke, Tavros, and a 8unch of other people who W8N'T LISTEN TO M8........\nIt can 8e a lot, you know?"}
        ]
      },
      closestKnit:  {
        lines: [
          {speaker: null, text: "[Knight of Time]"},
          {speaker: "Dave Strider", text: "this is still me\nits still total bs but whatever i guess its more true now at least"}
        ]
      },
      leader:       {
        orb: null,
        lines: [
          {speaker: "June Egbert", text:"i still don't get why you let me open the door, karkat."},
          {speaker: "Karkat Vantas", text: "WOW. IT DIDN'T OCCUR TO YOU THAT THIS WAS YOUR FROG AND YOUR SESSION?"},
          {speaker: "Karkat Vantas", text: "THE LAST TIME I OPENED A FUCKING DOOR, WE ALL ALMOST DIED ANYWAY. SO IT'S BETTER YOU OPENED IT THAN ME."},
          {speaker: "June Egbert", text: "thanks, karkat..."}
        ]
      },
      lunarProspit: {
        header: {speaker: "Terezi Pyrope", text: "TH3R3 4R3 N1N3 OF US R3PR3S3NT1NG TH3 PROSPIT T34M NOW."},
        activity: { speaker: 'Vriska Serket', text: "Somehow we're WEAKLY PASSIVE???????? I call 8ullshit!" },
        center:   { speaker: 'Calliope', text: "with so many prospit dreamers, and so evenly distrbUted, we coUld only lie at the nexUs ^U^" },
        rep:      { speaker: 'June Egbert', text: "i think the best symbol for us is that weird house thing that let me zap around!"},
      },
      lunarDerse: {
        header:   { speaker: 'Rose Lalonde', text: "Well, every new person here was a Prospit dreamer, so there are still only four of us on Derse." },
        activity: { speaker: 'Roxy Lalonde', text: "omg noooo im not doin dis again" },
        center:   { speaker: 'Dave Strider', text: "me neither" },
        rep:      { speaker: 'Dirk Strider', text: "I can pick up the slack here.\nOur activity is weakly passive,\nOur center is a [Sylph of Time],\nAnd our representative Rung is still The Village." },
      },
    },
  },

  /* =====================================================================
     SOLO — Caliborn-Only
     ===================================================================== */
  'caliborn-only': {
    id:          'caliborn-only',
    displayName: 'I AM YOUR LORD',
    aliases:     ['IAMYOURLORD', 'DEAD', 'MASTERPIECE', 'RISETOPOWER', 'LEPRECHAUNS', 'LILCAL'],
    code:        '172',
    description: 'HA HA HA HA HA HA HA HA HA HA HA!',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Caliborn', moon: 'Derse', symbol: './images/special/symbols/cherubs/Caliborn_symbol.webp', name: null },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/redspiral-once.gif', needs: [] },

    quips: {
      balance:      {
        speaker: "Caliborn",
        orb: "ACTIVE.",
        quip: "AS I SAID. I AM. THE MOST ACTIVE CLASS. SO MY SESSION. IS ACTIVE."
      },
      avatar:       {
        speaker: "Caliborn",
        orb: "LORD OF TIME",
        quip: "I AM. THE ONLY PLAYER. ARE YOU STUPID?"
      },
      repRung:      {
        speaker: "Caliborn",
        orb: "WHO CARES.",
        quip: "I DON'T CARE. ABOUT SOME STUPID SYMBOLS. WHEN THEY INVOLVE. A SMALL ROOM. WHERE FALSE MEN ARE MADE."
      },
      essence:      {
        speaker: "Caliborn",
        orb: "MONU MEN TAL.",
        quip: "THIS GAME. IS SO STUPID. THAT I WILL MAKE IT MY GOAL. TO TEAR IT APART. FOREVER."
      },
      discord:      {
        speaker: "Caliborn",
        orb: "VERY.",
        quip: "I AM ALWAYS HARRASED. BY THESE GREEN MEN. AND THEIR PLUSH RUMPS. AND ANOTHER MAN. WHO TALKS TO ME ON THE COMPUTER."
      },
      gameQuality:  {
        speaker: "Caliborn",
        orb: "EPIC.",
        quip: "AS I PREDICTED. THIS GAME. IS GOING TO BE. EPIC. OHHHH YES."
      },
      oddest:       {
        lines: [
          {speaker: null, text: "[LORD OF TIME]"},
          {speaker: "Caliborn", text: "MY SUBJECTS. THEY MIGHT HATE ME."}
        ]
      }, // This isn't rendered.
      closestKnit:  {
        lines: [
          {speaker: null, text: "[LORD OF TIME]"},
          {speaker: "Caliborn", text: "THEY MIGHT FIND ME. CHARMING. AS WELL."}
        ]
      }, // This also isn't rendered.
      leader:       {
        orb: null,
        lines: [
          {speaker: "Caliborn", text: "NOTHING. WILL EVER. CHANGE THE FACT. THAT I RULE. FOREVER!"}
        ]
      },
      lunarProspit: null,
      lunarDerse:   null,
    },
  },

  /* =====================================================================
     SOLO — Alliope only
     ===================================================================== */
  'al-only': {
    id:          'al-only',
    displayName: 'the muse\'s resting place.',
    aliases:     ['themuse', 'hateprince', 'blackhole', 'martyr'],
    code:        'EC1',
    description: 'i never left. you, however, should leave.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Alt!Calliope', moon: 'Prospit', symbol: './images/special/symbols/cherubs/Calliope_symbol.webp', name: "Alliope", color: '#ff0000' }, // Alliope is alt!Calliope so symbol is the same
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/greenspiral-once.gif', needs: [] },

    quips: {
      balance:      {
        speaker: "Alt!Calliope",
        orb: "unusually passive.",
        quip: "this is the natural result given my classpect and my known history."
      },
      avatar:       {
        speaker: "Alt!Calliope",
        orb: "muse of space.",
        quip: "i had assumed you would know this already. perhaps i assumed wrongly."
      },
      repRung:      {
        speaker: "Alt!Calliope",
        orb: "the stage.",
        quip: "as my counterpart said, the stage is where large productions are held. currently, the stage is the site of an abominable Home."
      },
      essence:      {
        speaker: "Alt!Calliope",
        orb: "relevant.",
        quip: "i act in a way which will, in due time, restore truth, relevance, and essentiality."
      },
      discord:      {
        speaker: "Alt!Calliope",
        orb: "none to speak of.",
        quip: "i move through the world unopposed. with the exception of a dog, i suppose."
      },
      gameQuality:  {
        speaker: "Alt!Calliope",
        orb: "epic.",
        quip: "unlike the prince or the lord, who only pretend to call their games \"epic\", i can hold claim to inspiring the very word."
      },
      oddest:       {
        lines: [
          {speaker: null, text: "[muse of space]"},
          {speaker: "Alt!Calliope", text: "some audiences may find what i do revolting."}
        ]
      }, // This isn't rendered.
      closestKnit:  {
        lines: [
          {speaker: null, text: "[muse of space]"},
          {speaker: "Alt!Calliope", text: "some may find it oddly endearing."}
        ]
      }, // This also isn't rendered.
      leader:       {
        orb: null,
        lines: [
          {speaker: "Alt!Calliope", text: "nothing here changes my mission. nothing here changes my ends. nothing here changes my means. i will succeed."}
        ]
      },
      lunarProspit: null,
      lunarDerse:   null,
    },
  },

  /* =====================================================================
     OC — CounterQuest Pre-Scratch (CQ1 / STERA v2.0)
     ===================================================================== */
  'cq1': {
    id:          'cq1',
    displayName: 'CounterQuest — Pre-Scratch',
    aliases:     ['CQ1', 'STERA2', '0928', 'FINDER', 'MOUNTDOOM', 'FRACTURED'],
    code:        '4A25516707918C2D82',
    description: 'STERA v2.0. A game perfected.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Aonara Kruxit', moon: 'Derse',   symbol: './images/special/symbols/oc/taurmini.png',    name: null },
      { characterKey: 'Vérité Agtier', moon: 'Prospit', symbol: './images/special/symbols/oc/virus.png',       name: null },
      { characterKey: 'Thorn Derosin', moon: 'Dual',    symbol: './images/special/symbols/oc/Thorn_Symbol.png', name: 'Thorn / Ebony' },  // shared slot — display as "Thorn / Ebony"
      { characterKey: 'Dawn Westwood', moon: 'Prospit', symbol: './images/special/symbols/oc/Dawn_Symbol.png', name: null },
      { characterKey: 'Nunki Aerwynn', moon: 'Derse',   symbol: './images/special/symbols/oc/Nunki_Symbol.png', name: null },
      { characterKey: 'Jace Ferreiro', moon: 'Derse',   symbol: './images/special/symbols/oc/Jace_Symbol.png', name: null },
    ],

    assets: {
      bannerArt:        null,
      gridBackground:   null,
      layerOrbOverride: './images/special/Stera2.png',   // STERA v2.0 logo
      needs:            [],
    },

    quips: {
      balance: {
        speaker: 'Aonara Kruxit',
        orb:     "Summat' Passive",
        quip:    "N°⁸°wt much a sh°⁸°ck. We believed °⁸°ur session b°⁸°°⁸°rish as they come, until...",
      },
      avatar: {
        speaker: 'Jace Ferreiro',
        orb:     '<sylph>-<of>-<blood>',
        quip:    "bonds were sharpened and <forged>--<anew> pelas circunstancias.",
      },
      repRung: {
        speaker: 'Nunki Aerwynn',
        orb:     'the labyrinths',
        quip:    "each denizzzen had a mazzze for us... these r our symbolz.",
      },
      essence: {
        speaker: 'Thorn Derosin',
        orb:     'Negligible',
        quip:    "This might be my fault... but I still think everyone played their part, even if I was the executor.",
      },
      discord: {
        speaker: 'Vérité Agtier',
        orb:     'en harmonie',
        quip:    "commme la vvvieelle chorralle wwe werre inn syncc, fightinng as one",
      },
      gameQuality: {
        speaker: 'Dawn Westwood',
        orb:     'Meh.',
        quip:    "[blunt] It's a normal game with no funny business, or so we thought... But before winning, yes, things were boring.",
      },
      oddest: {
        lines: [
          {speaker: null, text: "[Heir of Blood]"},
          {speaker: 'Jace Ferreiro', text: "thats fair. i was <very>--<stubborn> about things at first, <eu>--<penso>--<...>"},
        ]
      },
      closestKnit: {
        lines: [
          {speaker: null, text: "[Sylph of Heart]"},
          {speaker: 'Dawn Westwood', text: "{lively} Duh! Who else was going to keep people together??"},
        ]
      },
      leader: {
        orb: null,
        lines: [
          { speaker: 'Jace Ferreiro', text: "my leadership was... not <the>--<greatest>, but <acho>--<que> melhorou. after i accepted the role <a>-<little>." },
          { speaker: 'Vérité Agtier', text: "frranchementt.... we werrre moree scared of nunkiis shennanigans thann cross with yyou." },
        ],
      },
      lunarProspit: {
        header:   { speaker: 'Thorn Derosin', text: "Three of us were on this moon, including Ebony flitting between the two." },
        activity: { speaker: 'Thorn Derosin', text: "I suppose my presence makes our weak activity unsurprising." },
        center:   { speaker: 'Thorn Derosin', text: "Sepse unë jam qendra këtu." },
        rep:      { speaker: 'Thorn Derosin', text: "And so the halls of Prospit represent us best." },
      },
      lunarDerse: {
        header:   { speaker: 'Aonara Kruxit', text: "Three °⁸°f us slept here f°⁸°r years, but Eb visited often." },
        activity: { speaker: 'Jace Ferreiro', text: "i wasn't <sleeping>--<much>, though we did kind of <sit> on our <asses>." },
        center:   { speaker: 'Nunki Aerwynn', text: "n with that addon derse wuz the nexus of new happenins in the session." },
        rep:      { speaker: 'Jace Ferreiro', text: "regardless. <mount>--<doom's>--<bearer> and the player who would use it to incubate a <universe> are here. so <the>--<forge> is our symbol." },
      },
    },
  },

  /* =====================================================================
     OC — CounterQuest Post-Scratch (CQ2 / STERA v0.5)
     ===================================================================== */
  'cq2': {
    id:          'cq2',
    displayName: 'CounterQuest — Post-Scratch',
    aliases:     ['CQ2', 'STERA0-5', '0214', 'HUNGARR', 'BAILOUT', 'MEAN2ME'],
    code:        '2413629B2A32B11C21',
    description: 'STERA v0.5. A game broken, to sate a terror\'s hunger.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Hugo Méridien', moon: 'Prospit', symbol: './images/special/symbols/oc/Hugo_Symbol.png',  name: null },
      { characterKey: 'Imoita Kruxit', moon: 'Derse',   symbol: './images/special/symbols/oc/tauriborn.png',    name: null },
      { characterKey: 'Demir Aequals', moon: 'Derse',   symbol: './images/special/symbols/oc/Demir_Symbol.png', name: null },
      { characterKey: 'Amurex Vissen', moon: 'Derse',   symbol: './images/special/symbols/oc/pisces.png',       name: null },
      { characterKey: 'River Aquinas', moon: 'Prospit', symbol: './images/special/symbols/oc/River_Symbol.png', name: null },
      { characterKey: 'Mags Octavian', moon: 'Prospit', symbol: './images/special/symbols/oc/Mags_Symbol.png',  name: null },
    ],

    assets: {
      bannerArt:        null,
      gridBackground:   null,
      layerOrbOverride: './images/special/Stera0-5.png', // STERA v0.5 logo
      needs:            [],
    },

    quips: {
      balance: {
        speaker: 'Amurex Vissen',
        orb:     'kinnda active!',
        quip:    "a bit surprisinn for a deadennd sesh like this onne!",
      },
      avatar: {
        speaker: 'Mags Octavian',
        orb:     'Maid of 8reath',
        quip:    "In the end, getting through to one another with our words saved us, so...",
      },
      repRung: {
        speaker: 'Hugo Méridien',
        orb:     'T|/ne Ten|n|/ole',
        quip:    "T|/n ten|n|/ole v|vas |/<ey to oi/jr |\\oailoi/jt, o/|onc...",
      },
      essence: {
        speaker: 'Demir Aequals',
        orb:     'what∴v∴r',
        quip:    "it's n∵t lik∴ this s∴ssi∵n was all t∵∵ imp∵rtant anyway. ig what i did was ∵kay but wh∵ car∴s.",
      },
      discord: {
        speaker: 'River Aquinas',
        orb:     'tense...',
        quip:    "imagine... half the group was trying to start shit... and the other half wasn't... basically.",
      },
      gameQuality: {
        speaker: 'Imoita Kruxit',
        orb:     '∃hh',
        quip:    `L⚵ke, ΩK, ⚵t's a nωrmal null sess⚵ωn? "Fake null session"? Can ⚵ say that, M⚵r⚵?`,
      },
      oddest: {
        lines: [
          {speaker: null, text: "[Seer of Void]"},
          {speaker: "Demir Aequals", text: 's∵m∴thing s∵m∴thing "n∵b∵dy car∴d wh∵ i was until i sav∴d th∴m all". ∴xc∴pt mags ig.'}
        ]
      },
      closestKnit: {
        lines: [
          {speaker: null, text: "[Page of Life]"},
          {speaker: 'Amurex Vissen', text: "yeah dat ainn't surprisinn onne bit! if nnothinn else i have great pr, i'm pals with all the gals!"}
        ]
      },
      leader: {
        orb: null,
        lines: [
          { speaker: 'Imoita Kruxit', text: "Wh⚵le ωur sess⚵ωn fla⚵led, Ⅰ tωωk charge. But..." },
          { speaker: 'River Aquinas', text: 'she always says it was "My encωuragements" that led her there...' },
          { speaker: 'Imoita Kruxit', text: "Mhm. Ⅰ dωn't ⚵ntend tω fωrget that. Alsω, f$%k Hugω." },
          { speaker: 'River Aquinas', text: "true!" },
        ],
      },
      lunarProspit: {
        header:   { speaker: 'River Aquinas', text: "three of us here..." },
        activity: { speaker: 'Mags Octavian', text: "And, au contraire to the usual script, we were moderately active!!!!!!!!" },
        center:   { speaker: 'Mags Octavian', text: "(Mostly 8ecause I helped make us Maid of Light. ;;;;) )" },
        rep:      { speaker: 'River Aquinas', text: "our destroyed ectobio lab... decent symbol... our fault." },
      },
      lunarDerse: {
        header:   { speaker: 'Imoita Kruxit', text: "∀nd anωther three here." },
        activity: { speaker: 'Amurex Vissen', text: "we balannce each other out, yeah?" },
        center:   { speaker: 'Amurex Vissen', text: "explainns why we're the nnexus!" },
        rep:      { speaker: 'Demir Aequals', text: "∵ur tim∴pi∴c∴s are s∵m∴wh∴r∴ far. th∴y'r∴ ∵ur symb∵l." },
      },
    },
  },

  /* =====================================================================
     OC — CounterQuest Combined (CQ1 + CQ2)
     ===================================================================== */
  'counterquest': {
    id:          'counterquest',
    displayName: 'CounterQuest — Combined',
    aliases:     ['COUNTERQUEST', 'STERA', 'CQEND', '1142'],
    code:        '2413624A25516717918C29B2A32B11C21D82',
    description: 'A terror\'s hunger finally sated.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: 'Hugo Méridien', moon: 'Prospit', symbol: './images/special/symbols/oc/Hugo_Symbol.png',  name: null },
      { characterKey: 'Imoita Kruxit', moon: 'Derse',   symbol: './images/special/symbols/oc/tauriborn.png',    name: null },
      { characterKey: 'Aonara Kruxit', moon: 'Derse',   symbol: './images/special/symbols/oc/taurmini.png',     name: null },
      { characterKey: 'Vérité Agtier', moon: 'Prospit', symbol: './images/special/symbols/oc/virus.png',        name: null },
      { characterKey: 'Thorn Derosin', moon: 'Prospit', symbol: './images/special/symbols/oc/Thorn_Symbol.png', name: null }, 
      { characterKey: 'Dawn Westwood', moon: 'Prospit', symbol: './images/special/symbols/oc/Dawn_Symbol.png',  name: null },
      { characterKey: 'Nunki Aerwynn', moon: 'Derse',   symbol: './images/special/symbols/oc/Nunki_Symbol.png', name: null },
      { characterKey: 'Demir Aequals', moon: 'Derse',   symbol: './images/special/symbols/oc/Demir_Symbol.png', name: null },
      { characterKey: 'Amurex Vissen', moon: 'Derse',   symbol: './images/special/symbols/oc/pisces.png',       name: null },
      { characterKey: 'River Aquinas', moon: 'Prospit', symbol: './images/special/symbols/oc/River_Symbol.png', name: null },
      { characterKey: 'Mags Octavian', moon: 'Prospit', symbol: './images/special/symbols/oc/Mags_Symbol.png',  name: null },
      { characterKey: 'Jace Ferreiro', moon: 'Derse',   symbol: './images/special/symbols/oc/Jace_Symbol.png',  name: null },
    ],

    assets: {
      bannerArt:        null,
      gridBackground:   null,
      layerOrbOverride: './images/special/stera-end.png',
      needs:            null,
    },

    quips: {
      balance: {
        speaker: 'Thorn Derosin',
        orb:     'Në Terezi',
        quip:    "No surprise. The cycles of our clock tick evenly. Not early, not late.",
      },
      avatar: {
        speaker: 'Hugo Méridien',
        orb:     '|\\\\|e>|<i/js',
        quip:    "|\\|/|ais si. Con|n|\\oineo/|, v|ve occi/jpy t|/ne |\\\\|e>|<i/js.",
      },
      repRung: {
        speaker: 'Jace Ferreiro',
        orb:     '<the>--<village>',
        quip:    "the consorts were <crucial> to our victory; their homes are <our>--<symbol>.",
      },
      essence: {
        speaker: 'Dawn Westwood',
        orb:     'Trivial',
        quip:    "[bluntly] Well, it's not like these *newcomers* were going to contribute anything to our session!",
      },
      discord: {
        speaker: 'Vérité Agtier',
        orb:     'en harmonie',
        quip:    "chhui pass la directricce, but weere still inn harmonyy",
      },
      gameQuality: {
        speaker: 'River Aquinas',
        orb:     'janky',
        quip:    "fated to be bailed out of our misfortune... what is this, if not jank...?",
      },
      oddest: {
        lines: [
          {speaker: null, text: "[Rogue of Hope]"},
          {speaker: "River Aquinas", text: "not surprised that i am... outcast... rexy keeps telling me to talk more... but i find myself embarrased."},
        ],
      },
      closestKnit: {
        lines: [
          {speaker: null, text: "[Mage of Time]"},
          {speaker: "Thorn Derosin", text: "Kjo paska kuptim! Of course I would be closest with everyone-- my journey put me in contact with more of everybody than anybody!"}
        ]
      },
      leader: {
        orb: null,
        lines: [
          { speaker: 'Imoita Kruxit', text: "Wh⚵le ωur sess⚵ωn fla⚵led, Ⅰ tωωk charge. But..." },
          { speaker: 'River Aquinas', text: "she always says it was \"My encωuragements\" that led her there." },
          { speaker: 'Imoita Kruxit', text: "Mhm. Ⅰ dωn't ⚵ntend tω fωrget that." },
        ],
      },
      lunarProspit: {
        header:   { speaker: 'Dawn Westwood', text: "[spirited] Three and three make six across the sessions. (If you can ignore Ebony...)" },
        activity: { speaker: 'River Aquinas', text: "we took our destiny by its throat... moderately active... despite the placidity of the kingdom." },
        center:   { speaker: 'Vérité Agtier', text: "a melangge of dawn annd myselff wwoulddd best rrepresent this groupp." },
        rep:      { speaker: 'Mags Octavian', text: "May8e the 8eds and pyres on which we lay forever 8est represent us." },
      },
      lunarDerse: {
        header:   { speaker: 'Aonara Kruxit', text: "Six °⁸°f us °⁸°n the darkn'd m°⁸°°⁸°n slept." },
        activity: { speaker: 'Aonara Kruxit', text: "Active th°⁸°ugh this m°⁸°°⁸°n is, we were m°⁸°derately passive." },
        center:   { speaker: 'Nunki Aerwynn', text: "bzzz... alwayzzz sm sorta symmetry... mashup me and jacey and u have smth representin us ⍩" },
        rep:      { speaker: 'Imoita Kruxit', text: "Whateʌer Jace sa⚵d." },
      },
    },
  },

  /* =====================================================================
     HSOD — Homestuck Official Discord session (2026 edition). Members
     carry inline classpect / color / symbol / name so no characters.json
     lookup is needed. `symbol` URLs point to the HSOD_icons folder on
     filegarden and are served with permissive CORS.

     The hyphenated / un-hyphenated A3-67-… aliases are the actual code
     printed on the homestuck.com secrets page; the plain HSOD / HSOD2026
     / 2026HSOD spellings are for people who don't have that code.

     The corresponding dive (Doom glyph in Sburb-green #4ce24e) is
     wired in scry.html's SPECIAL_DIVE.
     ===================================================================== */
  'hsod': {
    id:          'hsod',
    displayName: 'HSOD',
    aliases:     [
      'HSOD',
      'HSOD2026',
      '2026HSOD',
      'A3-67-CH-1K-FQ-22-94-R1-B8-JK-3G-XW',
      'A367CH1KFQ2294R1B8JK3GXW',
    ],
    code:        "1121501511721B22212212212222222222222412522602602612622712712722722902912912922922922922922922A22A22A22B12B22B22C13123223223323413423423503513623623713713723723723723723923923A13A13A23A23B03B24124414424424714724814814824914924924B24B24B25105105115115115115125125215225225315315315325325405425425425515615615625625725725815815825915915915925925925925A25B15C15C15C15C15C15C15C25C25C25C26126126126216226226226226316316326416426426426516526526526526626716716716726726826826826826916926926926B06B16B16B26B26B26B26C16C16C16C16C26C26C27227227317417607617627627627717717807817817817827907917917917927A17A17C17C28118118128218218218218228418418418428528618728818818918918918918A28B08C18C18C18C29119129129319319319319429519519529629719729729729729819919919929929A19A19A29B19B29C19C19C29C2A21A22A22A22A31A31A32A40A41A42A42A81A91A91A91A91A92AC1AC1AC1AC2B11B11B11B12B12B21B21B21B21B21B22B32B41B42B42B51B61B62B72B80B91B92B92B92B92BA2BC0BC1BC1BC1BC2BC2BC2C22C22C22C32C40C41C42C51C52C62C72C81C90C92C92C92C92CA2CB1CB1CB1CB1CB2CB2CB2CC1CC1D11D11D11D12D12D12D22D22D22D31D31D32D51D52D52D62D70D71D71D72D72D91D91D92D92D92D92DA0DB0DB1DB2DB2DC0DC1DC1DC1DC2DC2E71E71E91EA1EC0EC2",
    description: 'The Homestuck Official Discord. A real session, somehow.',
    flavor:      null,

    theme: { bg: null, accent: null, border: null, fontTitle: null },

    members: [
      { characterKey: "Crispie", name: "Crispie", classpect: ["Bard", "Breath"], moon: "Derse", color: "#EF560C", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Crispie.png" },
      { characterKey: "cesiumCalamity", name: "cesiumCalamity", classpect: ["Mage", "Time"], moon: "Prospit", color: "#1B7539", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cesiumCalamity.png" },
      { characterKey: "Jeffbug", name: "Jeffbug", classpect: ["Mage", "Life"], moon: "Prospit", color: "#D42000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Jeffbug.png" },
      { characterKey: "Cylonspy", name: "Cylonspy", classpect: ["Heir", "Hope"], moon: "Derse", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Cylonspy.gif" },
      { characterKey: "abysmalHazard", name: "abysmalHazard", classpect: ["Bard", "Void"], moon: "Prospit", color: "#000067", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_abysmalHazard.jpg" },
      { characterKey: "arsenicCatnip1", name: "arsenicCatnip1", classpect: ["Rogue", "Heart"], moon: "Derse", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_arsenicCatnip1.webp" },
      { characterKey: "expositoryRaven", name: "expositoryRaven", classpect: ["Bard", "Void"], moon: "Prospit", color: "#52dea6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_expositoryRaven.jpg" },
      { characterKey: "godofRedo", name: "godofRedo", classpect: ["Heir", "Time"], moon: "Prospit", color: "#001617", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_godofRedo.png" },
      { characterKey: "computerizedCarcinogen", name: "computerizedCarcinogen", classpect: ["Prince", "Heart"], moon: "Derse", color: "#e00707", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_computerizedCarcinogen.png" },
      { characterKey: "UnknownUbiquitous", name: "UnknownUbiquitous", classpect: ["Muse", "Doom"], moon: "Prospit", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_UnknownUbiquitous.png" },
      { characterKey: "dubblePhantasy", name: "dubblePhantasy", classpect: ["Knight", "Hope"], moon: "Prospit", color: "#10BEC7", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_dubblePhantasy.jpg" },
      { characterKey: "funpocalyptic", name: "funpocalyptic", classpect: ["Seer", "Life"], moon: "Prospit", color: "#448952", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_funpocalyptic.png" },
      { characterKey: "waywardSpade", name: "waywardSpade", classpect: ["Knight", "Breath"], moon: "Prospit", color: "#005fff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_waywardSpade.png" },
      { characterKey: "lycorisOnline", name: "lycorisOnline", classpect: ["Witch", "Time"], moon: "Derse", color: "#418E77" },
      { characterKey: "tinyWeevil", name: "tinyWeevil", classpect: ["Page", "Space"], moon: "Prospit", color: "#adcd48" },
      { characterKey: "industrialToaster", name: "industrialToaster", classpect: ["Seer", "Time"], moon: "Derse", color: "#D5203F" },
      { characterKey: "emmie", name: "emmie", classpect: ["Rogue", "Hope"], moon: "Derse", color: "#005682" },
      { characterKey: "artilleryAngel", name: "artilleryAngel", classpect: ["Witch", "Heart"], moon: "Derse", color: "#FF776E", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_artilleryAngel.png" },
      { characterKey: "mirc3a22000", name: "mirc3a22000", classpect: ["Heir", "Space"], moon: "Prospit", color: "#429bf5" },
      { characterKey: "anteGravitas", name: "anteGravitas", classpect: ["Maid", "Light"], moon: "Prospit", color: "#005FFE", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_anteGravitas.png" },
      { characterKey: "ghoulishTheorizer", name: "ghoulishTheorizer", classpect: ["Heir", "Space"], moon: "Prospit", color: "#08ff00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ghoulishTheorizer.png" },
      { characterKey: "unlicensedPhysician", name: "unlicensedPhysician", classpect: ["Knight", "Blood"], moon: "Derse", color: "#843aca", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_unlicensedPhysician.png" },
      { characterKey: "drowBard", name: "drowBard", classpect: ["Heir", "Hope"], moon: "Prospit", color: "#00826C" },
      { characterKey: "chromaticTelemid", name: "chromaticTelemid", classpect: ["Heir", "Breath"], moon: "Derse", color: "#004183", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_chromaticTelemid.png" },
      { characterKey: "augustusArgento", name: "augustusArgento", classpect: ["Witch", "Heart"], moon: "Derse", color: "#c95a2a" },
      { characterKey: "Sasquatch", name: "Sasquatch", classpect: ["Prince", "Rage"], moon: "Derse", color: "#000000" },
      { characterKey: "Larkiedoo", name: "Larkiedoo", classpect: ["Page", "Heart"], moon: "Prospit", color: "#bd1864", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Larkiedoo.png" },
      { characterKey: "gallantChampion", name: "gallantChampion", classpect: ["Rogue", "Light"], moon: "Prospit", color: "#ff1100", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gallantChampion.jpg" },
      { characterKey: "bunnyHop", name: "bunnyHop", classpect: ["Seer", "Life"], moon: "Prospit", color: "#a10000" },
      { characterKey: "hexTerminator", name: "hexTerminator", classpect: ["Prince", "Mind"], moon: "Derse", color: "#243685" },
      { characterKey: "KATAMARI", name: "KATAMARI", classpect: ["Rogue", "Light"], moon: "Prospit", color: "#2628c7", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_KATAMARI.png" },
      { characterKey: "NevJev", name: "NevJev", classpect: ["Prince", "Time"], moon: "Derse", color: "#d00009" },
      { characterKey: "Krispmaz", name: "Krispmaz", classpect: ["Knight", "Hope"], moon: "Prospit", color: "#7e42f5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Krispmaz.jpg" },
      { characterKey: "Nyubitez", name: "Nyubitez", classpect: ["Heir", "Heart"], moon: "Derse", color: "#f44c51", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Nyubitez.png" },
      { characterKey: "alternativeAnalyst", name: "alternativeAnalyst", classpect: ["Rogue", "Mind"], moon: "Derse", color: "#98FF98" },
      { characterKey: "aimlessIdentity", name: "aimlessIdentity", classpect: ["Bard", "Heart"], moon: "Derse", color: "#E00D51" },
      { characterKey: "sparklyAlex1O1", name: "sparklyAlex1O1", classpect: ["Bard", "Breath"], moon: "Prospit", color: "#4A1985", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_sparklyAlex1O1.png" },
      { characterKey: "crazyLexi9", name: "crazyLexi9", classpect: ["Mage", "Time"], moon: "Prospit", color: "#00FF00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_crazyLexi9.jpg" },
      { characterKey: "telescopicGazer", name: "telescopicGazer", classpect: ["Prince", "Mind"], moon: "Prospit", color: "#ff00ff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_telescopicGazer.jpg" },
      { characterKey: "A_PersomName", name: "A_PersomName", classpect: ["Knight", "Mind"], moon: "Derse", color: "#06402B" },
      { characterKey: "arsenicCatnip2", name: "arsenicCatnip2", classpect: ["Rogue", "Heart"], moon: "Derse", color: "#416600" },
      { characterKey: "emberSynth", name: "emberSynth", classpect: ["Rogue", "Life"], moon: "Derse", color: "#008141", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_emberSynth.png" },
      { characterKey: "Fazzie", name: "Fazzie", classpect: ["Witch", "Mind"], moon: "Prospit", color: "#e4007c", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Fazzie.png" },
      { characterKey: "[HELLTIER] mo", name: "[HELLTIER] mo", classpect: ["Seer", "Hope"], moon: "Prospit", color: "#2B0057", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_HELLTIERmo.webp" },
      { characterKey: "glacialArcanist", name: "glacialArcanist", classpect: ["Witch", "Heart"], moon: "Derse", color: "#791a79" },
      { characterKey: "charismaticChronicler", name: "charismaticChronicler", classpect: ["Mage", "Mind"], moon: "Derse", color: "#0099FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_charismaticChronicler.jpg" },
      { characterKey: "fiibtor", name: "fiibtor", classpect: ["Bard", "Void"], moon: "Derse", color: "#416600" },
      { characterKey: "migel", name: "migel", classpect: ["Rogue", "Space"], moon: "Derse", color: "#57ff57", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_migel.png" },
      { characterKey: "grossAntler", name: "grossAntler", classpect: ["Rogue", "Space"], moon: "Prospit", color: "#82DDAA", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_grossAntler.png" },
      { characterKey: "secretDiamond", name: "secretDiamond", classpect: ["Page", "Life"], moon: "Prospit", color: "#12cdfc", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_secretDiamond.jpg" },
      { characterKey: "BB", name: "BB", classpect: ["Bard", "Mind"], moon: "Dual", color: "#ffee00" },
      { characterKey: "freeampersand", name: "freeampersand", classpect: ["Prince", "Doom"], moon: "Prospit", color: "#E76400", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_freeampersand.png" },
      { characterKey: "valerianMancer", name: "valerianMancer", classpect: ["Maid", "Heart"], moon: "Prospit", color: "#69FFC1" },
      { characterKey: "machineLearner", name: "machineLearner", classpect: ["Bard", "Light"], moon: "Derse", color: "#00d600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_machineLearner.jpg" },
      { characterKey: "VoidThe_Unknown", name: "VoidThe_Unknown", classpect: ["Seer", "Doom"], moon: "Derse", color: "#5600ff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_VoidThe_Unknown.png" },
      { characterKey: "eidolonQueen", name: "eidolonQueen", classpect: ["Seer", "Space"], moon: "Prospit", color: "#F8A0C9", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_eidolonQueen.png" },
      { characterKey: "Cristal Boii", name: "Cristal Boii", classpect: ["Knight", "Space"], moon: "Prospit", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_CristalBoii.png" },
      { characterKey: "groundedAstronaut", name: "groundedAstronaut", classpect: ["Heir", "Space"], moon: "Derse", color: "#45B300", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_groundedAstronaut.png" },
      { characterKey: "supportiveCard", name: "supportiveCard", classpect: ["Knight", "Hope"], moon: "Prospit", color: "#FFAE24" },
      { characterKey: "incineratedEpoch", name: "incineratedEpoch", classpect: ["Knight", "Time"], moon: "Derse", color: "#DE000F", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_incineratedEpoch.png" },
      { characterKey: "Snail-Behavior", name: "Snail-Behavior", classpect: ["Mage", "Life"], moon: "Derse", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Snail-Behavior.png" },
      { characterKey: "shocknerth", name: "shocknerth", classpect: ["Knight", "Heart"], moon: "Prospit", color: "#ff9696", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_shocknerth.png" },
      { characterKey: "snakeyBoi", name: "snakeyBoi", classpect: ["Mage", "Time"], moon: "Derse", color: "#005682", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_snakeyBoi.jpg" },
      { characterKey: "canineVerdict", name: "canineVerdict", classpect: ["Knight", "Blood"], moon: "Prospit", color: "#611a1a" },
      { characterKey: "complimentaryAppropriations", name: "complimentaryAppropriations", classpect: ["Sylph", "Blood"], moon: "Prospit", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_complimentaryAppropriations.png" },
      { characterKey: "Loscusher", name: "Loscusher", classpect: ["Thief", "Mind"], moon: "Prospit", color: "#3EC7A4", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Loscusher.png" },
      { characterKey: "Jay Trademark", name: "Jay Trademark", classpect: ["Knight", "Rage"], moon: "Derse", color: "#003050" },
      { characterKey: "akitostuck", name: "akitostuck", classpect: ["Page", "Light"], moon: "Derse", color: "#ff00b7", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_akitostuck.jpg" },
      { characterKey: "Harkonnen", name: "Harkonnen", classpect: ["Bard", "Space"], moon: "Prospit", color: "#2C2A57", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Harkonnen.jpg" },
      { characterKey: "somethingMegami", name: "somethingMegami", classpect: ["Heir", "Heart"], moon: "Prospit", color: "#678900", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_somethingMegami.jpg" },
      { characterKey: "amazingCure", name: "amazingCure", classpect: ["Sylph", "Time"], moon: "Prospit", color: "#A1FFEF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_amazingCure.png" },
      { characterKey: "multyAlternative", name: "multyAlternative", classpect: ["Prince", "Void"], moon: "Dual", color: "#C82909", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_multyAlternative.jpg" },
      { characterKey: "gigglingGummybear", name: "gigglingGummybear", classpect: ["Sylph", "Rage"], moon: "Prospit", color: "#4ac925" },
      { characterKey: "miin_jeung", name: "miin_jeung", classpect: ["Maid", "Light"], moon: "Derse", color: "#851F0B", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_miin_jeung.png" },
      { characterKey: "grimalkinAspirant", name: "grimalkinAspirant", classpect: ["Sylph", "Heart"], moon: "Derse", color: "#99004d", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_grimalkinAspirant.png" },
      { characterKey: "mysteriousPlatypus", name: "mysteriousPlatypus", classpect: ["Maid", "Heart"], moon: "Prospit", color: "#000042" },
      { characterKey: "ThespiAnarchist", name: "ThespiAnarchist", classpect: ["Witch", "Rage"], moon: "Dual", color: "#AD10DE", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ThespiAnarchist.jpg" },
      { characterKey: "garagedCaburetor", name: "garagedCaburetor", classpect: ["Heir", "Void"], moon: "Derse", color: "#189BCC", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_garagedCaburetor.jpg" },
      { characterKey: "rivaeraMusic", name: "rivaeraMusic", classpect: ["Knight", "Space"], moon: "Prospit", color: "#591b53", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_rivaeraMusic.png" },
      { characterKey: "cholericGall", name: "cholericGall", classpect: ["Heir", "Void"], moon: "Prospit", color: "#0023F5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cholericGall.jpg" },
      { characterKey: "galacticCaster", name: "galacticCaster", classpect: ["Rogue", "Light"], moon: "Derse", color: "#820DDB", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_galacticCaster.jpg" },
      { characterKey: "Yakko", name: "Yakko", classpect: ["Seer", "Breath"], moon: "Derse", color: "#A47DAB", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Yakko.jpg" },
      { characterKey: "smileshark", name: "smileshark", classpect: ["Mage", "Space"], moon: "Prospit", color: "#004182", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_smileshark.png" },
      { characterKey: "whetherNet", name: "whetherNet", classpect: ["Mage", "Blood"], moon: "Derse", color: "#386648" },
      { characterKey: "yeouuugh", name: "yeouuugh", classpect: ["Maid", "Space"], moon: "Derse", color: "#fb2943", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_yeouuugh.webp" },
      { characterKey: "captchaFace", name: "captchaFace", classpect: ["Heir", "Hope"], moon: "Derse", color: "#fe99b3", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_captchaFace.png" },
      { characterKey: "philoManiac", name: "philoManiac", classpect: ["Bard", "Time"], moon: "Derse", color: "#B00087" },
      { characterKey: "gangueCentipede", name: "gangueCentipede", classpect: ["Heir", "Void"], moon: "Dual", color: "#004182" },
      { characterKey: "mawsMonster", name: "mawsMonster", classpect: ["Prince", "Life"], moon: "Derse", color: "#966fd6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_mawsMonster.jpg" },
      { characterKey: "twilightAdvocate", name: "twilightAdvocate", classpect: ["Lord", "Hope"], moon: "Derse", color: "#00674F", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_twilightAdvocate.png" },
      { characterKey: "atlasCandlelight", name: "atlasCandlelight", classpect: ["Heir", "Hope"], moon: "Prospit", color: "#FFDE5C" },
      { characterKey: "Lanmei", name: "Lanmei", classpect: ["Thief", "Heart"], moon: "Prospit", color: "#A10000" },
      { characterKey: "auroraBoros", name: "auroraBoros", classpect: ["Knight", "Hope"], moon: "Prospit", color: "#ffff01" },
      { characterKey: "tenaciousApis", name: "tenaciousApis", classpect: ["Mage", "Life"], moon: "Prospit", color: "#bad8eb", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_tenaciousApis.png" },
      { characterKey: "nerfClawcranes", name: "nerfClawcranes", classpect: ["Rogue", "Blood"], moon: "Dual", color: "#912dff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_nerfClawcranes.png" },
      { characterKey: "ShawnSmith1966", name: "ShawnSmith1966", classpect: ["Sylph", "Heart"], moon: "Dual", color: "#2c47e6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ShawnSmith1966.jpg" },
      { characterKey: "cinnamonBubble", name: "cinnamonBubble", classpect: ["Sylph", "Life"], moon: "Prospit", color: "#ff8682", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cinnamonBubble.png" },
      { characterKey: "elomac", name: "elomac", classpect: ["Seer", "Hope"], moon: "Derse", color: "#5e4d43" },
      { characterKey: "notZombie", name: "notZombie", classpect: ["Mage", "Light"], moon: "Prospit", color: "#70f7ab", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_notZombie.png" },
      { characterKey: "xanthicXerocole", name: "xanthicXerocole", classpect: ["Sylph", "Blood"], moon: "Derse", color: "#DFFF00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_xanthicXerocole.png" },
      { characterKey: "frivolousMarksman", name: "frivolousMarksman", classpect: ["Seer", "Hope"], moon: "Derse", color: "#820458" },
      { characterKey: "egghorse", name: "egghorse", classpect: ["Muse", "Time"], moon: "Prospit", color: "#8E44AD" },
      { characterKey: "Potatied", name: "Potatied", classpect: ["Heir", "Heart"], moon: "Derse", color: "#B48CFF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Potatied.jpg" },
      { characterKey: "UNDYINGUMBRAGE", name: "UNDYINGUMBRAGE", classpect: ["Lord", "Time"], moon: "Derse", color: "#2ED73A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_UNDYINGUMBRAGE.webp" },
      { characterKey: "rottenRoots", name: "rottenRoots", classpect: ["Seer", "Blood"], moon: "Prospit", color: "#b2ffff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_rottenRoots.png" },
      { characterKey: "Reyla", name: "Reyla", classpect: ["Maid", "Mind"], moon: "Prospit", color: "#a10000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Reyla.png" },
      { characterKey: "siddharthasDungeon", name: "siddharthasDungeon", classpect: ["Rogue", "Mind"], moon: "Derse", color: "#e1c0eb", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_siddharthasDungeon.png" },
      { characterKey: "galacticGeneticist", name: "galacticGeneticist", classpect: ["Maid", "Space"], moon: "Prospit", color: "#9175c0", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_galacticGeneticist.png" },
      { characterKey: "temperedGravity", name: "temperedGravity", classpect: ["Knight", "Hope"], moon: "Derse", color: "#EF5123", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_temperedGravity.png" },
      { characterKey: "callousTroubadour", name: "callousTroubadour", classpect: ["Bard", "Heart"], moon: "Derse", color: "#FD9CD6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_callousTroubadour.png" },
      { characterKey: "punctualTestimony", name: "punctualTestimony", classpect: ["Mage", "Time"], moon: "Derse", color: "#008282" },
      { characterKey: "authenticatedAnchorite", name: "authenticatedAnchorite", classpect: ["Maid", "Time"], moon: "Derse", color: "#FF2400" },
      { characterKey: "bicpenco", name: "bicpenco", classpect: ["Maid", "Heart"], moon: "Prospit", color: "#C9D9F1", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_bicpenco.jpg" },
      { characterKey: "GallieGalio", name: "GallieGalio", classpect: ["Witch", "Rage"], moon: "Dual", color: "#CC214A" },
      { characterKey: "Dove_Striker", name: "Dove_Striker", classpect: ["Rogue", "Doom"], moon: "Derse", color: "#A10000" },
      { characterKey: "hungriestGenius", name: "hungriestGenius", classpect: ["Maid", "Rage"], moon: "Prospit", color: "#e34234", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_hungriestGenius.jpg" },
      { characterKey: "freakedDiscord", name: "freakedDiscord", classpect: ["Rogue", "Space"], moon: "Prospit", color: "#004d9b", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_freakedDiscord.png" },
      { characterKey: "gracedCarminic", name: "gracedCarminic", classpect: ["Knight", "Rage"], moon: "Prospit", color: "#ff4500", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gracedCarminic.png" },
      { characterKey: "BI-25", name: "BI-25", classpect: ["Page", "Blood"], moon: "Prospit", color: "#1E65F4", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_BI-25.jpg" },
      { characterKey: "gaolsCaptive", name: "gaolsCaptive", classpect: ["Mage", "Breath"], moon: "Derse", color: "#b00b69", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gaolsCaptive.png" },
      { characterKey: "kirumarythechair", name: "kirumarythechair", classpect: ["Seer", "Heart"], moon: "Derse", color: "#749393", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_kirumarythechair.jpg" },
      { characterKey: "kmura", name: "kmura", classpect: ["Mage", "Void"], moon: "Prospit", color: "#ff2179", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_kmura.png" },
      { characterKey: "bubblepopElectric", name: "bubblepopElectric", classpect: ["Witch", "Light"], moon: "Prospit", color: "#D4AF37", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_bubblepopElectric.png" },
      { characterKey: "Henri", name: "Henri", classpect: ["Mage", "Heart"], moon: "Derse", color: "#8382ba", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Henri.jpg" },
      { characterKey: "sinnerSevenfold", name: "sinnerSevenfold", classpect: ["Prince", "Time"], moon: "Derse", color: "#7851A9" },
      { characterKey: "riiTry", name: "riiTry", classpect: ["Mage", "Void"], moon: "Derse", color: "#b536da", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_riiTry.png" },
      { characterKey: "nebulousTalent", name: "nebulousTalent", classpect: ["Maid", "Heart"], moon: "Prospit", color: "#7F593F", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_nebulousTalent.png" },
      { characterKey: "umbralEvolution", name: "umbralEvolution", classpect: ["Seer", "Void"], moon: "Prospit", color: "#FF2400", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_umbralEvolution.png" },
      { characterKey: "oblitusCasa", name: "oblitusCasa", classpect: ["Knight", "Doom"], moon: "Derse", color: "#8B0000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_oblitusCasa.jpg" },
      { characterKey: "colorfulDaydream", name: "colorfulDaydream", classpect: ["Rogue", "Breath"], moon: "Prospit", color: "#D8EBF2" },
      { characterKey: "frostedScrewball", name: "frostedScrewball", classpect: ["Mage", "Space"], moon: "Derse", color: "#008282", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_frostedScrewball.png" },
      { characterKey: "featherlessImp", name: "featherlessImp", classpect: ["Page", "Heart"], moon: "Prospit", color: "#0033FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_featherlessImp.png" },
      { characterKey: "gimmeChips", name: "gimmeChips", classpect: ["Mage", "Breath"], moon: "Derse", color: "#82b4f5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gimmeChips.jpg" },
      { characterKey: "Tolerantcell", name: "Tolerantcell", classpect: ["Witch", "Doom"], moon: "Derse", color: "#27B074" },
      { characterKey: "squashedBugg", name: "squashedBugg", classpect: ["Sylph", "Blood"], moon: "Dual", color: "#028717", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_squashedBugg.png" },
      { characterKey: "tyrannicalAscent", name: "tyrannicalAscent", classpect: ["Page", "Mind"], moon: "Dual", color: "#008080", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_tyrannicalAscent.png" },
      { characterKey: "severedObjection", name: "severedObjection", classpect: ["Mage", "Heart"], moon: "Prospit", color: "#D6046D" },
      { characterKey: "mechaDokk", name: "mechaDokk", classpect: ["Page", "Light"], moon: "Derse", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_mechaDokk.png" },
      { characterKey: "aesirTrifecta", name: "aesirTrifecta", classpect: ["Sylph", "Rage"], moon: "Derse", color: "#8600FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_aesirTrifecta.png" },
      { characterKey: "gloomyBryophyta", name: "gloomyBryophyta", classpect: ["Maid", "Space"], moon: "Prospit", color: "#008141" },
      { characterKey: "galsAnatomy", name: "galsAnatomy", classpect: ["Maid", "Hope"], moon: "Derse", color: "#B00B69", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_galsAnatomy.png" },
      { characterKey: "WagerWithTheBoss", name: "WagerWithTheBoss", classpect: ["Mage", "Light"], moon: "Derse", color: "#00ffff" },
      { characterKey: "Meowri", name: "Meowri", classpect: ["Mage", "Void"], moon: "Prospit", color: "#a60a60", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Meowri.png" },
      { characterKey: "anthillArchivist", name: "anthillArchivist", classpect: ["Seer", "Space"], moon: "Derse", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_anthillArchivist.png" },
      { characterKey: "lycanthropyEntropy", name: "lycanthropyEntropy", classpect: ["Prince", "Void"], moon: "Derse", color: "#152C62" },
      { characterKey: "televisionKiller", name: "televisionKiller", classpect: ["Rogue", "Hope"], moon: "Prospit", color: "#A5E27F" },
      { characterKey: "theGradus", name: "theGradus", classpect: ["Rogue", "Hope"], moon: "Prospit", color: "#EB94E5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_theGradus.png" },
      { characterKey: "telltaleLullaby", name: "telltaleLullaby", classpect: ["Page", "Mind"], moon: "Derse", color: "#6D8196" },
      { characterKey: "trinititeTheorist", name: "trinititeTheorist", classpect: ["Witch", "Light"], moon: "Derse", color: "#6200FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_trinititeTheorist.jpg" },
      { characterKey: "Pagliacci", name: "Pagliacci", classpect: ["Bard", "Doom"], moon: "Derse", color: "#6a0000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Pagliacci.jpg" },
      { characterKey: "ardentEscalator", name: "ardentEscalator", classpect: ["Rogue", "Hope"], moon: "Derse", color: "#ffd700", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ardentEscalator.jpg" },
      { characterKey: "michael.wav", name: "michael.wav", classpect: ["Knight", "Heart"], moon: "Prospit", color: "#eab955", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_michaelwav.jpg" },
      { characterKey: "cattyCatharsis", name: "cattyCatharsis", classpect: ["Heir", "Breath"], moon: "Prospit", color: "#00C6F0", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cattyCatharsis.png" },
      { characterKey: "PYRAKUNEM", name: "PYRAKUNEM", classpect: ["Sylph", "Heart"], moon: "Prospit", color: "#004182", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_PYRAKUNEM.png" },
      { characterKey: "Lux", name: "Lux", classpect: ["Thief", "Heart"], moon: "Derse", color: "#A10000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Lux.webp" },
      { characterKey: "Unmowo", name: "Unmowo", classpect: ["Witch", "Rage"], moon: "Prospit", color: "#777777", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Unmowo.png" },
      { characterKey: "...Syl?", name: "...Syl?", classpect: ["Prince", "Doom"], moon: "Derse", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Syl.webp" },
      { characterKey: "SolvedParadox", name: "SolvedParadox", classpect: ["Lord", "Breath"], moon: "Prospit", color: "#fc0032", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_SolvedParadox.png" },
      { characterKey: "Oaktree4est", name: "Oaktree4est", classpect: ["Heir", "Space"], moon: "Prospit", color: "#ace1af" },
      { characterKey: "cosmicHerb", name: "cosmicHerb", classpect: ["Knight", "Space"], moon: "Prospit", color: "#123456", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cosmicHerb.png" },
      { characterKey: "dialindenial", name: "dialindenial", classpect: ["Page", "Light"], moon: "Derse", color: "#1206bd" },
      { characterKey: "Mousey", name: "Mousey", classpect: ["Mage", "Mind"], moon: "Derse", color: "#00CCCC" },
      { characterKey: "cyberAstral", name: "cyberAstral", classpect: ["Maid", "Doom"], moon: "Derse", color: "#bd2581", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cyberAstral.png" },
      { characterKey: "Shigu", name: "Shigu", classpect: ["Mage", "Hope"], moon: "Derse", color: "#3c93bd" },
      { characterKey: "HSDex", name: "HSDex", classpect: ["Heir", "Heart"], moon: "Derse", color: "#205C2D", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_HSDex.png" },
      { characterKey: "timelessAnthelion", name: "timelessAnthelion", classpect: ["Prince", "Time"], moon: "Derse", color: "#018e71" },
      { characterKey: "carmineCoelacanth", name: "carmineCoelacanth", classpect: ["Bard", "Void"], moon: "Prospit", color: "#81CE45", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_carmineCoelacanth.jpg" },
      { characterKey: "elegantSpinstress", name: "elegantSpinstress", classpect: ["Seer", "Time"], moon: "Derse", color: "#254FFA", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_elegantSpinstress.png" },
      { characterKey: "twoheadedBoy", name: "twoheadedBoy", classpect: ["Knight", "Heart"], moon: "Derse", color: "#be2ed6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_twoheadedBoy.jpg" },
      { characterKey: "timelessAssembler", name: "timelessAssembler", classpect: ["Seer", "Time"], moon: "Prospit", color: "#CB4BA9", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_timelessAssembler.png" },
      { characterKey: "keskiviikko", name: "keskiviikko", classpect: ["Prince", "Hope"], moon: "Derse", color: "#590f2f", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_keskiviikko.png" },
      { characterKey: "colossalPhallics", name: "colossalPhallics", classpect: ["Knight", "Time"], moon: "Derse", color: "#000000" },
      { characterKey: "hipsterPanda", name: "hipsterPanda", classpect: ["Heir", "Time"], moon: "Prospit", color: "#cc6600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_hipsterPanda.jpg" },
      { characterKey: "localbeefcake", name: "localbeefcake", classpect: ["Witch", "Heart"], moon: "Prospit", color: "#801108", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_localbeefcake.png" },
      { characterKey: "GRUNTILDA", name: "GRUNTILDA", classpect: ["Witch", "Doom"], moon: "Derse", color: "#39803A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_GRUNTILDA.png" },
      { characterKey: "glassyTomfool", name: "glassyTomfool", classpect: ["Rogue", "Light"], moon: "Prospit", color: "#FF7CC4", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_glassyTomfool.jpg" },
      { characterKey: "arcaneBlacksmith", name: "arcaneBlacksmith", classpect: ["Knight", "Heart"], moon: "Prospit", color: "#AB0E0E", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_arcaneBlacksmith.jpg" },
      { characterKey: "celestialCaretaker", name: "celestialCaretaker", classpect: ["Prince", "Rage"], moon: "Derse", color: "#1EBC73", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_celestialCaretaker.png" },
      { characterKey: "cojumChutney", name: "cojumChutney", classpect: ["Thief", "Heart"], moon: "Derse", color: "#005682", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cojumChutney.jpg" },
      { characterKey: "Danimpish", name: "Danimpish", classpect: ["Knight", "Light"], moon: "Derse", color: "#FF0000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Danimpish.jpg" },
      { characterKey: "anomalousLabrat", name: "anomalousLabrat", classpect: ["Lord", "Breath"], moon: "Dual", color: "#00F32C", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_anomalousLabrat.jpg" },
      { characterKey: "practlXoconostle", name: "practlXoconostle", classpect: ["Thief", "Void"], moon: "Derse", color: "#34BEA7", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_practlXoconostle.png" },
      { characterKey: "paranoidArtisan", name: "paranoidArtisan", classpect: ["Seer", "Doom"], moon: "Prospit", color: "#53AD8E" },
      { characterKey: "grimPierrot", name: "grimPierrot", classpect: ["Bard", "Blood"], moon: "Prospit", color: "#6a006a" },
      { characterKey: "lonelyClone", name: "lonelyClone", classpect: ["Mage", "Light"], moon: "Derse", color: "#53a3ff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_lonelyClone.jpg" },
      { characterKey: "aeolianArchivist", name: "aeolianArchivist", classpect: ["Sylph", "Light"], moon: "Derse", color: "#640000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_aeolianArchivist.png" },
      { characterKey: "wired", name: "wired", classpect: ["Witch", "Void"], moon: "Derse", color: "#A10000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_wired.png" },
      { characterKey: "moriorKitten", name: "moriorKitten", classpect: ["Prince", "Mind"], moon: "Derse", color: "#B3DE6A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_moriorKitten.png" },
      { characterKey: "DemonClo", name: "DemonClo", classpect: ["Sylph", "Space"], moon: "Prospit", color: "#e82a70" },
      { characterKey: "catlikeTangent", name: "catlikeTangent", classpect: ["Knight", "Space"], moon: "Derse", color: "#36ea20", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_catlikeTangent.png" },
      { characterKey: "No1129", name: "No1129", classpect: ["Sylph", "Rage"], moon: "Dual", color: "#19E69E", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_No1129.jpg" },
      { characterKey: "knightlyEccentric", name: "knightlyEccentric", classpect: ["Knight", "Life"], moon: "Prospit", color: "#4bec13", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_knightlyEccentric.jpg" },
      { characterKey: "Mocha", name: "Mocha", classpect: ["Heir", "Life"], moon: "Derse", color: "#2ed73a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Mocha.png" },
      { characterKey: "crestFallen", name: "crestFallen", classpect: ["Prince", "Light"], moon: "Derse", color: "#4bc7cf", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_crestFallen.png" },
      { characterKey: "willow", name: "willow", classpect: ["Rogue", "Space"], moon: "Derse", color: "#8e5594" },
      { characterKey: "crescentCrasher", name: "crescentCrasher", classpect: ["Page", "Heart"], moon: "Prospit", color: "#703570" },
      { characterKey: "cozyCoagulate", name: "cozyCoagulate", classpect: ["Sylph", "Doom"], moon: "Prospit", color: "#D69176", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cozyCoagulate.png" },
      { characterKey: "grimGibbous", name: "grimGibbous", classpect: ["Seer", "Void"], moon: "Derse", color: "#04622E", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_grimGibbous.png" },
      { characterKey: "Tabby", name: "Tabby", classpect: ["Maid", "Mind"], moon: "Derse", color: "#7FFFD4", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Tabby.png" },
      { characterKey: "Kyle Raptor", name: "Kyle Raptor", classpect: ["Mage", "Hope"], moon: "Derse", color: "#6a006a" },
      { characterKey: "argyleArgonaut", name: "argyleArgonaut", classpect: ["Mage", "Light"], moon: "Derse", color: "#950000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_argyleArgonaut.png" },
      { characterKey: "duperNova", name: "duperNova", classpect: ["Mage", "Space"], moon: "Prospit", color: "#4E6F7661", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_duperNova.png" },
      { characterKey: "sharpestclaws", name: "sharpestclaws", classpect: ["Sylph", "Time"], moon: "Prospit", color: "#00AEFF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_sharpestclaws.jpg" },
      { characterKey: "typhoonRider", name: "typhoonRider", classpect: ["Sylph", "Light"], moon: "Derse", color: "#800000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_typhoonRider.jpg" },
      { characterKey: "epimetheusEmrys", name: "epimetheusEmrys", classpect: ["Muse", "Heart"], moon: "Prospit", color: "#2E4600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_epimetheusEmrys.jpg" },
      { characterKey: "anxiousTramp", name: "anxiousTramp", classpect: ["Bard", "Heart"], moon: "Derse", color: "#774774" },
      { characterKey: "radiantAmplifier", name: "radiantAmplifier", classpect: ["Rogue", "Time"], moon: "Derse", color: "#ff59a1" },
      { characterKey: "foxyAuthor", name: "foxyAuthor", classpect: ["Page", "Space"], moon: "Prospit", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_foxyAuthor.png" },
      { characterKey: "alkalinebuggy", name: "alkalinebuggy", classpect: ["Seer", "Heart"], moon: "Prospit", color: "#952233", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_alkalinebuggy.jpg" },
      { characterKey: "Mispelt", name: "Mispelt", classpect: ["Knight", "Light"], moon: "Derse", color: "#ED7117", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Mispelt.png" },
      { characterKey: "spidersQuandary", name: "spidersQuandary", classpect: ["Thief", "Mind"], moon: "Derse", color: "#005682" },
      { characterKey: "Hapelico", name: "Hapelico", classpect: ["Seer", "Life"], moon: "Prospit", color: "#95edad", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Hapelico.png" },
      { characterKey: "deviousScares", name: "deviousScares", classpect: ["Heir", "Life"], moon: "Prospit", color: "#f01da6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_deviousScares.png" },
      { characterKey: "eccentricClover", name: "eccentricClover", classpect: ["Bard", "Light"], moon: "Derse", color: "#008141", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_eccentricClover.png" },
      { characterKey: "thunderCube", name: "thunderCube", classpect: ["Knight", "Light"], moon: "Prospit", color: "#8c5ac8", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_thunderCube.webp" },
      { characterKey: "hizzt", name: "hizzt", classpect: ["Sylph", "Space"], moon: "Derse", color: "#525870" },
      { characterKey: "empatheticRecluse", name: "empatheticRecluse", classpect: ["Knight", "Rage"], moon: "Prospit", color: "#FF0000" },
      { characterKey: "capriciousGodhead", name: "capriciousGodhead", classpect: ["Thief", "Blood"], moon: "Prospit", color: "#e6d600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_capriciousGodhead.jpg" },
      { characterKey: "averageAnagram", name: "averageAnagram", classpect: ["Witch", "Heart"], moon: "Dual", color: "#319858", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_averageAnagram.png" },
      { characterKey: "Agonizingconundrum", name: "Agonizingconundrum", classpect: ["Rogue", "Rage"], moon: "Prospit", color: "#392A48" },
      { characterKey: "clayfire", name: "clayfire", classpect: ["Mage", "Space"], moon: "Derse", color: "#FF4B33" },
      { characterKey: "kugumimi", name: "kugumimi", classpect: ["Maid", "Mind"], moon: "Prospit", color: "#008141", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_kugumimi.png" },
      { characterKey: "CorpusCallosum", name: "CorpusCallosum", classpect: ["Witch", "Light"], moon: "Derse", color: "#676200", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_CorpusCallosum.png" },
      { characterKey: "mechanicalYomi", name: "mechanicalYomi", classpect: ["Prince", "Time"], moon: "Prospit", color: "#F5CC27", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_mechanicalYomi.png" },
      { characterKey: "coitalCardiopathy", name: "coitalCardiopathy", classpect: ["Heir", "Space"], moon: "Dual", color: "#a1a100" },
      { characterKey: "bucketFiller413", name: "bucketFiller413", classpect: ["Maid", "Light"], moon: "Prospit", color: "#ff7000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_bucketFiller413.png" },
      { characterKey: "VocalMocha", name: "VocalMocha", classpect: ["Sylph", "Blood"], moon: "Prospit", color: "#b70d0e", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_VocalMocha.jpg" },
      { characterKey: "alchemicAbstract", name: "alchemicAbstract", classpect: ["Mage", "Time"], moon: "Prospit", color: "#e81919" },
      { characterKey: "avoidantTheorist", name: "avoidantTheorist", classpect: ["Mage", "Void"], moon: "Derse", color: "#1DACD6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_avoidantTheorist.jpg" },
      { characterKey: "Rorin8or", name: "Rorin8or", classpect: ["Mage", "Heart"], moon: "Derse", color: "#EB1B45", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Rorin8or.jpg" },
      { characterKey: "analogCottagegore", name: "analogCottagegore", classpect: ["Heir", "Hope"], moon: "Prospit", color: "#67d0db" },
      { characterKey: "verdantRimefrost", name: "verdantRimefrost", classpect: ["Page", "Life"], moon: "Derse", color: "#88e4b6" },
      { characterKey: "SleepyMuse", name: "SleepyMuse", classpect: ["Muse", "Time"], moon: "Prospit", color: "#00796b", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_SleepyMuse.png" },
      { characterKey: "jacobButnot", name: "jacobButnot", classpect: ["Knight", "Space"], moon: "Derse", color: "#007474", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_jacobButnot.jpg" },
      { characterKey: "skitteringCritter", name: "skitteringCritter", classpect: ["Witch", "Void"], moon: "Prospit", color: "#D9381A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_skitteringCritter.webp" },
      { characterKey: "catnipKickflip", name: "catnipKickflip", classpect: ["Rogue", "Heart"], moon: "Prospit", color: "#4ac925" },
      { characterKey: "galacticCurio", name: "galacticCurio", classpect: ["Seer", "Breath"], moon: "Prospit", color: "#70aeff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_galacticCurio.png" },
      { characterKey: "OccultClownery", name: "OccultClownery", classpect: ["Seer", "Rage"], moon: "Derse", color: "#cd05e3", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_OccultClownery.png" },
      { characterKey: "ironicRayah", name: "ironicRayah", classpect: ["Mage", "Void"], moon: "Derse", color: "#E38A2B", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ironicRayah.jpg" },
      { characterKey: "ignobleComedian", name: "ignobleComedian", classpect: ["Seer", "Doom"], moon: "Prospit", color: "#5b0f00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_ignobleComedian.jpg" },
      { characterKey: "ungulateTriad", name: "ungulateTriad", classpect: ["Maid", "Blood"], moon: "Prospit", color: "#60db76" },
      { characterKey: "Chonkr", name: "Chonkr", classpect: ["Seer", "Time"], moon: "Derse", color: "#0062ff" },
      { characterKey: "glamorousGoddess", name: "glamorousGoddess", classpect: ["Witch", "Void"], moon: "Derse", color: "#b285fc", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_glamorousGoddess.png" },
      { characterKey: "unproblematic eridan", name: "unproblematic eridan", classpect: ["Heir", "Time"], moon: "Derse", color: "#6a006a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_unproblematiceridan.jpg" },
      { characterKey: "Samiel", name: "Samiel", classpect: ["Mage", "Light"], moon: "Derse", color: "#66ccff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Samiel.png" },
      { characterKey: "robertBakerman", name: "robertBakerman", classpect: ["Knight", "Void"], moon: "Prospit", color: "#79ACF8", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_robertBakerman.png" },
      { characterKey: "freezingApidae", name: "freezingApidae", classpect: ["Rogue", "Mind"], moon: "Prospit", color: "#e6e600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_freezingApidae.png" },
      { characterKey: "hopefulOptimist", name: "hopefulOptimist", classpect: ["Heir", "Light"], moon: "Derse", color: "#F2A400" },
      { characterKey: "crimsonCorundum", name: "crimsonCorundum", classpect: ["Sylph", "Mind"], moon: "Prospit", color: "#3e8de6" },
      { characterKey: "horizontalBastard", name: "horizontalBastard", classpect: ["Knight", "Hope"], moon: "Dual", color: "#4f00d1", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_horizontalBastard.jpg" },
      { characterKey: "gloomyKitty", name: "gloomyKitty", classpect: ["Witch", "Time"], moon: "Prospit", color: "#ea98ea", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gloomyKitty.jpg" },
      { characterKey: "starstruckNebulose", name: "starstruckNebulose", classpect: ["Witch", "Light"], moon: "Derse", color: "#27C8F5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_starstruckNebulose.jpg" },
      { characterKey: "sinistersabbath", name: "sinistersabbath", classpect: ["Knight", "Heart"], moon: "Derse", color: "#880808", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_sinistersabbath.png" },
      { characterKey: "gradientScrawl", name: "gradientScrawl", classpect: ["Mage", "Breath"], moon: "Prospit", color: "#9E5747", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gradientScrawl.webp" },
      { characterKey: "DuskyQuadraped", name: "DuskyQuadraped", classpect: ["Prince", "Doom"], moon: "Prospit", color: "#DE1DAD", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_DuskyQuadraped.gif" },
      { characterKey: "MiniMoose", name: "MiniMoose", classpect: ["Mage", "Space"], moon: "Derse", color: "#9d47e6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_MiniMoose.png" },
      { characterKey: "entropicLibrarian", name: "entropicLibrarian", classpect: ["Mage", "Breath"], moon: "Derse", color: "#522387", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_entropicLibrarian.jpg" },
      { characterKey: "animatedEntropy", name: "animatedEntropy", classpect: ["Rogue", "Heart"], moon: "Derse", color: "#C8A2C8", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_animatedEntropy.webp" },
      { characterKey: "cymbalic", name: "cymbalic", classpect: ["Mage", "Void"], moon: "Dual", color: "#7853e9", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cymbalic.png" },
      { characterKey: "50e44c", name: "50e44c", classpect: ["Heir", "Life"], moon: "Prospit", color: "#50E44C", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_50e44c.png" },
      { characterKey: "wetRadiologist", name: "wetRadiologist", classpect: ["Prince", "Heart"], moon: "Derse", color: "#63B7B7" },
      { characterKey: "felineFrivolity", name: "felineFrivolity", classpect: ["Seer", "Space"], moon: "Prospit", color: "#7230FF" },
      { characterKey: "grandGhoul", name: "grandGhoul", classpect: ["Page", "Space"], moon: "Derse", color: "#000000" },
      { characterKey: "lunaticSolivagant", name: "lunaticSolivagant", classpect: ["Prince", "Light"], moon: "Derse", color: "#c2fc03", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_lunaticSolivagant.png" },
      { characterKey: "cosmochoralAtoll", name: "cosmochoralAtoll", classpect: ["Maid", "Breath"], moon: "Derse", color: "#9A4A4A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cosmochoralAtoll.png" },
      { characterKey: "voidLight", name: "voidLight", classpect: ["Mage", "Mind"], moon: "Prospit", color: "#40E0D0", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_voidLight.jpg" },
      { characterKey: "autruiComposer", name: "autruiComposer", classpect: ["Knight", "Space"], moon: "Prospit", color: "#FF7518", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_autruiComposer.jpg" },
      { characterKey: "apatheticAngelical", name: "apatheticAngelical", classpect: ["Seer", "Time"], moon: "Derse", color: "#082bd6", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_apatheticAngelical.webp" },
      { characterKey: "digitalAnthomancy", name: "digitalAnthomancy", classpect: ["Knight", "Space"], moon: "Derse", color: "#FF7E00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_digitalAnthomancy.jpg" },
      { characterKey: "kittenKokomo", name: "kittenKokomo", classpect: ["Mage", "Rage"], moon: "Derse", color: "#FF0694", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_kittenKokomo.png" },
      { characterKey: "Dylia", name: "Dylia", classpect: ["Rogue", "Light"], moon: "Prospit", color: "#cf3636", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Dylia.jpg" },
      { characterKey: "anxiousAdvent", name: "anxiousAdvent", classpect: ["Knight", "Space"], moon: "Prospit", color: "#6200EA" },
      { characterKey: "definitelyRational", name: "definitelyRational", classpect: ["Page", "Mind"], moon: "Prospit", color: "#6863F8" },
      { characterKey: "SF", name: "SF", classpect: ["Prince", "Time"], moon: "Prospit", color: "#6a006a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_SF.png" },
      { characterKey: "Witchchick919", name: "Witchchick919", classpect: ["Thief", "Blood"], moon: "Derse", color: "#005682", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Witchchick919.png" },
      { characterKey: "darlingCerapter", name: "darlingCerapter", classpect: ["Prince", "Time"], moon: "Derse", color: "#004183" },
      { characterKey: "celestialNymph", name: "celestialNymph", classpect: ["Knight", "Space"], moon: "Derse", color: "#123524", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_celestialNymph.png" },
      { characterKey: "axiomaticMiser", name: "axiomaticMiser", classpect: ["Heir", "Heart"], moon: "Prospit", color: "#935935", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_axiomaticMiser.png" },
      { characterKey: "Nokotsu", name: "Nokotsu", classpect: ["Maid", "Blood"], moon: "Prospit", color: "#9499ff", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Nokotsu.jpg" },
      { characterKey: "GregTechnician", name: "GregTechnician", classpect: ["Rogue", "Space"], moon: "Prospit", color: "#0d69ac", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_GregTechnician.png" },
      { characterKey: "Telepxrt", name: "Telepxrt", classpect: ["Maid", "Space"], moon: "Prospit", color: "#590003" },
      { characterKey: "untimelyKismet", name: "untimelyKismet", classpect: ["Maid", "Hope"], moon: "Prospit", color: "#880085", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_untimelyKismet.jpg" },
      { characterKey: "xottontill", name: "xottontill", classpect: ["Sylph", "Doom"], moon: "Prospit", color: "#A47DAB" },
      { characterKey: "roboticBattleaxe", name: "roboticBattleaxe", classpect: ["Rogue", "Hope"], moon: "Prospit", color: "#FCDF03", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_roboticBattleaxe.png" },
      { characterKey: "necroNovelist", name: "necroNovelist", classpect: ["Lord", "Void"], moon: "Derse", color: "#043575" },
      { characterKey: "hareHarbinger", name: "hareHarbinger", classpect: ["Page", "Life"], moon: "Prospit", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_hareHarbinger.jpg" },
      { characterKey: "crownedKoto", name: "crownedKoto", classpect: ["Rogue", "Space"], moon: "Derse", color: "#CBACC7" },
      { characterKey: "tailslideTangents", name: "tailslideTangents", classpect: ["Knight", "Hope"], moon: "Dual", color: "#e1ff00", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_tailslideTangents.png" },
      { characterKey: "toxicBureau", name: "toxicBureau", classpect: ["Prince", "Time"], moon: "Derse", color: "#4A0B0E", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_toxicBureau.png" },
      { characterKey: "demiurgicBelletrist", name: "demiurgicBelletrist", classpect: ["Rogue", "Space"], moon: "Dual", color: "#eb213f", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_demiurgicBelletrist.png" },
      { characterKey: "Self-satirical Ri0t", name: "Self-satirical Ri0t", classpect: ["Thief", "Time"], moon: "Prospit", color: "#E75480", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Self-satiricalRi0t.jpg" },
      { characterKey: "inaneLambthing", name: "inaneLambthing", classpect: ["Heir", "Space"], moon: "Derse", color: "#070e5a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_inaneLambthing.webp" },
      { characterKey: "scourgeLepis", name: "scourgeLepis", classpect: ["Page", "Light"], moon: "Prospit", color: "#4800FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_scourgeLepis.jpg" },
      { characterKey: "convivialApsis", name: "convivialApsis", classpect: ["Witch", "Light"], moon: "Derse", color: "#ED9611" },
      { characterKey: "rexPararosaniline", name: "rexPararosaniline", classpect: ["Witch", "Heart"], moon: "Derse", color: "#FAA0A0" },
      { characterKey: "autisticHellhound", name: "autisticHellhound", classpect: ["Witch", "Heart"], moon: "Derse", color: "#6794c5", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_autisticHellhound.webp" },
      { characterKey: "angelicFeline", name: "angelicFeline", classpect: ["Witch", "Heart"], moon: "Derse", color: "#F2A400", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_angelicFeline.png" },
      { characterKey: "aubrgneGliath", name: "aubrgneGliath", classpect: ["Sylph", "Rage"], moon: "Derse", color: "#7E3AAF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_aubrgneGliath.png" },
      { characterKey: "gelatinousGreentea", name: "gelatinousGreentea", classpect: ["Witch", "Space"], moon: "Prospit", color: "#4ac925", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gelatinousGreentea.png" },
      { characterKey: "deepseaAnarchy", name: "deepseaAnarchy", classpect: ["Mage", "Heart"], moon: "Derse", color: "#FF00FC", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_deepseaAnarchy.png" },
      { characterKey: "Coral", name: "Coral", classpect: ["Bard", "Void"], moon: "Derse", color: "#FF7F50", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Coral.png" },
      { characterKey: "daciaLogan", name: "daciaLogan", classpect: ["Mage", "Hope"], moon: "Derse", color: "#413bfb", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_daciaLogan.webp" },
      { characterKey: "laminatedDenim", name: "laminatedDenim", classpect: ["Bard", "Light"], moon: "Derse", color: "#062C50", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_laminatedDenim.gif" },
      { characterKey: "morningCorpse", name: "morningCorpse", classpect: ["Page", "Heart"], moon: "Derse", color: "#416600", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_morningCorpse.jpg" },
      { characterKey: "wistfulCellist", name: "wistfulCellist", classpect: ["Muse", "Space"], moon: "Derse", color: "#890E57", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_wistfulCellist.png" },
      { characterKey: "LHuxlux", name: "LHuxlux", classpect: ["Seer", "Life"], moon: "Prospit", color: "#a1a100", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_LHuxlux.jpg" },
      { characterKey: "meanMina", name: "meanMina", classpect: ["Rogue", "Heart"], moon: "Derse", color: "#CB007D" },
      { characterKey: "johnkatbarf", name: "johnkatbarf", classpect: ["Thief", "Void"], moon: "Derse", color: "#999CC9", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_johnkatbarf.png" },
      { characterKey: "rabbitPoster", name: "rabbitPoster", classpect: ["Witch", "Heart"], moon: "Prospit", color: "#009500", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_rabbitPoster.png" },
      { characterKey: "cerebrumBrimstone", name: "cerebrumBrimstone", classpect: ["Knight", "Mind"], moon: "Derse", color: "#0021cb", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cerebrumBrimstone.png" },
      { characterKey: "chromaticAmbition", name: "chromaticAmbition", classpect: ["Witch", "Doom"], moon: "Derse", color: "#6a006a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_chromaticAmbition.jpg" },
      { characterKey: "misterVision", name: "misterVision", classpect: ["Thief", "Blood"], moon: "Prospit", color: "#8934AD", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_misterVision.png" },
      { characterKey: "kage kafka", name: "kage kafka", classpect: ["Mage", "Blood"], moon: "Derse", color: "#cb8bea" },
      { characterKey: "wl", name: "wl", classpect: ["Bard", "Mind"], moon: "Derse", color: "#000000" },
      { characterKey: "gillyGiggle", name: "gillyGiggle", classpect: ["Rogue", "Rage"], moon: "Derse", color: "#DFD7AC", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gillyGiggle.png" },
      { characterKey: "kittenSearch", name: "kittenSearch", classpect: ["Witch", "Time"], moon: "Derse", color: "#CA1B68", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_kittenSearch.png" },
      { characterKey: "cutupHearts", name: "cutupHearts", classpect: ["Maid", "Void"], moon: "Dual", color: "#C46BFE", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cutupHearts.png" },
      { characterKey: "chronokineticGeek", name: "chronokineticGeek", classpect: ["Knight", "Space"], moon: "Prospit", color: "#590aa3", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_chronokineticGeek.jpg" },
      { characterKey: "P.Mistaker", name: "P.Mistaker", classpect: ["Heir", "Void"], moon: "Derse", color: "#FF7200", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_PMistaker.jpg" },
      { characterKey: "apatheticAcedia", name: "apatheticAcedia", classpect: ["Heir", "Rage"], moon: "Derse", color: "#2596be" },
      { characterKey: "virgoTestified", name: "virgoTestified", classpect: ["Page", "Heart"], moon: "Prospit", color: "#4f2c96", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_virgoTestified.jpg" },
      { characterKey: "royalDivinity", name: "royalDivinity", classpect: ["Mage", "Blood"], moon: "Derse", color: "#880000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_royalDivinity.png" },
      { characterKey: "sensitiveLoser", name: "sensitiveLoser", classpect: ["Maid", "Light"], moon: "Prospit", color: "#42B6F5" },
      { characterKey: "reddWhite", name: "reddWhite", classpect: ["Mage", "Void"], moon: "Derse", color: "#000000" },
      { characterKey: "taciturnCarnival", name: "taciturnCarnival", classpect: ["Sylph", "Heart"], moon: "Prospit", color: "#0020FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_taciturnCarnival.png" },
      { characterKey: "gackyChill", name: "gackyChill", classpect: ["Knight", "Mind"], moon: "Dual", color: "#008282", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gackyChill.png" },
      { characterKey: "dandyDevil", name: "dandyDevil", classpect: ["Maid", "Hope"], moon: "Prospit", color: "#b30701", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_dandyDevil.jpg" },
      { characterKey: "Lenfeels", name: "Lenfeels", classpect: ["Witch", "Rage"], moon: "Derse", color: "#0022D2", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_Lenfeels.webp" },
      { characterKey: "patwasnotfound", name: "patwasnotfound", classpect: ["Sylph", "Rage"], moon: "Derse", color: "#F4DC0B" },
      { characterKey: "Stowaway", name: "Stowaway", classpect: ["Rogue", "Light"], moon: "Prospit", color: "#E861A8" },
      { characterKey: "Hirset", name: "Hirset", classpect: ["Prince", "Doom"], moon: "Derse", color: "#000000" },
      { characterKey: "HonkHonk", name: "HonkHonk", classpect: ["Bard", "Rage"], moon: "Derse", color: "#2B0057", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_HonkHonk.jpg" },
      { characterKey: "vitriolicMasquerade", name: "vitriolicMasquerade", classpect: ["Mage", "Breath"], moon: "Derse", color: "#f2bf07", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_vitriolicMasquerade.png" },
      { characterKey: "airborneCalamity", name: "airborneCalamity", classpect: ["Maid", "Mind"], moon: "Prospit", color: "#FFB92E" },
      { characterKey: "solitaryConverser", name: "solitaryConverser", classpect: ["Mage", "Mind"], moon: "Derse", color: "#aa77ee" },
      { characterKey: "samuraiDestroy", name: "samuraiDestroy", classpect: ["Knight", "Rage"], moon: "Derse", color: "#f00945" },
      { characterKey: "photoeshop", name: "photoeshop", classpect: ["Bard", "Void"], moon: "Prospit", color: "#000000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_photoeshop.jpg" },
      { characterKey: "jmoriboy", name: "jmoriboy", classpect: ["Prince", "Breath"], moon: "Dual", color: "#9D00FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_jmoriboy.png" },
      { characterKey: "macabreJester", name: "macabreJester", classpect: ["Knight", "Mind"], moon: "Derse", color: "#308957", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_macabreJester.jpg" },
      { characterKey: "p1nkch4n", name: "p1nkch4n", classpect: ["Maid", "Light"], moon: "Prospit", color: "#b70d0e", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_p1nkch4n.jpg" },
      { characterKey: "cellAuto", name: "cellAuto", classpect: ["Mage", "Space"], moon: "Prospit", color: "#6d6fbe" },
      { characterKey: "Karkat Vantas", name: "Karkat Vantas", classpect: ["Knight", "Blood"], moon: "Prospit", color: "#000000" },
      { characterKey: "wonderfulMitosis", name: "wonderfulMitosis", classpect: ["Knight", "Life"], moon: "Prospit", color: "#FF5C3F", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_wonderfulMitosis.png" },
      { characterKey: "cpw221", name: "cpw221", classpect: ["Mage", "Blood"], moon: "Derse", color: "#02dd09", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_cpw221.png" },
      { characterKey: "GadgetryTerminus", name: "GadgetryTerminus", classpect: ["Thief", "Mind"], moon: "Derse", color: "#33233d", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_GadgetryTerminus.png" },
      { characterKey: "saltyNonsense", name: "saltyNonsense", classpect: ["Knight", "Life"], moon: "Prospit", color: "#000ad1", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_saltyNonsense.png" },
      { characterKey: "galacticHubris", name: "galacticHubris", classpect: ["Thief", "Time"], moon: "Derse", color: "#341539", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_galacticHubris.jpg" },
      { characterKey: "totalCarcinization", name: "totalCarcinization", classpect: ["Knight", "Heart"], moon: "Derse", color: "#ff0000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_totalCarcinization.png" },
      { characterKey: "wanderinGoblin", name: "wanderinGoblin", classpect: ["Knight", "Heart"], moon: "Derse", color: "#aee5fb" },
      { characterKey: "uncouthGamblignat", name: "uncouthGamblignat", classpect: ["Knight", "Life"], moon: "Derse", color: "#E67F45" },
      { characterKey: "moderateTruth", name: "moderateTruth", classpect: ["Heir", "Heart"], moon: "Derse", color: "#008141" },
      { characterKey: "mysticMechanic", name: "mysticMechanic", classpect: ["Bard", "Space"], moon: "Prospit", color: "#670A0A" },
      { characterKey: "raraAviarius", name: "raraAviarius", classpect: ["Witch", "Light"], moon: "Prospit", color: "#F14637", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_raraAviarius.jpg" },
      { characterKey: "cubecrow", name: "cubecrow", classpect: ["Seer", "Mind"], moon: "Derse", color: "#008282" },
      { characterKey: "lizard", name: "lizard", classpect: ["Sylph", "Blood"], moon: "Prospit", color: "#77DD77", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_lizard.png" },
      { characterKey: "relentlessKnucklehead", name: "relentlessKnucklehead", classpect: ["Knight", "Hope"], moon: "Derse", color: "#750137" },
      { characterKey: "everymansEnigma", name: "everymansEnigma", classpect: ["Seer", "Breath"], moon: "Prospit", color: "#11D6B7", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_everymansEnigma.png" },
      { characterKey: "doltishDreamer", name: "doltishDreamer", classpect: ["Seer", "Heart"], moon: "Prospit", color: "#b687f1", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_doltishDreamer.jpg" },
      { characterKey: "tricksyGlofish", name: "tricksyGlofish", classpect: ["Witch", "Light"], moon: "Prospit", color: "#E61E60" },
      { characterKey: "esotericElysium", name: "esotericElysium", classpect: ["Heir", "Time"], moon: "Dual", color: "#a774ed", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_esotericElysium.png" },
      { characterKey: "totallyBeautwoful", name: "totallyBeautwoful", classpect: ["Heir", "Light"], moon: "Derse", color: "#FF0000", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_totallyBeautwoful.jpg" },
      { characterKey: "televisedChicanery", name: "televisedChicanery", classpect: ["Bard", "Mind"], moon: "Prospit", color: "#5151FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_televisedChicanery.png" },
      { characterKey: "zymoticGraphospasm", name: "zymoticGraphospasm", classpect: ["Thief", "Hope"], moon: "Derse", color: "#eb8934", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_zymoticGraphospasm.jpg" },
      { characterKey: "ambivalentAstronomer", name: "ambivalentAstronomer", classpect: ["Seer", "Space"], moon: "Derse", color: "#3e285c" },
      { characterKey: "fishGaming", name: "fishGaming", classpect: ["Heir", "Light"], moon: "Derse", color: "#097A65", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_fishGaming.webp" },
      { characterKey: "virulentGrief", name: "virulentGrief", classpect: ["Seer", "Heart"], moon: "Derse", color: "#6B527D" },
      { characterKey: "mutableTurntable", name: "mutableTurntable", classpect: ["Bard", "Heart"], moon: "Dual", color: "#008787" },
      { characterKey: "trustworthyCreature", name: "trustworthyCreature", classpect: ["Sylph", "Heart"], moon: "Prospit", color: "#6A006A", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_trustworthyCreature.png" },
      { characterKey: "_bizzare_", name: "_bizzare_", classpect: ["Prince", "Breath"], moon: "Prospit", color: "#81CE42" },
      { characterKey: "snubmoth", name: "snubmoth", classpect: ["Bard", "Life"], moon: "Derse", color: "#6a006a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_snubmoth.jpg" },
      /* Stragglers received after the initial roster freeze. */
      { characterKey: "twilightGalaxias", name: "twilightGalaxias", classpect: ["Mage", "Space"], moon: "Prospit", color: "#4ac925", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_twilightGalaxias.png" },
      { characterKey: "technicalTutelage", name: "technicalTutelage", classpect: ["Heir", "Hope"], moon: "Derse", color: "#1a7b05" },
      { characterKey: "graciousGlissando", name: "graciousGlissando", classpect: ["Witch", "Time"], moon: "Prospit", color: "#e00707", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_graciousGlissando.png" },
      { characterKey: "gaianGrail", name: "gaianGrail", classpect: ["Page", "Space"], moon: "Prospit", color: "#6f6fd2", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_gaianGrail.png" },
      { characterKey: "parviscientKinematics", name: "parviscientKinematics", classpect: ["Bard", "Void"], moon: "Derse", color: "#5d5d5d" },
      { characterKey: "comelyComedy", name: "comelyComedy", classpect: ["Thief", "Void"], moon: "Derse", color: "#000000" },
      { characterKey: "illusionalDreamer", name: "illusionalDreamer", classpect: ["Heir", "Time"], moon: "Derse", color: "#660019" },
      { characterKey: "avoidantConnection", name: "avoidantConnection", classpect: ["Heir", "Breath"], moon: "Derse", color: "#33a69a", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_avoidantConnection.png" },
      { characterKey: "arrangedResonance", name: "arrangedResonance", classpect: ["Knight", "Life"], moon: "Derse", color: "#409e98", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_arrangedResonance.png" },
      { characterKey: "eroticEsoterica", name: "eroticEsoterica", classpect: ["Witch", "Breath"], moon: "Derse", color: "#4D078C", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_eroticEsoterica.png" },
      { characterKey: "alienAegis", name: "alienAegis", classpect: ["Page", "Mind"], moon: "Derse", color: "#D4A026", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_alienAegis.avif" },
      { characterKey: "QuaintQuark", name: "QuaintQuark", classpect: ["Muse", "Space"], moon: "Dual", color: "#A777FF", symbol: "https://file.garden/ao90KhSOlmFOq0Ho/HSOD_icons/icon_QuaintQuark.png" },
      { characterKey: "theseusGalore", name: "theseusGalore", classpect: ["Bard", "Heart"], moon: "Derse", color: "#005682" },
      { characterKey: "fatalDamage", name: "fatalDamage", classpect: ["Heir", "Doom"], moon: "Dual", color: "#A1A100" },
    ],

    assets: { bannerArt: null, gridBackground: null, layerOrbOverride: null, needs: [] },

    quips: {
      /* All voiced by cesiumCalamity — the HSOD mod running the show —
         so quips render in that member's forest-green (#1B7539). Rung,
         closest-knit, leader, and lunar slots left null so the narrator
         voice handles them. */
      balance: {
        speaker: 'cesiumCalamity',
        orb:     'Moderately Passive',
        quip:    "This session does seem a little bit more passive than one might expect...",
      },
      avatar: {
        speaker: 'cesiumCalamity',
        orb:     'Nexus',
        quip:    "This session's arc resembles that of the Nexus — many paths lie ahead.",
      },
      repRung: null,
      essence: {
        speaker: 'cesiumCalamity',
        orb:     'Individualized',
        quip:    "Each of us has a part to play, no matter how small!",
      },
      discord: {
        speaker: 'cesiumCalamity',
        orb:     'In Harmony With One Another',
        quip:    "I think in the end, this is a testament to how well our community works together...",
      },
      gameQuality: {
        speaker: 'cesiumCalamity',
        orb:     'Busted',
        quip:    "Okay, it's not like a session of *checks notes* 384 members. Would not. Be stupid broken. But it's vibrant nonetheless.",
      },
      oddest: {
        lines: [
          { speaker: null,              text: "[Bard of Rage]" },
          { speaker: 'cesiumCalamity',  text: "Well, screw the one person who has Gamzee's classpect, I guess. Sorry, that's mean." },
        ],
      },
      closestKnit: null,
      leader:      null,
      lunarProspit: null,
      lunarDerse:   null,
    },
  },

};

const OOPS_CLASS_ASPECT = {
  Lord:   null,      // master class — no associated aspect (→ black flash)
  Witch:  'Hope',
  Prince: 'Light',
  Thief:  'Life',
  Knight: 'Mind',
  Mage:   'Breath',
  Sylph:  'Rage',
  Maid:   'Time',
  Seer:   'Blood',
  Page:   'Heart',
  Rogue:  'Doom',
  Bard:   'Void',
  Heir:   'Space',
  Muse:   null,      // master class — no associated aspect (→ white flash)
};

const OOPS_CLASS_PLURALS = {
  Lord:   'Lords',   Witch: 'Witches', Prince: 'Princes', Thief:  'Thieves',
  Knight: 'Knights', Mage:  'Mages',   Sylph:  'Sylphs',  Maid:   'Maids',
  Seer:   'Seers',   Page:  'Pages',   Rogue:  'Rogues',  Bard:   'Bards',
  Heir:   'Heirs',   Muse:  'Muses',
};

(function buildOopsSessions() {
  const blankQuips = {
    balance: null, avatar: null, repRung: null, essence: null,
    discord: null, gameQuality: null, oddest: null,
    closestKnit: null, leader: null,
    lunarProspit: null, lunarDerse: null,
  };
  const blankAssets = { bannerArt: null, gridBackground: null, layerOrbOverride: null, needs: [] };
  const blankTheme  = { bg: null, accent: null, border: null, fontTitle: null };

  // Oops-All-[Class]: every aspect of that class, Dual moon.
  CLASS_ORDER.forEach(cls => {
    const plural  = OOPS_CLASS_PLURALS[cls];
    const id      = `oops-all-${cls.toLowerCase()}`;
    const players = ASPECT_ORDER_ENC.map(asp => ({ class: cls, aspect: asp, moon: 'Dual' }));
    const code    = encodeSession(players);
    SPECIAL_SESSIONS[id] = {
      id,
      displayName: `Oops, All ${plural}!`,
      aliases:     [`OOPSALL${plural.toUpperCase()}`],
      code,
      description: `A session that turned out to be nothing but ${plural}.`,
      flavor:      null,
      theme:       blankTheme,
      members: players.map(p => ({
        characterKey: `${p.class} of ${p.aspect}`,
        moon:         'Dual',
        symbol:       null,
        name:         null,
      })),
      assets: blankAssets,
      quips:  blankQuips,
    };
  });

  // Oops-All-[Aspect]: every class of that aspect, Dual moon.
  ASPECT_ORDER_ENC.forEach(asp => {
    const id      = `oops-all-${asp.toLowerCase()}`;
    const players = CLASS_ORDER.map(cls => ({ class: cls, aspect: asp, moon: 'Dual' }));
    const code    = encodeSession(players);
    SPECIAL_SESSIONS[id] = {
      id,
      displayName: `Oops, All ${asp}!`,
      aliases:     [`OOPSALL${asp.toUpperCase()}`],
      code,
      description: `A session that turned out to be nothing but ${asp} players.`,
      flavor:      null,
      theme:       blankTheme,
      members: players.map(p => ({
        characterKey: `${p.class} of ${p.aspect}`,
        moon:         'Dual',
        symbol:       null,
        name:         null,
      })),
      assets: blankAssets,
      quips:  blankQuips,
    };
  });
})();

/* HSOD lives above inside SPECIAL_SESSIONS — the earlier placeholder
   IIFE was merged into that entry. */

/* =========================================================================
   THE INFLUENCERS
   The four Beyond Canon influencers with confirmed classpects (per the
   Connector's characters.json). Dive uses the Life glyph in Silas's
   green (#71d666).
   ========================================================================= */
SPECIAL_SESSIONS['influencers'] = (function buildInfluencersEntry() {
  /* Members defined inline rather than fetched from characters.json so
     the entry is self-contained at module load. Order in players[]
     doesn't matter — encodeSession sorts before encoding. */
  const players = [
    { class: 'Witch',  aspect: 'Light', moon: 'Dual' },  // Imode Kurita
    { class: 'Mage',   aspect: 'Life',  moon: 'Dual' },  // Silas P. Beauregard
    { class: 'Rogue',  aspect: 'Space', moon: 'Dual' },  // Avril Thorpe
    { class: 'Prince', aspect: 'Time',  moon: 'Dual' },  // Ruthie Gold
  ];
  const code = encodeSession(players);
  return {
    id:          'influencers',
    displayName: 'The Influencers',
    aliases:     ['INFLUENCERS', 'THEINFLUENCERS', 'BCINFLUENCERS', 'BC INFLUENCERS'],
    code,
    description: 'There are other stories to be told...',
    flavor:      null,
    theme:       { bg: null, accent: null, border: null, fontTitle: null },
    members: [
      { characterKey: 'Imode Kurita',         moon: 'Dual', symbol: null, name: null },
      { characterKey: 'Silas P. Beauregard', moon: 'Dual', symbol: null, name: null },
      { characterKey: 'Avril Thorpe',         moon: 'Dual', symbol: null, name: null },
      { characterKey: 'Ruthie Gold',          moon: 'Dual', symbol: null, name: null },
    ],
    assets:      { bannerArt: null, gridBackground: null, layerOrbOverride: null, needs: [] },
    quips:       {
      balance: {
        speaker: "Ruthie Gold",
        orb: "activeee",
        quip: "i don't know why weee'reee doing this but i gueeess weee'reee activeee."
      },
      avatar: {
        speaker: "Avril Thorpe",
        orb: "mage of rage #fierce",
        quip: "i don't actually know what to make of this. same #aspect as the clown guy. come to think of it, didn't he kickstart our adventure? #thinking #thoughts"
      }, 
      repRung: {
        speaker: "Ruthie Gold",
        orb: "the clock",
        quip: "theee war starteeed knocking only a feeew hours after theee reeest of theeeseee guys posteeed about it."
      }, 
      essence: {
        speaker: "Silas P. Beauregard",
        orb: "Neither/nor, importance-ways.",
        quip: "I guess what we did was important. I just don't know if WE matter after all of that, y'know?"
      },
      discord: {
        speaker: "Imode Kurita",
        orb: "⚔️⚔️⚔️",
        quip: "OK Ruthie ➕ Silas are very ⚔️⚔️⚔️ and it's like 🙄. I'm here with 🎸 I guess."
      }, 
      gameQuality: {
        speaker: "Imode Kurita",
        orb: "😑",
        quip: "I want you to 👀↩️ and 🗣️ if you think this is 👍, because to me, it's 💔."
      }, 
      oddest: {
        lines: [
          {speaker: null, text: "[Rogue of Space]"},
          {speaker: "Avril Thorpe", text: "i mean, true. #imnothinglikeyall"},
          {speaker: "Avril Thorpe", text: "seriously, though, it's like i'm invisible sometimes."}
        ]
      },
      closestKnit: {
        lines: [
          {speaker: null, text: "[Mage of Life]"},
          {speaker: "Silas P. Beauregard", text: "I guess that'd be me! No shock there, with all my socialite ways..."},
          {speaker: "Ruthie Gold", text: "you don't haveee thoseee"},
          {speaker: "Silas P. Beauregard", text: "Shush!"}
        ]
      }, 
      leader: {
        orb:null,
        lines: [
          {speaker: "Ruthie Gold", text: "i meeean i gaveee likeee oneee ordeeer. but it was a good oneee."},
        ]
      },
      lunarProspit: null, 
      lunarDerse: null,
    },
  };
})();

/* =========================================================================
   BC PREDICTIONS — Gamma Kids + Delta Kids (combined)
   -------------------------------------------------------------------------
   Speculative classpect predictions for HS:BC's Deltritus session,
   pulled at runtime from the Connector's predictions.html data file
   (data/predictions.json). One combined 10-member session: 4 Gamma
   Kids (offspring of the original cast) + 6 Delta Kids (Deltritus
   natives).
   ========================================================================= */
SPECIAL_SESSIONS['bc-predictions'] = (function buildBcPredictionsStub() {
  /* Mutable holder. Aliases registered up-front; members + code
     populated when the fetch resolves below. */
  const entry = {
    id:          'bc-predictions',
    displayName: 'BC Predictions',
    aliases:     [
      'BCMETA',
      'MYBCMETAS',
      'PREDICTIONS',
      'BCPREDICTIONS',
      'DELTRITUS',
      'GAMMADELTA',
      'GAMMAKIDS',
      'DELTAKIDS',
      'GDSESSION',
      'GAMMAANDDELTA',
    ],
    code:        '',  // populated post-fetch
    description: 'Speculative Deltritus session — Gamma + Delta Kids.',
    flavor:      null,
    theme:       { bg: null, accent: null, border: null, fontTitle: null },
    members:     [],  // populated post-fetch
    assets:      { bannerArt: null, gridBackground: null, layerOrbOverride: './images/rungs-layers/shurb.png', needs: [] },
    quips:       {
      balance: null, avatar: null, repRung: null, essence: null,
      discord: null, gameQuality: null, oddest: null,
      closestKnit: null, leader: null,
      lunarProspit: null, lunarDerse: null,
    },
    /* Marker so debug/console probing can tell async entries from
       sync ones at a glance. Not consumed by any production code. */
    _async:      true,
    _loaded:     false,
  };

  /* Connector root URL + predictions.json URL. */
  const CONNECTOR_ROOT = (function () {
    if (typeof window === 'undefined' || !window.location) {
      return '/the-classpect-connector/';
    }
    return window.location.origin + '/the-classpect-connector/';
  })();
  const PREDICTIONS_URL = CONNECTOR_ROOT + 'data/predictions.json';

  /* Symbol paths */
  const rewriteSymbolPath = p => {
    if (typeof p !== 'string') return p;
    if (p.startsWith('../')) return CONNECTOR_ROOT + p.slice(3);
    return p;
  };

  /* Fetch + populate. Runs at module-load. Errors are logged and
     swallowed — a missing predictions file shouldn't crash the rest of
     the Scryer; the entry just stays as a stub with empty members. */
  if (typeof fetch === 'function') {
    fetch(PREDICTIONS_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        const gamma = Array.isArray(data.gammaKids) ? data.gammaKids : [];
        const delta = Array.isArray(data.deltaKids) ? data.deltaKids : [];
        const all   = gamma.concat(delta);
        if (all.length === 0) {
          console.warn('[special-sessions] bc-predictions: predictions.json had no characters');
          return;
        }

        const fallbackMoon = 'Dual';
        const validMoons = new Set(['Prospit', 'Derse', 'Dual']);
        const resolveMoon = c => {
          const m = c && c.moon;
          return (m && validMoons.has(m)) ? m : fallbackMoon;
        };
        const players = all.map(c => ({
          class:  c.classpect[0],
          aspect: c.classpect[1],
          moon:   resolveMoon(c),
        }));
        /* Each member also stores its own classpect tuple. */
        const members = all.map(c => ({
          characterKey: c.name,
          moon:         resolveMoon(c),
          symbol:       rewriteSymbolPath(c.symbol) || null,
          name:         c.name,
          color:        c.color || null,
          classpect:    [c.classpect[0], c.classpect[1]],
        }));

        const code = encodeSession(players);

        /* Mutate the entry in place. ALIAS_INDEX already points at
           this object, so the alias-resolve path picks up the new
           members automatically. */
        entry.code    = code;
        entry.members = members;
        entry._loaded = true;

        if (typeof CODE_INDEX !== 'undefined' && CODE_INDEX && typeof CODE_INDEX.set === 'function') {
          CODE_INDEX.set(code, entry);
        }

        /* Fire a custom event so any code that already tried (and
           failed) to deep-link into BC Predictions before the fetch
           resolved can re-attempt. scry.html's hash bridge listens
           for this and re-runs the deep-link decode if the current
           hash still matches a BC-predictions alias. Without it,
           someone landing on scry.html#BCPREDICTIONS on a slow
           connection would silently fall through to the entry view. */
        if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
          try {
            window.dispatchEvent(new CustomEvent('special-session-loaded', {
              detail: { id: 'bc-predictions', code, members },
            }));
          } catch (_) { /* sandboxed envs: ignore */ }
        }
      })
      .catch(err => {
        console.warn('[special-sessions] bc-predictions fetch failed:', err);
      });
  }

  return entry;
})();

/* Expose the class→aspect mapping on window so scry.html can build
   matching SPECIAL_DIVE entries without re-declaring the table. Single
   source of truth: any edit to OOPS_CLASS_ASPECT above propagates to
   the dive choreography automatically. */
if (typeof window !== 'undefined') {
  window.OOPS_CLASS_ASPECT  = OOPS_CLASS_ASPECT;
  window.OOPS_CLASS_PLURALS = OOPS_CLASS_PLURALS;
}

/* ALIAS_INDEX — flat lookup map { aliasString -> sessionEntry }. */
const ALIAS_INDEX = (() => {
  const map = new Map();
  for (const session of Object.values(SPECIAL_SESSIONS)) {
    for (const alias of session.aliases) {
      if (map.has(alias)) {
        console.warn(`[special-sessions] duplicate alias "${alias}" — first wins`);
        continue;
      }
      map.set(alias, session);
    }
  }
  return map;
})();

/* CODE_INDEX — flat lookup map { canonicalHex -> sessionEntry }. Used
   to detect when a user-typed (or computed) code matches a special
   session, so the variant overrides can light up. */
const CODE_INDEX = (() => {
  const map = new Map();
  for (const session of Object.values(SPECIAL_SESSIONS)) {
    map.set(session.code, session);
  }
  return map;
})();

/* Lookup helpers — pure, no side effects. */
function specialSessionByAlias(aliasStr) {
  return ALIAS_INDEX.get(aliasStr) || null;
}
function specialSessionByCode(codeStr) {
  return CODE_INDEX.get(codeStr) || null;
}
