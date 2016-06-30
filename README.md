# Disolution [v0.0.1]
[![Build Status](https://travis-ci.org/disolution/disolution-app.svg?branch=master)](https://travis-ci.org/disolution/disolution-app)
### Distributed project development collaboration app based on DOCN specification
Basically like open-source Github **discussion threads (issues)** but stored in a git repository using the flexible **DOCN** spec format (human & machine readable json & markdown). Made for all kinds of projects that need organized discussions.


![](https://raw.githubusercontent.com/disolution/disolution-app/gh-pages/screenshots/screenshot_v0.png)

There are no prebuilt binaries for now. Only tested on Mac OS X.

###### Develop
1. Clone
2. Open terminal and run
```shell
npm install
npm run dev
```
3. Test & add an issue / PR @ github
4. ..or just let me know if you would use such a tool

There are no prebuilt executables for now.

#### The idea
All great projects have to start somewhere - this app tries to make it easier for everyone to collaborate offline or online using the most popular distributed version control system - GIT.

From developing personal ideas to easily publishing the projects of the future on
open collaborative sites like [Guaana.com](https://www.guaana.com).

Feel free to help out with the development and discussions.

### Stack
* React, Redux, Material-UI, nodegit, Markdown editor etc - packaged as a simple cross-platform desktop app using Electron

#### Current functionality
* Nice Markdown editor
* Create a new DOCN project repository ( project.json, README.md + optional cover-image.ext )
* Possible to import existing DOCN git repos as projects.
* GIT powers - soon to be integrated into the app ( you can use Github app or SourceTree for now )

#### In the works
* Creating human and machine readable threads in folders
* Clone project from a remote GIT URL in the app
* Manage project remotes
* Automatic but configurable git push / pull for faster iteration

#### Future of Distributed Collaboration
* Co-authoring ( managing and linking team members in the repo )
* Threads - discussion topics
* Integration with github issues, discourse forums. Pulling the most useful developing comments and ideas from external sources to the main project repo for stored and reliable credit proofs.
* Possibility for well defined project dependencies and links (other DOCN projects)
* Linking threads to other threads in other projects
* Guides on how to setup automatic tests / jobs using CI for special project needs

The possibilities are endless!

\* Check the disolution/project-docn repository for a more detailed explanation of the DOCN spec and overall project.

The MIT License (MIT)

Copyright (c) 2016 Henry Kehlmann
