import './styles/meyer_reset.scss';
import './styles/styles.scss';
import cutListCalculator from './js/cutListCalculator.js';
import CutPiece from './js/cutPiece.js';
import UncutPiece from './js/uncutPiece.js';
import cutListCalculatorComponent from './js/cutListCalculatorComponent.js';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';
import '@fortawesome/fontawesome-free/js/solid.min.js';

(() => {
    function getInches(feet, inches = 0, topFraction = 0, bottomFraction = 32) {
        return feet * 12 + inches + topFraction / bottomFraction;
    }

    // ------------------------------------------------------------------------

    console.log('Test: Example');

    let cutPieces = [
        new CutPiece(2, 4, 19.875, 3),
        new CutPiece(2, 4, 39.875, 3),
        new CutPiece(2, 4, 49.875, 3),
    ];
    
    let uncutPieces = [
        new UncutPiece(2, 4, 48, 275),
        new UncutPiece(2, 4, 96, 298),
        new UncutPiece(2, 4, 120, 386),
        new UncutPiece(2, 4, 144, 462),
    ];
    
    // $10.70
    // 3,3,4,5
    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------

    console.log('Test: See-Saw');
    
    cutPieces = [
        new CutPiece(4, 4, 36, 2),
        new CutPiece(4, 4, 35+5/16, 2),
        new CutPiece(4, 4, 30+21/32, 2),
        new CutPiece(4, 4, 22.5, 4),
    ];

    uncutPieces = [
        new UncutPiece(4, 4, 72, 12.28),
        new UncutPiece(4, 4, 96, 15.48),
        new UncutPiece(4, 4, 120, 22.38),
        new UncutPiece(4, 4, 144, 27.48),
    ];
    
    // $52.32
    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);
    //cutListCalculatorComponent.init(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------
    
    console.log('Test: Saw Horses');

    uncutPieces = [
        new UncutPiece(2, 4, 48, 275),
        new UncutPiece(2, 4, 96, 298),
        new UncutPiece(2, 4, 120, 386),
        new UncutPiece(2, 4, 144, 462),
    ];
    cutPieces = [
        new CutPiece(2, 4, 36, 4),
        new CutPiece(2, 4, 32+1/8, 8),
        new CutPiece(2, 4, 34, 2),
    ];

    // $16.84
    cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------
    
    console.log('Test: Wood Shed');

    uncutPieces = [
        new UncutPiece(2, 4, 48, 2.75),
        new UncutPiece(2, 4, 96, 2.98),
        new UncutPiece(2, 4, 120, 3.86),
        new UncutPiece(2, 4, 144, 4.62),
        new UncutPiece(2, 4, 16*12, 6.16),
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
    
    // $148.60
    //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);
    //cutListCalculatorComponent.init(cutPieces, uncutPieces);
    //return;
    // ------------------------------------------------------------------------

    console.log('Test: Wood Shed 8x12 with 16" spacing');

    uncutPieces = [
        //new UncutPiece(2, 4, 48, 3.07),
        new UncutPiece(2, 4, 7*12, 3.55),
        new UncutPiece(2, 4, 96, 3.73),
        new UncutPiece(2, 4, 9*12, 4.65),
        new UncutPiece(2, 4, 120, 5.42),
        new UncutPiece(2, 4, 12*12, 6.54),
        new UncutPiece(2, 4, 16*12, 8.72),
        // new UncutPiece(2, 6, 4*12, 4.92),
        // new UncutPiece(2, 6, 8*12, 6.52),
        // new UncutPiece(2, 6, 10*12, 8.72),
        // new UncutPiece(2, 6, 14*12, 11.97),
        // new UncutPiece(2, 6, 16*12, 13.98),
    ];
    
    cutPieces = [
        new CutPiece(2, 4, getInches(12), 6),
        new CutPiece(2, 4, getInches(11,5), 2),
        new CutPiece(2, 4, getInches(8), 2),
        new CutPiece(2, 4, getInches(7,9), 10),
        new CutPiece(2, 4, getInches(7,5), 3),
        new CutPiece(2, 4, getInches(7), 35),
        new CutPiece(2, 4, getInches(6,6,1,2), 4),
        new CutPiece(2, 4, getInches(3,10,1,8), 4),
        new CutPiece(2, 4, getInches(3,5,3,8), 4),
        new CutPiece(2, 4, getInches(2,5,23), 4),
        new CutPiece(2, 4, getInches(1,10,23), 2),
        new CutPiece(2, 4, getInches(1,2,1,2), 27),
        new CutPiece(2, 4, getInches(1,1,3,4), 2),
        new CutPiece(2, 4, getInches(1,1,1,8), 2),
        new CutPiece(2, 4, getInches(1,1), 4),
        new CutPiece(2, 4, getInches(1,0,1,4), 4),
        new CutPiece(2, 4, getInches(0,10,1,4), 2),
        new CutPiece(2, 4, getInches(0,8,1,2), 2),
        new CutPiece(2, 4, getInches(0,8,5), 4),
        new CutPiece(2, 4, getInches(0,2,27), 4),
        new CutPiece(2, 6, getInches(5,6), 2),
        new CutPiece(2, 6, getInches(4,10,9,16), 24),
        new CutPiece(2, 6, getInches(1,2,1,2), 14),
        new CutPiece(2, 6, getInches(1,1,3,4), 4),
    ];
    
    // $289.82
    //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);
    //cutListCalculatorComponent.init(cutPieces, uncutPieces);
    //return;

    // ------------------------------------------------------------------------

    console.log('Test: Wood Shed 8x12 with 24" spacing');
    
    cutPieces = [
        new CutPiece(2, 4, getInches(12), 6),
        new CutPiece(2, 4, getInches(11,5), 2),
        new CutPiece(2, 4, getInches(8), 2),
        new CutPiece(2, 4, getInches(7,9), 10),
        new CutPiece(2, 4, getInches(7,5), 3),
        new CutPiece(2, 4, getInches(7), 27),
        new CutPiece(2, 4, getInches(6,6,1,2), 4),
        new CutPiece(2, 4, getInches(3,8,17), 4),
        new CutPiece(2, 4, getInches(3,5,3,8), 4),
        new CutPiece(2, 4, getInches(2,5,23), 4),
        new CutPiece(2, 4, getInches(1,10,23), 2),
        new CutPiece(2, 4, getInches(1,10,1,2), 10),
        new CutPiece(2, 4, getInches(1,8,1,4), 4),
        new CutPiece(2, 4, getInches(1,7,3,8), 4),
        new CutPiece(2, 4, getInches(1,6,1,4), 2),
        new CutPiece(2, 4, getInches(1,2,1,2), 9),
        new CutPiece(2, 4, getInches(1,1,3,4), 2),
        new CutPiece(2, 4, getInches(1,1,1,8), 2),
        new CutPiece(2, 4, getInches(1,0,1,2), 4),
        new CutPiece(2, 4, getInches(0,7,1,2), 2),
        new CutPiece(2, 4, getInches(0,5,1,2), 4),
        //new CutPiece(2, 6, getInches(13,4,5), 2),
        // new CutPiece(2, 6, getInches(5,6), 2),
        // new CutPiece(2, 6, getInches(4,10,9,16), 18),
        // new CutPiece(2, 6, getInches(1,10,1,2), 8),
        // new CutPiece(2, 6, getInches(1,9,3,4), 4),
    ];
    
    // $265.35 (2x4 only)
    //cutListCalculator.getCheapestCutList(cutPieces, uncutPieces);
    cutListCalculatorComponent.init(cutPieces, uncutPieces);
    return;

    // ------------------------------------------------------------------------

    console.log('Different dimensions');

    cutPieces = [
        new CutPiece(2, 4, 36, 4),
        new CutPiece(2, 4, 32+1/8, 8),
        new CutPiece(2, 4, 34, 2),
        new CutPiece(4, 4, 36, 2),
        new CutPiece(4, 4, 35+5/16, 2),
        new CutPiece(4, 4, 30+21/32, 2),
        new CutPiece(4, 4, 22.5, 4),
    ];

    uncutPieces = [
        new UncutPiece(4, 4, 72, 12.28),
        new UncutPiece(4, 4, 96, 15.48),
        new UncutPiece(4, 4, 120, 22.38),
        new UncutPiece(4, 4, 144, 27.48),
        new UncutPiece(2, 4, 48, 2.75),
        new UncutPiece(2, 4, 96, 2.98),
        new UncutPiece(2, 4, 120, 3.86),
        new UncutPiece(2, 4, 144, 4.62),
    ];

    // let cutLists = cutListCalculator.getCutLists(cutPieces, uncutPieces);
    // console.log(cutLists);
    cutListCalculatorComponent.init(cutPieces, uncutPieces);

    // ------------------------------------------------------------------------

    window.cutListCalculator = cutListCalculator;
})();
