## BlocJams Angular
This web application is a music streaming application based on [BlocJams](https://github.com/tboddyspargo/bloc-jams) but written in AngularJS (1.6).

[[https://tboddyspargo.github.io/img/blocjams3_landing1.png|alt=homepage]]


## AngularJS
The AngularJS paradigm involves breaking your application in to various parts, separating the HTML templates from the controller logic that drives them and creating services to provide specific kinds of functionality to the controllers. This organization of the code can separate concerns in a way that is quite manageable and semantic, but involves certain challenges too.

Some of the services in this project are extremely straight-forward, like the `AlbumService` which provides access to the data for the different albums and the songs they contain. In contrast, I decided to create a service to encapsulate the functionality provided by `plyr`, the complications of which I will describe below.

The functional areas of the UI also deserver their own isolated code structure. Rather than the `Component` concept in React, AngularJS uses other constructs, like templates and directives, to break the UI into digestible parts. BlocJams uses Angular's built in `UrlRouteProvider` to associate different routes with HTML templates. This allows each 'view' of the application to have it's own area of the code.

[[https://tboddyspargo.github.io/img/blocjams3_landing1.png|alt=playback]]

Directives allow for similar segmenting of the code as well as re-using UI functionality across the app. BlocJams has two directives of note: `player-bar`, which is the part of the site that relates to user-facing playback controls; and `song-searcher`, which is an suggestion matching search field. The complexity of these parts of the UI and the potential for them to be involved in several ares of the site made them good candidates for splitting off into their own directives.

## Plyr
In order to play audio in BlocJams Angular, this project includes [Plyr](https://github.com/sampotts/plyr). Plyr is a JavaScript library for media playback in web sites. It targets HTML elements and can also display audio/visual playback controls if desired. In this application, we simply rely on it for playing audio in the browser and exposing functions for various actions 'play', 'pause', 'change song', 'volume up/down', and 'seek'.

In order to expose the relevant `plyr` functionality to the different UI components, I decided to create an Angular Service to wrap around it. This allowed multiple areas of the site to simply 'inject' the service and interact with the shared `plyr` instance. This was important because users can influence playback behavior both from the Album view and the player bar.

## $apply
Working with a library like `plyr` introduced some complications due to the fact that there were events occurring outside of the variables attached to the Angular `$scope`. It took some research to understand the way that Angular maintains awareness of variables values for binding to the view. When changes to variables escape this normal binding-awareness pattern, one must manually tell the `$scope` about these changes by using it's `$apply` method. In the case of BlocJams, I had to use this strategy to ensure the playback position of the player bar was updated when the `plyr` object emitted the `timeupdate` event in the browser. You'll see this behavior in the `AudioService` service.

## Run the Application
To run the application server, clone the repository locally and run the following command:

```
$ npm start
```

This will start running the application. You can open http://localhost:3000/ in your browser to access it.
