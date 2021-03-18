// pobranie modułu (include z c w nodejs)
var express         = require('express');

// dołączenie modułu usuwającego problem z zabezpieczeniem CORS
const cors = require('cors');

// dołączenie modułu obsługi sesji
var session = require('express-session')

const fetch = require('node-fetch');
const e = require('cors');

//Inicjalizacja
var app             = express();
var PORT            = process.env.PORT || 8080;

//uruchomienie serwera
var server          = app.listen(PORT,() => console.log(`Listening on ${ PORT }`));

// Express.js
app.use(express.json());

// Obsluga cors
app.use(cors());


function getAs(request, response) {
    //TODO: wysłanie listy użytkowników klientowi
    console.log(request.params.id);
    fetch(`https://rest.db.ripe.net/search.json?abuse-contact=true&ignore404=true&limit=20&filter=origin&query-string=${request.params.ip}`)
    .then(res => res.json())
    .then(text => {
        let e = JSON.stringify(text);
        console.log(e.search('"value":"AS'))
        var y = e.search('"value":"AS')
        let w = []; let q=0;
        for (let i=y+9; i<y+15;i++) {
          w[q] = e[i]
        q++;
        }
        let str;
        for (let i=0;i<w.length;i++){
            str = w.join()
        }
        console.log(str.indexOf(','))
        while(str.indexOf(',')!=-1){
            str = str.replace(',','')
        }
        console.log(str.indexOf(','))

        if(str[0]=='A' && str[1]=='S' && !isNaN(str[2])){
          return str;
        }else{
            str = 'error'
            return str;
        }
    })
    .then(w=> response.send({ASnumber: w}))

           

}
function test(request, response){
    response.send('OK')
}

app.get('/api/test', test);

app.get('/api/as/:ip', getAs);



