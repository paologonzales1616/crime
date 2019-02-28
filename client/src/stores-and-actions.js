import createStore from "unistore"
import devtools from "unistore/devtools"
import fire from './config/Fire'
import config from './config/Config'
import swal from 'sweetalert';


const url = config.production ? window.location.hostname : 'http://127.0.0.1:8000/'

const store = devtools(
    createStore({
        updateMonth: 1,
        updateDay: 1,
        updateHour: 1,
        updateLocation: -1,
        updateCrime: -1,
        url: url,
        addForm: false,
        locations: [],
        crimes: [],
        resultCrime: [],
        month: 1,
        startDay: 1,
        endDay: 1,
        hour: 1,
        location: -1,
        crime: -1,
        crimeDropdown: false,
        locationDropdown: false,
        result: [],
        summary: {},
        user: {},
        username: '',
        password: '',
        summaryGraph: false,
        table: false,
        lat: 14.1384,
        lng: 121.3198,
        zoom: 12
    })
);

const actions = store => ({
    upload: ({ updateMonth, updateDay, updateHour, updateLocation, updateCrime }) => {
        fetch(`${url}update`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "month": updateMonth,
                "day": updateDay,
                "hour": updateHour,
                "location": updateLocation,
                "crime": updateCrime
            })
        })
            .then(res => res.json())
            .then(data => {
                store.setState({ addForm: false })
                swal("Success", "Uploaded entry to database.", "success");
                console.log(data)
            })
            .catch(e => console.log(e))
    },
    changeUpdateMonth: ({ }, e) => ({ updateMonth: e.target.value }),
    changeUpdateDay: ({ }, e) => ({ updateDay: e.target.value }),
    changeUpdateHour: ({ }, e) => ({ updateHour: e.target.value }),
    changeUpdateLocation: ({ }, e) => ({ updateLocation: e.target.value }),
    changeUpdateCrime: ({ }, e) => ({ updateCrime: e.target.value }),

    classify: ({ location, hour, crime, month, startDay, endDay, locationDropdown, crimeDropdown }) => {
        if (location === -1 && crime === -1) {
            swal("Error", "Provide specific crime or location!", "error")
        } else if (location > 0 && crime > 0) {
            swal("Error", "One at a time!", "error")
        } else {
            if (!locationDropdown) {
                fetch(`${url}crime`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "month": month,
                        "startDay": startDay,
                        "endDay": endDay,
                        "hour": hour,
                        "location": location
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        // store.setState({ resultCrime: data })
                        store.setState({ result: Array.reverse(data.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))) })
                        store.setState({ table: true })
                        store.setState({ summaryGraph: false })
                    })
                    .catch(e => console.log(e))
            }
            if (!crimeDropdown) {
                fetch(`${url}location`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "month": month,
                        "startDay": startDay,
                        "endDay": endDay,
                        "hour": hour,
                        "crime": crime
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        // store.setState({ result: data })
                        store.setState({ resultCrime: Array.reverse(data.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))) })
                        store.setState({ summaryGraph: true })
                        store.setState({ table: false })
                    })
                    .catch(e => console.log(e))
            }
        }
    },
    changeAppAddform: ({ addForm }) => ({ addForm: !addForm }),
    changeUsername: ({ username }, e) => ({ username: e.target.value }),
    changePassword: ({ password }, e) => ({ password: e.target.value }),
    login: ({ username, password }) => {
        fire.auth().signInWithEmailAndPassword(username, password).then(u => { }).catch(err => console.log(err))
    },
    logout: () => {
        store.setState({ user: null })
        store.setState({ crimeDropdown: false })
        store.setState({ locationDropdown: false })
        store.setState({ crime: -1 })
        store.setState({ location: -1 })
        fire.auth().signOut().then(data => console.log(data)).catch(error => console.log(error))
    }
    ,
    changeMonth: ({ month }, e) => ({ month: parseInt(e.target.value) }),
    changeStartDay: ({ startDay }, e) => ({ startDay: parseInt(e.target.value) }),
    changeEndDay: ({ endDay }, e) => ({ endDay: parseInt(e.target.value) }),
    changeHour: ({ hour }, e) => ({ hour: parseInt(e.target.value) }),
    changeLoc: ({ location, crimeDropdown }, e) => {
        console.log(parseInt(e.target.value))
        store.setState({ location: parseInt(e.target.value) })
        if (parseInt(e.target.value) >= -1) {
            store.setState({ crimeDropdown: true })
        }
        if (parseInt(e.target.value) === -1) {
            store.setState({ crimeDropdown: false })
            store.setState({ lat: 14.1384, lng: 121.3198, zoom: 12 })
        }
        if (parseInt(e.target.value) === 18) {
            store.setState({ lat: 14.1600, lng: 121.3484, zoom: 15 })
        }
        if (parseInt(e.target.value) === 2) {
            store.setState({ lat: 14.1848, lng: 121.3098, zoom: 15 })
        }
        if (parseInt(e.target.value) === 5) {
            store.setState({ lat: 14.1886, lng: 121.3013, zoom: 15 })
        }
        if (parseInt(e.target.value) === 3) {
            store.setState({ lat: 14.1800, lng: 121.3341, zoom: 15 })
        }
        if (parseInt(e.target.value) === 19) {
            store.setState({ lat: 14.1468649, lng: 121.310134, zoom: 15 })
        }
        if (parseInt(e.target.value) === 0) {
            store.setState({ lat: 14.1319453, lng: 121.3071996, zoom: 15 })
        }
        if (parseInt(e.target.value) === 10) {
            store.setState({ lat: 14.0949335, lng: 121.2233267, zoom: 15 })
        }
        if (parseInt(e.target.value) === 13) {
            store.setState({ lat: 14.1597844, lng: 121.2878392, zoom: 15 })
        }
        if (parseInt(e.target.value) === 8) {
            store.setState({ lat: 14.1438, lng: 121.3270, zoom: 15 })
        }
        if (parseInt(e.target.value) === 9) {
            store.setState({ lat: 14.1551, lng: 121.3284, zoom: 15 })
        }
        if (parseInt(e.target.value) === 11) {
            store.setState({ lat: 14.1373, lng: 121.2912, zoom: 15 })
        }
        if (parseInt(e.target.value) === 7) {
            store.setState({ lat: 14.1451898, lng: 121.308927, zoom: 15 })
        }
        if (parseInt(e.target.value) === 6) {
            store.setState({ lat: 14.1200636, lng: 121.298772, zoom: 15 })
        }
        if (parseInt(e.target.value) === 17) {
            store.setState({ lat: 14.1572618, lng: 121.3185881, zoom: 15 })
        }
        if (parseInt(e.target.value) === 15) {
            store.setState({ lat: 14.1097306, lng: 121.2520156, zoom: 15 })
        }
        if (parseInt(e.target.value) === 16) {
            store.setState({ lat: 14.1370122, lng: 121.3153588, zoom: 15 })
        }
        if (parseInt(e.target.value) === 14) {
            store.setState({ lat: 14.1154, lng: 121.2827, zoom: 15 })
        }
        if (parseInt(e.target.value) === 1) {
            store.setState({ lat: 14.1846415, lng: 121.3026988, zoom: 15 })
        }
        if (parseInt(e.target.value) === 12) {
            store.setState({ lat: 14.1373, lng: 121.2912, zoom: 15 })
        }
        if (parseInt(e.target.value) === 4) {
            store.setState({ lat: 14.1886, lng: 121.3013, zoom: 15 })
        }
    },
    changeCrime: ({ crime, locationDropdown }, e) => {
        console.log(parseInt(e.target.value))
        store.setState({ crime: parseInt(e.target.value) })
        if (parseInt(e.target.value) >= 1) {
            store.setState({ locationDropdown: true })
        }
        if (parseInt(e.target.value) === -1) {
            store.setState({ locationDropdown: false })
        }
    },
});

fetch(`${url}locationIds`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then(data => store.setState({ locations: data }))
    .catch(e => console.log(e))

fetch(`${url}crimeIds`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then(data => store.setState({ crimes: data }))
    .catch(e => console.log(e))


fire.auth().onAuthStateChanged(user => {
    if (user) {
        store.setState({ user: user })
    } else {
        store.setState({ user: null })
    }
})


export { store, actions };