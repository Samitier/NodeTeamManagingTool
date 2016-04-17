$(function() {
    var socket = io.connect(window.location.origin);
    var myUsername = "";

    var sendMessage = function () {
        var message = $('#inputMessage').val();
        message = cleanInput(message);
        if (message) {
            $('#inputMessage').val('');
            socket.emit('new message', message, myUsername);
        }
    }

    //sends when pressing button
    $("#submitMessage").mouseup(sendMessage);

    //sends when pressing enter
    $(window).keydown(function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });

    //when you recieve your own message
    socket.on("your message", function(msg){
        var html = "<li class='right'><div class='card-panel cyan darken-3'><span class='white-text'>"
            + msg + "</span></div></li>";
        $(html).hide().appendTo("#message-list").fadeIn(1000);
        $("#message-list").animate({ scrollTop: $('#message-list').prop("scrollHeight")}, 1000);
    });

    //when you recieve a message
    socket.on("message", function(msg, name){
        var html = "<li class='left'><div class='card-panel teal'><span class='white-text'><b>" + name +":</b><br>"
            + msg + "</span></div></li>";
        $(html).hide().appendTo("#message-list").fadeIn(1000);
        $("#message-list").animate({ scrollTop: $('#message-list').prop("scrollHeight")}, 1000);
    });


    //when someone connects
    socket.on("client connected", function(clientName){
        var html = "<a href='#!' class='collection-item'>"+clientName+"</a>";
        $(html).hide().appendTo("#main-room").fadeIn(1000);
    });

    //when you connect
    socket.on("you connected", function(myName){
        myUsername = myName;
        var html = "<a href='#!' class='collection-item'>"+myName+" (you)</a>";
        $(html).hide().appendTo("#main-room").fadeIn(1000);
    });

    // Prevents input from having injected markup
    function cleanInput (input) {
        return $('<div/>').text(input).text();
    }
});

