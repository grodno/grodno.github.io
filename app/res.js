export default {
  appName: 'Olgard',
  appLogo: '/logo.jpg',
  appVersion: '4.0.0',
  sitemap: [
    { name: 'Galownea', id: 'main' },
    { name: 'Objavy', id: 'ads' },
    { name: 'Naviny', id: 'news' },
    { name: 'Calendar', id: 'calendar' },
    { name: 'Karta', id: 'geomap' },
    { name: 'Leudzi', id: 'people' }
  ],
  media_links: [
    { name: 'S13.ru', id: '//s13.ru' },
    { name: 'Forum', id: '//forum.grodno.net/' }
  ],
  news_form: [
    { id: 'subject', type: 'name', typeSpec: 'city' },
    { id: 'preview', type: 'text', typeSpec: 'unit' },
    { id: 'body', type: 'text', typeSpec: 'country' },
    { id: 'tags', type: 'enum', typeSpec: 'tags' }
  ],
  tags: [
    { name: 'Padzei', id: 'events' },
    { name: 'Gistorya', id: 'history' },
    { name: 'Zabavki', id: 'amazing' }
  ],
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
    comments: 'id, target, modified_at',
    // medician: 'id, modified_at, nameasa, specialty, degree, city, organization',
    // organization: 'id, modified_at, city',
    // taxonomy: 'id, modified_at',
    // unit: 'id, modified_at, city, organization',
    // address: 'id, modified_at, city, street, country',
    // patient: 'id, modified_at, birth_date, gender, marital_status, emergency_contact, phone, email, risk_factors',
    // medication: 'id, modified_at, date',
    // slot: 'id, modified_at',
    // visit: 'id, modified_at, city, organization, unit, medician, person, status, date',
    // dict: 'id, modified_at, type, scope, style',
    // order: 'id, modified_at',
    // orderRequest: 'id, modified_at'
  }
  ,
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
    { "id": "organization", "shown": "{{city}}", "type": "ref", "typeSpec": "organization?city={{city}}" },
    { "id": "unit", "shown": "{{organization}}", "type": "ref", "typeSpec": "unit?organization={{organization}}" }
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
