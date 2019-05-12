import app from './app';
import * as http from 'http';
//import * as https from 'https';
import * as fs from 'fs';
const PORT = 4201;

const httpsOptions = {

}

http.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})
