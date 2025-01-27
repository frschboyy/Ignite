const getCookie = (cookie_name) => {
    // Construct a RegExp object as to include the variable name
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    console.log(cookie_name)
    try {
        if (document.cookie.match(re)[0]) {
            console.log("True")
            return true // Will raise TypeError if cookie is not found
        }
    } catch {
        console.log("False")
        return false
    }
}