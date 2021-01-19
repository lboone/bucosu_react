
const getObject = () => {
  const locStorage = localStorage.getItem('bucosuObject')
  if (locStorage){
    return JSON.parse(locStorage)
  } else {
    const obj = {'token':null}
    localStorage.setItem('bucosuObject',JSON.stringify(obj))
    return obj
  }
}

const getItem = (itemName) => {
  const obj = getObject()
  if(obj){
    if(obj.hasOwnProperty(itemName)) 
      return obj[itemName]
  }
  return null
}

const setItem = (itemName, itemValue) => {
  const obj = getObject()
  obj[itemName] = itemValue
  localStorage.setItem('bucosuObject',JSON.stringify(obj))
  return getObject()
}

const removeItem = (itemName) => {
  const itemToRemove = getItem(itemName)
  if(itemToRemove){
    const obj = getObject()
    delete obj[itemName]
    localStorage.setItem('bucosuObject',JSON.stringify(obj))
    return getObject()
  }
}

export {
  getObject,
  getItem,
  setItem,
  removeItem,
}