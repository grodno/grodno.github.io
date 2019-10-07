export default {
  app: {
    name: 'Algardium',
    logo: '/assets/olxrd.png',
    slogan: 'Esti feliqa - Algardium nur.',
    small: 'Solnce wsxodzit i zaxodzit, a volnaja plynj Niomana ne spyniaet sa ni na mig.',
    concept: `Algardium - e mestom nezvyqajnym. Tut qas beghyt pa-svojmu i inny masshtab padzej,
    i wsio navokal prasiaknuto asobym sensam.
    Treba adno zawvaghac znaki, sluxac tishynu, tob dotknuti tae inshae realnosti.`,
    history: ` e vluqnaj qastkaj gistoryi susvetnaj. 
    Leosy, zvyqai, roznye movy i kultury tesno perapleli sa tut w admyslovy uzor.
    Nash gorad e prykladom tradycyj siabrowstva i wzaemnaj povagi migh liudzmi. 
    My roznye, ale nas jednae vera w lepshae majbytne, katorae my razam buduemo dzenj za dniom.
    Tut liubiat pavtorac:
    "Use my liudzi", "Nex zhye volnost", "Kto krutit, toj maet".`,
    version: '4.0.0',
    disclaimer: 'Administracya ne mae daqynennia i ne nese zhodnoj adkazvosti za zmest dopisaw karystalnikaw saita.',
    sitemap: [
      { name: 'Naviny', id: 'news', link: '#/news', description: 'Naviny na dobu' },
      { name: 'Objavy', id: 'ads', link: '#/ads', description: 'Pryvatye abjavy' },
      { name: 'Karta', id: 'map', link: '#/map', description: 'Na Miaste' },
      // { name: 'Calendar', id: 'calendar', link: '#/calendar', caption: '' },
      // { name: 'Liudzi', id: 'people', link: '#/people', caption: '' },
      // { name: 'Info', id: 'info', link: '#/info', caption: '' },
    ],
  },
  media_links: [
    { name: 'S13.ru', id: '//s13.ru' },
    { name: 'Forum', id: '//forum.grodno.net/' }
  ],
  info: {
    tabs: [
      { name: 'S13.ru', id: '//s13.ru' },
      { name: 'Forum', id: '//forum.grodno.net/' }
    ],
    columns: [
      { name: 'S13.ru', id: '//s13.ru' },
      { name: 'Forum', id: '//forum.grodno.net/' }
    ]
  },
  news_form: [
    { id: 'subject', type: 'name' },
    { id: 'preview', type: 'text' },
    { id: 'body', type: 'text' },
    { id: 'tags', type: 'text' }
  ],
  news: {
    caption: 'Naviny Algardium',
    initialTags: 'asoba,gramadstva,dabrabyt,axtung,adukacya,biznes',
  },
  ads: {
    caption: 'Pryvatnye objavy',
    initialTags: 'apartments,service,tools,cars,interior',
    apiUrl: 'https://script.google.com/macros/s/AKfycbywXmp_80WQVBJNTfCMvUF9kWWd4syjPoCcxPJzVWKRd2vBqZy8/exec'
  },
  AddNewRecordData: {
    title: 'Add a new record',
    data: {
      subject: 'new record'
    }
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBZ4bR8ArGmHxo-ExfKrlhkMMAj86lSIpw',
    authDomain: 'grodno-24aa8.firebaseapp.com',
    databaseURL: 'https://grodno-24aa8.firebaseio.com',
    projectId: 'grodno-24aa8',
    storageBucket: 'grodno-24aa8.appspot.com',
    messagingSenderId: '1045179719966'
  },
  dbSchema: {
    news: 'id, modified_at',
    users: 'id, modified_at',
    ads: 'id, modified_at',
  },
  geojson: {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [23.8234751, 53.6769959]
      },
      "properties": {
        "title": "Mapbox DC",
        "icon": "monument"
      }
    }, {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [23.8244752, 53.6769959]
      },
      "properties": {
        "title": "Mapbox SF",
        "icon": "monument"
      }
    }]
  },
  /* Enumerations */
  gender: [
    { "id": "male" },
    { "id": "female" },
    { "id": "unisex" }
  ],
  marital: [
    { "id": "married" },
    { "id": "single" }
  ],
  allergy: [
    { "id": "penicillin" },
    { "id": "codeine" }
  ],
  risk_factors: [
    { "id": "smoking" },
    { "id": "stress" },
    { "id": "alcohol" },
    { "id": "weight" }
  ],
  specialty: [
    { "id": "therapist" },
    { "id": "neurologist" },
    { "id": "ophtalmologist" },
    { "id": "pulmonologist" },
    { "id": "cardiologist" }
  ],
  category: [
    { "id": "first" },
    { "id": "highest" }
  ],
  degree: [
    { "id": "doctor" },
    { "id": "docent" },
    { "id": "professor" }
  ],
  status: [
    { "id": "open" },
    { "id": "appointed" },
    { "id": "in_progress" },
    { "id": "done" },
    { "id": "confirmed" }
  ],
  orderStatus: [
    { "id": "reserved" },
    { "id": "cancel" },
    { "id": "complete" }
  ],
  orderType: [
    { "id": "online" },
    { "id": "ofline" }
  ],
  /* Forms */
  medician_form: [
    { "id": "name", "type": "name" },
    { "id": "specialty", "type": "enum", "typeSpec": "specialty" },
    { "id": "category", "type": "enum", "typeSpec": "category" },
    { "id": "degree", "type": "enum", "typeSpec": "degree" },
    { "id": "tags", "type": "tag" },
    { "id": "city", "type": "dict", "typeSpec": "city" },
    { "id": "organization", "shown": "{city}", "type": "ref", "typeSpec": "organization?city={city}" },
    { "id": "unit", "shown": "{organization}", "type": "ref", "typeSpec": "unit?organization={organization}" }
  ],
  organization_form: [
    { "id": "item", "type": "ref", "typeSpec": "item" },
    { "id": "type", "type": "enum", "typeSpec": "org_type" },
    { "id": "address", "type": "ref", "typeSpec": "address" },
    { "id": "head_of", "type": "ref", "typeSpec": "person" },
    { "id": "name", "type": "name" },
    { "id": "parent", "type": "ref", "typeSpec": "unit" },
    { "id": "weight", "type": "ref", "typeSpec": "person" },
    { "id": "head_of", "type": "ref", "typeSpec": "person" }
  ],
  address_form: [
    { "id": "city", "type": "dict", "typeSpec": "city" },
    { "id": "street", "type": "ref", "typeSpec": "unit" },
    { "id": "country", "type": "dict", "typeSpec": "country" },
    { "id": "item", "type": "embed", "typeSpec": "item" }
  ],
  patient_form: [
    { "id": "name", "type": "name" },
    { "id": "birth_date", "type": "dateTime" },
    { "id": "gender", "type": "enum", "typeSpec": "gender" },
    { "id": "marital_status", "type": "enum", "typeSpec": "marital_status" },
    { "id": "emergency_contact", "type": "issuesCriticality" },
    { "id": "address", "type": "ref", "typeSpec": "address" },
    { "id": "phone", "type": "issueType" },
    { "id": "email", "type": "issueName" },
    { "id": "name", "type": "span" },
    { "id": "position", "type": "timeAgo" },
    { "id": "date" },
    { "id": "medication" },
    { "id": "appearance" },
    { "id": "quantity" },
    { "id": "start_date" },
    { "id": "end_date" },
    { "id": "medician", "type": "ref", "typeSpec": "staff" },
    { "id": "pharmacy" },
    { "id": "chronic_conditions" },
    { "id": "risk_factors", "type": "dict", "typeSpec": "risk_factor" },
    { "id": "allergies", "type": "enum", "typeSpec": "allergy" },
    { "id": "notes", "type": "note" }
  ]
};
