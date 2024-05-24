import cutListCalculator from "./cutListCalculator.js";

onmessage = function(e) {
    const bestCutLists = cutListCalculator.getCutLists(
        ...e.data,
        postMessage
    );
    
    postMessage(bestCutLists);
};
