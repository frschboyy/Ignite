const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccount.json");
const { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const initializeApp = require('firebase/app');
const bodyParser = require('body-parser');
const filestore = require("session-file-store")(sessions)
const adminkey = "/VdN3d0nRPuxrfhfwDq1oJ4iAWp3eFYpa1lKHT8Lh4fJaGj1M0D"
// const cookieParser
// const { getAuth, createUserWithEmailAndPassword } = require( "firebase/auth");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const firebaseConfig = {
    apiKey: "AIzaSyCUWeKM2xwmjXzh7Kw2WLWaU5LfwYAvYCw",
    authDomain: "youth-ignite-e2db8.firebaseapp.com",
    projectId: "youth-ignite-e2db8",
    storageBucket: "youth-ignite-e2db8.appspot.com",
    messagingSenderId: "728656070262",
    appId: "1:728656070262:web:6094fcf4a73771d4bcc157",
    measurementId: "G-6CVLF8HMJE"
};

// Initialize Firebase
const firebase = initializeApp.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebase)

app.set('view engine', 'hbs');
app.set('views', 'views')

const oneDay = 1000 * 60 * 60 * 24;

// cookie parser middleware
app.use(cookieParser());

//session middleware
app.use(sessions({
    name: "Sessioonnnnn",
    secret: "8Ge2xLWOImX2HP7R1jVy9AmIT0ZN68oSH4QXIyRZyVqtcl4z1I",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, httpOnly: false },
    resave: false,
    store: new filestore({ logFn: function () { } }),
    path: "./sessions/"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.render('homepage');
});

app.get('/home-page', (request, response) => {
    response.render('homepage');
});

app.get('/about-us', (request, response) => {
    response.render('aboutus')
})

app.get('/donation-form', (request, response) => {
    response.render('donation')
});

app.get('/contact-us', (request, response) => {
    response.render('contactus')
})

app.get(adminkey, async (request, response) => {
    try {
        // Get Booking Data from firebase
        const snapshot = await db.collection('Travel Details').get()
        const bookingData = snapshot.docs.map(doc => doc.data());
        response.render('reports', { bookingData })
    } catch (error) {
        console.error('Error during retrieval')
        response.status(500).send('Error retrieving data')
    }
});

app.post('/booking-data', async (request, response) => {
    try {
        const bookingData = request.body;
        const { fName, lName, email } = request.session.user;
        bookingData.user = {
            fName: fName,
            lName: lName,
            email: email
        };

        console.log("Received booking data:", bookingData)

        const docRef = await db.collection('Travel Details').add(bookingData);
        console.log("User booked successfully with ID: ", docRef.id);
        response.status(201).json({ message: "Booking was successfull!" });
    } catch (error) {
        console.error("Error booking:", error);
        response.status(500).json({ message: "Error booking" });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});