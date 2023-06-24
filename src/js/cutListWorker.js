import cutListCalculator from "./cutListCalculator.js";

onmessage = function(e) {
    console.log('Message recieved by worker');
    console.log(e.data);
    
    const bestCutLists = cutListCalculator.getCutLists(
        ...e.data
    );

    console.log('Message sent by worker');
    console.log(bestCutLists);

    postMessage(bestCutLists);
};
