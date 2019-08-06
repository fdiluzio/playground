//---------------------------------------------------------------------------------------
//  post message
//---------------------------------------------------------------------------------------

if (typeof selt === 'undefined') {
    selt = {};
}

selt.Messenger = function(){
    this.command = {};
};

selt.Messenger.prototype.init = function(target) {
  this.addListeners();
  this.target = target;
};
selt.Messenger.prototype.receiveMessage = function(event) {

    var origin = event.origin || event.originalEvent.origin;
    if (origin.indexOf(window.location.host) < 0) {
        return;
    }
    var eventData = event.data || event.originalEvent.data;

    this.process(eventData);
};
selt.Messenger.prototype.sendMessage = function (message) {
    var sender = window.location.protocol + '//' + window.location.host;
    this.target.postMessage(message, sender);
};
selt.Messenger.prototype.addListeners = function () {
    var proxy = this;
    $(window).on("message", function(e){
    proxy.receiveMessage(e);
  }
  );
};
selt.Messenger.prototype.process = function (data) {
    // custom code to handle messages
    if ($.isFunction(this.command[data.name])) {
        this.command[data.name](data);
    }
};
// EOS
