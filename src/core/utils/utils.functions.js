/**
 * transformation an model to FormData object for post data in the backend
 * @param {*} model
 */
export function modelToFormData(model){
        const formData = new FormData();
        for(let data in model){
            if (data !== 'photo' || data !== 'doc')formData.append(data,model[data]);
        }
        if(model.photo){
            formData.append('photo', model.photo);
        }
        if(model.doc){
            formData.append('doc', model.doc);
        }
        return formData;
}


/**
 * Put first letter to Upper case
 * @param {*} a
 */
export function strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + a.substr(1);
}

/**
 * Put first letter to lower case
 * @param {*} a
 */
export function strLcFirst(a) {
    return (a + '').charAt(0).toLowerCase() + a.substr(1);
}



/**
 * generate auto key
 */
export function generateKey() {
    return (performance.now() + '').replace('.', '') + (Math.random() + '').replace('.', '');
}

/**
 * Filter your data
 * @param {*} text
 * @param {*} name
 * @param {*} data
 */
export function filterData(text, name, data) {
    let filteredData = null;

    if (name === "global") {
        filteredData = data.filter(
            (item) => {
                for (let val in item) {
                    let test = "" + item[val];
                    if (test.includes(text)) {
                        return item;
                    }
                }
            }
        );
    } else {
        filteredData = data.filter(
            (item) => {
                let test = "" + item[name];
                if (test.includes(text)) {
                    return item;
                }
            }
        )
    }
    return filteredData;
}


