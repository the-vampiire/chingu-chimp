/**
 * Created by Vampiire on 7/24/17.
 */

module.exports = valStringer = (valObject, key, value) => {
// initially valObject is an object instantiated in the initial slash command response function
    // on subsequent uses the valObject will be a string (passed back in the payload by slack) and
    // needs to be converted back into an object to update the key argument

    typeof valObject === 'string' ? valObject = JSON.parse(valObject) : false;

    valObject[key] = value;

    return JSON.stringify(valObject);
};
