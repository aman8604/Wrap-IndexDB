

//deleteData function take three arguments (IBB Request,store-name,keyToDelete) and return a promise.
function deleteData(db, storePassed, key) {
    return new Promise((resolve, reject) => {

        let transcation = db.transaction([storePassed], "readwrite");
        let store = transcation.objectStore(storePassed);
        let deleteRequest = store.delete(key);
        deleteRequest.onerror = function (event) {
            reject({
                status: false,
                msg: (event.target.error)
            })
        }
        transcation.oncomplete = function (event) {
            resolve({
                status: true,
                msg: "Data deleted Successfully Successfully"
            })
        }
        transcation.onerror = function (event) {
            reject({
                status: false,
                msg: (event.target.error)
            })
        }

    })
}

export {deleteData};