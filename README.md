## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install smslegal
```

## Features

  * Enviar SMS
  * Verificar Status de SMS
  * Verificar Quantidade de SMS

## Config Start

First you need import the package for your project:

```
const smslegal = require('smslegal');
```

  You need config with yours access:

```
smslegal.config({user: "YOUR_USER", pass: "YOUR_PASS"});
```

## Examples

Verify balance of accont.
```
smslegal.balance()
```

  You can send a async sms, the number has to count the code 55 from brazil, after the ddd without the 0, plus 9 mobile number:

```
smslegal.send({numberSMS: 5566999999999, message: "Messege SMS"})
```

You can verify status of your sms of you send.
```
smslegal.verifyStatus({messageId: 123112})
```



## License

  [MIT](LICENSE)