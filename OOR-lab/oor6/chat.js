/**
* Executed when the page has finished loading.
*/
window.onload = function () {

    // Create a reference for the required DOM elements.
    var textView = document.getElementById("text-view");
    var buttonSend = document.getElementById("send-button");
    var buttonStop = document.getElementById("stop-button");
    var label = document.getElementById("status-label");

    // Połaczenie do  WebSocket server!
    var socket = new WebSocket("ws://echo.websocket.org");

    /**
    * WebSocket onopen event.
    */
    socket.onopen = function (event) {
        label.innerHTML = "Polaczenie otwarte";
    }

    /**
    * WebSocket funkcja onmessage.
    */
    socket.onmessage = function (event) {
        if (typeof event.data === "string") {
            // Wiadomosc ukazana na ekranie.
            label.innerHTML = label.innerHTML + "<br />Server odpowiedzial: <strong>" + event.data + "</strong>";
        }
    }

    /**
    * WebSocket onclose event.
    */
    socket.onclose = function (event) {
        var code = event.code;
        var reason = event.reason;
        var wasClean = event.wasClean;

        if (wasClean) {
            label.innerHTML = "Poloczenie zakonczylo sie normalnie.";
        }
        else {
            label.innerHTML = "Polaczenie zakonczenie z wiadomoscia: " + reason + " (Code: " + code + ")";
        }
    }

    /**
    * WebSocket funkcja onerror funkcja.
    */
    socket.onerror = function (event) {
        label.innerHTML = "Error: " + event;
    }

    /**
    * Rozłaczenie i zamykanie połaczenia.
    */
    buttonStop.onclick = function (event) {
        if (socket.readyState == WebSocket.OPEN) {
            socket.close();
        }
    }

    /**
    * Wysyłanie pustej wiadomosci.
    */
    buttonSend.onclick = function (event) {
        sendMessage();
    }

    /**
    * Wysyłanie pustej wiadomosci.
    */
    textView.onkeypress = function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    }

    function sendMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(textView.value);

            label.innerHTML = label.innerHTML + "<br />Powiedziales: <strong>" + textView.value + "</strong>";
            textView.value = "";
        }
    }
}
