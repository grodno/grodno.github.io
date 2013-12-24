
// Lexio handler instance
Object.entity.create({
    id:"lexio/Processor:lexio"
    ,
    plugins:[
    {
        id:'lexio/plugin/initialize'
    }
    ,{
        id:'lexio/plugin/meta'
        ,
        sources:[
        'lexio_meta://0AqQx4KOOt8TGdExjQ2ZJM0Q5MFBQSVRhYUw1ZHJMSFE'
        ]
    //var EN = GSheets.getSpreadsheetData('0AqQx4KOOt8TGdEFhUExMU3ZsaVl3RDBiWXhtcWVDZ2');
  
    }
    ,
    {
        id:'lexio/plugin/tokenize'
    }
    ,
    {
        id:'lexio/plugin/lexer'
    }
    ,
    {
        id:'lexio/plugin/score'
    }
    ,
    {
        id:'lexio/plugin/represent'
    }
    ]
});