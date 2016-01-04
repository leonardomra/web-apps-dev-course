/********************************************************************/
/* --->>> The following directory and file structure must be obeyed */
/*------------------------------------------------------------------*/
/*                                                                  */
/* |-- yourProject                                                  */
/* |   |-- javascript                                               */
/* |   |-- appManager.js                                            */
/* |       |-- app01                                                */
/* |           |-- main.js                                          */
/* |           |-- model.js                                         */
/* |           |-- view.js                                          */
/* |           |-- controller.js                                    */
/*                                                                  */
/********************************************************************/

(function(apps) {
    var m = {};
    var v = {};
    var c = {};
    var checkList = [];
    var queueTrack = 0;
    var appQueue = apps;
    importScript = function(sSrc, fOnload) {
        var oScript = document.createElement("script");
        oScript.id = "currentScript";
        oScript.type = "text\/javascript";
        if (fOnload) {
            oScript.onload = fOnload;
        }
        document.head.appendChild(oScript);
        oScript.src = sSrc;
    };

    function assignView() {
        checkList.push(true);
        manageLoading();
    }

    function assignModel() {
        checkList.push(true);
        manageLoading();
    }

    function assignController() {
        checkList.push(true);
        manageLoading();
    }

    function importMVCFor(app) {
        importScript(app + "/controller.js", assignController);
        importScript(app + "/model.js", assignModel);
        importScript(app + "/view.js", assignView);
    }

    function manageLoading() {
        if (checkList.length == 3) {
            c = Object.assign(c, Controller);
            m = Object.assign(m, Model);
            v = Object.assign(v, View);
            checkList = [];
            queueTrack++;
            if (queueTrack < appQueue.length) {
                importMVCFor(appQueue[queueTrack]);
            } else {
                startApps();
            }
        }
    }

    function startApps() {
        Model = m;
        View = v;
        Controller = c;
        for (var i in appQueue) {
            importScript(appQueue[i] + "/main.js");
        }
    }
    importMVCFor(appQueue[queueTrack]);
})(["javascript/colorizer", "javascript/clock"]); // <-- declare your apps here