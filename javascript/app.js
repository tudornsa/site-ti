SC.initialize({
    //client_id: '340f063c670272fac27cfa67bffcafc4'
    client_id: '6040fb6bf08c52ea42cac250bb081b3e'
   //client_id: '84affc1c3b6ec37794236e1571a342d0'
});

//Global variables for player and a flag to check pressed play button
var player = null;
var flag = null;

var trackList = []; //List of tracks
var current = null; //track currently playing
var searched = false; //searched value to check if search is the same
var searchP = null;


function performSearch(){
    SC.get('/tracks', {
        q: document.getElementById("search-param").value // gets tracks using search word from user
    }).then(function(tracks){
        var i = 0, j = 0;
        trackList = tracks; //Put tracks in global variable
        tracks.forEach(function(item){
          
            var artwork = item.artwork_url;
            var title = item.title;

            if(artwork == null){
                artwork = "imagini/logo/PNG/logo-5.png";
            }
            
            //Adds div tags with data and a button to play or pause song
            document.getElementById("content").insertAdjacentHTML("beforeend", "<div class='song' id='track-" + j + "'><img src='" + artwork + "'/><h3>" + title + "</h3><button id='play-" + j++ +"' onclick='toggle(" + i++ + ")'></button></div>");
        });
    });
}

function onSearch(event) {
    event.preventDefault();
    if(searchP != document.getElementById("search-param").value){
        searchP = document.getElementById("search-param").value;
        //restart flag
        flag = null;

        document.getElementById("content").style.paddingLeft = "50px";
        document.getElementById("content").style.paddingRight = "30px";
        //TODO: if nothing found, say so
        if(searched == false){ //first search performed, so nothing to get rid of
            //Clear initial content
            document.getElementById("content").innerHTML = "";
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
    
}

function addFooter(artwork, title, i){
    document.getElementById("player").style.height = "100px";
    document.getElementById("player").innerHTML = "";

    if(artwork == null){
        artwork = "imagini/logo/PNG/logo-5.png";
    }
    //add footer player
    document.getElementById("player").innerHTML = 
    "<img src='"+ artwork +"' id='avatar'/>" +
    "<h5 id='title'>"+ title +"</h5>" + 
    "<button id='footer-play-btn' onclick='togglePlayer("+ i +")'>Pause</button>";
}

function togglePlayer(i){
    if(current != null){
        if(document.getElementById("footer-play-btn").textContent == "Play"){ 
            SC.stream('/tracks/' + current.id).then(function(stream){
                if(flag != null && flag != 999999){
                    document.getElementById("play-" + i).textContent = "Pause";
                    document.getElementById("play-" + i).style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
                    document.getElementById("play-" + i).style.backgroundSize = "70px";
                }

                document.getElementById("footer-play-btn").textContent = "Pause";
                document.getElementById("footer-play-btn").style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
                document.getElementById("footer-play-btn").style.backgroundSize = "50px";

                player.play();
            });
        }else if(document.getElementById("footer-play-btn").textContent == "Pause"){
            SC.stream('/tracks/' + current.id).then(function(stream){
                if(flag != null && flag != 999999){
                    document.getElementById("play-" + i).textContent = "Play";
                    document.getElementById("play-" + i).style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
                    document.getElementById("play-" + i).style.backgroundSize = "70px";
                }
                

                document.getElementById("footer-play-btn").textContent = "Play";
                document.getElementById("footer-play-btn").style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
                document.getElementById("footer-play-btn").style.backgroundSize = "50px";

                player.pause();
            });
        }
    }
}

function toggle(i) { //Press play/pause
    var artwork = trackList[i].artwork_url;
    var title = trackList[i].title;
    current = trackList[i];

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
            if(buttons[j].textContent == "Pause"){
                //TODO: FIX THIS!!!!
                buttons[j].textContent = "Play";
                buttons[j].style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
                buttons[j].style.backgroundSize = "70px";
            }
        }
        addFooter(artwork, title, i);
        //Create new player for the new song
        SC.stream('/tracks/' + trackList[i].id).then(function(stream){
            document.getElementById("play-" + i).textContent = "Pause";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            /*addFooter(artwork, title, i);*/
            
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

            document.getElementById("footer-play-btn").textContent = "Pause";
            document.getElementById("footer-play-btn").style.background = "url('imagini/icons/pause-btn.png') no-repeat center center";
            document.getElementById("footer-play-btn").style.backgroundSize = "50px";
            


            player.play();
        }else if(document.getElementById("play-" + i).textContent == "Pause"){
            document.getElementById("play-" + i).textContent = "Play";
            document.getElementById("play-" + i).style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
            document.getElementById("play-" + i).style.backgroundSize = "70px";

            document.getElementById("footer-play-btn").textContent = "Play";
            document.getElementById("footer-play-btn").style.background = "url('imagini/icons/play-btn.png') no-repeat center center";
            document.getElementById("footer-play-btn").style.backgroundSize = "50px";
            

            player.pause();
        }
    }
}

function populate(){
    trackList = [];
    flag = 999999; //ceva ce nu e null
    searchP = null;
    var trackId = [155621254, 156613180, 97278798, 174476240, 88038665, 60289612, 244894351, 195728711, 132925029, 243703866, 300216295, 178043838];//tracks on user landing page
    var i = 0, j = 0;
    document.getElementById("content").innerHTML = "";//Delete all previous content
    document.getElementById("content").innerHTML = "<h2>Recommended for you</h2>";
    for(var index = 0; index < trackId.length; index++){
        SC.get('/tracks/' + trackId[index], {
            limit: 1 //only 1 song
        }).then(function(track){

            var artwork = track.artwork_url;
            var title = track.title;

            //add to global track list
            trackList.push(track);
    
            if(artwork == null){
                artwork = "imagini/logo/PNG/logo-5.png";
            }
                
            //Adds div tags with data and a button to play or pause song
            document.getElementById("content").innerHTML += "<div class='song hot-song' id='track-" + j + "'><img src='" + artwork + "'/><h3>" + title + "</h3><button id='play-" + j++ +"' onclick='toggle(" + i++ + ")'>Play</button></div>";
            });       
    }
}

