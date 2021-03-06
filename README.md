# Capstone Project: Spark Streaks PWA

Spark Streaks is an app designed to help people manage their personal goals. The app integrates meaningful incentive techniques such as tracking streaks of activities and fun collectable rewards.

I first came up with this idea as incentive to make myself do core exercises, an activity that I felt I should do on a regular basis but rarely found motivation to do on my own. Personally, I find simple motivational techniques such as streaks and badges very effective. I have used them before in apps such as Duolingo and Garmin with successful results. However, most apps that use these techniques are targeted at a specific type of goals with specific requirements. I wanted to create an app that allowed for more flexibility and could be used for any type of goals. Spark Streaks also puts a twist on the common badge reward system of motivational apps. The badges take the form of collectable characters, an idea taken from games I liked to play as a kid.  

Spark Streaks is in the form of a progressive web app (PWA) built using HTML, CSS, and JavaScript. I used Firebase as the app’s database and hosting server. I chose to create Spark Streaks as a PWA because it seemed like the most convenient and accessible platform. PWAs work on both Apple and Android devices and do not require a device-specific language to create. Additionally, PWAs have many of the same capabilities as native apps as they can be saved to the device’s home screen and used online. There are some downsides as PWAs are still relatively new and have not been fully accepted by some platforms. However, all the main components are widely supported and the missing components were not necessary for my app.

The project consisted of 5 main stages, each of which is described in more detail below.

## 1. Javascript Course
I completed Codecademy's [Learn Javascript](https://www.codecademy.com/learn/introduction-to-javascript) course in order to gain the JavaScript knowledge needed for my app. Proof of completion is included in the section folder.

Course Syllabus:
- Introduction
- Conditionals
- Functions
- Scope
- Arrays
- Loops
- Iterators
- Objects
- Classes
- Browser Compatibility and Transpilation
- Promises
- Async-Await
- Requests

## 2. PWA Tutorial
I created a sample PWA by following The Net Ninja's [PWA Tutortial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7).  

Topics included in tutorial: 
- web app manifests
- adding the app to the home screen
- registering and installing service workers
- pre-cached and dynamically cached assets for offline
- fallback page for uncached routes
- using Firestore and indexedDB to use offline data and background sync
- deploying to Firebase
- testing app

View the [resulting app](https://food-ninja-pwa-80916.web.app/)  

## 3. Prototyping
I used a software called Marvel to design a clickable prototype for my app. This prototype is essentially a series of images that can be click through and navigated as if it were an app, allowing me to design the functionalities, layout, flow of the app without coding. Prototypes are also a very useful tool for user testing.

View the [final prototype](https://marvelapp.com/prototype/g24d4h7)  
View a [walkthrough of the prototype](https://drive.google.com/file/d/1DJ7sVF7Q-ZoQUZKkmFRgSWKpdsb6ePqq/view?usp=sharing)

## 4. User Testing
I had 5 different users test my app prototype in order to evaluate its usability. My testing questions, results, and reflections are all included in the section folder.

## 5. Final Product
My final product is my app in the form of a PWA built using HTML, CSS, JavaScript, and Firebase. I also used Day.js module and the Materialize framework in the creation of the app. This app can be downloaded to your home screen and used like a native app with offline capabilities. Due to limited time, I focused on the most essential functions of my app. See the prototype for my other ideas.

View the [app](https://spark-streaks.firebaseapp.com/)  
View a [walkthrough of the app](https://drive.google.com/file/d/1UoXX-FkwPKk8XtFr3lJVaFBlx-CYtT_6/view?usp=sharing)

Notes on Using the App:  
- Ideally, there should be a pop-up that prompts users to add the app to their home screen; however, this is not supported by all browers/devices. In this case, it can be added manually by clicking the elipsis on an Android device or the share button on an Apple device. 
- In general, Android devices are more supportive of PWAs, so it is best to use an app on an Android device if possible. However, all the essential features are supported on Apple as well.
- Pages are cached for offline use through both a static and a dynamic cache. This means that the main assets will be automatically cached, but in order for other pages to be cached, they must be visted while online first.
- There is currently one known bug with using the app offline: the new goal page does not automatically exit when the form is sumbitted. However, this can easily be sidestepped by manually exiting the form (by using the back button) after submitting. I currently do not know how to fix this without causing more major issues, but I'm hoping to find a solution in the future.
- For the purposes of this project, I decided not to implement authentification. As a result, all users have access to and ability to interact with all the same goals. 