## Introduction

Welcome to David Bowie's Album list app. This app display's all the albums of David Bowie. I have implemented the following requirements

  1. *Listing 10 Albums per page*
  2. *Clicking on an album open's a spoity page of that album.*
  3. *Pagination support to view all the albums.*
  4. *Unit tests.*
  5. *Build support.*
  6. *Page responsive down to 320px width screens.*
  7. ***Deployed it on Amazon EC2***
  
I have also deployed this app on Amazon EC2, *give it a spin*: http://ec2-34-211-21-214.us-west-2.compute.amazonaws.com/

## Installation and Running the application

```bash
git clone https://github.com/sudha1214/spotify-david-bowie.git
cd spotify-david-bowie
npm install -g @angular/cli@1.7.1
npm install
npm start # this will build (ng build) launch the application on local host port 8080
```

Navigate to `http://localhost:8080/`.  

#### Working Demo

<img src="https://i.imgur.com/980NwaD.gif" align="right">

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Unit tests

**Pre-requisites**

`Chrome Headless` browser needs to be installed to run these tests via `Karma`. My MacBook pro(`dev environment)` had `Chrome` browser installed, so I did not have to install anything but I faced issues when running tests on AWS EC2 `Amazon Linux AMI` whihc did not have this pre-requisite installed. I followed this [guide](https://mockingbot.com/posts/run-puppeteer-chrome-headless-on-ec2-amazon-linux) to install the missing packages to get it working.

**Running Unit tests**

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Demo 

###### All 5 tests passing

<img src="https://i.imgur.com/XLzJXtR.gif" align="right">

###### 1 Test failing out of 5

<img src="https://i.imgur.com/K6XIoB1.gif" align="right">

