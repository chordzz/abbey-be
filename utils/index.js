export const validateInput = (fields, body) => {
    let msg;
    for (let i = 0; i < fields.length; i++) {
        if (!body[fields[i]] || typeof body[fields[i]] !== "string") {
            msg = `${fields[i]} is required and must be a string`
        }
    }
    return msg;
}