module.exports = {
    
    lexicon: {
        'digital': 'kind(d)'
        ,'day': ' @digital & num(1-31)'
        ,'month' :'enum(MONTH) | num(1-12)'
        ,'year' : 'num(1911-2111)'
        ,'date' : [
            'd:@day and next(_ or "." , 0) and m:next(@month) and next(_) and y:next(@year) '   
            ,'d:@day and next("-") and m:next(@month) and next("-") and y:next(@year) '   
        ]
    }
    ,
    normalizers:[
        
        {
            id : "date"
            ,
            rules: [
                ' @date __ @month __ @year '
                , ' @date . @month . @year '
            ]
            , result: function(token, args) {
                
                return 
            }
             
        }
         
    ]
}

