
var Pulse = require("../../lib/pulse");
var chai = require("chai");
chai.should();

describe("#pulse", function(){
  var upData = null;
  var app = {
    createClient: function(id){
      return {
        updatePredicate: function(pred, groundings, data){
          upData = {pred:pred, groundings:groundings, data:data};
        }
      }
    }
  };

  afterEach(function(){
    upData = null;
  });

  it("should create Pulse", function(){
    var pulse = new Pulse({id:"test"});
    pulse.id.should.equal("test");
  });

  it("should addTo application", function(){
    var pulse = new Pulse({id:"test"});
    pulse.addTo(app);
    upData.pred.should.equal("initialized(Type)");
  });

  it("should pulse", function(done){
    var pulse = new Pulse({id:"test", interval:750});
    pulse.addTo(app);
    setTimeout(function(){
      console.log(upData);
      done();
    }, 1000)

  });
})
