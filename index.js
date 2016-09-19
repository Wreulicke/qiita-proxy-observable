'use strict';
const observable=(function(global){
  // polyfill
  const Proxy=typeof global.Proxy === 'object' && global.Proxy.create &&function(target, handler){
    const internalHandler={}
    internalHandler.get=function get(receiver, property){
      handler.get.call(null, target, property, receiver)
    };
    internalHandler.set=function set(receiver, property, value){
      handler.set.call(null, target, property, value, receiver)
    };
    const apply=handler.apply && function apply(){
      handler.apply.apply(null, [target].concat(arguments));
    }
    if(apply){
      return global.Proxy.createFunction(internalHandler,apply)
    }
    else return global.Proxy.create(internalHandler)
  } || global.Proxy;

  // implementation
  return (state) => (dispatcher) => new Proxy(state,{
    set(target, key, news) {
      const olds = target[key];
      target[key] = news;
      dispatcher.emit(`change:${key}`, news, olds);
      return true;
    },
    get(target, key) {
      console.log(key)
      return target[key];
    },
    apply(){}
  })
})(
  typeof global === 'object' && global.global == global && global || this
);
module.exports=observable;
