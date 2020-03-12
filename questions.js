var in_order_notes = ["DO",
                      "DO#",
                      "RÉ",
                      "RÉ#",
                      "MI",
                      "FA",
                      "FA#",
                      "SOL",
                      "SOL#",
                      "LA",
                      "LA#"
                      "SI",
                     ]
var tones = ["m", "M"]
var bemoles = ["", "b"]
var fifthClycle = [["7b", "6b", "5b", "4b", "3b", "2b", "1b", "0", "1#", "2#", "3#", "4#", "5#", "6#", "7#"],
                   ["DObM", "SOLbM", "LAbM", "MIbM", "SIbM", "FAM", "DOM", "SOLM", "RÉM", "LAM", "MIM", "SIM", "FA#M", "DO#M"],
                   ["LAbm", "MIbm", "SIbm", "FAm", "DOm", "SOLm", "RÉm", "LAm", "MIm", "SIm", "FA#m", "DO#m", "SOL#m", "RÉ#m", "LA#m"]
                  ]


/*
    Formule pour les notes de l'accord mineur
    premiere note, 3 demi ton pour la deuxieme note, 4 demi ton pour la troisieme
    Formule pour les notes de laccord majeur
    premiere note, 4 demi ton pour la deuxieme note, 3 demi ton pour la troisieme
    */

function generate_accord_question(){
    var random_note_index = Math.floor(Math.random() * in_order_notes.length);
    var note = in_order_notes[random_note_index];
    var bemol = Math.round(Math.random());
    var tone = Math.round(Math.random());

    var question = "Quelle sont les notes de l'accord de " + note + bemoles[bemol] + tones[tone] + " ?";

    if(tone == 0){
        var note_index = random_note_index - bemol;
        var answer = [note_index, (note_index + 3) % in_order_notes.length, (note_index + 3 + 4) % in_order_notes.length];
    }
    else{
        var note_index = random_note_index - bemol;
        var answer = [note_index, (note_index + 4) % in_order_notes.length, (note_index + 4 + 3) % in_order_notes.length];
    }

    return [question, answer]
}



