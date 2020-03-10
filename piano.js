//https://codepen.io/gabrielcarol/full/rGeEbY
document.addEventListener("DOMContentLoaded", function(event) { 
  const keys = document.querySelectorAll(".key"),
      note = document.querySelector(".nowplaying"),
      hints = document.querySelectorAll(".hints");

    function playNote(e) {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
        key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

      if (!key) return;

      const keyNote = key.getAttribute("data-note");

      key.classList.add("playing");
      note.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();
    }
    
    function playNoteOnClick(e) {
    
      const audio = document.querySelector(`audio[data-key="${e}"]`),
        key = document.querySelector(`.key[data-key="${e}"]`);

      if (!key) return;

      const keyNote = key.getAttribute("data-note");

      key.classList.add("playing");
      note.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();
    }

    function removeTransition(e) {
        console.log(e.propertyName);
      if (e.propertyName !== "transform") return;
      this.classList.remove("playing");
    }

    function hintsOn(e, index) {
      e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
    }
    

    hints.forEach(hintsOn);

    keys.forEach(key => key.addEventListener("transitionend", removeTransition));
    keys.forEach(key => key.addEventListener("click", function (event) {
        var keyPressed = event.target.innerText;

        if(keyPressed == ';'){
            playNoteOnClick(186)
        }
        else{
            keyPressed = keyPressed.charCodeAt(0);
            playNoteOnClick(keyPressed)
        } 
        }));

    window.addEventListener("keydown", playNote);
    
    
});
