lexiomated
=================
Научим понимать по-русски!

lexiomated is library that provides lexical and morphological analysis of text in Russian.

NOTE: All stuff located under gh-pages branch.

For more info, refer to the home page:  http://alitskevich.github.com/Lexiomate .


Usage
-----

Just drop the compiled lexiomate-ru.js file into any new project and start work:

``` html
<script src="lexiomate-ru.js" type="text/javascript"></script>

<script>

var someText = '...';

// do analysis
var result  = RU.analyze(someText);

// show as HTML
document.write(RU.showAsHTML(result));

</script>
```



Bug tracker
-----------

Have a bug? Please create an issue here on GitHub!

https://github.com/alitskevich/lexiomate/issues



Authors
-------

**Alex Litskevich**

+ http://twitter.com/alitskevich
+ http://github.com/alitskevich


License
---------------------

Copyright (c) 2009-2012 Alex Litskevich <alitskevich@gmail.com>.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0