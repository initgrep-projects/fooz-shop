# Redux states for fooz

#### Shop

- **List the data** - get all the data of products and show it
  
  - **Cart**: get Items from cart
  
  - **Cart**: add Item To the cart
  
  - **Cart**: Delete Item from the cart
    
    - **Order**: add Items to the order from cart
    
    - **Order**: add Item to the order from shop    
  
  - **Filters**
    
    - **Categories:** fetch all categories
    - **Selectedcategory** : fetch the currently selected category
    - **Sizes** : fetch all sizes
    - **SelectedSize** : fetch currently selectedSize
    - **SortOrders**: All sort orders
    - **selectedSortOrder:** selected Sort Order


```js
 // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCd-ji6MKq7zO6xkvZSq3ynGYOrAHltVY8",
    authDomain: "foozabayas.firebaseapp.com",
    databaseURL: "https://foozabayas.firebaseio.com",
    projectId: "foozabayas",
    storageBucket: "foozabayas.appspot.com",
    messagingSenderId: "226094433636",
    appId: "1:226094433636:web:f5de3d568840beb15be671",
    measurementId: "G-6H5QVBER9C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

```