

//fetchData function take three arguments (IBB Request,store-name,key) and return a promise.
function fetchData(db, store, key) {
    return new Promise((resolve, reject) => {

        let fetchTranscation = db.transaction([store]); // default mode : readonly
        let fetchStore = fetchTranscation.objectStore(store);
        let fetchRequest = fetchStore.get(key);

        fetchRequest.onsuccess = function (event) {
            resolve({
                status: true,
                data: event.target.result
            })
        }

        fetchRequest.onerror = function (event) {
            reject({
                status: false,
                msg: event.target.error
            })
        }

        fetchTranscation.onerror = function (event) {
            reject({
                status: false,
                msg: event.target.error
            })
        }

    })
}

export {fetchData};