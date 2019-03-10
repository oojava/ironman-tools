$(function(){
  var socket = io();
  $('form').submit(function() {
    $('#check').addClass("is-loading");
    socket.emit('nameLookup', $('#rsn').val());
  });
  $('#check').click(function(){
    $('#check').addClass("is-loading");
    socket.emit('nameLookup', $('#rsn').val());
  });
  function lookupPlayer(){
    $('#check').addClass("is-loading");
    socket.emit('nameLookup', $('#rsn').val());
  }

  function updateStat(statId, level, xp){
    
  }


  socket.on('statsRecieved', function(msg){
    console.log("statsRecieved: " + msg);
    $('#response').append($('<li>').text(msg));
    $('#check').removeClass("is-loading");
  });
});
