export default {
  media_links: [
    {name: 'S13.ru', id: '//s13.ru'},
    {name: 'Forum', id: '//forum.grodno.net/'}
  ],
  news_form: [
    {'id': 'subject', 'type': 'name', 'typeSpec': 'city'},
    {'id': 'preview', 'type': 'text', 'typeSpec': 'unit'},
    {'id': 'body', 'type': 'text', 'typeSpec': 'country'},
    {'id': 'tags', 'type': 'enum', 'typeSpec': 'tags'}
  ],
  tags: [
    {name: 'Padzei', id: 'events'},
    {name: 'Gistorya', id: 'history'},
    {name: 'Zabavki', id: 'amazing'}
  ]
}
