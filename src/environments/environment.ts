// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyCd-ji6MKq7zO6xkvZSq3ynGYOrAHltVY8',
    authDomain: 'foozabayas.firebaseapp.com',
    databaseURL: 'https://foozabayas.firebaseio.com',
    projectId: 'foozabayas',
    storageBucket: 'foozabayas.appspot.com',
    messagingSenderId: '226094433636',
    appId: '1:226094433636:web:f5de3d568840beb15be671',
    measurementId: 'G-6H5QVBER9C'
  },
  geoAddress :{
    apiToken: 'FvP2hbvX7qbpnyps6_nwJ21OvCRkEk3-KhRUGF4A_WpFOn4PAfSK1RHJljxc3faSnAY',
    accessTokenUrl: 'https://www.universal-tutorial.com/api/getaccesstoken',
    userEmail: 'initgrep@gmail.com',
    countriesUrl: 'https://www.universal-tutorial.com/api/countries/',
    statesUrl: 'https://www.universal-tutorial.com/api/states/',
    cityUrl: 'https://www.universal-tutorial.com/api/cities/'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
