import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import MAIN_EN from './en/main.json';
import MAIN_VI from './vi/main.json';


export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
}

export const resources = {
    en: {
        main: MAIN_EN
    },
    vi: {
        main: MAIN_VI
    }
}


i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    ns: ['home', 'product'],
    fallbackLng: 'vi',
    defaultNS: 'main',
    interpolation: {
        escapeValue: false
    }
})



