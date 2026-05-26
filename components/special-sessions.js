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
     Thorn / Ebony share the slot; encoded as Dual moon.
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
        center:   { speaker: 'Thorn Derosin', text: "Sepse unë jam edhe qendra, këtu." },
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
          {speaker: "Thorn Derosin", text: "Ka kuptim, këtë! Of course I would be closest with everyone-- my journey put me in contact with more of everybody than anybody!"}
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

/* =========================================================================
   HSOD — Homestuck Official Discord
   
   The corresponding dive (Doom glyph in Sburb-green #4ce24e) is wired
   in scry.html's SPECIAL_DIVE.
   ========================================================================= */
SPECIAL_SESSIONS['hsod'] = (function buildHsodEntry() {
  const code = '1621C22112222412422522622712912A02B12C12C13223423513623723923923923A03A23B04124704914A15105215315425525625725815825915B15B25C16126216226316426516716826916B26C27117327417417727917927C18118418518728A28B28C29129219429809919B09C1A12A22A32A42A51A71AB2AC1B22B30B42B62B80B91BC1C21C32C41C52CA2CB2D12D22D32D41D51D71D91DB2DC1E20E90EA1EC0';
  const decoded = decodeSession(code);
  if (decoded.errors && decoded.errors.length > 0) {
    console.warn('[special-sessions] HSOD code failed to decode cleanly:', decoded.errors);
  }
  const members = decoded.players.map((p, i) => ({
    characterKey: `HSOD Member ${i + 1}`,
    moon:         p.moon,
    symbol:       null,
    name:         `${p.class} of ${p.aspect}`,
  }));
  return {
    id:          'hsod',
    displayName: 'HSOD',
    /* Both alias forms registered: the user-facing secrets-page string
       (dashed, all-caps, the form people will actually type) and the
       compact undashed form for anyone copy-pasting from URL bars or
       elsewhere. specialSessionByAlias is exact-match on the trimmed
       input, so each form must appear here explicitly. */
    aliases:     [
      'A3-67-CH-1K-FQ-22-94-R1-B8-JK-3G-XW',
      'A367CH1KFQ2294R1B8JK3GXW',
    ],
    code,
    description: 'The Homestuck Official Discord. A real session, somehow.',
    flavor:      null,
    theme:       { bg: null, accent: null, border: null, fontTitle: null },
    members,
    assets:      { bannerArt: null, gridBackground: null, layerOrbOverride: null, needs: [] },
    quips:       {
      balance: null, avatar: null, repRung: null, essence: null,
      discord: null, gameQuality: null, oddest: null,
      closestKnit: null, leader: null,
      lunarProspit: null, lunarDerse: null,
    },
    phantomMembers: [
      {
        x: 2, y: 0,
        label: 'Magician of All',
        moon: 'Derse',
        card: {
          leadership: { score: -2, side: 'Explicit' },
          /* Aspect-word color in the card title. "All" isn't in
             ASPECT_LINK_COLORS (it's a homebrew super-aspect), so the
             card defaults to white; #999999 grays it down so it reads
             as "neutral / off-the-axis" rather than "missing data". */
          titleAspectColor: '#999999',
        },
      },
    ],
  };
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
