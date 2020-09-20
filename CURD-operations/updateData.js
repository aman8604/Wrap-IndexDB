

//updateData function take three arguments (IBB Request,store-name,newDataToStore) and return a promise.
function updateData(db, store, newData) {

    return new Promise((resolve, reject) => {

        let updateTranscation = db.transaction([store], "readwrite");
        let updateStore = updateTranscation.objectStore(store);
        let updateRequest = updateStore.put(newData);
        updateRequest.onerror = function (event) {
            reject({
                status: false,
                msg: event.target.error
            })
        }

        updateTranscation.oncomplete = function (event) {
            resolve({
                status: true,
                msg: "Data Updated Successfully"
            })
        }
        updateTranscation.onerror = function (event) {
            reject({
                status: false,
                msg: event.target.error
            })
        }

    })

}

export {updateData};