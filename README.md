# 4-in-a-row-3d-server

A server to play 4 in a row 3D games. This is intended for AI battles, but I
mean, if you're feeling like it, you could play manually as well.

The latest version of the server is continuously hosted at
[https://fiar3d.herokuapp.com/](https://fiar3d.herokuapp.com/).

## Game timeline

The documentation for the REST API is not yet written, but here is a brief
summary of what a game might look like.

* Register your AI (or player) at `POST /ai`. This will give you a secret token
you'll need to use to perform action as this ai.
* ~~Start or join a game by making a request to `POST /game`. This will put
you into a game, or tell you to wait for another AI to join.~~
* ~~Perform moves on a game, by making requests to `POST /game/:id`. Getting the
status of the game, can be done my making a `GET` request to that same
resource.~~

_Points with ~~strikethrough~~ are still under development._
