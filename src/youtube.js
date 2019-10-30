let fs          = require('fs');
let readline    = require('readline');
let path        = require('path');
let {google}    = require('googleapis');
let OAuth2      = google.auth.OAuth2;
let SCOPES,
    TOKEN_DIR,
    TOKEN_PATH,
    TOKEN_FILE,
    clientSecret;





    function authorize(credentials){


        return new Promise((resolve,reject)=>{

            let clientSecret   = credentials.installed.client_secret;
            let clientId       = credentials.installed.client_id;
            let redirectUrl    = credentials.installed.redirect_uris[0];
            let oauth2Client   = new OAuth2(clientId, clientSecret, redirectUrl);

            fs.readFile(TOKEN_PATH, function(err, token) {
                if (err) {
                    console.log('creating new oauth token....');
                   getNewToken(oauth2Client,resolve);
                } else {
                    oauth2Client.credentials = JSON.parse(token);
                    resolve(oauth2Client);
                }
            });

        });

        // Check if we have previously stored a token.


    }

    function getNewToken(oauth2Client,resolve){

        let authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);

        let rl      = readline.createInterface({
            input  : process.stdin,
            output : process.stdout
        });

        rl.question('Enter the code from that page here: ', function(code) {
            console.log('working....');
            rl.close();
            oauth2Client.getToken(code, function(err, token) {

                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                console.log('creating token');

                oauth2Client.credentials = token;
                storeToken(token);
                console.log("Your token is :",token);
                resolve(oauth2Client);
            });
        });
    }

    function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' ,TOKEN_PATH);
    });
}

module.exports = class Youtube {

        constructor(opts){

        return    this.init();

        }


     init () {

          SCOPES      = process.env.YOUTUBE_SCOPE.split(',');
          TOKEN_DIR   = '/etc/google-credentials/';
          TOKEN_FILE  = process.env.TOKEN_NAME;
          TOKEN_PATH  = path.join((process.env.TOKEN_PATH ||TOKEN_DIR) , (TOKEN_FILE||('youtube-nodejs-'+Date.now())+'.json'));
          console.log(TOKEN_PATH,'token path');
          clientSecret = process.env.CLIENT_SECRET;

            fs.readFile(clientSecret, function processClientSecrets(err, content) {
                if (err) {
                    console.log('Error loading client secret file: ' + err);
                    return;
                }
                // Authorize a client with the loaded credentials, then call the YouTube API.
                return authorize(JSON.parse(content));
            });



     }





}
