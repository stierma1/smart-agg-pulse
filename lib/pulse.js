
var Bluebird = require("bluebird");


function Pulse(config){
  this.id = config.id;
  this.client = null;
  this.count = 0;
  this.intervalTime = config.interval || 5000;
  this.interval = null;
}

Pulse.prototype.addTo = function(app){
  var self = this;
  this.client = app.createClient(this.id);
  this.client.updatePredicate("initialized(Type)", ["Pulse"], this.id);
  this.performPulse();
  this.interval = setInterval(function(){
    self.performPulse();
  }, this.intervalTime)
}

Pulse.prototype.performPulse = function(){
  var self = this;
  Bluebird.resolve()
    .then(function(){
      self.client.updatePredicate("pulse(State)", ["high"], self.count);
      self.client.updatePredicate("pulse(State)", ["low"], self.count);
      self.count++;
    })
    .catch(function(err){
      self.client.updatePredicate("error(ActionId, TimeStamp)", ["pulse", Date.now()], err);
    });
}


module.exports = Pulse;
