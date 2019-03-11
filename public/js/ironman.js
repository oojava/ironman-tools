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
    $('#skill'+statId).text(level);   

  }

  socket.on('statsRecieved', function(msg){
    console.log("statsRecieved: " + msg);
    //$('#response').append($('<li>').text(msg));
    var res = msg.split(" ");
    updateStat(res[0], res[1], res[2]);
    $('#check').removeClass("is-loading");
  });
});
