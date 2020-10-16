import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducer";
import thunk from 'redux-thunk';
import { languages } from 'languages';
import { API, API_BOOK } from 'service'
import toast from 'helpers/Toast';
import html2canvas from 'html2canvas'

export const store = createStore(reducers, compose(
    applyMiddleware(
        thunk.withExtraArgument({
            API,
            API_BOOK,
            toast
        })
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export const history = require("history").createBrowserHistory()

export const ThemeContext = require('react').createContext(
    languages.ENGLISH // default value
);

export const getRouteNameBasedOnRoleId = (role = 1) => {
    let StaffRoutes = {
        1: 'admin',
        3: 'DMMU'
    }
    return StaffRoutes[role]
}

export const toggleRootClassName = () => {
    var element = document.getElementsByTagName('body')[0];;
    element.classList.toggle("open-sidebar");
}

//COMMON
export const formatToINR = (value) => {
    if (!value) return '0'
    return parseInt(value).toLocaleString('en-IN')
}

export const getApplicationType = () => {
    let pathSplitArray = history.location.pathname.split('/')
    let applicationType = pathSplitArray[2] || ''
    return applicationType
}

export const populateData = (object, searchString, defaultReturnValue = null) => {
    if (!object || typeof object !== "object") return defaultReturnValue
    let splitString = searchString.split('.')
    for (let i = 0; i < splitString.length; i++) {
        if (typeof object[splitString[i]] === "object" && splitString.length > 1) {
            let o = populateData(object[splitString[i]], splitString.splice(i + 1).join('.'))
            if (o != null) return o
        } else { return object[splitString[i]] }
    }

    return defaultReturnValue
}

export const generateQuery = (data) => {

    return Object.keys(data).reduce((acc, key) => {

        if (data[key] !== '') {
            return acc + `${acc !== '?' ? '&' : ''}${key}=${data[key]}`
        }

        return acc

    }, '?')

}

export const getPercentage = (value, total) => {
    if (value && total) {
        let persentage = Math.round((parseInt(value) * 100) / parseInt(total));
        persentage = persentage <= 100 ? persentage : 100
        return `${persentage}`
    }
    return "0"
}

export const validateFileSize = (file, limit) => {
    if (file < limit) {
        return true
    }
    return false
}

export const convertStringToObject = (searchQuery) => {

    try {

        if (!!searchQuery) {

            var search = (searchQuery).substring(1);

            let obj = JSON.parse('{"' + search.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

            return {
                filter: '',
                search: '',
                page: 1,
                sortBy: '',
                ...obj
            }

        }

        return {
            search: '',
            page: 1,
            field: '',
            sortBy: '',
            filter: '',
        }


    } catch (error) {
        // console.log(error, 'd4sds4d')
    }

}


export function validateUploadSize(file) {
    if (!file) return false
    let FileSize = file.files[0].size / 1024 / 1024; // in MB
    return FileSize <= 5
}

export const downloadScreenshotOrPrint = (isPrint = false) => {
    html2canvas(document.body).then(function (canvas) {
        // Export the canvas to its data URI representation
        let base64image = canvas.toDataURL("image/png");
        if (isPrint) {
            let win = window.open();
            win.document.body.innerHTML = '<image src="' + base64image + '" style="width: 100%;"></image>'
            win.focus();
            win.print();
        } else {
            let a = document.createElement("a"); //Create <a>
            a.href = base64image; //Image Base64 Goes here
            a.download = "Image.png"; //File name Here
            a.click();
        }
    });
}

export function moneyFormatBySymbol(value, digits) {
    var val = Math.round(value)
        if (val >= 10000000) {
            val = (val / 10000000).toFixed(0) + ' Cr';
        } else if (val >= 100000) {
            val = (val / 100000).toFixed(0) + ' L';
        } else if (val >= 1000) {
            val = (val / 1000).toFixed(0) + ' K';
        }
    return val;
}

export function moneyFormatBySymbolExact(value, digits) {
    let val = Math.round(value)
    let splited = val.toString().slice(1)
    if(/^[0]*$/.test(splited)){
            if (splited.length >= 7) {
                val = (val / 10000000).toFixed(0) + ' Cr';
            } else if (splited.length >= 5) {
                val = (val / 100000).toFixed(0) + ' L';
            } else if (splited.length >= 3) {
                val = (val / 1000).toFixed(0) + ' K';
            }
    }else{
        val = formatToINR(value)
    }

    return val;
}

export function moneyFormatBySymbolK(value, digits) {
    var val = Math.round(value)
    if (val >= 1000) {
        val = (val / 1000).toFixed(0) + 'K';
    } else {
        val = val
    }
    return val;
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

export function scrollTo(id){ 
    let element = document.getElementById(id)
    console.log(id)
    if(element){
        let offset = getOffset(element)
        console.log(id,offset)
        if(offset)
            window.scrollTo({
                top: offset.top - 250,
                behavior: 'smooth'
            }); 
    }

}