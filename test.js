'use strict'
var O=require('./index.js');
var EventEmitter=require('events').EventEmitter
// var EventEmitter=require('eventemitter2')
var dispatcher=new EventEmitter();

const state={
  foo:'x',
  bat:'y'
}

const OState=O(state)(dispatcher);
dispatcher.on('change:foo',(news, olds) => console.log(news, olds));

OState.foo="z";
OState.foo="z";
OState.foo="z";
OState.foo="z";
OState.foo="z";
OState.foo="z";
console.log(state)