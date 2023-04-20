import './styles/meyer_reset.scss';
import './styles/styles.scss';
import cutListCalculator from './js/cutListCalculator.js';
import CutPiece from './js/cutPiece.js';
import {CrossSection, UncutPiece} from './js/uncutPiece.js';
import {cutList} from './js/cutList.js';
import cutListCalculatorComponent from './js/components/cutListCalculatorComponent.js';

(() => {
    //cutListCalculator.init();
    cutListCalculatorComponent.init();

    function getCutListWithLeastLeftoverMaterial(cutPieces, possibleLengthsArr) {
        // Sort cutPieces by cutLength in decreasing order
        cutPieces.sort((a,b) => b.cutLength - a.cutLength);

        // Create array where each value represents a single quantity cutPiece
        // instead of normal array of cutPieces that has any number quantity in the
        // 'quantity' property.
        let individualCutPieces = cutPieces.flatMap((cutPiece) => {
            return new Array(cutPiece.quantity)
                .fill(cutPiece);
        });

        // Create array where each value represents index in corresponding 
        // individualCutPieces array. If a individual CutPiece is selected for 
        // a cut sequence, it's index is removed from this array.
        let availableCutPiecesByIndex = Array.from(
            {length: individualCutPieces.length},
            (value, index) => index
        );

        let currCutSequence, tempAvailableCutPiecesByIndex, bestCut;
        let finalCutList = [];

        while (availableCutPiecesByIndex.length) {
            bestCut = {
                cutSequence: undefined,
                availableCutPiecesByIndex: undefined,
            };

            possibleLengthsArr.forEach((length) => {
                tempAvailableCutPiecesByIndex = [ ...availableCutPiecesByIndex ];

                currCutSequence = cutList.getCutList(length, individualCutPieces, tempAvailableCutPiecesByIndex);
                
                if ((bestCut.cutSequence == undefined) 
                    || (bestCut.cutSequence[-1] > currCutSequence[-1])
                ) {
                    bestCut.cutSequence = currCutSequence;
                    bestCut.availableCutPiecesByIndex = [...tempAvailableCutPiecesByIndex];
                }
            });
            
            finalCutList.push(bestCut.cutSequence);
            availableCutPiecesByIndex = [ ...bestCut.availableCutPiecesByIndex ];
        }
        console.log(finalCutList);

        // Get cut list for first possible length
        
        // Set bestCutList to first cut list
        
        // Get cut list for next possible length
        
        // If new cut list has less remaining length than bestCutList, set 
        // bestCutList to new cut list
        
        // Once reach end of possible length array, save bestCutList to final cut list sequence

        // Repeat once again with remaining individualCutPieces
    }

    // ------------------------------------------------------------------------

    console.log('Test: Example');

    let cutPieces = [
        new CutPiece(2, 4, 19.875, 3),
        new CutPiece(2, 4, 39.875, 3),
        new CutPiece(2, 4, 49.875, 3),
    ];

    const crossSection2x4 = new CrossSection(2,4);
    let uncutPieces = [
        new UncutPiece(crossSection2x4, 48, 275),
        new UncutPiece(crossSection2x4, 96, 298),
        new UncutPiece(crossSection2x4, 120, 386),
        new UncutPiece(crossSection2x4, 144, 462),
    ];

    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------

    console.log('Test: See-Saw');
    
    cutPieces = [
        new CutPiece(4, 4, 36, 2),
        new CutPiece(4, 4, 35+5/16, 2),
        new CutPiece(4, 4, 30+21/32, 2),
        new CutPiece(4, 4, 22.5, 4),
    ];

    const crossSection4x4 = new CrossSection(4,4);
    uncutPieces = [
        new UncutPiece(crossSection4x4, 72, 1228),
        new UncutPiece(crossSection4x4, 96, 1548),
        new UncutPiece(crossSection4x4, 120, 2238),
        new UncutPiece(crossSection4x4, 144, 2748),
    ];
    
    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------
    
    console.log('Test: Saw Horses');

    uncutPieces = [
        new UncutPiece(crossSection2x4, 48, 275),
        new UncutPiece(crossSection2x4, 96, 298),
        new UncutPiece(crossSection2x4, 120, 386),
        new UncutPiece(crossSection2x4, 144, 462),
    ];
    cutPieces = [
        new CutPiece(2, 4, 36, 4),
        new CutPiece(2, 4, 32+1/8, 8),
        new CutPiece(2, 4, 34, 2),
    ];

    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------
    
    console.log('Test: Wood Shed');

    uncutPieces = [
        new UncutPiece(crossSection2x4, 48, 275),
        new UncutPiece(crossSection2x4, 96, 298),
        new UncutPiece(crossSection2x4, 120, 386),
        new UncutPiece(crossSection2x4, 144, 462),
        new UncutPiece(crossSection2x4, 16*12, 616),
    ];
    cutPieces = [
        new CutPiece(2, 4, 15*12+11, 4),
        new CutPiece(2, 4, 15*12+4, 2),
        new CutPiece(2, 4, 7*12, 32),
        new CutPiece(2, 4, 8.5, 8),
        new CutPiece(2, 4, 5*12+10, 4),
        new CutPiece(2, 4, 2*12+9, 6),
        new CutPiece(2, 4, 2*12+11.5, 2),
    ];

    // ISSUE: Very long time
    //debugger;
    //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    window.cutListCalculator = cutListCalculator;
})();
