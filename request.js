var http = require('http');
  
module.exports = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            var req = http.request(url, (res) => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', d => data += d);
                res.on('end', () => {
                    resolve(data)
                });
            });
          
          req.on('error', (e) => {
            reject(e);
          });
          req.end();
        })    
    }
}
