import meta from "./meta.js";

export default {
  ...meta.result,

  name: "Algard",
  logo: "/assets/olxrd.png",
  slogan: "Esti Feliqa - Algardium Nur.",
  small:
    "Slonca wsxodzit i zaxodzit, a volnoja plynn Neomana ne spyniaet sa ni na mig.",
  concept: `Algardium - e mestom nezvyqajnym. Tut qas beghyt pa-svojmu, inny masshtab padzej,
    i wseo navokal prasiaknuto asobym sensam.
    Treba adno zawvaghatt znaki, sluxatt tishinju, qtob dokranut sa getoe inshae realnosti.`,
  history: ` e vluqnoj qastkaj gistoryi susvetnaj. 
    Leosy, zvyqai, roznye movy i kultury tesno perapleli sa tut w admyslovy wzor.
    Nash gorad e prykladom tradycyj siabrowstva i wzaemnaj povagi migh liudzmi. 
    My roznye, ale nas jednaet vera w lepshae majbytne, qto my razam buduemo dzenn za dniom.
    Tut liubiat pavtoratt:
    "Use my liudzi", "Nex zhyet volnost", "Kto krutit, toj maet".`,
  version: "4.0.0",
  disclaimer:
    "Administracya ne mae daqynennia i ne neseot zhodnoj odkazvosti za zmest dopisaw karystalnikaw saita.",
  sitemap: [
    {
      name: "Naviny",
      id: "news",
      link: "#/news",
      description: "Naviny na dobu",
    },
    {
      name: "Objavy",
      id: "ads",
      link: "#/ads",
      description: "Objavy Pryvatye",
    },
    { name: "Mapa", id: "map", link: "#/map", description: "Na Miaste" },
    { name: "Afisha", id: "afisha", link: "#/afisha", caption: "" },
    { name: "Znajdz", id: "findyou", link: "#/findyou", caption: "" },
    // { name: 'Liudzi', id: 'people', link: '#/people', caption: '' },
    // { name: 'Info', id: 'info', link: '#/info', caption: '' },
  ],

  title: {
    update: "Abnovitt",
    create_new: "Dabavitt",
    delete: "Vydalitt",
  },
  media_links: [
    { name: "S13.ru", id: "//s13.ru" },
    { name: "Forum", id: "//forum.grodno.net/" },
  ],
  info: {
    tabs: [
      { name: "S13.ru", id: "//s13.ru" },
      { name: "Forum", id: "//forum.grodno.net/" },
    ],
    columns: [
      { name: "S13.ru", id: "//s13.ru" },
      { name: "Forum", id: "//forum.grodno.net/" },
    ],
  },
  news_form: [
    { id: "subject", type: "textarea", name: "Subject" },
    { id: "preview", type: "textarea", name: "Preview" },
    { id: "body", type: "textarea", name: "Body" },
    { id: "tags", type: "text", name: "Tags" },
  ],
  news: {
    caption: "Naviny",
    initialTags: "asoba,gramadstva,dabrabyt,axtung,adukacya,biznes",
  },
  afisha: {
    caption: "afisha",
    initialTags: "kino,event,theatre,concerts,exhibition,party",
  },
  findyou: {
    caption: "findyou",
    initialTags: "male,female",
  },
  ads: {
    caption: "Pryvatnye objavy",
    initialTags: "apartments,service,tools,cars,interior",
    apiUrl:
      "https://script.google.com/macros/s/AKfycbywXmp_80WQVBJNTfCMvUF9kWWd4syjPoCcxPJzVWKRd2vBqZy8/exec",
  },
  AddNewRecordData: {
    title: "Add a new record",
    data: {
      subject: "new record",
    },
  },
  firebaseConfig: {
    apiKey: "AIzaSyBZ4bR8ArGmHxo-ExfKrlhkMMAj86lSIpw",
    authDomain: "grodno-24aa8.firebaseapp.com",
    databaseURL: "https://grodno-24aa8.firebaseio.com",
    projectId: "grodno-24aa8",
    storageBucket: "grodno-24aa8.appspot.com",
    messagingSenderId: "1045179719966",
  },
  dbSchema: {
    news: "id, modified_at",
    users: "id, modified_at",
    ads: "id, modified_at",
    event: "id, modified_at",
    findme: "id, modified_at",
  },
  /* Enumerations */
  gender: [{ id: "male" }, { id: "female" }, { id: "unisex" }],
  marital: [{ id: "married" }, { id: "single" }],
};
