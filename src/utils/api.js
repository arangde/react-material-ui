import axios from 'axios'
import { handleError } from 'utils/helpers'

const singleton = Symbol('SINGLETON')
const singletonEnforcer = Symbol('SINGLETON_ENFORCER')

class Api {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton')
        }

        this._type = 'SingletonEnforcer'

        this.session = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const token = localStorage.getItem('token')

        if (token !== null) {
            this.session.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Api(singletonEnforcer)
        }

        return this[singleton]
    }

    get = (...params) => this.session.get(...params).catch((error) => handleError(error))
    put = (...params) => this.session.put(...params).catch((error) => handleError(error))
    post = (...params) => this.session.post(...params).catch((error) => handleError(error))
    patch = (...params) => this.session.patch(...params).catch((error) => handleError(error))
    delete = (...params) => this.session.delete(...params).catch((error) => handleError(error))
    all = axios.all
}

export default Api.instance
