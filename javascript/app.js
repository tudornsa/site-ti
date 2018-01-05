SC.initialize({
    //client_id: '340f063c670272fac27cfa67bffcafc4'
    client_id: '6040fb6bf08c52ea42cac250bb081b3e'
   //client_id: '84affc1c3b6ec37794236e1571a342d0'
});

//Global variables for player and a flag to check pressed play button
var player = null;
var flag = null;

var trackList; //List of tracks
var searched = false; //Flag to check if search was performed


function performSearch(){
    window.event.preventDefault();
    SC.get('/tracks', {
        q: document.getElementById("search-param").value // gets tracks using search word from user
    }).then(function(tracks){
        //console.log("Search value: " + document.getElementById("input").value);
        console.log(tracks);
        var i = 0, j = 0;
        trackList = tracks; //Put tracks in global variable
        tracks.forEach(function(item){
            //console.log(item.title);
          
            var artwork = item.artwork_url;
            var title = item.title;

            if(artwork == null){
                artwork = "imagini/logo/PNG/logo.png";
            }
            
            //Adds div tags with data and a button to play or pause song
            document.getElementById("content").insertAdjacentHTML("beforeend", "<div class='song' id='track-" + j + "'><img src='" + artwork + "'/><h3>" + title + "</h3><button id='play-" + j++ +"' onclick='toggle(" + i++ + ")'></button></div>");
        });
    });
}

function onSearch() {
    window.event.preventDefault();
    //TODO: if nothing found, say so
    if(searched == false){ //first search performed, so nothing to get rid of
        performSearch();
        searched = true;
    }else{//Searched at least once, so must clear previos search results in order to get the new ones
        var node = document.getElementById("content");//selects the parent div(that contains result section)
        flag = null;//resets flag
        player = null;//resets player
        //Clear the response section
        while(node.firstChild){//while node has a child
            node.removeChild(node.firstChild);//remove the first child
        }
        performSearch();
    }
}

function addFooter(artwork, title, id){
    //add footer player
    document.getElementById("player").innerHTML = 
    "<img src='"+ artwork +"' id='avatar'/>" +
    "<h5 id='title'>"+ title +"</h5>" + 
    "<button id='footer-play-btn' onclick='toggle("+ id + ")'></button>";
}

function toggle(i) { //Press play/pause
    var artwork = trackList[i].artwork_url;
    var title = trackList[i].title;

    if(player == null){//First time you press play, creates new player
        SC.stream('/tracks/' + trackList[i].id).then(function(stream){
            document.getElementById("play-" + i).textContent = "Pause";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            addFooter(artwork, title, i);

            //changes button text
            flag = i;//set flag to current button
            player = stream;
            player.play();
        });
    }
    if(i != flag){ //Press play on another song while one is playing
        //Select all buttons that are on wrong state(pause) and set them to play
        var buttons = document.getElementsByTagName("button"); //!!!Careful if you add other buttons add class to this one!!!!
        for(var j=0; j< buttons.length; j++){
            //console.log(buttons[j]);
            if(buttons[j].textContent == "Pause"){
                //TODO: FIX THIS!!!!
                buttons[j].textContent = "Play";
                buttons[j].style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
                buttons[j].style.backgroundSize = "70px";
                
                addFooter(artwork, title, i);
            }
        }
        //Create new player for the new song
        SC.stream('/tracks/' + trackList[i].id).then(function(stream){
            document.getElementById("play-" + i).textContent = "Pause";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            flag = i;//set flag to new button
            player = stream;
            player.play();
        });
    }
    if(player != null && flag == i){ //Toggles play/pause
        if(document.getElementById("play-" + i).textContent == "Play"){
            document.getElementById("play-" + i).textContent = "Pause";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            document.getElementById("footer-play-btn").style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("footer-play-btn").style.backgroundSize = "50px";

            player.play();
        }else if(document.getElementById("play-" + i).textContent == "Pause"){
            document.getElementById("play-" + i).textContent = "Play";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            document.getElementById("footer-play-btn").style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
            document.getElementById("footer-play-btn").style.backgroundSize = "50px";
            
            player.pause();
        }
    }
}