import validate from "validate.js";
import moment from 'moment'
export let checkNumericData = "1234567890";
export let checkUpperCaseData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export let checkLowerCaseData = "abcdefghijklmnopqrstuvwxyz";
export let checkSpecialCharData = "~!@#$%^&amp;*()?>&lt;:;/";


validate.validators.validateOldPassword = (value, other, key, attributes) => {
  let newPassword = attributes[other]
  if (!value) return "^Password is required";
  if (newPassword === value) return "^Old password and new password cannot be same";
}

validate.validators.validateConfirmAccountNumber = (value, other, key, attributes) => {
  let accNumber = attributes[other]
  if (accNumber !== value) return "^Invalid Confirm Account Number";
}

validate.validators.validateMembers = (value, other, key, attributes) => {
  if (other) {
    let { shouldMatch, fields } = other
    let totalMembers=parseInt(attributes[shouldMatch])
    if(totalMembers){
      let total = fields.filter(data => attributes[data]).reduce((acc, value) => {
        return acc + parseInt(attributes[value])
      }, 0)
      if(totalMembers !== total) return "^Total should match total members";
    }

  }
}

validate.validators.validateIsLesserThan = (value, other, key, attributes) => {
  if (other) {
    let { shouldLesserThan, fields } = other
    let value=parseInt(attributes[shouldLesserThan])
    if(value){
      let total = fields.filter(data => attributes[data]).reduce((acc, value) => {
        return acc + parseInt(attributes[value])
      }, 0)
      if(value <= total) return "^Total should be lesser than total members";
    }
  }
}

validate.validators.validateStaffPassword = (value) => {
  if (!value) return "^Password is required";
  if (!new RegExp(/^[A-Za-z0-9_@].{7,16}$/).test(value))
    return "^Password should be between 8-16 alphanumeric"
}

validate.validators.validatePassword = (value, options, key, attributes) => {
  if (!value) return "^Password is required";
  if (!new RegExp(/^\d+$/).test(value) || value.length > 6)
    return "^Password should be 6 characters and numeric"
};

validate.validators.object = (object, other, key) => {
  let { value, type, validation } = object
  let isValid = true
  if (type === 'date' && value && validation) {
    isValid = moment().diff(moment(value, 'x').format('YYYY-MM-DD'), 'year') > validation.min
      && moment().diff(moment(value, 'x'), 'year') < validation.max
  }
  if (isValid)
    return !value ? ' Field is required' : null
  return ` Field should be in the range ${validation.min} - ${validation.max}`

}

validate.validators.validateAgeFromGender = (value, other, key, attributes) => {
  console.log(value, other, key, attributes)
  let gender = attributes[other]
  if(value == 0 ) return "cannot be 0"
  if(gender === '1'){
    if(value > 36) return "must be below 36"
  } 
  if(gender === '2'){
    if(value > 40) return "must be below 40"
  }
}

validate.validators.validateGovtProof = (value, other, key, attributes) => {
  let type = attributes["proofTypeData"]
  let govtid = attributes[key]
if(type !== undefined){
  if(type.regexType == "aadhar") {
    if(!new RegExp(/^\d{12}(\d{2})?$/).test(govtid)) return "is invalid"
  } 
  if(type.regexType == "pan"){
    if(!new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/).test(govtid.toUpperCase())) return "is invalid"
  }
  if(type.regexType == "passport"){
    if(!new RegExp(/[a-zA-Z]{2}[0-9]{7}/).test(govtid)) return "is invalid"
  }
  if(type.regexType == "voterId"){
    if(!new RegExp(/^([a-zA-Z]){3}([0-9]){7}?$/g).test(govtid)) return "is invalid"
  }
  if(type.regexType == "driverLicence"){
    if(!new RegExp(/^([a-zA-Z]){2}[0-9]{13}$/).test(govtid)) return "is invalid"
  }
}
}

validate.validators.validateWithRegex = (value, other, key, attributes) => {
  let type = attributes[other]
  if(type !== undefined){
    if(type == "numeric") {
      if(value && !new RegExp(/^(0|[1-9][0-9]*)$/).test(value)) return "should be numberic"
    }else if(type == "alphaNumeric"){
      if(value &&!new RegExp(/^\w+$/).test(value)) return "should be alphanumeric"
    }
  }
}

export default validate;