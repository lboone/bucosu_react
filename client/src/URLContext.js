import {createContext} from 'react'
/**
 * Used to pull in the url parameters.
 * Sits outside of all the routes and passes down the route parameters as props to all child components.
 * @param usedIn client/src/routes/index.js
 * @param howTo  const {action, id, params} = useContext(URLContext)
 * @param action add / edit / null etc...
 * @param id     id of document you want to edit / null
 * @param params all params from passed url / null  
 */
export const URLContext = createContext({action:null, id: null, params:{}})