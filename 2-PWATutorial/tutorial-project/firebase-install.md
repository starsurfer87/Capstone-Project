


see google firebase instructions:  

https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize

'''
    $ npm init
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help init` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    package name: (tutorial-project) firebase-pwa
    version: (1.0.0)
    description: Tutorial project for Firebase PWA
    entry point: (sw.js)
    test command:
    git repository:
    keywords:
    author: skye
    license: (ISC)
    About to write to C:\Users\stars\Dev\Capstone\PWA-Tutorial\tutorial-project\package.json:

    {
    "name": "firebase-pwa",
    "version": "1.0.0",
    "description": "Tutorial project for Firebase PWA",
    "main": "sw.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "skye",
    "license": "ISC"
    }


    Is this OK? (yes)

    stars@omen MINGW64 ~/Dev/Capstone/PWA-Tutorial/tutorial-project (main)

'''


'''
    $ npm install -save firebase

    > core-js@3.6.5 postinstall C:\Users\stars\Dev\Capstone\PWA-Tutorial\tutorial-project\node_modules\core-js
    > node -e "try{require('./postinstall')}catch(e){}"

    Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

    The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
    > https://opencollective.com/core-js
    > https://www.patreon.com/zloirock

    Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


    > protobufjs@6.10.2 postinstall C:\Users\stars\Dev\Capstone\PWA-Tutorial\tutorial-project\node_modules\protobufjs
    > node scripts/postinstall

    npm notice created a lockfile as package-lock.json. You should commit this file.
    npm WARN firebase-pwa@1.0.0 No repository field.

    + firebase@8.2.7
    added 86 packages from 94 contributors and audited 86 packages in 21.186s

    3 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities


    stars@omen MINGW64 ~/Dev/Capstone/PWA-Tutorial/tutorial-project (main)

'''


There is still no 'firebase' command, need to install the CLI for that:
see https://firebase.google.com/docs/cli?authuser=0#install_the_firebase_cli

'''
    Windows
    You can install the Firebase CLI for Windows using one of the following options:

    Option	Description	Recommended for...
    1) standalone binary	Download the standalone binary for the CLI. Then, you can access the executable to open a shell where you can run the firebase command.	New developers

    2) Developers not using or unfamiliar with Node.js
    npm	Use npm (the Node Package Manager) to install the CLI and enable the globally available firebase command.	Developers using Node.js
'''


'''
    stars@omen MINGW64 ~/Dev/Capstone/PWA-Tutorial/tutorial-project (main)
    $ npm install -g firebase-tools
    npm WARN deprecated @types/filesize@5.0.0: This is a stub types definition. filesize provides its own type definitions, so you do not need this insta
    lled.
    npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
    npm WARN deprecated har-validator@5.1.5: this library is no longer supported
    C:\Users\stars\AppData\Roaming\npm\firebase -> C:\Users\stars\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js
    npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.3.1 (node_modules\firebase-tools\node_modules\chokidar\node_modules\fsevents):
    npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","a
    rch":"x64"})

    + firebase-tools@9.4.0
    updated 1 package in 23.646s

    stars@omen MINGW64 ~/Dev/Capstone/PWA-Tutorial/tutorial-project (main)

'''

it is installed here:

C:\Users\stars\AppData\Roaming\npm\firebase -> C:\Users\stars\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js


