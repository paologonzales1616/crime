import createStore from "unistore"
import devtools from "unistore/devtools"
import fire from './config/Fire'
import config from './config/Config'
import swal from 'sweetalert';

const store = devtools(
    createStore({
        updateMonth: 1,
        updateDay: 1,
        updateHour: 1,
        updateLocation: -1,
        updateCrime: -1,
        url: '',
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

const url = config.production ? `https://${window.location.host}/` : 'http://127.0.0.1:8000/'
store.setState({ url: url })
const actions = store => ({
    upload: ({ updateMonth, updateDay, updateHour, updateLocation, updateCrime, url }) => {
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
    classify: ({ location, hour, crime, month, startDay, endDay, locationDropdown, crimeDropdown, url }) => {
        if (location === -1 && crime === -1) {
            swal("Error", "Provide specific crime or location!", "error")
        } else if (location > 0 && crime > 0) {
            swal("Error", "One at a time!", "error")
        } else {
            console.log({ location, hour, crime, month, startDay, endDay, locationDropdown, crimeDropdown, url })
            if (crimeDropdown) {
                fetch(`${url}crime`, {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
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
                        // console.log(data)
                        store.setState({ result: Array.reverse(data.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))) })
                        store.setState({ table: true })
                        store.setState({ summaryGraph: false })
                    })
                    .catch(e => console.log(e))
            } else if (locationDropdown) {
                console.log(`${url}location`)
                console.log('location')
                fetch(`${url}location`, {
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
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
                        // console.log(data)
                        store.setState({ resultCrime: Array.reverse(data.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))) })
                        store.setState({ summaryGraph: true })
                        store.setState({ table: false })
                    })
                    .catch(e => console.log(e))
            }
        }
    },
    login: ({ username, password }) => {
        fire.auth().signInWithEmailAndPassword(username, password).then(u => { }).catch(err => console.log(err))
    },
    logout: () => {
        store.setState({
            addForm: false,
            user: {},
            username: '',
            password: '',
            summaryGraph: false,
            table: false,
        })
        fire.auth().signOut().then(data => console.log(data)).catch(error => console.log(error))
        store.setState({ url: url })
    },
    changeLoc: ({ location, crimeDropdown }, e) => {
        store.setState({ location: parseInt(e.target.value) })
        if (parseInt(e.target.value) >= -1) {
            store.setState({ crimeDropdown: true })
        }
        if (parseInt(e.target.value) === -1) {
            store.setState({ crimeDropdown: false })
            store.setState({ lat: 14.1384, lng: 121.3198, zoom: 12 })
        }
        if (parseInt(e.target.value) === 0) {
            store.setState({ lat: 14.1337055, lng: 121.3110916, zoom: 14 })
        }
        if (parseInt(e.target.value) === 1) {
            store.setState({ lat: 14.1785188, lng: 121.3155717, zoom: 14 })
        }
        if (parseInt(e.target.value) === 2) {
            store.setState({ lat: 14.1758462, lng: 121.3390248, zoom: 14 })
        }
        if (parseInt(e.target.value) === 3) {
            store.setState({ lat: 14.178826, lng: 121.3036323, zoom: 14 })
        }
        if (parseInt(e.target.value) === 4) {
            store.setState({ lat: 14.1211849, lng: 121.302093, zoom: 14 })
        }
        if (parseInt(e.target.value) === 5) {
            store.setState({ lat: 14.146323, lng: 121.3117359, zoom: 14 })
        }
        if (parseInt(e.target.value) === 6) {
            store.setState({ lat: 14.1591443, lng: 121.33462, zoom: 14 })
        }
        if (parseInt(e.target.value) === 7) {
            store.setState({ lat: 14.1591443, lng: 121.33462, zoom: 14 })
        }
        if (parseInt(e.target.value) === 8) {
            store.setState({ lat: 14.0823432, lng: 121.2510844, zoom: 14 })
        }
        if (parseInt(e.target.value) === 9) {
            store.setState({ lat: 14.1356191, lng: 121.289527, zoom: 14 })
        }
        if (parseInt(e.target.value) === 10) {
            store.setState({ lat: 14.1581803, lng: 121.3077857, zoom: 14 })
        }
        if (parseInt(e.target.value) === 11) {
            store.setState({ lat: 14.1203577, lng: 121.2905786, zoom: 14 })
        }
        if (parseInt(e.target.value) === 12) {
            store.setState({ lat: 	14.1100429, lng: 121.2699946, zoom: 14 })
        }
        if (parseInt(e.target.value) === 13) {
            store.setState({ lat: 14.141246, lng: 121.3174544, zoom: 14 })
        }
        if (parseInt(e.target.value) === 14) {
            store.setState({ lat: 14.141246, lng: 121.3174544, zoom: 14 })
        }
        if (parseInt(e.target.value) === 15) {
            store.setState({ lat: 14.1668744, lng: 121.3393913, zoom: 14 })
        }
        if (parseInt(e.target.value) === 16) {
            store.setState({ lat: 14.1477456, lng: 121.3154669, zoom: 14 })
        }
    },
    changeCrime: ({ crime, locationDropdown }, e) => {
        store.setState({ crime: parseInt(e.target.value) })
        if (parseInt(e.target.value) >= 1) {
            store.setState({ locationDropdown: true })
        }
        if (parseInt(e.target.value) === -1) {
            store.setState({ locationDropdown: false })
        }
    },
    changeAppAddform: ({ addForm }) => ({ addForm: !addForm }),
    changeUsername: ({ username }, e) => ({ username: e.target.value }),
    changePassword: ({ password }, e) => ({ password: e.target.value }),
    changeUpdateMonth: ({ }, e) => ({ updateMonth: e.target.value }),
    changeUpdateDay: ({ }, e) => ({ updateDay: e.target.value }),
    changeUpdateHour: ({ }, e) => ({ updateHour: e.target.value }),
    changeUpdateLocation: ({ }, e) => ({ updateLocation: e.target.value }),
    changeUpdateCrime: ({ }, e) => ({ updateCrime: e.target.value }),
    changeMonth: ({ month }, e) => ({ month: parseInt(e.target.value) }),
    changeStartDay: ({ startDay }, e) => ({ startDay: parseInt(e.target.value) }),
    changeEndDay: ({ endDay }, e) => ({ endDay: parseInt(e.target.value) }),
    changeHour: ({ hour }, e) => ({ hour: parseInt(e.target.value) }),
});


fetch(`${url}locationIds`, {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})
    .then(res => res.json())
    .then(data => store.setState({ locations: data }))
    .catch(e => console.log(e))

fetch(`${url}crimeIds`, {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
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