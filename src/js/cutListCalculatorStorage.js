import CutPiece from "./cutPiece";
import UncutPiece from "./uncutPiece";

/** Module with interface using IndexedDB to store and perform CRUD operations on CutPieces and UncutPieces added by User, in addition to CutList last calculated by User. */
const cutListCalculatorStorage = (() => {
    /** Reference to IDBFactory object to use IndexedDB interface. */
    const indexedDB = window.indexedDB
        || window.mozIndexedDB
        || window.webkitIndexedDB
        || window.msIndexedDB
        || window.shimIndexedDB;

    /** Name of database used for Cut List Calculator app. */
    const databaseName = 'CutListCalculatorDatabase';

    /**
     * Requests database to open and calls callback method during success event. 
     * @param {Function} onSuccessCallback 
     */
    function openDatabase(onSuccessCallback) {
        // Create request to open database
        const request = indexedDB.open(databaseName, 1);

        // Request Event: onerror
        request.onerror = function(event) {
            console.error(
                'An error occurred with IndexedDB', 
                event.target.errorCode
            );
        };

        // Request Event: onupgradeneeded
        request.onupgradeneeded = function() {
            // Save reference to IDBDatabase
            const db = request.result;
            
            // Create stores for CutPiece, UncutPiece, and CutList using id as keyPath
            const cutPieceStore = db.createObjectStore('cutPieces', { keyPath: 'id', });
            const uncutPieceStore = db.createObjectStore('uncutPieces', { keyPath: 'id', });
            const cutListsStore = db.createObjectStore('cutLists', { keyPath: 'id', });

            /**
             * Create index for each CutPiece/UncutPiece store to query all 
             * pieces with the same thickness x width (example: all 2x4's).
             */
            cutPieceStore.createIndex(
                'thickness_and_width', 
                ['thickness', 'width'], 
                { unique: false, }
            );
            uncutPieceStore.createIndex(
                'thickness_and_width', 
                ['thickness', 'width'], 
                { unique: false, }
            );
        };

        // Set the database open request success event callback function
        request.onsuccess = onSuccessCallback;
    }

    /**
     * Accesses CutPiece/UncutPiece store and passes it to a callback function.
     * @param {Function} callback 
     * @param {Boolean} isCutPiece 
     * @param {String} mode - Type of access to be performed on the transaction: 'readonly' or 'readwrite'
     */
    function accessPieceStore(callback, isCutPiece = true, mode = 'readwrite') {
        openDatabase((event) => {
            // Save reference to database
            const db = event.target.result;

            // Create readwrite transaction of store 
            const transaction = db.transaction(
                isCutPiece ? 'cutPieces' : 'uncutPieces', 
                mode
            );
            
            // Create store using transaction
            const store = transaction.objectStore(
                isCutPiece ? 'cutPieces' : 'uncutPieces'
            );

            // Pass store to callback function
            callback(store);

            // When transaction is complete, close database
            transaction.oncomplete = function() {
                db.close();
            };
        });
    }

    /**
     * Adds CutPiece/UncutPiece to database if it does NOT already exist, else updates existing values.
     * @param {CutPiece|UncutPiece} piece 
     * @param {Boolean} isCutPiece 
     */
    function savePiece(piece, isCutPiece = true) {
        accessPieceStore((store) => {
            // Save piece to store
            store.put(piece.toJson());
        }, isCutPiece); 
    }

    /**
     * Adds CutPiece to database if it does NOT already exist, else updates existing values.
     * @param {CutPiece} cutPiece 
     */
    function saveCutPiece(cutPiece) {
        if (!(cutPiece instanceof CutPiece)) { return; }

        savePiece(cutPiece, true);
    }

    /**
     * Adds UncutPiece to database if it does NOT already exist, else updates existing values.
     * @param {UncutPiece} uncutPiece 
     */
    function saveUncutPiece(uncutPiece) {
        if (!(uncutPiece instanceof UncutPiece)) { return; }

        savePiece(uncutPiece, false);
    }

    /**
     * Gets all CutPieces, UncutPieces, and CutList from database and passes 
     * them as arguments to a callback function.
     * @param {Function} callback 
     */
    function getAllPieces(callback) {
        let cutPieces = [];
        let uncutPieces = [];

        openDatabase((event) => {
            // Save reference to database
            const db = event.target.result;

            // Create readonly transaction of both CutPiece and UncutPiece stores
            const transaction = db.transaction(
                ['cutPieces', 'uncutPieces'], 
                'readonly'
            );

            // Create stores for both CutPieces and UncutPieces
            const cutPiecesStore = transaction.objectStore('cutPieces');
            const uncutPiecesStore = transaction.objectStore('uncutPieces');

            /**
             * Get all CutPieces JSON data from store, sort by length in 
             * DESCENDING order, and then create CutPiece using the JSON data.
             */
            cutPiecesStore.getAll().onsuccess = function(event) {
                cutPieces = event.target.result
                    .sort((a,b) => b.length - a.length)
                    .map((cutPieceJson) => CutPiece.createFromJson(cutPieceJson));
            }

            /**
             * Get all UncutPieces JSON data from store, sort by length in 
             * ASCENDING order, and then create UncutPiece using the JSON data.
             */
            uncutPiecesStore.getAll().onsuccess = function(event) {
                uncutPieces = event.target.result
                    .sort((a,b) => a.length - b.length)
                    .map((uncutPieceJson) => UncutPiece.createFromJson(uncutPieceJson));
            }

            /**
             * When transaction is complete, pass any CutPieces and UncutPieces 
             * to callback function, and then close the database.
             */
            transaction.oncomplete = function() {
                callback(cutPieces, uncutPieces);

                db.close();
            };
        });
    }
    
    /**
     * Gets all CutPieces OR UncutPieces from database and passes them as 
     * argument to callback function.
     * @param {Function} onCompleteCallback 
     * @param {Boolean} isCutPiece 
     */
    function getAllPiecesBase(onCompleteCallback, isCutPiece) {
        accessPieceStore((store) => {
            /**
             * Get all CutPieces/UncutPieces JSON data from store and create 
             * class instance of piece using JSON data. Then pass array of 
             * class instances into callback function.
             */
            store.getAll().onsuccess = function(event) {
                const pieces = event.target.result
                    .map((piece) => 
                        isCutPiece 
                        ? CutPiece.createFromJson(piece) 
                        : UncutPiece.createFromJson(piece)
                    );
                
                    onCompleteCallback(pieces);
            };
        }, isCutPiece, 'readonly');
    }

    /**
     * Gets all CutPieces from database and passes them as argument to callback 
     * function.
     * @param {Function} onCompleteCallback 
     */
    function getAllCutPieces(onCompleteCallback) {
        getAllPiecesBase(onCompleteCallback, true);
    }

    /**
     * Gets all UncutPieces from database and passes them as argument to callback 
     * function.
     * @param {Function} onCompleteCallback 
     */
    function getAllUncutPieces(onCompleteCallback) {
        getAllPiecesBase(onCompleteCallback, false);
    }

    /**
     * Deletes CutPiece/UncutPiece from the database.
     * @param {CutPiece|UncutPiece} piece 
     * @param {Boolean} isCutPiece 
     */
    function deletePiece(piece, isCutPiece) {
        accessPieceStore((store) => {
            // Delete piece from store using 'id' property
            store.delete(piece.id);
        }, isCutPiece);
    }

    /**
     * Deletes CutPiece from the database.
     * @param {CutPiece} cutPiece
     */
    function deleteCutPiece(cutPiece) {
        if (!(cutPiece instanceof CutPiece)) { return; }

        deletePiece(cutPiece, true);
    }

    /**
     * Deletes UncutPiece from the database.
     * @param {UncutPiece} uncutPiece
     */
    function deleteUncutPiece(uncutPiece) {
        if (!(uncutPiece instanceof UncutPiece)) { return; }

        deletePiece(uncutPiece, false);
    }

    /**
     * Deletes all CutPieces/UncutPieces from database.
     * @param {Boolean} isCutPiece 
     */
    function deleteAllPieces(isCutPiece) {
        accessPieceStore((store) => {
            // Clear store of all CutPieces/UncutPieces
            store.clear();
        }, isCutPiece);
    }

    /** Deletes all CutPieces from database. */
    function deleteAllCutPieces() {
        deleteAllPieces(true);
    }

    /** Deletes all UncutPieces from database. */
    function deleteAllUncutPieces() {
        deleteAllPieces(false);
    }

    /** Adds example CutPieces to database. */
    function initializeDatabaseCutPieces() {
        accessPieceStore((store) => {
            // Create CutPieces and save them to the store
            [
                [2,4,15*12+11,4],
                [2,4,15*12+4,2],
                [2,4,7*12,32],
                [2,4,8.5,8],
                [2,4,5*12+10,4],
                [2,4,2*12+9,6],
                [2,4,2*12+11.5,2],
            ].forEach((data) => {
                store.put(new CutPiece(...data).toJson());
            });
        }, true);
    }

    /** Adds example UncutPieces to database. */
    function initializeDatabaseUncutPieces() {
        accessPieceStore((store) => {
            // Create UncutPieces and save them to the store
            [
                [2,4,48,2.75],
                [2,4,96,2.98],
                [2,4,120,3.86],
                [2,4,144,4.62],
                [2,4,192,6.16],
            ].forEach((data) => {
                store.put(new UncutPiece(...data).toJson());
            });
        }, false);
    }
    
    /** Deletes entire database. */
    function deleteDatabase() {
        indexedDB.deleteDatabase(databaseName);
    }
    
    return {
        saveCutPiece,
        saveUncutPiece,
        getAllPieces,
        getAllCutPieces,
        getAllUncutPieces,
        deleteCutPiece,
        deleteUncutPiece,
        deleteAllCutPieces,
        deleteAllUncutPieces,
        initializeDatabaseCutPieces,
        initializeDatabaseUncutPieces,
        deleteDatabase,
    };
})();

export default cutListCalculatorStorage;
