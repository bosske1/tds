Tds.Services.CollectionDataContainer = {

    collectionContainer: {
        //collectionName
    },

    appName: 'Tds',

    /**
     * get and cache collection
     *
     * @param collectionName
     * @param opts
     */
    get: function(collectionName, opts) {
        var me = this,
            collectionClass = this.buildCollectionClass(collectionName),
            appName = this.getAppName();

        if(typeof opts == 'undefined' && typeof opts.success == 'undefined') {
            console.error('opts.success method must be assigned');

            return false;
        }

        if(this.collectionContainer[collectionName]) {
            return opts.success(me.collectionContainer[collectionName]);
        }

        var currentApp = window[appName],
            collections = currentApp.Collections;

        var collection = new collections[collectionClass]();

        if(opts.url != null && opts.url != '') {
            collection.url = opts.url;
        }

        collection.fetch({
            data: opts.additionalFilters,
            async: false,
            reset: true,
            success: function(collection, response) {
                //now cache collection for future
                me.collectionContainer[collectionName] = collection;

                return opts.success(collection, response);
            },
            failure: function(collection, response) {
                //initialize callback if asked
                if(typeof opts.failure != 'undefined') {
                    return opts.failure(collection, response);
                }
            }
        });
    },

    getCache: function(collectionName) {
        return this.collectionContainer[collectionName];
    },

    /**
     * cache collection
     *
     * @param collectionName
     * @param collection
     * return this
     */
    set: function(collectionName, collection) {
        this.collectionContainer[collectionName] = collection;

        return this;
    },

    /**
     * clear cached collection
     *
     * @param collectionName
     */
    clear: function(collectionName) {
        this.collectionContainer[collectionName] = null;

        return this;
    },

    buildCollectionClass: function(className) {
        var collectionClassName = null,
            collectionClassName= this.capitalizeFirstLetter(className);

        return collectionClassName;
    },

    /**
     *
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    setAppName: function(appName) {
        this.appName = appName;

        return this;
    },

    getAppName: function() {
        return this.appName;
    }
};