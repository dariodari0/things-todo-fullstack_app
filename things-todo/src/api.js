const API_URL = '/api/todos/';

export async function getThingsToDo() {
    return fetch(API_URL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {
                            errMess: data.message
                        };
                        throw err;
                    })
                } else {
                    let err = "Please try later, server is not responding now. Sorry."
                    throw err;
                }
            }
            return resp.json();
        });
}

export async function createNewThingToDo(thing) {
    return fetch(API_URL, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                name: thing
            })
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {
                            errMess: data.message
                        };
                        throw err;
                    })
                } else {
                    let err = "Please try later, server is not responding now. Sorry."
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function removeThingToDo(id) {
    const delete_Req_URL = API_URL + id;
    return fetch(delete_Req_URL, {
            method: 'DELETE',
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {
                            errMess: data.message
                        };
                        throw err;
                    })
                } else {
                    let err = "Please try later, server is not responding now. Sorry."
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function updateThingToDo(thing){
    const update_Req_URL = API_URL + thing._id;
    return fetch(update_Req_URL, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({completed: !thing.completed})
    })
    .then(resp => {
     if(!resp.ok){
         if(resp.status >= 400 && resp.status < 500) {
             return resp.json().then(data => {
                 let err = {errMess: data.message};
                 throw err;
             })
         } else {
             let err = "Please try later, server is not responding now. Sorry."
             throw err;
         }
     }
     return resp.json();
    })
}