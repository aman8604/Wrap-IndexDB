import { addData } from "./CURD-operations/addData";
import { fetchData } from "./CURD-operations/fetchData";
import { updateData } from "./CURD-operations/updateData";
import { deleteData } from "./CURD-operations/deleteData";





//openDatabase function open a dataBase if it exists or creates a new one if it does not exists.
function openDatabase(databaseName, databaseVersion, storeDetails) {
    return new Promise((resolve, reject) => {

        //Setting The Database for different browsers
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };

        //Checking the Support for indexedDB Database
        if (!window.indexedDB) {
            reject({
                status: false,
                msg: "Browser does not have the support for the DataBase"
            });
        }

        //open the database
        var dbRequest = window.indexedDB.open(databaseName, databaseVersion);

        dbRequest.onerror = function (event) {
            reject({
                status: false,
                msg: "Error occured while opening the database"
            })
        };

        dbRequest.onupgradeneeded = function (event) {
            let db = event.target.result;
            if (storeDetails !== undefined) {
                if (!db.objectStoreNames.contains(storeDetails.name)) {
                    let store = db.createObjectStore(storeDetails.name, storeDetails.options);
                }
            }
            else{
                reject({
                    status:false,
                    msg:"Please Pass Store Details"
                })
            }
        }

        dbRequest.onsuccess = function (event) {
            let db = event.target.result;
            console.log("success resolve");
            resolve({
                status:true,
                db:db
            });
        }
    })
}

export {openDatabase,addData,fetchData,updateData,deleteData};