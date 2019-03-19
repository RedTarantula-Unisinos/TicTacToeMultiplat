// Slot Value Meanin
//-1 = empty
// 0 = X
// 1 = O

// Value of each one of the 9 slots
var slotValue =
    [               // SLOTS
        -1,-1,-1, // 0 - 1 - 2
        -1,-1,-1, // 3 - 4 - 5
        -1,-1,-1  // 6 - 7 - 8
    ];

// Combinations of 3 slots that can cause a victory
var victoryIds =
    [
        // Row Combinations
        [0,1,2],
        [3,4,5],
        [6,7,8],
        // Column Combinations
        [0,3,6],
        [1,4,7],
        [2,5,8],
        // Diagonal Combinations
        [0,4,8],
        [2,4,6]
     ]

var scoreX = 0; // Many times X has won
var scoreO = 0; // Many times O has won
var turn = 0; // Whose turn it is (0 for X | 1 for O)

var foundVictory = false; // Someone has won the current game
var foundTie = false; // The game has tied

function ClearSlots() // Empties all 9 slots
{
    console.log("Clearing slots");

    foundVictory = false;
    foundTie = false;

    for (var i = 0; i < slotValue.length; i++) {
        slotValue[i] = -1;
        EmptyDrawSlotValue(i);
    }
}

function ClearScores() // X's and O's scores go back to 0 | Clears all 9 slots
{
    scoreX = 0;
    scoreO = 0;
    UpdateScores();
    ClearSlots();
    UpdateLastGame('Cleared Scores');
}

function UpdateScores() // Draws the current score values
{
    console.log("Updating scores");
    
    document.getElementById('scoreX_value').innerHTML = '<b>' + String(scoreX) + '</b>';
    document.getElementById('scoreO_value').innerHTML = '<b>' + String(scoreO) + '</b>';
}

function CheckSlotAvailability(slot) // Checks if the clicked slot is taken or available
{
    console.log("Checking availability");

    if(slotValue[slot] == -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function SwitchTurn() // If it was X's turn, then it'll be O's next | If it was O's turn, then it'll be X's next
{
    console.log("Switched turn");
    if (turn == 0) turn = 1;
    else turn = 0;
}

function DrawSlotValue(slot) // Draws the value of the slot (empty, X or O)
{
    console.log("Drawing slots values");

    var value = ' ';

    if (turn == -1) { value = ' '; }
    else if (turn == 0) { value = 'X'; }
    else if (turn == 1) { value = 'O'; }
    else { value = 'ERROR'; }

    document.getElementById('slot' + slot).innerHTML = '<b>' + value + '</b>';
}

function EmptyDrawSlotValue(slot) // Forces to draw a certain slot as empty
{
    console.log("Drawing slots values");

    var value = ' ';
    document.getElementById('slot' + slot).innerHTML = '<b>' + value + '</b>';
}

function TakeSlot(slot) // Checks for availability oft he slot, for victory, for tie and switches turns
{
    console.log("Trying to take slot");
     // Corrected to be used as the id for the slotValue array
    if (!foundVictory && !foundTie) {
        var availability = CheckSlotAvailability(slot);
        console.log(availability);

        if (availability) {
            slotValue[slot] = turn;
            DrawSlotValue(slot);

            CheckForVictory();

            if (foundVictory) { VictoryFound(); }
            else if (foundTie) { TieFound(); }
            else { SwitchTurn(); }
        }
    }
    
}

function CheckForVictory() // Self explainatory
{
    console.log("Checking for victory");

    if (slotValue[victoryIds[0][0]] != -1 && slotValue[victoryIds[0][0]] == slotValue[victoryIds[0][1]] && slotValue[victoryIds[0][0]] == slotValue[victoryIds[0][2]]) { foundVictory = true; }
    else if (slotValue[victoryIds[1][0]] != -1 && slotValue[victoryIds[1][0]] == slotValue[victoryIds[1][1]] && slotValue[victoryIds[1][0]] == slotValue[victoryIds[1][2]]) { foundVictory = true; }
    else if (slotValue[victoryIds[2][0]] != -1 && slotValue[victoryIds[2][0]] == slotValue[victoryIds[2][1]] && slotValue[victoryIds[2][0]] == slotValue[victoryIds[2][2]]) { foundVictory = true; }

    else if (slotValue[victoryIds[3][0]] != -1 && slotValue[victoryIds[3][0]] == slotValue[victoryIds[3][1]] && slotValue[victoryIds[3][0]] == slotValue[victoryIds[3][2]]) { foundVictory = true; }
    else if (slotValue[victoryIds[4][0]] != -1 && slotValue[victoryIds[4][0]] == slotValue[victoryIds[4][1]] && slotValue[victoryIds[4][0]] == slotValue[victoryIds[4][2]]) { foundVictory = true; }
    else if (slotValue[victoryIds[5][0]] != -1 && slotValue[victoryIds[5][0]] == slotValue[victoryIds[5][1]] && slotValue[victoryIds[5][0]] == slotValue[victoryIds[5][2]]) { foundVictory = true; }

    else if (slotValue[victoryIds[6][0]] != -1 && slotValue[victoryIds[6][0]] == slotValue[victoryIds[6][1]] && slotValue[victoryIds[6][0]] == slotValue[victoryIds[6][2]]) { foundVictory = true; }
    else if (slotValue[victoryIds[7][0]] != -1 && slotValue[victoryIds[7][0]] == slotValue[victoryIds[7][1]] && slotValue[victoryIds[7][0]] == slotValue[victoryIds[7][2]]) { foundVictory = true; }

    else { foundVictory = false; CheckForTie();}
    
}

function CheckForTie() // Self explainatory
{
    var x = true;
    for (var i = 0; i < slotValue.length; i++) {
        if (slotValue[i] == -1) { x = false; return;}
    }
    if (x) { foundTie = true;}
}

function VictoryFound() // If someone won the game, it updates the last game's result, updates the score and clears all 9 slots
{
    console.log("Found victory");

    var lastgamestr = ' ';

    if (turn == 0) { scoreX++; turn = 0; lastgamestr = 'X WON!';}
    else if (turn == 1) { scoreO++; turn = 1; lastgamestr = 'O WON!';}

    UpdateLastGame(lastgamestr);
    UpdateScores();
}

function TieFound() // If the game tied, it updates the last game's result and clears all 9 slots
{
    console.log("Found tie");
    var lastgamestr = 'TIE!';

    UpdateLastGame(lastgamestr);
}

function UpdateLastGame(string) // Updates the last game text
{
    document.getElementById('last_game_display').innerHTML = '<b>Previous Game: ' + string + '</b>';
}
