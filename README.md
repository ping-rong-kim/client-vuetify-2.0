# ![ ](https://bitbucket.org/Frontend-Domun/publicdomun/raw/b55bdc9d5aaed155cdbdba56f014e58a2de33441/img/icons/favicon-32x32.png) Domun Client

For a description of how the project is structured please see [FrontendArchitecture.md](FrontendArchitecture.md)

For a description of how data is consumed via services, stored in the SPA and persisted to the DB please see [DesignConventions.md](DesignConventions.md)

For a description of coding conventions please see here: [CodeConventions.md](CodeConventions.md)

## Clone project

### External Developers

From D:\Work\DomunPlatform_6.1.0

```console
git clone https://YOUR_USERNAME@bitbucket.org/Frontend-Domun/client.git
```

You can then use `checkout.bat` to get the latest and `checkin.bat` to commit files.

### Internal Developers

From D:\Work\DomunPlatform_6.1.0

```console
git clone https://YOUR_USERNAME@bitbucket.org/Frontend-Domun/client.git
cd client
git remote set-url --add --push origin https://YOUR_USERNAME@bitbucket.org/casafidev/client.git
git remote set-url --add --push origin https://YOUR_USERNAME@@bitbucket.org/Frontend-Domun/client.git
```

## Project setup

```console
npm install
```
### Running client (Jan 2020)

In client folder There are 3 batch files
startup.bat - starts client locally and expects local nodeJs server and api-server
startup-remote-go.bat - starts client locally and expects local nodeJs server but uses remote api-server
startup-remote.bat - starts client locally and uses remote  server and remote api-server


### Client development only

Compiles and hot-reloads for development. Points at a remote nodeJS server and remote API server. These are specified in .env.remote

From command prompt in D:\Work\DomunPlatform_6.1.0\client

```console
npm install
npm run-script remote     (or startup-remote.bat for ease)
```

Note - you will need to:

1) Add local-domun.firmview.co.uk to local hosts file to point to 127.0.0.1

2) Install chrome plugin Allow-Control-Allow-Origin: *
<https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi>

3) access site on <http://local-domun.firmview.co.uk:8080>

4) enable the cors plugin

### Slack

We use Slack for inter team communications.
There is a slack group and a channel called #bitbucket which reports all server-side bit bucket activity

#### Slack bit bucket setup notes

It was setup by adding the bit bucket app and then running:

```/bitbucket connect https://domun-dev@bitbucket.org/casafidev/client.git```

You are then prompted to connect and you log in as dev@domun.co.uk to set up the API on bit bucket.

## Development IDE

We use

* <https://code.visualstudio.com/download>

with:

* <https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack>
* <https://marketplace.visualstudio.com/items?itemName=nodesource.vscode-for-node-js-development-pack>
* <https://marketplace.visualstudio.com/items?itemName=mubaidr.vuejs-extension-pack>
* <https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens>

## Old Notes

These were just the std pre-generated notes.

TODO: replace them with how we do it

### Compiles and minifies for production

```console
npm run build
```

### Run your tests

```console
npm run test
```

### Lints and fixes files

```console
npm run lint
```

### Run your end-to-end tests

```console
npm run test:e2e
```

### Run your unit tests

```console
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---
Last updated 11/11/2019
