import moment from 'moment'
/** 
 * isValidDate(value)
 * @param value - A date value to compare as a string
 * @return boolean 
 */
export const isValidDate = (value) => {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}

/** 
 * isValidDate(value)
 * @param origDate - A date value to format
 * @param format - The format of the date - default 'MM/DD/YYYY'
 * @dependecy moment.js
 * @return string 
 */
export const formatDate = (origDate, format='MM/DD/YYYY') => {
  return moment(origDate.split('T')[0]).format(format)
}