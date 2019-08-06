//---------------------------------------------------------------------------------------
//  post message
//---------------------------------------------------------------------------------------

if (typeof gfb === 'undefined') {
    gfb = {};
}

gfb.Messenger = function(){
    this.command = {};
};

gfb.Messenger.prototype.init = function(target) {
  this.addListeners();
  this.target = target;
};

gfb.Messenger.prototype.receiveMessage = function(event) {
    var origin = event.origin || event.originalEvent.origin;
    if (origin.indexOf(window.location.host) < 0) {
        return;
    }
    var eventData = event.data || event.originalEvent.data;
    this.process(eventData);
};

gfb.Messenger.prototype.sendMessage = function (message) {
    var sender = window.location.protocol + '//' + window.location.host;
    this.target.postMessage(message, sender);
};

gfb.Messenger.prototype.addListeners = function () {
    var proxy = this;
    $(window).on("message", function(e){
    proxy.receiveMessage(e);
  }
  );
};

gfb.Messenger.prototype.process = function (data) {
    // custom code to handle messages
    if ($.isFunction(this.command[data.name])) {
        this.command[data.name](data);
    }
};
// EOS
