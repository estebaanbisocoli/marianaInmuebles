import firestore from './firestore'
export default {
    state: {
        errorFirebase: '',
    },
    mutations: {

        cleanError(state) {
            state.errorFirebase = {}
        },
        newError(state, error) {
            state.errorFirebase = error
        }
    },
    actions: {

    }
}