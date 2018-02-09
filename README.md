## BlocJams Angular
This web application is a music streaming application based on [BlocJams](https://github.com/tboddyspargo/bloc-jams) but written in AngularJS (1.6).

## AngularJS
The AngularJS paradigm involves breaking your application in to various parts, separating the HTML templates from the controller logic that drives them and creating services to provide specific kinds of functionality to the controllers. This organization of the code can separate concerns in a way that is quite manageable and semantic, but involves certain challenges too.

Some of the services in this project are extremely straight-forward, like the `AlbumService` which provides access to the data for the different albums and the songs they contain. In contrast, I decided to create a service to encapsulate the functionality provided by `plyr`, the complications of which I will describe below.

The functional areas of the UI also deserver their own .

## Plyr
In order to play audio in BlocJams Angular, this project includes [Plyr](https://github.com/sampotts/plyr). Plyr is a JavaScript library for media playback in web sites. It targets HTML elements and can also display audio/visual playback controls if desired. In this application, we simply rely on it for playing audio in the browser and exposing functions for various actions 'play', 'pause', 'change song', 'volume up/down', and 'seek'.

## Run the Application
To ruun the application server, clone the repository locally and run the following command:

```
$ npm start
```

This will start running the application. You can open http://localhost:3000/ in your browser to access it.
