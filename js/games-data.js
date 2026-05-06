/**
 * Fields:
 *   name      — shown on the card and in the detail header (required).
 *   banner    — URL or path to a wide image (21:9 or 16:9 looks best).
 *   bannerAlt — short description for the banner image (accessibility).
 *   summary   — short line under the meta block in the modal (optional).
 *   meta      — key/value pairs you are OK showing publicly (optional).
 *   body      — array of paragraphs for the longer public notes (optional).
 *   links     — { label: url } objects, e.g. Steam / official site (optional).
 *
 * Swap the examples below with your real games and image paths.
 */

window.GAMES_DATA = [
  {
    name: "Red Dead Redemption 2",
    banner:
      "./banners/red_dead_redemption_2.jpg",
    bannerAlt: "Red Dead Redemption 2 banner",
    summary: "A PURE MASTERPIECE BY ROCKSTAR GAMES",
    meta: {
      Platform: "PC",
      "In a Nutshell": "W",
      Status: "Playing",
    },
    body: [
      "Just GO Play!",
      "This game is a masterpiece. Feel the story of Arthur Morgan and the detailing of the world of Red Dead Redemption 2.",
      "Recommendation: highly recommended, if you want to cry and feel the emotions.",
    ],
    links: {
      Steam: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
    },
  },
  {
    name: "Detroit: Become Human",
    banner:
      "./banners/detroit_become_human.jpg",
    bannerAlt: "Detroit: Become Human banner",
    summary: "A PURE MASTERPIECE BY QUANTIC DREAMS",
    meta: {
      Platform: "PC",
      "In a Nutshell": "W",
      Status: "Finished",
    },
    body: [
      "This game will change your perspective on decision making and the consequences of your actions. Highly recommended game for storyline lovers.",
    ],
    links: {
      Steam: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
    },
  },
  {
    name: "Hitman: Blood Money",
    banner:
      "./banners/hitman_blood_money.jpg",
    bannerAlt: "Hitman: Blood Money banner",
    summary: "GOOD GAME BY IO INTERACTIVE",
    meta: {
      Platform: "PC",
      "In a Nutshell": "8/10",
      Status: "Finished",
    },
    body: [
      "Enjoyed the assassination gameplay and the story of Agent 47. You will like it. After all it's legendary AGENT47's missions.",
    ],
    links: {
      Steam: "https://store.steampowered.com/app/6860/Hitman_Blood_Money/"},
  },
  {
    name: "Alan Wake 2",
    banner:
      "./banners/alan_wake_2.jpg",
    bannerAlt: "Alan Wake 2 banner",
    summary: "AWESOME GAME BY REMEDY ENTERTAINMENT",
    meta: {
      Platform: "PC",
      "In a Nutshell": "9/10",
      Status: "Finished",
    },
    body: [
      "The first person character switch between FBI agents & Alan is one of the best things I loved about this game. Each chapter came up with it's unique way of toughness. A highly recommended game.",
    ],
    links: {
      Epic: "https://store.epicgames.com/en-US/p/alan-wake-2"},
  },
  {
    name: "Battlefield 3",
    banner:
      "./banners/battlefield_3.jpg",
    bannerAlt: "Battlefield 3 banner",
    summary: "BEST GAME OF THE FRANCHISE BY DICE",
    meta: {
      Platform: "PC",
      "In a Nutshell": "9.5/10",
      Status: "Finished",
    },
    body: [
      "A W of the series. My first Battlefield game, one of the best of the franchise that I've enjoyed till date. Highly recommended.",
    ],
    links: {
      Steam: "https://store.steampowered.com/app/1238840/Battlefield_1/"}
  },
  {
    name: "Battlefield 4",
    banner:
      "./banners/battlefield_4.jpg",
    bannerAlt: "Battlefield 4 banner",
    summary: "ANOTHER W GAME OF THE FRANCHISE BY DICE",
    meta: {
      Platform: "PC",
      "In a Nutshell": "9.5/10",
      Status: "Finished",
    },
    body: [
      "A W of the series. My first Battlefield game, one of the best of the franchise that I've enjoyed till date. Highly recommended.",
    ],
    links: {
      Steam: "https://store.steampowered.com/app/1238860/Battlefield_4/"}
  }
];
