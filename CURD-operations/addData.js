

//addData function take three arguments (IBB Request,store-name,dataToStore) and return a promise.
function addData(db, storePassed,data) {

    return new Promise((resolve, reject) => {

        let transcation = db.transaction([storePassed], "readwrite");
        let store = transcation.objectStore(storePassed);
        let addRequest = store.add(data);
        transcation.oncomplete = function (event) {
            resolve({
                status: true,
                msg: "Data Added Successfully"
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

export {addData};