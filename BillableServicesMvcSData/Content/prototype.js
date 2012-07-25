From: "Saved by Windows Internet Explorer 9"
Subject: 
Date: Tue, 24 Jul 2012 17:26:34 -0400
MIME-Version: 1.0
Content-Type: text/html;
	charset="Windows-1252"
Content-Transfer-Encoding: quoted-printable
Content-Location: http://prototypejs.org/assets/2009/8/31/prototype.js
X-MimeOLE: Produced By Microsoft MimeOLE V6.1.7601.17609

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML><HEAD>
<META content=3D"text/html; charset=3Dwindows-1252" =
http-equiv=3DContent-Type>
<META name=3DGENERATOR content=3D"MSHTML 9.00.8112.16447"></HEAD>
<BODY>/* Prototype JavaScript framework, version 1.6.1 * (c) 2005-2009 =
Sam=20
Stephenson * * Prototype is freely distributable under the terms of an =
MIT-style=20
license. * For details, see the Prototype web site: =
http://www.prototypejs.org/=20
* =
*------------------------------------------------------------------------=
--*/=20
var Prototype =3D { Version: '1.6.1', Browser: (function(){ var ua =3D=20
navigator.userAgent; var isOpera =3D =
Object.prototype.toString.call(window.opera)=20
=3D=3D '[object Opera]'; return { IE: !!window.attachEvent &amp;&amp; =
!isOpera,=20
Opera: isOpera, WebKit: ua.indexOf('AppleWebKit/') &gt; -1, Gecko:=20
ua.indexOf('Gecko') &gt; -1 &amp;&amp; ua.indexOf('KHTML') =3D=3D=3D -1, =
MobileSafari:=20
/Apple.*Mobile.*Safari/.test(ua) } })(), BrowserFeatures: { XPath:=20
!!document.evaluate, SelectorsAPI: !!document.querySelector, =
ElementExtensions:=20
(function() { var constructor =3D window.Element || window.HTMLElement; =
return=20
!!(constructor &amp;&amp; constructor.prototype); })(),=20
SpecificElementExtensions: (function() { if (typeof =
window.HTMLDivElement !=3D=3D=20
'undefined') return true; var div =3D document.createElement('div'); var =
form =3D=20
document.createElement('form'); var isSupported =3D false; if =
(div['__proto__']=20
&amp;&amp; (div['__proto__'] !=3D=3D form['__proto__'])) { isSupported =
=3D true; } div=20
=3D form =3D null; return isSupported; })() }, ScriptFragment:=20
'<SCRIPT[^>]*&gt;([\\S\\s]*?)&lt;\/script&gt;', JSONFilter:=20
/^\/\*-secure-([\s\S]*)\*\/\s*$/, emptyFunction: function() { }, K: =
function(x)=20
{ return x } }; if (Prototype.Browser.MobileSafari)=20
Prototype.BrowserFeatures.SpecificElementExtensions =3D false; var =
Abstract =3D { };=20
var Try =3D { these: function() { var returnValue; for (var i =3D 0, =
length =3D=20
arguments.length; i &lt; length; i++) { var lambda =3D arguments[i]; try =
{=20
returnValue =3D lambda(); break; } catch (e) { } } return returnValue; } =
}; /*=20
Based on Alex Arnell's inheritance implementation. */ var Class =3D =
(function() {=20
function subclass() {}; function create() { var parent =3D null, =
properties =3D=20
$A(arguments); if (Object.isFunction(properties[0])) parent =3D=20
properties.shift(); function klass() { this.initialize.apply(this, =
arguments); }=20
Object.extend(klass, Class.Methods); klass.superclass =3D parent; =
klass.subclasses=20
=3D []; if (parent) { subclass.prototype =3D parent.prototype; =
klass.prototype =3D new=20
subclass; parent.subclasses.push(klass); } for (var i =3D 0; i &lt;=20
properties.length; i++) klass.addMethods(properties[i]); if=20
(!klass.prototype.initialize) klass.prototype.initialize =3D=20
Prototype.emptyFunction; klass.prototype.constructor =3D klass; return =
klass; }=20
function addMethods(source) { var ancestor =3D this.superclass =
&amp;&amp;=20
this.superclass.prototype; var properties =3D Object.keys(source); if=20
(!Object.keys({ toString: true }).length) { if (source.toString !=3D=20
Object.prototype.toString) properties.push("toString"); if =
(source.valueOf !=3D=20
Object.prototype.valueOf) properties.push("valueOf"); } for (var i =3D =
0, length =3D=20
properties.length; i &lt; length; i++) { var property =3D properties[i], =
value =3D=20
source[property]; if (ancestor &amp;&amp; Object.isFunction(value) =
&amp;&amp;=20
value.argumentNames().first() =3D=3D "$super") { var method =3D value; =
value =3D=20
(function(m) { return function() { return ancestor[m].apply(this, =
arguments); };=20
})(property).wrap(method); value.valueOf =3D =
method.valueOf.bind(method);=20
value.toString =3D method.toString.bind(method); } =
this.prototype[property] =3D=20
value; } return this; } return { create: create, Methods: { addMethods:=20
addMethods } }; })(); (function() { var _toString =3D =
Object.prototype.toString;=20
function extend(destination, source) { for (var property in source)=20
destination[property] =3D source[property]; return destination; } =
function=20
inspect(object) { try { if (isUndefined(object)) return 'undefined'; if =
(object=20
=3D=3D=3D null) return 'null'; return object.inspect ? object.inspect() =
:=20
String(object); } catch (e) { if (e instanceof RangeError) return '...'; =
throw=20
e; } } function toJSON(object) { var type =3D typeof object; switch =
(type) { case=20
'undefined': case 'function': case 'unknown': return; case 'boolean': =
return=20
object.toString(); } if (object =3D=3D=3D null) return 'null'; if =
(object.toJSON)=20
return object.toJSON(); if (isElement(object)) return; var results =3D =
[]; for=20
(var property in object) { var value =3D toJSON(object[property]); if=20
(!isUndefined(value)) results.push(property.toJSON() + ': ' + value); } =
return=20
'{' + results.join(', ') + '}'; } function toQueryString(object) { =
return=20
$H(object).toQueryString(); } function toHTML(object) { return object =
&amp;&amp;=20
object.toHTML ? object.toHTML() : String.interpret(object); } function=20
keys(object) { var results =3D []; for (var property in object)=20
results.push(property); return results; } function values(object) { var =
results=20
=3D []; for (var property in object) results.push(object[property]); =
return=20
results; } function clone(object) { return extend({ }, object); } =
function=20
isElement(object) { return !!(object &amp;&amp; object.nodeType =3D=3D =
1); }=20
function isArray(object) { return _toString.call(object) =3D=3D "[object =
Array]"; }=20
function isHash(object) { return object instanceof Hash; } function=20
isFunction(object) { return typeof object =3D=3D=3D "function"; } =
function=20
isString(object) { return _toString.call(object) =3D=3D "[object =
String]"; }=20
function isNumber(object) { return _toString.call(object) =3D=3D =
"[object Number]";=20
} function isUndefined(object) { return typeof object =3D=3D=3D =
"undefined"; }=20
extend(Object, { extend: extend, inspect: inspect, toJSON: toJSON,=20
toQueryString: toQueryString, toHTML: toHTML, keys: keys, values: =
values, clone:=20
clone, isElement: isElement, isArray: isArray, isHash: isHash, =
isFunction:=20
isFunction, isString: isString, isNumber: isNumber, isUndefined: =
isUndefined });=20
})(); Object.extend(Function.prototype, (function() { var slice =3D=20
Array.prototype.slice; function update(array, args) { var arrayLength =
=3D=20
array.length, length =3D args.length; while (length--) array[arrayLength =
+ length]=20
=3D args[length]; return array; } function merge(array, args) { array =
=3D=20
slice.call(array, 0); return update(array, args); } function =
argumentNames() {=20
var names =3D =
this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]=20
.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '') .replace(/\s+/g,=20
'').split(','); return names.length =3D=3D 1 &amp;&amp; !names[0] ? [] : =
names; }=20
function bind(context) { if (arguments.length &lt; 2 &amp;&amp;=20
Object.isUndefined(arguments[0])) return this; var __method =3D this, =
args =3D=20
slice.call(arguments, 1); return function() { var a =3D merge(args, =
arguments);=20
return __method.apply(context, a); } } function =
bindAsEventListener(context) {=20
var __method =3D this, args =3D slice.call(arguments, 1); return =
function(event) {=20
var a =3D update([event || window.event], args); return =
__method.apply(context,=20
a); } } function curry() { if (!arguments.length) return this; var =
__method =3D=20
this, args =3D slice.call(arguments, 0); return function() { var a =3D =
merge(args,=20
arguments); return __method.apply(this, a); } } function delay(timeout) =
{ var=20
__method =3D this, args =3D slice.call(arguments, 1); timeout =3D =
timeout * 1000=20
return window.setTimeout(function() { return __method.apply(__method, =
args); },=20
timeout); } function defer() { var args =3D update([0.01], arguments); =
return=20
this.delay.apply(this, args); } function wrap(wrapper) { var __method =
=3D this;=20
return function() { var a =3D update([__method.bind(this)], arguments); =
return=20
wrapper.apply(this, a); } } function methodize() { if (this._methodized) =
return=20
this._methodized; var __method =3D this; return this._methodized =3D =
function() {=20
var a =3D update([this], arguments); return __method.apply(null, a); }; =
} return {=20
argumentNames: argumentNames, bind: bind, bindAsEventListener:=20
bindAsEventListener, curry: curry, delay: delay, defer: defer, wrap: =
wrap,=20
methodize: methodize } })()); Date.prototype.toJSON =3D function() { =
return '"' +=20
this.getUTCFullYear() + '-' + (this.getUTCMonth() + 1).toPaddedString(2) =
+ '-' +=20
this.getUTCDate().toPaddedString(2) + 'T' + =
this.getUTCHours().toPaddedString(2)=20
+ ':' + this.getUTCMinutes().toPaddedString(2) + ':' +=20
this.getUTCSeconds().toPaddedString(2) + 'Z"'; }; RegExp.prototype.match =
=3D=20
RegExp.prototype.test; RegExp.escape =3D function(str) { return=20
String(str).replace(/([.*+?^=3D!:${}()|[\]\/\\])/g, '\\$1'); }; var=20
PeriodicalExecuter =3D Class.create({ initialize: function(callback, =
frequency) {=20
this.callback =3D callback; this.frequency =3D frequency; =
this.currentlyExecuting =3D=20
false; this.registerCallback(); }, registerCallback: function() { =
this.timer =3D=20
setInterval(this.onTimerEvent.bind(this), this.frequency * 1000); }, =
execute:=20
function() { this.callback(this); }, stop: function() { if (!this.timer) =
return;=20
clearInterval(this.timer); this.timer =3D null; }, onTimerEvent: =
function() { if=20
(!this.currentlyExecuting) { try { this.currentlyExecuting =3D true;=20
this.execute(); this.currentlyExecuting =3D false; } catch(e) {=20
this.currentlyExecuting =3D false; throw e; } } } }); =
Object.extend(String, {=20
interpret: function(value) { return value =3D=3D null ? '' : =
String(value); },=20
specialChar: { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': =
'\\r',=20
'\\': '\\\\' } }); Object.extend(String.prototype, (function() { =
function=20
prepareReplacement(replacement) { if (Object.isFunction(replacement)) =
return=20
replacement; var template =3D new Template(replacement); return =
function(match) {=20
return template.evaluate(match) }; } function gsub(pattern, replacement) =
{ var=20
result =3D '', source =3D this, match; replacement =3D=20
prepareReplacement(replacement); if (Object.isString(pattern)) pattern =
=3D=20
RegExp.escape(pattern); if (!(pattern.length || pattern.source)) { =
replacement =3D=20
replacement(''); return replacement + source.split('').join(replacement) =
+=20
replacement; } while (source.length &gt; 0) { if (match =3D =
source.match(pattern))=20
{ result +=3D source.slice(0, match.index); result +=3D=20
String.interpret(replacement(match)); source =3D =
source.slice(match.index +=20
match[0].length); } else { result +=3D source, source =3D ''; } } return =
result; }=20
function sub(pattern, replacement, count) { replacement =3D=20
prepareReplacement(replacement); count =3D Object.isUndefined(count) ? 1 =
: count;=20
return this.gsub(pattern, function(match) { if (--count &lt; 0) return =
match[0];=20
return replacement(match); }); } function scan(pattern, iterator) {=20
this.gsub(pattern, iterator); return String(this); } function =
truncate(length,=20
truncation) { length =3D length || 30; truncation =3D =
Object.isUndefined(truncation)=20
? '...' : truncation; return this.length &gt; length ? this.slice(0, =
length -=20
truncation.length) + truncation : String(this); } function strip() { =
return=20
this.replace(/^\s+/, '').replace(/\s+$/, ''); } function stripTags() { =
return=20
this.replace(/&lt;\w+(\s+("[^"]*"|'[^']*'|[^&gt;])+)?&gt;|&lt;\/\w+&gt;/g=
i, '');=20
} function stripScripts() { return this.replace(new=20
RegExp(Prototype.ScriptFragment, 'img'), ''); } function =
extractScripts() { var=20
matchAll =3D new RegExp(Prototype.ScriptFragment, 'img'); var matchOne =
=3D new=20
RegExp(Prototype.ScriptFragment, 'im'); return (this.match(matchAll) ||=20
[]).map(function(scriptTag) { return (scriptTag.match(matchOne) || ['', =
''])[1];=20
}); } function evalScripts() { return =
this.extractScripts().map(function(script)=20
{ return eval(script) }); } function escapeHTML() { return=20
this.replace(/&amp;/g,'&amp;').replace(/</G,'&LT;').REPLACE( =
/>/g,'&gt;'); }=20
function unescapeHTML() { return=20
this.stripTags().replace(/&lt;/g,'&lt;').replace(/&gt;/g,'&gt;').replace(=
/&amp;/g,'&amp;');=20
} function toQueryParams(separator) { var match =3D=20
this.strip().match(/([^?#]*)(#.*)?$/); if (!match) return { }; return=20
match[1].split(separator || '&amp;').inject({ }, function(hash, pair) { =
if=20
((pair =3D pair.split('=3D'))[0]) { var key =3D =
decodeURIComponent(pair.shift()); var=20
value =3D pair.length &gt; 1 ? pair.join('=3D') : pair[0]; if (value =
!=3D undefined)=20
value =3D decodeURIComponent(value); if (key in hash) { if=20
(!Object.isArray(hash[key])) hash[key] =3D [hash[key]]; =
hash[key].push(value); }=20
else hash[key] =3D value; } return hash; }); } function toArray() { =
return=20
this.split(''); } function succ() { return this.slice(0, this.length - =
1) +=20
String.fromCharCode(this.charCodeAt(this.length - 1) + 1); } function=20
times(count) { return count &lt; 1 ? '' : new Array(count + =
1).join(this); }=20
function camelize() { var parts =3D this.split('-'), len =3D =
parts.length; if (len=20
=3D=3D 1) return parts[0]; var camelized =3D this.charAt(0) =3D=3D '-' ? =

parts[0].charAt(0).toUpperCase() + parts[0].substring(1) : parts[0]; for =
(var i=20
=3D 1; i &lt; len; i++) camelized +=3D parts[i].charAt(0).toUpperCase() =
+=20
parts[i].substring(1); return camelized; } function capitalize() { =
return=20
this.charAt(0).toUpperCase() + this.substring(1).toLowerCase(); } =
function=20
underscore() { return this.replace(/::/g, '/') =
.replace(/([A-Z]+)([A-Z][a-z])/g,=20
'$1_$2') .replace(/([a-z\d])([A-Z])/g, '$1_$2') .replace(/-/g, '_')=20
.toLowerCase(); } function dasherize() { return this.replace(/_/g, '-'); =
}=20
function inspect(useDoubleQuotes) { var escapedString =3D=20
this.replace(/[\x00-\x1f\\]/g, function(character) { if (character in=20
String.specialChar) { return String.specialChar[character]; } return =
'\\u00' +=20
character.charCodeAt().toPaddedString(2, 16); }); if (useDoubleQuotes) =
return=20
'"' + escapedString.replace(/"/g, '\\"') + '"'; return "'" +=20
escapedString.replace(/'/g, '\\\'') + "'"; } function toJSON() { return=20
this.inspect(true); } function unfilterJSON(filter) { return =
this.replace(filter=20
|| Prototype.JSONFilter, '$1'); } function isJSON() { var str =3D this; =
if=20
(str.blank()) return false; str =3D this.replace(/\\./g,=20
'@').replace(/"[^"\\\n\r]*"/g, ''); return (/^[,:{}\[\]0-9.\-+Eaeflnr-u=20
\n\r\t]*$/).test(str); } function evalJSON(sanitize) { var json =3D=20
this.unfilterJSON(); try { if (!sanitize || json.isJSON()) return =
eval('(' +=20
json + ')'); } catch (e) { } throw new SyntaxError('Badly formed JSON =
string: '=20
+ this.inspect()); } function include(pattern) { return =
this.indexOf(pattern)=20
&gt; -1; } function startsWith(pattern) { return this.indexOf(pattern) =
=3D=3D=3D 0; }=20
function endsWith(pattern) { var d =3D this.length - pattern.length; =
return d=20
&gt;=3D 0 &amp;&amp; this.lastIndexOf(pattern) =3D=3D=3D d; } function =
empty() { return=20
this =3D=3D ''; } function blank() { return /^\s*$/.test(this); } =
function=20
interpolate(object, pattern) { return new Template(this,=20
pattern).evaluate(object); } return { gsub: gsub, sub: sub, scan: scan,=20
truncate: truncate, strip: String.prototype.trim ? String.prototype.trim =
:=20
strip, stripTags: stripTags, stripScripts: stripScripts, extractScripts: =

extractScripts, evalScripts: evalScripts, escapeHTML: escapeHTML, =
unescapeHTML:=20
unescapeHTML, toQueryParams: toQueryParams, parseQuery: toQueryParams, =
toArray:=20
toArray, succ: succ, times: times, camelize: camelize, capitalize: =
capitalize,=20
underscore: underscore, dasherize: dasherize, inspect: inspect, toJSON: =
toJSON,=20
unfilterJSON: unfilterJSON, isJSON: isJSON, evalJSON: evalJSON, include: =

include, startsWith: startsWith, endsWith: endsWith, empty: empty, =
blank: blank,=20
interpolate: interpolate }; })()); var Template =3D Class.create({ =
initialize:=20
function(template, pattern) { this.template =3D template.toString(); =
this.pattern=20
=3D pattern || Template.Pattern; }, evaluate: function(object) { if =
(object=20
&amp;&amp; Object.isFunction(object.toTemplateReplacements)) object =3D=20
object.toTemplateReplacements(); return this.template.gsub(this.pattern, =

function(match) { if (object =3D=3D null) return (match[1] + ''); var =
before =3D=20
match[1] || ''; if (before =3D=3D '\\') return match[2]; var ctx =3D =
object, expr =3D=20
match[3]; var pattern =3D /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/; =
match =3D=20
pattern.exec(expr); if (match =3D=3D null) return before; while (match =
!=3D null) {=20
var comp =3D match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') =
:=20
match[1]; ctx =3D ctx[comp]; if (null =3D=3D ctx || '' =3D=3D match[3]) =
break; expr =3D=20
expr.substring('[' =3D=3D match[3] ? match[1].length : match[0].length); =
match =3D=20
pattern.exec(expr); } return before + String.interpret(ctx); }); } });=20
Template.Pattern =3D /(^|.|\r|\n)(#\{(.*?)\})/; var $break =3D { }; var =
Enumerable =3D=20
(function() { function each(iterator, context) { var index =3D 0; try {=20
this._each(function(value) { iterator.call(context, value, index++); }); =
} catch=20
(e) { if (e !=3D $break) throw e; } return this; } function =
eachSlice(number,=20
iterator, context) { var index =3D -number, slices =3D [], array =3D =
this.toArray();=20
if (number &lt; 1) return array; while ((index +=3D number) &lt; =
array.length)=20
slices.push(array.slice(index, index+number)); return =
slices.collect(iterator,=20
context); } function all(iterator, context) { iterator =3D iterator ||=20
Prototype.K; var result =3D true; this.each(function(value, index) { =
result =3D=20
result &amp;&amp; !!iterator.call(context, value, index); if (!result) =
throw=20
$break; }); return result; } function any(iterator, context) { iterator =
=3D=20
iterator || Prototype.K; var result =3D false; this.each(function(value, =
index) {=20
if (result =3D !!iterator.call(context, value, index)) throw $break; }); =
return=20
result; } function collect(iterator, context) { iterator =3D iterator || =

Prototype.K; var results =3D []; this.each(function(value, index) {=20
results.push(iterator.call(context, value, index)); }); return results; =
}=20
function detect(iterator, context) { var result; =
this.each(function(value,=20
index) { if (iterator.call(context, value, index)) { result =3D value; =
throw=20
$break; } }); return result; } function findAll(iterator, context) { var =
results=20
=3D []; this.each(function(value, index) { if (iterator.call(context, =
value,=20
index)) results.push(value); }); return results; } function grep(filter, =

iterator, context) { iterator =3D iterator || Prototype.K; var results =
=3D []; if=20
(Object.isString(filter)) filter =3D new RegExp(RegExp.escape(filter));=20
this.each(function(value, index) { if (filter.match(value))=20
results.push(iterator.call(context, value, index)); }); return results; =
}=20
function include(object) { if (Object.isFunction(this.indexOf)) if=20
(this.indexOf(object) !=3D -1) return true; var found =3D false;=20
this.each(function(value) { if (value =3D=3D object) { found =3D true; =
throw $break; }=20
}); return found; } function inGroupsOf(number, fillWith) { fillWith =3D =

Object.isUndefined(fillWith) ? null : fillWith; return =
this.eachSlice(number,=20
function(slice) { while(slice.length &lt; number) slice.push(fillWith); =
return=20
slice; }); } function inject(memo, iterator, context) {=20
this.each(function(value, index) { memo =3D iterator.call(context, memo, =
value,=20
index); }); return memo; } function invoke(method) { var args =3D=20
$A(arguments).slice(1); return this.map(function(value) { return=20
value[method].apply(value, args); }); } function max(iterator, context) =
{=20
iterator =3D iterator || Prototype.K; var result; =
this.each(function(value, index)=20
{ value =3D iterator.call(context, value, index); if (result =3D=3D null =
|| value=20
&gt;=3D result) result =3D value; }); return result; } function =
min(iterator,=20
context) { iterator =3D iterator || Prototype.K; var result;=20
this.each(function(value, index) { value =3D iterator.call(context, =
value, index);=20
if (result =3D=3D null || value &lt; result) result =3D value; }); =
return result; }=20
function partition(iterator, context) { iterator =3D iterator || =
Prototype.K; var=20
trues =3D [], falses =3D []; this.each(function(value, index) {=20
(iterator.call(context, value, index) ? trues : falses).push(value); }); =
return=20
[trues, falses]; } function pluck(property) { var results =3D [];=20
this.each(function(value) { results.push(value[property]); }); return =
results; }=20
function reject(iterator, context) { var results =3D []; =
this.each(function(value,=20
index) { if (!iterator.call(context, value, index)) results.push(value); =
});=20
return results; } function sortBy(iterator, context) { return=20
this.map(function(value, index) { return { value: value, criteria:=20
iterator.call(context, value, index) }; }).sort(function(left, right) { =
var a =3D=20
left.criteria, b =3D right.criteria; return a &lt; b ? -1 : a &gt; b ? 1 =
: 0;=20
}).pluck('value'); } function toArray() { return this.map(); } function =
zip() {=20
var iterator =3D Prototype.K, args =3D $A(arguments); if=20
(Object.isFunction(args.last())) iterator =3D args.pop(); var =
collections =3D=20
[this].concat(args).map($A); return this.map(function(value, index) { =
return=20
iterator(collections.pluck(index)); }); } function size() { return=20
this.toArray().length; } function inspect() { return '#<ENUMERABLE:' ? + =

this.toArray().inspect()>'; } return { each: each, eachSlice: eachSlice, =
all:=20
all, every: all, any: any, some: any, collect: collect, map: collect, =
detect:=20
detect, findAll: findAll, select: findAll, filter: findAll, grep: grep, =
include:=20
include, member: include, inGroupsOf: inGroupsOf, inject: inject, =
invoke:=20
invoke, max: max, min: min, partition: partition, pluck: pluck, reject: =
reject,=20
sortBy: sortBy, toArray: toArray, entries: toArray, zip: zip, size: =
size,=20
inspect: inspect, find: detect }; })(); function $A(iterable) { if =
(!iterable)=20
return []; if ('toArray' in Object(iterable)) return iterable.toArray(); =
var=20
length =3D iterable.length || 0, results =3D new Array(length); while =
(length--)=20
results[length] =3D iterable[length]; return results; } function =
$w(string) { if=20
(!Object.isString(string)) return []; string =3D string.strip(); return =
string ?=20
string.split(/\s+/) : []; } Array.from =3D $A; (function() { var =
arrayProto =3D=20
Array.prototype, slice =3D arrayProto.slice, _each =3D =
arrayProto.forEach; // use=20
native browser JS 1.6 implementation if available function =
each(iterator) { for=20
(var i =3D 0, length =3D this.length; i &lt; length; i++) =
iterator(this[i]); } if=20
(!_each) _each =3D each; function clear() { this.length =3D 0; return =
this; }=20
function first() { return this[0]; } function last() { return =
this[this.length -=20
1]; } function compact() { return this.select(function(value) { return =
value !=3D=20
null; }); } function flatten() { return this.inject([], function(array, =
value) {=20
if (Object.isArray(value)) return array.concat(value.flatten());=20
array.push(value); return array; }); } function without() { var values =
=3D=20
slice.call(arguments, 0); return this.select(function(value) { return=20
!values.include(value); }); } function reverse(inline) { return (inline =
!=3D=3D=20
false ? this : this.toArray())._reverse(); } function uniq(sorted) { =
return=20
this.inject([], function(array, value, index) { if (0 =3D=3D index || =
(sorted ?=20
array.last() !=3D value : !array.include(value))) array.push(value); =
return array;=20
}); } function intersect(array) { return =
this.uniq().findAll(function(item) {=20
return array.detect(function(value) { return item =3D=3D=3D value }); =
}); } function=20
clone() { return slice.call(this, 0); } function size() { return =
this.length; }=20
function inspect() { return '[' + this.map(Object.inspect).join(', ') + =
']'; }=20
function toJSON() { var results =3D []; this.each(function(object) { var =
value =3D=20
Object.toJSON(object); if (!Object.isUndefined(value)) =
results.push(value); });=20
return '[' + results.join(', ') + ']'; } function indexOf(item, i) { i =
|| (i =3D=20
0); var length =3D this.length; if (i &lt; 0) i =3D length + i; for (; i =
&lt;=20
length; i++) if (this[i] =3D=3D=3D item) return i; return -1; } function =

lastIndexOf(item, i) { i =3D isNaN(i) ? this.length : (i &lt; 0 ? =
this.length + i=20
: i) + 1; var n =3D this.slice(0, i).reverse().indexOf(item); return (n =
&lt; 0) ?=20
n : i - n - 1; } function concat() { var array =3D slice.call(this, 0), =
item; for=20
(var i =3D 0, length =3D arguments.length; i &lt; length; i++) { item =
=3D=20
arguments[i]; if (Object.isArray(item) &amp;&amp; !('callee' in item)) { =
for=20
(var j =3D 0, arrayLength =3D item.length; j &lt; arrayLength; j++)=20
array.push(item[j]); } else { array.push(item); } } return array; }=20
Object.extend(arrayProto, Enumerable); if (!arrayProto._reverse)=20
arrayProto._reverse =3D arrayProto.reverse; Object.extend(arrayProto, { =
_each:=20
_each, clear: clear, first: first, last: last, compact: compact, =
flatten:=20
flatten, without: without, reverse: reverse, uniq: uniq, intersect: =
intersect,=20
clone: clone, toArray: clone, size: size, inspect: inspect, toJSON: =
toJSON });=20
var CONCAT_ARGUMENTS_BUGGY =3D (function() { return =
[].concat(arguments)[0][0] !=3D=3D=20
1; })(1,2) if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat =3D concat; if=20
(!arrayProto.indexOf) arrayProto.indexOf =3D indexOf; if =
(!arrayProto.lastIndexOf)=20
arrayProto.lastIndexOf =3D lastIndexOf; })(); function $H(object) { =
return new=20
Hash(object); }; var Hash =3D Class.create(Enumerable, (function() { =
function=20
initialize(object) { this._object =3D Object.isHash(object) ? =
object.toObject() :=20
Object.clone(object); } function _each(iterator) { for (var key in =
this._object)=20
{ var value =3D this._object[key], pair =3D [key, value]; pair.key =3D =
key; pair.value=20
=3D value; iterator(pair); } } function set(key, value) { return =
this._object[key]=20
=3D value; } function get(key) { if (this._object[key] !=3D=3D =
Object.prototype[key])=20
return this._object[key]; } function unset(key) { var value =3D =
this._object[key];=20
delete this._object[key]; return value; } function toObject() { return=20
Object.clone(this._object); } function keys() { return =
this.pluck('key'); }=20
function values() { return this.pluck('value'); } function index(value) =
{ var=20
match =3D this.detect(function(pair) { return pair.value =3D=3D=3D =
value; }); return=20
match &amp;&amp; match.key; } function merge(object) { return=20
this.clone().update(object); } function update(object) { return new=20
Hash(object).inject(this, function(result, pair) { result.set(pair.key,=20
pair.value); return result; }); } function toQueryPair(key, value) { if=20
(Object.isUndefined(value)) return key; return key + '=3D' +=20
encodeURIComponent(String.interpret(value)); } function toQueryString() =
{ return=20
this.inject([], function(results, pair) { var key =3D=20
encodeURIComponent(pair.key), values =3D pair.value; if (values =
&amp;&amp; typeof=20
values =3D=3D 'object') { if (Object.isArray(values)) return=20
results.concat(values.map(toQueryPair.curry(key))); } else=20
results.push(toQueryPair(key, values)); return results; =
}).join('&amp;'); }=20
function inspect() { return '#<HASH:{' + ?} ?) }).join(?, ?);=20
pair.map(Object.inspect).join(?: return { this.map(function(pair)>'; } =
function=20
toJSON() { return Object.toJSON(this.toObject()); } function clone() { =
return=20
new Hash(this); } return { initialize: initialize, _each: _each, set: =
set, get:=20
get, unset: unset, toObject: toObject, toTemplateReplacements: toObject, =
keys:=20
keys, values: values, index: index, merge: merge, update: update, =
toQueryString:=20
toQueryString, inspect: inspect, toJSON: toJSON, clone: clone }; })());=20
Hash.from =3D $H; Object.extend(Number.prototype, (function() { function =

toColorPart() { return this.toPaddedString(2, 16); } function succ() { =
return=20
this + 1; } function times(iterator, context) { $R(0, this, =
true).each(iterator,=20
context); return this; } function toPaddedString(length, radix) { var =
string =3D=20
this.toString(radix || 10); return '0'.times(length - string.length) + =
string; }=20
function toJSON() { return isFinite(this) ? this.toString() : 'null'; } =
function=20
abs() { return Math.abs(this); } function round() { return =
Math.round(this); }=20
function ceil() { return Math.ceil(this); } function floor() { return=20
Math.floor(this); } return { toColorPart: toColorPart, succ: succ, =
times: times,=20
toPaddedString: toPaddedString, toJSON: toJSON, abs: abs, round: round, =
ceil:=20
ceil, floor: floor }; })()); function $R(start, end, exclusive) { return =
new=20
ObjectRange(start, end, exclusive); } var ObjectRange =3D =
Class.create(Enumerable,=20
(function() { function initialize(start, end, exclusive) { this.start =
=3D start;=20
this.end =3D end; this.exclusive =3D exclusive; } function =
_each(iterator) { var=20
value =3D this.start; while (this.include(value)) { iterator(value); =
value =3D=20
value.succ(); } } function include(value) { if (value &lt; this.start) =
return=20
false; if (this.exclusive) return value &lt; this.end; return value =
&lt;=3D=20
this.end; } return { initialize: initialize, _each: _each, include: =
include };=20
})()); var Ajax =3D { getTransport: function() { return Try.these( =
function()=20
{return new XMLHttpRequest()}, function() {return new=20
ActiveXObject('Msxml2.XMLHTTP')}, function() {return new=20
ActiveXObject('Microsoft.XMLHTTP')} ) || false; }, activeRequestCount: 0 =
};=20
Ajax.Responders =3D { responders: [], _each: function(iterator) {=20
this.responders._each(iterator); }, register: function(responder) { if=20
(!this.include(responder)) this.responders.push(responder); }, =
unregister:=20
function(responder) { this.responders =3D =
this.responders.without(responder); },=20
dispatch: function(callback, request, transport, json) {=20
this.each(function(responder) { if =
(Object.isFunction(responder[callback])) {=20
try { responder[callback].apply(responder, [request, transport, json]); =
} catch=20
(e) { } } }); } }; Object.extend(Ajax.Responders, Enumerable);=20
Ajax.Responders.register({ onCreate: function() { =
Ajax.activeRequestCount++ },=20
onComplete: function() { Ajax.activeRequestCount-- } }); Ajax.Base =3D=20
Class.create({ initialize: function(options) { this.options =3D { =
method: 'post',=20
asynchronous: true, contentType: 'application/x-www-form-urlencoded', =
encoding:=20
'UTF-8', parameters: '', evalJSON: true, evalJS: true };=20
Object.extend(this.options, options || { }); this.options.method =3D=20
this.options.method.toLowerCase(); if =
(Object.isString(this.options.parameters))=20
this.options.parameters =3D this.options.parameters.toQueryParams(); =
else if=20
(Object.isHash(this.options.parameters)) this.options.parameters =3D=20
this.options.parameters.toObject(); } }); Ajax.Request =3D =
Class.create(Ajax.Base,=20
{ _complete: false, initialize: function($super, url, options) {=20
$super(options); this.transport =3D Ajax.getTransport(); =
this.request(url); },=20
request: function(url) { this.url =3D url; this.method =3D =
this.options.method; var=20
params =3D Object.clone(this.options.parameters); if (!['get',=20
'post'].include(this.method)) { params['_method'] =3D this.method; =
this.method =3D=20
'post'; } this.parameters =3D params; if (params =3D =
Object.toQueryString(params)) {=20
if (this.method =3D=3D 'get') this.url +=3D (this.url.include('?') ? =
'&amp;' : '?') +=20
params; else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) =
params +=3D=20
'&amp;_=3D'; } try { var response =3D new Ajax.Response(this); if=20
(this.options.onCreate) this.options.onCreate(response);=20
Ajax.Responders.dispatch('onCreate', this, response);=20
this.transport.open(this.method.toUpperCase(), this.url,=20
this.options.asynchronous); if (this.options.asynchronous)=20
this.respondToReadyState.bind(this).defer(1); =
this.transport.onreadystatechange=20
=3D this.onStateChange.bind(this); this.setRequestHeaders(); this.body =
=3D=20
this.method =3D=3D 'post' ? (this.options.postBody || params) : null;=20
this.transport.send(this.body); /* Force Firefox to handle ready state 4 =
for=20
synchronous requests */ if (!this.options.asynchronous &amp;&amp;=20
this.transport.overrideMimeType) this.onStateChange(); } catch (e) {=20
this.dispatchException(e); } }, onStateChange: function() { var =
readyState =3D=20
this.transport.readyState; if (readyState &gt; 1 &amp;&amp; =
!((readyState =3D=3D 4)=20
&amp;&amp; this._complete)) =
this.respondToReadyState(this.transport.readyState);=20
}, setRequestHeaders: function() { var headers =3D { 'X-Requested-With': =

'XMLHttpRequest', 'X-Prototype-Version': Prototype.Version, 'Accept':=20
'text/javascript, text/html, application/xml, text/xml, */*' }; if =
(this.method=20
=3D=3D 'post') { headers['Content-type'] =3D this.options.contentType +=20
(this.options.encoding ? '; charset=3D' + this.options.encoding : ''); =
/* Force=20
"Connection: close" for older Mozilla browsers to work * around a bug =
where=20
XMLHttpRequest sends an incorrect * Content-length header. See Mozilla =
Bugzilla=20
#246651. */ if (this.transport.overrideMimeType &amp;&amp;=20
(navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] &lt; 2005)=20
headers['Connection'] =3D 'close'; } if (typeof =
this.options.requestHeaders =3D=3D=20
'object') { var extras =3D this.options.requestHeaders; if=20
(Object.isFunction(extras.push)) for (var i =3D 0, length =3D =
extras.length; i &lt;=20
length; i +=3D 2) headers[extras[i]] =3D extras[i+1]; else=20
$H(extras).each(function(pair) { headers[pair.key] =3D pair.value }); } =
for (var=20
name in headers) this.transport.setRequestHeader(name, headers[name]); =
},=20
success: function() { var status =3D this.getStatus(); return !status || =
(status=20
&gt;=3D 200 &amp;&amp; status &lt; 300); }, getStatus: function() { try =
{ return=20
this.transport.status || 0; } catch (e) { return 0 } }, =
respondToReadyState:=20
function(readyState) { var state =3D Ajax.Request.Events[readyState], =
response =3D=20
new Ajax.Response(this); if (state =3D=3D 'Complete') { try { =
this._complete =3D true;=20
(this.options['on' + response.status] || this.options['on' + =
(this.success() ?=20
'Success' : 'Failure')] || Prototype.emptyFunction)(response,=20
response.headerJSON); } catch (e) { this.dispatchException(e); } var =
contentType=20
=3D response.getHeader('Content-type'); if (this.options.evalJS =3D=3D =
'force' ||=20
(this.options.evalJS &amp;&amp; this.isSameOrigin() &amp;&amp; =
contentType=20
&amp;&amp;=20
contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s=
*$/i)))=20
this.evalResponse(); } try { (this.options['on' + state] ||=20
Prototype.emptyFunction)(response, response.headerJSON);=20
Ajax.Responders.dispatch('on' + state, this, response, =
response.headerJSON); }=20
catch (e) { this.dispatchException(e); } if (state =3D=3D 'Complete') {=20
this.transport.onreadystatechange =3D Prototype.emptyFunction; } }, =
isSameOrigin:=20
function() { var m =3D this.url.match(/^\s*https?:\/\/[^\/]*/); return =
!m || (m[0]=20
=3D=3D '#{protocol}//#{domain}#{port}'.interpolate({ protocol: =
location.protocol,=20
domain: document.domain, port: location.port ? ':' + location.port : '' =
})); },=20
getHeader: function(name) { try { return =
this.transport.getResponseHeader(name)=20
|| null; } catch (e) { return null; } }, evalResponse: function() { try =
{ return=20
eval((this.transport.responseText || '').unfilterJSON()); } catch (e) {=20
this.dispatchException(e); } }, dispatchException: function(exception) { =

(this.options.onException || Prototype.emptyFunction)(this, exception);=20
Ajax.Responders.dispatch('onException', this, exception); } });=20
Ajax.Request.Events =3D ['Uninitialized', 'Loading', 'Loaded', =
'Interactive',=20
'Complete']; Ajax.Response =3D Class.create({ initialize: =
function(request){=20
this.request =3D request; var transport =3D this.transport =3D =
request.transport,=20
readyState =3D this.readyState =3D transport.readyState; if((readyState =
&gt; 2=20
&amp;&amp; !Prototype.Browser.IE) || readyState =3D=3D 4) { this.status =
=3D=20
this.getStatus(); this.statusText =3D this.getStatusText(); =
this.responseText =3D=20
String.interpret(transport.responseText); this.headerJSON =3D=20
this._getHeaderJSON(); } if(readyState =3D=3D 4) { var xml =3D =
transport.responseXML;=20
this.responseXML =3D Object.isUndefined(xml) ? null : xml; =
this.responseJSON =3D=20
this._getResponseJSON(); } }, status: 0, statusText: '', getStatus:=20
Ajax.Request.prototype.getStatus, getStatusText: function() { try { =
return=20
this.transport.statusText || ''; } catch (e) { return '' } }, getHeader: =

Ajax.Request.prototype.getHeader, getAllHeaders: function() { try { =
return=20
this.getAllResponseHeaders(); } catch (e) { return null } }, =
getResponseHeader:=20
function(name) { return this.transport.getResponseHeader(name); },=20
getAllResponseHeaders: function() { return=20
this.transport.getAllResponseHeaders(); }, _getHeaderJSON: function() { =
var json=20
=3D this.getHeader('X-JSON'); if (!json) return null; json =3D=20
decodeURIComponent(escape(json)); try { return=20
json.evalJSON(this.request.options.sanitizeJSON ||=20
!this.request.isSameOrigin()); } catch (e) { =
this.request.dispatchException(e);=20
} }, _getResponseJSON: function() { var options =3D =
this.request.options; if=20
(!options.evalJSON || (options.evalJSON !=3D 'force' &amp;&amp;=20
!(this.getHeader('Content-type') || '').include('application/json')) ||=20
this.responseText.blank()) return null; try { return=20
this.responseText.evalJSON(options.sanitizeJSON ||=20
!this.request.isSameOrigin()); } catch (e) { =
this.request.dispatchException(e);=20
} } }); Ajax.Updater =3D Class.create(Ajax.Request, { initialize: =
function($super,=20
container, url, options) { this.container =3D { success: =
(container.success ||=20
container), failure: (container.failure || (container.success ? null :=20
container)) }; options =3D Object.clone(options); var onComplete =3D=20
options.onComplete; options.onComplete =3D (function(response, json) {=20
this.updateContent(response.responseText); if =
(Object.isFunction(onComplete))=20
onComplete(response, json); }).bind(this); $super(url, options); },=20
updateContent: function(responseText) { var receiver =3D=20
this.container[this.success() ? 'success' : 'failure'], options =3D =
this.options;=20
if (!options.evalScripts) responseText =3D responseText.stripScripts(); =
if=20
(receiver =3D $(receiver)) { if (options.insertion) { if=20
(Object.isString(options.insertion)) { var insertion =3D { };=20
insertion[options.insertion] =3D responseText; =
receiver.insert(insertion); } else=20
options.insertion(receiver, responseText); } else =
receiver.update(responseText);=20
} } }); Ajax.PeriodicalUpdater =3D Class.create(Ajax.Base, { initialize: =

function($super, container, url, options) { $super(options); =
this.onComplete =3D=20
this.options.onComplete; this.frequency =3D (this.options.frequency || =
2);=20
this.decay =3D (this.options.decay || 1); this.updater =3D { }; =
this.container =3D=20
container; this.url =3D url; this.start(); }, start: function() {=20
this.options.onComplete =3D this.updateComplete.bind(this); =
this.onTimerEvent();=20
}, stop: function() { this.updater.options.onComplete =3D undefined;=20
clearTimeout(this.timer); (this.onComplete ||=20
Prototype.emptyFunction).apply(this, arguments); }, updateComplete:=20
function(response) { if (this.options.decay) { this.decay =3D=20
(response.responseText =3D=3D this.lastText ? this.decay * =
this.options.decay : 1);=20
this.lastText =3D response.responseText; } this.timer =3D=20
this.onTimerEvent.bind(this).delay(this.decay * this.frequency); },=20
onTimerEvent: function() { this.updater =3D new =
Ajax.Updater(this.container,=20
this.url, this.options); } }); function $(element) { if =
(arguments.length &gt;=20
1) { for (var i =3D 0, elements =3D [], length =3D arguments.length; i =
&lt; length;=20
i++) elements.push($(arguments[i])); return elements; } if=20
(Object.isString(element)) element =3D document.getElementById(element); =
return=20
Element.extend(element); } if (Prototype.BrowserFeatures.XPath) {=20
document._getElementsByXPath =3D function(expression, parentElement) { =
var results=20
=3D []; var query =3D document.evaluate(expression, $(parentElement) || =
document,=20
null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i =3D 0, =
length =3D=20
query.snapshotLength; i &lt; length; i++)=20
results.push(Element.extend(query.snapshotItem(i))); return results; }; =
}=20
/*-----------------------------------------------------------------------=
---*/=20
if (!window.Node) var Node =3D { }; if (!Node.ELEMENT_NODE) { =
Object.extend(Node,=20
{ ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: =
4,=20
ENTITY_REFERENCE_NODE: 5, ENTITY_NODE: 6, PROCESSING_INSTRUCTION_NODE: =
7,=20
COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_TYPE_NODE: 10,=20
DOCUMENT_FRAGMENT_NODE: 11, NOTATION_NODE: 12 }); } (function(global) { =
var=20
SETATTRIBUTE_IGNORES_NAME =3D (function(){ var elForm =3D=20
document.createElement("form"); var elInput =3D =
document.createElement("input");=20
var root =3D document.documentElement; elInput.setAttribute("name", =
"test");=20
elForm.appendChild(elInput); root.appendChild(elForm); var isBuggy =3D=20
elForm.elements ? (typeof elForm.elements.test =3D=3D "undefined") : =
null;=20
root.removeChild(elForm); elForm =3D elInput =3D null; return isBuggy; =
})(); var=20
element =3D global.Element; global.Element =3D function(tagName, =
attributes) {=20
attributes =3D attributes || { }; tagName =3D tagName.toLowerCase(); var =
cache =3D=20
Element.cache; if (SETATTRIBUTE_IGNORES_NAME &amp;&amp; attributes.name) =
{=20
tagName =3D '&lt;' + tagName + ' name=3D"' + attributes.name + '"&gt;'; =
delete=20
attributes.name; return =
Element.writeAttribute(document.createElement(tagName),=20
attributes); } if (!cache[tagName]) cache[tagName] =3D=20
Element.extend(document.createElement(tagName)); return=20
Element.writeAttribute(cache[tagName].cloneNode(false), attributes); };=20
Object.extend(global.Element, element || { }); if (element)=20
global.Element.prototype =3D element.prototype; })(this); Element.cache =
=3D { };=20
Element.idCounter =3D 1; Element.Methods =3D { visible: =
function(element) { return=20
$(element).style.display !=3D 'none'; }, toggle: function(element) { =
element =3D=20
$(element); Element[Element.visible(element) ? 'hide' : =
'show'](element); return=20
element; }, hide: function(element) { element =3D $(element);=20
element.style.display =3D 'none'; return element; }, show: =
function(element) {=20
element =3D $(element); element.style.display =3D ''; return element; }, =
remove:=20
function(element) { element =3D $(element);=20
element.parentNode.removeChild(element); return element; }, update: =
(function(){=20
var SELECT_ELEMENT_INNERHTML_BUGGY =3D (function(){ var el =3D=20
document.createElement("select"), isBuggy =3D true; el.innerHTML =3D =
"<OPTION=20
value=3D'\"test\"'>test</OPTION>"; if (el.options &amp;&amp; =
el.options[0]) {=20
isBuggy =3D el.options[0].nodeName.toUpperCase() !=3D=3D "OPTION"; } el =
=3D null; return=20
isBuggy; })(); var TABLE_ELEMENT_INNERHTML_BUGGY =3D (function(){ try { =
var el =3D=20
document.createElement("table"); if (el &amp;&amp; el.tBodies) { =
el.innerHTML =3D=20
"<TBODY><TR><TD>test</TD></TR></TBODY>"; var isBuggy =3D typeof =
el.tBodies[0] =3D=3D=20
"undefined"; el =3D null; return isBuggy; } } catch (e) { return true; } =
})(); var=20
SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING =3D (function () { var s =3D=20
document.createElement("script"), isBuggy =3D false; try {=20
s.appendChild(document.createTextNode("")); isBuggy =3D !s.firstChild || =

s.firstChild &amp;&amp; s.firstChild.nodeType !=3D=3D 3; } catch (e) { =
isBuggy =3D=20
true; } s =3D null; return isBuggy; })(); function update(element, =
content) {=20
element =3D $(element); if (content &amp;&amp; content.toElement) =
content =3D=20
content.toElement(); if (Object.isElement(content)) return=20
element.update().insert(content); content =3D Object.toHTML(content); =
var tagName=20
=3D element.tagName.toUpperCase(); if (tagName =3D=3D=3D 'SCRIPT' =
&amp;&amp;=20
SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) { element.text =3D content; =
return=20
element; } if (SELECT_ELEMENT_INNERHTML_BUGGY || =
TABLE_ELEMENT_INNERHTML_BUGGY)=20
{ if (tagName in Element._insertionTranslations.tags) { while=20
(element.firstChild) { element.removeChild(element.firstChild); }=20
Element._getContentFromAnonymousElement(tagName, content.stripScripts()) =

.each(function(node) { element.appendChild(node) }); } else { =
element.innerHTML=20
=3D content.stripScripts(); } } else { element.innerHTML =3D =
content.stripScripts();=20
} content.evalScripts.bind(content).defer(); return element; } return =
update;=20
})(), replace: function(element, content) { element =3D $(element); if =
(content=20
&amp;&amp; content.toElement) content =3D content.toElement(); else if=20
(!Object.isElement(content)) { content =3D Object.toHTML(content); var =
range =3D=20
element.ownerDocument.createRange(); range.selectNode(element);=20
content.evalScripts.bind(content).defer(); content =3D=20
range.createContextualFragment(content.stripScripts()); }=20
element.parentNode.replaceChild(content, element); return element; }, =
insert:=20
function(element, insertions) { element =3D $(element); if=20
(Object.isString(insertions) || Object.isNumber(insertions) ||=20
Object.isElement(insertions) || (insertions &amp;&amp; =
(insertions.toElement ||=20
insertions.toHTML))) insertions =3D {bottom:insertions}; var content, =
insert,=20
tagName, childNodes; for (var position in insertions) { content =3D=20
insertions[position]; position =3D position.toLowerCase(); insert =3D=20
Element._insertionTranslations[position]; if (content &amp;&amp;=20
content.toElement) content =3D content.toElement(); if =
(Object.isElement(content))=20
{ insert(element, content); continue; } content =3D =
Object.toHTML(content);=20
tagName =3D ((position =3D=3D 'before' || position =3D=3D 'after') ? =
element.parentNode :=20
element).tagName.toUpperCase(); childNodes =3D=20
Element._getContentFromAnonymousElement(tagName, =
content.stripScripts()); if=20
(position =3D=3D 'top' || position =3D=3D 'after') childNodes.reverse(); =

childNodes.each(insert.curry(element));=20
content.evalScripts.bind(content).defer(); } return element; }, wrap:=20
function(element, wrapper, attributes) { element =3D $(element); if=20
(Object.isElement(wrapper)) $(wrapper).writeAttribute(attributes || { =
}); else=20
if (Object.isString(wrapper)) wrapper =3D new Element(wrapper, =
attributes); else=20
wrapper =3D new Element('div', wrapper); if (element.parentNode)=20
element.parentNode.replaceChild(wrapper, element); =
wrapper.appendChild(element);=20
return wrapper; }, inspect: function(element) { element =3D $(element); =
var result=20
=3D '&lt;' + element.tagName.toLowerCase(); $H({'id': 'id', 'className': =

'class'}).each(function(pair) { var property =3D pair.first(), attribute =
=3D=20
pair.last(); var value =3D (element[property] || '').toString(); if =
(value) result=20
+=3D ' ' + attribute + '=3D' + value.inspect(true); }); return result + =
'&gt;'; },=20
recursivelyCollect: function(element, property) { element =3D =
$(element); var=20
elements =3D []; while (element =3D element[property]) if =
(element.nodeType =3D=3D 1)=20
elements.push(Element.extend(element)); return elements; }, ancestors:=20
function(element) { return Element.recursivelyCollect(element, =
'parentNode'); },=20
descendants: function(element) { return Element.select(element, "*"); }, =

firstDescendant: function(element) { element =3D $(element).firstChild; =
while=20
(element &amp;&amp; element.nodeType !=3D 1) element =3D =
element.nextSibling; return=20
$(element); }, immediateDescendants: function(element) { if (!(element =
=3D=20
$(element).firstChild)) return []; while (element &amp;&amp; =
element.nodeType !=3D=20
1) element =3D element.nextSibling; if (element) return=20
[element].concat($(element).nextSiblings()); return []; }, =
previousSiblings:=20
function(element) { return Element.recursivelyCollect(element,=20
'previousSibling'); }, nextSiblings: function(element) { return=20
Element.recursivelyCollect(element, 'nextSibling'); }, siblings:=20
function(element) { element =3D $(element); return=20
Element.previousSiblings(element).reverse()=20
.concat(Element.nextSiblings(element)); }, match: function(element, =
selector) {=20
if (Object.isString(selector)) selector =3D new Selector(selector); =
return=20
selector.match($(element)); }, up: function(element, expression, index) =
{=20
element =3D $(element); if (arguments.length =3D=3D 1) return =
$(element.parentNode);=20
var ancestors =3D Element.ancestors(element); return =
Object.isNumber(expression) ?=20
ancestors[expression] : Selector.findElement(ancestors, expression, =
index); },=20
down: function(element, expression, index) { element =3D $(element); if=20
(arguments.length =3D=3D 1) return Element.firstDescendant(element); =
return=20
Object.isNumber(expression) ? Element.descendants(element)[expression] : =

Element.select(element, expression)[index || 0]; }, previous: =
function(element,=20
expression, index) { element =3D $(element); if (arguments.length =3D=3D =
1) return=20
$(Selector.handlers.previousElementSibling(element)); var =
previousSiblings =3D=20
Element.previousSiblings(element); return Object.isNumber(expression) ?=20
previousSiblings[expression] : Selector.findElement(previousSiblings,=20
expression, index); }, next: function(element, expression, index) { =
element =3D=20
$(element); if (arguments.length =3D=3D 1) return=20
$(Selector.handlers.nextElementSibling(element)); var nextSiblings =3D=20
Element.nextSiblings(element); return Object.isNumber(expression) ?=20
nextSiblings[expression] : Selector.findElement(nextSiblings, =
expression,=20
index); }, select: function(element) { var args =3D=20
Array.prototype.slice.call(arguments, 1); return=20
Selector.findChildElements(element, args); }, adjacent: =
function(element) { var=20
args =3D Array.prototype.slice.call(arguments, 1); return=20
Selector.findChildElements(element.parentNode, args).without(element); =
},=20
identify: function(element) { element =3D $(element); var id =3D=20
Element.readAttribute(element, 'id'); if (id) return id; do { id =3D=20
'anonymous_element_' + Element.idCounter++ } while ($(id));=20
Element.writeAttribute(element, 'id', id); return id; }, readAttribute:=20
function(element, name) { element =3D $(element); if =
(Prototype.Browser.IE) { var=20
t =3D Element._attributeTranslations.read; if (t.values[name]) return=20
t.values[name](element, name); if (t.names[name]) name =3D =
t.names[name]; if=20
(name.include(':')) { return (!element.attributes || =
!element.attributes[name])=20
? null : element.attributes[name].value; } } return =
element.getAttribute(name);=20
}, writeAttribute: function(element, name, value) { element =3D =
$(element); var=20
attributes =3D { }, t =3D Element._attributeTranslations.write; if =
(typeof name =3D=3D=20
'object') attributes =3D name; else attributes[name] =3D =
Object.isUndefined(value) ?=20
true : value; for (var attr in attributes) { name =3D t.names[attr] || =
attr; value=20
=3D attributes[attr]; if (t.values[attr]) name =3D =
t.values[attr](element, value);=20
if (value =3D=3D=3D false || value =3D=3D=3D null) =
element.removeAttribute(name); else if=20
(value =3D=3D=3D true) element.setAttribute(name, name); else=20
element.setAttribute(name, value); } return element; }, getHeight:=20
function(element) { return Element.getDimensions(element).height; }, =
getWidth:=20
function(element) { return Element.getDimensions(element).width; }, =
classNames:=20
function(element) { return new Element.ClassNames(element); }, =
hasClassName:=20
function(element, className) { if (!(element =3D $(element))) return; =
var=20
elementClassName =3D element.className; return (elementClassName.length =
&gt; 0=20
&amp;&amp; (elementClassName =3D=3D className || new RegExp("(^|\\s)" + =
className +=20
"(\\s|$)").test(elementClassName))); }, addClassName: function(element,=20
className) { if (!(element =3D $(element))) return; if=20
(!Element.hasClassName(element, className)) element.className +=3D=20
(element.className ? ' ' : '') + className; return element; }, =
removeClassName:=20
function(element, className) { if (!(element =3D $(element))) return;=20
element.className =3D element.className.replace( new RegExp("(^|\\s+)" + =
className=20
+ "(\\s+|$)"), ' ').strip(); return element; }, toggleClassName:=20
function(element, className) { if (!(element =3D $(element))) return; =
return=20
Element[Element.hasClassName(element, className) ? 'removeClassName' :=20
'addClassName'](element, className); }, cleanWhitespace: =
function(element) {=20
element =3D $(element); var node =3D element.firstChild; while (node) { =
var nextNode=20
=3D node.nextSibling; if (node.nodeType =3D=3D 3 &amp;&amp;=20
!/\S/.test(node.nodeValue)) element.removeChild(node); node =3D =
nextNode; } return=20
element; }, empty: function(element) { return =
$(element).innerHTML.blank(); },=20
descendantOf: function(element, ancestor) { element =3D $(element), =
ancestor =3D=20
$(ancestor); if (element.compareDocumentPosition) return=20
(element.compareDocumentPosition(ancestor) &amp; 8) =3D=3D=3D 8; if=20
(ancestor.contains) return ancestor.contains(element) &amp;&amp; =
ancestor !=3D=3D=20
element; while (element =3D element.parentNode) if (element =3D=3D =
ancestor) return=20
true; return false; }, scrollTo: function(element) { element =3D =
$(element); var=20
pos =3D Element.cumulativeOffset(element); window.scrollTo(pos[0], =
pos[1]); return=20
element; }, getStyle: function(element, style) { element =3D $(element); =
style =3D=20
style =3D=3D 'float' ? 'cssFloat' : style.camelize(); var value =3D=20
element.style[style]; if (!value || value =3D=3D 'auto') { var css =3D=20
document.defaultView.getComputedStyle(element, null); value =3D css ? =
css[style] :=20
null; } if (style =3D=3D 'opacity') return value ? parseFloat(value) : =
1.0; return=20
value =3D=3D 'auto' ? null : value; }, getOpacity: function(element) { =
return=20
$(element).getStyle('opacity'); }, setStyle: function(element, styles) { =
element=20
=3D $(element); var elementStyle =3D element.style, match; if=20
(Object.isString(styles)) { element.style.cssText +=3D ';' + styles; =
return=20
styles.include('opacity') ?=20
element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element; =
} for=20
(var property in styles) if (property =3D=3D 'opacity')=20
element.setOpacity(styles[property]); else elementStyle[(property =3D=3D =
'float' ||=20
property =3D=3D 'cssFloat') ? =
(Object.isUndefined(elementStyle.styleFloat) ?=20
'cssFloat' : 'styleFloat') : property] =3D styles[property]; return =
element; },=20
setOpacity: function(element, value) { element =3D $(element);=20
element.style.opacity =3D (value =3D=3D 1 || value =3D=3D=3D '') ? '' : =
(value &lt; 0.00001)=20
? 0 : value; return element; }, getDimensions: function(element) { =
element =3D=20
$(element); var display =3D Element.getStyle(element, 'display'); if =
(display !=3D=20
'none' &amp;&amp; display !=3D null) // Safari bug return {width:=20
element.offsetWidth, height: element.offsetHeight}; var els =3D =
element.style; var=20
originalVisibility =3D els.visibility; var originalPosition =3D =
els.position; var=20
originalDisplay =3D els.display; els.visibility =3D 'hidden'; if =
(originalPosition=20
!=3D 'fixed') // Switching fixed to absolute causes issues in Safari =
els.position=20
=3D 'absolute'; els.display =3D 'block'; var originalWidth =3D =
element.clientWidth;=20
var originalHeight =3D element.clientHeight; els.display =3D =
originalDisplay;=20
els.position =3D originalPosition; els.visibility =3D =
originalVisibility; return=20
{width: originalWidth, height: originalHeight}; }, makePositioned:=20
function(element) { element =3D $(element); var pos =3D =
Element.getStyle(element,=20
'position'); if (pos =3D=3D 'static' || !pos) { element._madePositioned =
=3D true;=20
element.style.position =3D 'relative'; if (Prototype.Browser.Opera) {=20
element.style.top =3D 0; element.style.left =3D 0; } } return element; =
},=20
undoPositioned: function(element) { element =3D $(element); if=20
(element._madePositioned) { element._madePositioned =3D undefined;=20
element.style.position =3D element.style.top =3D element.style.left =3D=20
element.style.bottom =3D element.style.right =3D ''; } return element; =
},=20
makeClipping: function(element) { element =3D $(element); if =
(element._overflow)=20
return element; element._overflow =3D Element.getStyle(element, =
'overflow') ||=20
'auto'; if (element._overflow !=3D=3D 'hidden') element.style.overflow =
=3D 'hidden';=20
return element; }, undoClipping: function(element) { element =3D =
$(element); if=20
(!element._overflow) return element; element.style.overflow =3D =
element._overflow=20
=3D=3D 'auto' ? '' : element._overflow; element._overflow =3D null; =
return element; },=20
cumulativeOffset: function(element) { var valueT =3D 0, valueL =3D 0; do =
{ valueT +=3D=20
element.offsetTop || 0; valueL +=3D element.offsetLeft || 0; element =3D =

element.offsetParent; } while (element); return =
Element._returnOffset(valueL,=20
valueT); }, positionedOffset: function(element) { var valueT =3D 0, =
valueL =3D 0; do=20
{ valueT +=3D element.offsetTop || 0; valueL +=3D element.offsetLeft || =
0; element =3D=20
element.offsetParent; if (element) { if (element.tagName.toUpperCase() =
=3D=3D=20
'BODY') break; var p =3D Element.getStyle(element, 'position'); if (p =
!=3D=3D=20
'static') break; } } while (element); return =
Element._returnOffset(valueL,=20
valueT); }, absolutize: function(element) { element =3D $(element); if=20
(Element.getStyle(element, 'position') =3D=3D 'absolute') return =
element; var=20
offsets =3D Element.positionedOffset(element); var top =3D offsets[1]; =
var left =3D=20
offsets[0]; var width =3D element.clientWidth; var height =3D =
element.clientHeight;=20
element._originalLeft =3D left - parseFloat(element.style.left || 0);=20
element._originalTop =3D top - parseFloat(element.style.top || 0);=20
element._originalWidth =3D element.style.width; element._originalHeight =
=3D=20
element.style.height; element.style.position =3D 'absolute'; =
element.style.top =3D=20
top + 'px'; element.style.left =3D left + 'px'; element.style.width =3D =
width +=20
'px'; element.style.height =3D height + 'px'; return element; }, =
relativize:=20
function(element) { element =3D $(element); if =
(Element.getStyle(element,=20
'position') =3D=3D 'relative') return element; element.style.position =
=3D 'relative';=20
var top =3D parseFloat(element.style.top || 0) - (element._originalTop =
|| 0); var=20
left =3D parseFloat(element.style.left || 0) - (element._originalLeft || =
0);=20
element.style.top =3D top + 'px'; element.style.left =3D left + 'px';=20
element.style.height =3D element._originalHeight; element.style.width =
=3D=20
element._originalWidth; return element; }, cumulativeScrollOffset:=20
function(element) { var valueT =3D 0, valueL =3D 0; do { valueT +=3D =
element.scrollTop=20
|| 0; valueL +=3D element.scrollLeft || 0; element =3D =
element.parentNode; } while=20
(element); return Element._returnOffset(valueL, valueT); }, =
getOffsetParent:=20
function(element) { if (element.offsetParent) return =
$(element.offsetParent); if=20
(element =3D=3D document.body) return $(element); while ((element =3D=20
element.parentNode) &amp;&amp; element !=3D document.body) if=20
(Element.getStyle(element, 'position') !=3D 'static') return $(element); =
return=20
$(document.body); }, viewportOffset: function(forElement) { var valueT =
=3D 0,=20
valueL =3D 0; var element =3D forElement; do { valueT +=3D =
element.offsetTop || 0;=20
valueL +=3D element.offsetLeft || 0; if (element.offsetParent =3D=3D =
document.body=20
&amp;&amp; Element.getStyle(element, 'position') =3D=3D 'absolute') =
break; } while=20
(element =3D element.offsetParent); element =3D forElement; do { if=20
(!Prototype.Browser.Opera || (element.tagName &amp;&amp;=20
(element.tagName.toUpperCase() =3D=3D 'BODY'))) { valueT -=3D =
element.scrollTop || 0;=20
valueL -=3D element.scrollLeft || 0; } } while (element =3D =
element.parentNode);=20
return Element._returnOffset(valueL, valueT); }, clonePosition:=20
function(element, source) { var options =3D Object.extend({ setLeft: =
true, setTop:=20
true, setWidth: true, setHeight: true, offsetTop: 0, offsetLeft: 0 },=20
arguments[2] || { }); source =3D $(source); var p =3D=20
Element.viewportOffset(source); element =3D $(element); var delta =3D =
[0, 0]; var=20
parent =3D null; if (Element.getStyle(element, 'position') =3D=3D =
'absolute') { parent=20
=3D Element.getOffsetParent(element); delta =3D =
Element.viewportOffset(parent); } if=20
(parent =3D=3D document.body) { delta[0] -=3D document.body.offsetLeft; =
delta[1] -=3D=20
document.body.offsetTop; } if (options.setLeft) element.style.left =3D =
(p[0] -=20
delta[0] + options.offsetLeft) + 'px'; if (options.setTop) =
element.style.top =3D=20
(p[1] - delta[1] + options.offsetTop) + 'px'; if (options.setWidth)=20
element.style.width =3D source.offsetWidth + 'px'; if =
(options.setHeight)=20
element.style.height =3D source.offsetHeight + 'px'; return element; } =
};=20
Object.extend(Element.Methods, { getElementsBySelector: =
Element.Methods.select,=20
childElements: Element.Methods.immediateDescendants });=20
Element._attributeTranslations =3D { write: { names: { className: =
'class',=20
htmlFor: 'for' }, values: { } } }; if (Prototype.Browser.Opera) {=20
Element.Methods.getStyle =3D Element.Methods.getStyle.wrap( =
function(proceed,=20
element, style) { switch (style) { case 'left': case 'top': case =
'right': case=20
'bottom': if (proceed(element, 'position') =3D=3D=3D 'static') return =
null; case=20
'height': case 'width': if (!Element.visible(element)) return null; var =
dim =3D=20
parseInt(proceed(element, style), 10); if (dim !=3D=3D element['offset' =
+=20
style.capitalize()]) return dim + 'px'; var properties; if (style =
=3D=3D=3D 'height')=20
{ properties =3D ['border-top-width', 'padding-top', 'padding-bottom',=20
'border-bottom-width']; } else { properties =3D ['border-left-width',=20
'padding-left', 'padding-right', 'border-right-width']; } return=20
properties.inject(dim, function(memo, property) { var val =3D =
proceed(element,=20
property); return val =3D=3D=3D null ? memo : memo - parseInt(val, 10); =
}) + 'px';=20
default: return proceed(element, style); } } ); =
Element.Methods.readAttribute =3D=20
Element.Methods.readAttribute.wrap( function(proceed, element, =
attribute) { if=20
(attribute =3D=3D=3D 'title') return element.title; return =
proceed(element,=20
attribute); } ); } else if (Prototype.Browser.IE) {=20
Element.Methods.getOffsetParent =3D =
Element.Methods.getOffsetParent.wrap(=20
function(proceed, element) { element =3D $(element); try { =
element.offsetParent }=20
catch(e) { return $(document.body) } var position =3D=20
element.getStyle('position'); if (position !=3D=3D 'static') return=20
proceed(element); element.setStyle({ position: 'relative' }); var value =
=3D=20
proceed(element); element.setStyle({ position: position }); return =
value; } );=20
$w('positionedOffset viewportOffset').each(function(method) {=20
Element.Methods[method] =3D Element.Methods[method].wrap( =
function(proceed,=20
element) { element =3D $(element); try { element.offsetParent } catch(e) =
{ return=20
Element._returnOffset(0,0) } var position =3D =
element.getStyle('position'); if=20
(position !=3D=3D 'static') return proceed(element); var offsetParent =
=3D=20
element.getOffsetParent(); if (offsetParent &amp;&amp;=20
offsetParent.getStyle('position') =3D=3D=3D 'fixed') =
offsetParent.setStyle({ zoom: 1=20
}); element.setStyle({ position: 'relative' }); var value =3D =
proceed(element);=20
element.setStyle({ position: position }); return value; } ); });=20
Element.Methods.cumulativeOffset =3D =
Element.Methods.cumulativeOffset.wrap(=20
function(proceed, element) { try { element.offsetParent } catch(e) { =
return=20
Element._returnOffset(0,0) } return proceed(element); } );=20
Element.Methods.getStyle =3D function(element, style) { element =3D =
$(element);=20
style =3D (style =3D=3D 'float' || style =3D=3D 'cssFloat') ? =
'styleFloat' :=20
style.camelize(); var value =3D element.style[style]; if (!value =
&amp;&amp;=20
element.currentStyle) value =3D element.currentStyle[style]; if (style =
=3D=3D=20
'opacity') { if (value =3D (element.getStyle('filter') ||=20
'').match(/alpha\(opacity=3D(.*)\)/)) if (value[1]) return =
parseFloat(value[1]) /=20
100; return 1.0; } if (value =3D=3D 'auto') { if ((style =3D=3D 'width' =
|| style =3D=3D=20
'height') &amp;&amp; (element.getStyle('display') !=3D 'none')) return=20
element['offset' + style.capitalize()] + 'px'; return null; } return =
value; };=20
Element.Methods.setOpacity =3D function(element, value) { function=20
stripAlpha(filter){ return filter.replace(/alpha\([^\)]*\)/gi,''); } =
element =3D=20
$(element); var currentStyle =3D element.currentStyle; if ((currentStyle =

&amp;&amp; !currentStyle.hasLayout) || (!currentStyle &amp;&amp;=20
element.style.zoom =3D=3D 'normal')) element.style.zoom =3D 1; var =
filter =3D=20
element.getStyle('filter'), style =3D element.style; if (value =3D=3D 1 =
|| value =3D=3D=3D=20
'') { (filter =3D stripAlpha(filter)) ? style.filter =3D filter :=20
style.removeAttribute('filter'); return element; } else if (value &lt; =
0.00001)=20
value =3D 0; style.filter =3D stripAlpha(filter) + 'alpha(opacity=3D' + =
(value * 100)=20
+ ')'; return element; }; Element._attributeTranslations =3D =
(function(){ var=20
classProp =3D 'className'; var forProp =3D 'for'; var el =3D=20
document.createElement('div'); el.setAttribute(classProp, 'x'); if =
(el.className=20
!=3D=3D 'x') { el.setAttribute('class', 'x'); if (el.className =3D=3D=3D =
'x') { classProp=20
=3D 'class'; } } el =3D null; el =3D document.createElement('label');=20
el.setAttribute(forProp, 'x'); if (el.htmlFor !=3D=3D 'x') {=20
el.setAttribute('htmlFor', 'x'); if (el.htmlFor =3D=3D=3D 'x') { forProp =
=3D 'htmlFor';=20
} } el =3D null; return { read: { names: { 'class': classProp, =
'className':=20
classProp, 'for': forProp, 'htmlFor': forProp }, values: { _getAttr:=20
function(element, attribute) { return element.getAttribute(attribute); =
},=20
_getAttr2: function(element, attribute) { return =
element.getAttribute(attribute,=20
2); }, _getAttrNode: function(element, attribute) { var node =3D=20
element.getAttributeNode(attribute); return node ? node.value : ""; }, =
_getEv:=20
(function(){ var el =3D document.createElement('div'); el.onclick =3D=20
Prototype.emptyFunction; var value =3D el.getAttribute('onclick'); var =
f; if=20
(String(value).indexOf('{') &gt; -1) { f =3D function(element, =
attribute) {=20
attribute =3D element.getAttribute(attribute); if (!attribute) return =
null;=20
attribute =3D attribute.toString(); attribute =3D =
attribute.split('{')[1]; attribute=20
=3D attribute.split('}')[0]; return attribute.strip(); }; } else if =
(value =3D=3D=3D '')=20
{ f =3D function(element, attribute) { attribute =3D=20
element.getAttribute(attribute); if (!attribute) return null; return=20
attribute.strip(); }; } el =3D null; return f; })(), _flag: =
function(element,=20
attribute) { return $(element).hasAttribute(attribute) ? attribute : =
null; },=20
style: function(element) { return element.style.cssText.toLowerCase(); =
}, title:=20
function(element) { return element.title; } } } } })();=20
Element._attributeTranslations.write =3D { names: Object.extend({ =
cellpadding:=20
'cellPadding', cellspacing: 'cellSpacing' },=20
Element._attributeTranslations.read.names), values: { checked: =
function(element,=20
value) { element.checked =3D !!value; }, style: function(element, value) =
{=20
element.style.cssText =3D value ? value : ''; } } };=20
Element._attributeTranslations.has =3D {}; $w('colSpan rowSpan vAlign =
dateTime=20
accessKey tabIndex ' + 'encType maxLength readOnly longDesc=20
frameBorder').each(function(attr) {=20
Element._attributeTranslations.write.names[attr.toLowerCase()] =3D attr; =

Element._attributeTranslations.has[attr.toLowerCase()] =3D attr; }); =
(function(v)=20
{ Object.extend(v, { href: v._getAttr2, src: v._getAttr2, type: =
v._getAttr,=20
action: v._getAttrNode, disabled: v._flag, checked: v._flag, readonly: =
v._flag,=20
multiple: v._flag, onload: v._getEv, onunload: v._getEv, onclick: =
v._getEv,=20
ondblclick: v._getEv, onmousedown: v._getEv, onmouseup: v._getEv, =
onmouseover:=20
v._getEv, onmousemove: v._getEv, onmouseout: v._getEv, onfocus: =
v._getEv,=20
onblur: v._getEv, onkeypress: v._getEv, onkeydown: v._getEv, onkeyup: =
v._getEv,=20
onsubmit: v._getEv, onreset: v._getEv, onselect: v._getEv, onchange: =
v._getEv=20
}); })(Element._attributeTranslations.read.values); if=20
(Prototype.BrowserFeatures.ElementExtensions) { (function() { function=20
_descendants(element) { var nodes =3D element.getElementsByTagName('*'), =
results =3D=20
[]; for (var i =3D 0, node; node =3D nodes[i]; i++) if (node.tagName =
!=3D=3D "!") //=20
Filter out comment nodes. results.push(node); return results; }=20
Element.Methods.down =3D function(element, expression, index) { element =
=3D=20
$(element); if (arguments.length =3D=3D 1) return =
element.firstDescendant(); return=20
Object.isNumber(expression) ? _descendants(element)[expression] :=20
Element.select(element, expression)[index || 0]; } })(); } } else if=20
(Prototype.Browser.Gecko &amp;&amp; =
/rv:1\.8\.0/.test(navigator.userAgent)) {=20
Element.Methods.setOpacity =3D function(element, value) { element =3D =
$(element);=20
element.style.opacity =3D (value =3D=3D 1) ? 0.999999 : (value =3D=3D=3D =
'') ? '' : (value=20
&lt; 0.00001) ? 0 : value; return element; }; } else if=20
(Prototype.Browser.WebKit) { Element.Methods.setOpacity =3D =
function(element,=20
value) { element =3D $(element); element.style.opacity =3D (value =3D=3D =
1 || value =3D=3D=3D=20
'') ? '' : (value &lt; 0.00001) ? 0 : value; if (value =3D=3D 1)=20
if(element.tagName.toUpperCase() =3D=3D 'IMG' &amp;&amp; element.width) =
{=20
element.width++; element.width--; } else try { var n =3D =
document.createTextNode('=20
'); element.appendChild(n); element.removeChild(n); } catch (e) { } =
return=20
element; }; Element.Methods.cumulativeOffset =3D function(element) { var =
valueT =3D=20
0, valueL =3D 0; do { valueT +=3D element.offsetTop || 0; valueL +=3D=20
element.offsetLeft || 0; if (element.offsetParent =3D=3D document.body) =
if=20
(Element.getStyle(element, 'position') =3D=3D 'absolute') break; element =
=3D=20
element.offsetParent; } while (element); return =
Element._returnOffset(valueL,=20
valueT); }; } if ('outerHTML' in document.documentElement) {=20
Element.Methods.replace =3D function(element, content) { element =3D =
$(element); if=20
(content &amp;&amp; content.toElement) content =3D content.toElement(); =
if=20
(Object.isElement(content)) { element.parentNode.replaceChild(content, =
element);=20
return element; } content =3D Object.toHTML(content); var parent =3D=20
element.parentNode, tagName =3D parent.tagName.toUpperCase(); if=20
(Element._insertionTranslations.tags[tagName]) { var nextSibling =3D=20
element.next(); var fragments =3D =
Element._getContentFromAnonymousElement(tagName,=20
content.stripScripts()); parent.removeChild(element); if (nextSibling)=20
fragments.each(function(node) { parent.insertBefore(node, nextSibling) =
}); else=20
fragments.each(function(node) { parent.appendChild(node) }); } else=20
element.outerHTML =3D content.stripScripts();=20
content.evalScripts.bind(content).defer(); return element; }; }=20
Element._returnOffset =3D function(l, t) { var result =3D [l, t]; =
result.left =3D l;=20
result.top =3D t; return result; }; =
Element._getContentFromAnonymousElement =3D=20
function(tagName, html) { var div =3D new Element('div'), t =3D=20
Element._insertionTranslations.tags[tagName]; if (t) { div.innerHTML =3D =
t[0] +=20
html + t[1]; t[2].times(function() { div =3D div.firstChild }); } else=20
div.innerHTML =3D html; return $A(div.childNodes); };=20
Element._insertionTranslations =3D { before: function(element, node) {=20
element.parentNode.insertBefore(node, element); }, top: =
function(element, node)=20
{ element.insertBefore(node, element.firstChild); }, bottom: =
function(element,=20
node) { element.appendChild(node); }, after: function(element, node) {=20
element.parentNode.insertBefore(node, element.nextSibling); }, tags: { =
TABLE: ['
<TABLE>', '
  <TBODY></TBODY></TABLE>', 1], TBODY: ['
<TABLE>
  <TBODY>', '</TBODY></TABLE>', 2], TR: ['
<TABLE>
  <TBODY>
  <TR>', '</TR></TBODY></TABLE>', 3], TD: ['
<TABLE>
  <TBODY>
  <TR>
    <TD>', '</TD></TR></TBODY></TABLE>', 4], SELECT: ['<SELECT>', =
'</SELECT>', 1] }=20
}; (function() { var tags =3D Element._insertionTranslations.tags;=20
Object.extend(tags, { THEAD: tags.TBODY, TFOOT: tags.TBODY, TH: tags.TD =
});=20
})(); Element.Methods.Simulated =3D { hasAttribute: function(element, =
attribute) {=20
attribute =3D Element._attributeTranslations.has[attribute] || =
attribute; var node=20
=3D $(element).getAttributeNode(attribute); return !!(node &amp;&amp;=20
node.specified); } }; Element.Methods.ByTag =3D { }; =
Object.extend(Element,=20
Element.Methods); (function(div) { if=20
(!Prototype.BrowserFeatures.ElementExtensions &amp;&amp; =
div['__proto__']) {=20
window.HTMLElement =3D { }; window.HTMLElement.prototype =3D =
div['__proto__'];=20
Prototype.BrowserFeatures.ElementExtensions =3D true; } div =3D null;=20
})(document.createElement('div')) Element.extend =3D (function() { =
function=20
checkDeficiency(tagName) { if (typeof window.Element !=3D 'undefined') { =
var proto=20
=3D window.Element.prototype; if (proto) { var id =3D '_' +=20
(Math.random()+'').slice(2); var el =3D document.createElement(tagName); =
proto[id]=20
=3D 'x'; var isBuggy =3D (el[id] !=3D=3D 'x'); delete proto[id]; el =3D =
null; return=20
isBuggy; } } return false; } function extendElementWith(element, =
methods) { for=20
(var property in methods) { var value =3D methods[property]; if=20
(Object.isFunction(value) &amp;&amp; !(property in element)) =
element[property] =3D=20
value.methodize(); } } var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =3D=20
checkDeficiency('object'); if=20
(Prototype.BrowserFeatures.SpecificElementExtensions) { if=20
(HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) { return function(element) { if =
(element=20
&amp;&amp; typeof element._extendedByPrototype =3D=3D 'undefined') { var =
t =3D=20
element.tagName; if (t &amp;&amp; =
(/^(?:object|applet|embed)$/i.test(t))) {=20
extendElementWith(element, Element.Methods); extendElementWith(element,=20
Element.Methods.Simulated); extendElementWith(element,=20
Element.Methods.ByTag[t.toUpperCase()]); } } return element; } } return=20
Prototype.K; } var Methods =3D { }, ByTag =3D Element.Methods.ByTag; var =
extend =3D=20
Object.extend(function(element) { if (!element || typeof=20
element._extendedByPrototype !=3D 'undefined' || element.nodeType !=3D 1 =
|| element=20
=3D=3D window) return element; var methods =3D Object.clone(Methods), =
tagName =3D=20
element.tagName.toUpperCase(); if (ByTag[tagName]) =
Object.extend(methods,=20
ByTag[tagName]); extendElementWith(element, methods);=20
element._extendedByPrototype =3D Prototype.emptyFunction; return =
element; }, {=20
refresh: function() { if (!Prototype.BrowserFeatures.ElementExtensions) =
{=20
Object.extend(Methods, Element.Methods); Object.extend(Methods,=20
Element.Methods.Simulated); } } }); extend.refresh(); return extend; =
})();=20
Element.hasAttribute =3D function(element, attribute) { if =
(element.hasAttribute)=20
return element.hasAttribute(attribute); return=20
Element.Methods.Simulated.hasAttribute(element, attribute); };=20
Element.addMethods =3D function(methods) { var F =3D =
Prototype.BrowserFeatures, T =3D=20
Element.Methods.ByTag; if (!methods) { Object.extend(Form, =
Form.Methods);=20
Object.extend(Form.Element, Form.Element.Methods);=20
Object.extend(Element.Methods.ByTag, { "FORM": =
Object.clone(Form.Methods),=20
"INPUT": Object.clone(Form.Element.Methods), "SELECT":=20
Object.clone(Form.Element.Methods), "TEXTAREA":=20
Object.clone(Form.Element.Methods) }); } if (arguments.length =3D=3D 2) =
{ var=20
tagName =3D methods; methods =3D arguments[1]; } if (!tagName)=20
Object.extend(Element.Methods, methods || { }); else { if=20
(Object.isArray(tagName)) tagName.each(extend); else extend(tagName); } =
function=20
extend(tagName) { tagName =3D tagName.toUpperCase(); if=20
(!Element.Methods.ByTag[tagName]) Element.Methods.ByTag[tagName] =3D { =
};=20
Object.extend(Element.Methods.ByTag[tagName], methods); } function =
copy(methods,=20
destination, onlyIfAbsent) { onlyIfAbsent =3D onlyIfAbsent || false; for =
(var=20
property in methods) { var value =3D methods[property]; if=20
(!Object.isFunction(value)) continue; if (!onlyIfAbsent || !(property in =

destination)) destination[property] =3D value.methodize(); } } function=20
findDOMClass(tagName) { var klass; var trans =3D { "OPTGROUP": =
"OptGroup",=20
"TEXTAREA": "TextArea", "P": "Paragraph", "FIELDSET": "FieldSet", "UL": =
"UList",=20
"OL": "OList", "DL": "DList", "DIR": "Directory", "H1": "Heading", "H2": =

"Heading", "H3": "Heading", "H4": "Heading", "H5": "Heading", "H6": =
"Heading",=20
"Q": "Quote", "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", =

"CAPTION": "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", =
"THEAD":=20
"TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":=20
"TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET": =
"FrameSet",=20
"IFRAME": "IFrame" }; if (trans[tagName]) klass =3D 'HTML' + =
trans[tagName] +=20
'Element'; if (window[klass]) return window[klass]; klass =3D 'HTML' + =
tagName +=20
'Element'; if (window[klass]) return window[klass]; klass =3D 'HTML' +=20
tagName.capitalize() + 'Element'; if (window[klass]) return =
window[klass]; var=20
element =3D document.createElement(tagName); var proto =3D =
element['__proto__'] ||=20
element.constructor.prototype; element =3D null; return proto; } var=20
elementPrototype =3D window.HTMLElement ? HTMLElement.prototype :=20
Element.prototype; if (F.ElementExtensions) { copy(Element.Methods,=20
elementPrototype); copy(Element.Methods.Simulated, elementPrototype, =
true); } if=20
(F.SpecificElementExtensions) { for (var tag in Element.Methods.ByTag) { =
var=20
klass =3D findDOMClass(tag); if (Object.isUndefined(klass)) continue; =
copy(T[tag],=20
klass.prototype); } } Object.extend(Element, Element.Methods); delete=20
Element.ByTag; if (Element.extend.refresh) Element.extend.refresh();=20
Element.cache =3D { }; }; document.viewport =3D { getDimensions: =
function() { return=20
{ width: this.getWidth(), height: this.getHeight() }; }, =
getScrollOffsets:=20
function() { return Element._returnOffset( window.pageXOffset ||=20
document.documentElement.scrollLeft || document.body.scrollLeft,=20
window.pageYOffset || document.documentElement.scrollTop ||=20
document.body.scrollTop); } }; (function(viewport) { var B =3D =
Prototype.Browser,=20
doc =3D document, element, property =3D {}; function getRootElement() { =
if (B.WebKit=20
&amp;&amp; !doc.evaluate) return document; if (B.Opera &amp;&amp;=20
window.parseFloat(window.opera.version()) &lt; 9.5) return =
document.body; return=20
document.documentElement; } function define(D) { if (!element) element =
=3D=20
getRootElement(); property[D] =3D 'client' + D; viewport['get' + D] =3D =
function() {=20
return element[property[D]] }; return viewport['get' + D](); } =
viewport.getWidth=20
=3D define.curry('Width'); viewport.getHeight =3D =
define.curry('Height');=20
})(document.viewport); Element.Storage =3D { UID: 1 }; =
Element.addMethods({=20
getStorage: function(element) { if (!(element =3D $(element))) return; =
var uid; if=20
(element =3D=3D=3D window) { uid =3D 0; } else { if (typeof =
element._prototypeUID =3D=3D=3D=20
"undefined") element._prototypeUID =3D [Element.Storage.UID++]; uid =3D=20
element._prototypeUID[0]; } if (!Element.Storage[uid]) =
Element.Storage[uid] =3D=20
$H(); return Element.Storage[uid]; }, store: function(element, key, =
value) { if=20
(!(element =3D $(element))) return; if (arguments.length =3D=3D=3D 2) {=20
Element.getStorage(element).update(key); } else {=20
Element.getStorage(element).set(key, value); } return element; }, =
retrieve:=20
function(element, key, defaultValue) { if (!(element =3D $(element))) =
return; var=20
hash =3D Element.getStorage(element), value =3D hash.get(key); if=20
(Object.isUndefined(value)) { hash.set(key, defaultValue); value =3D =
defaultValue;=20
} return value; }, clone: function(element, deep) { if (!(element =3D =
$(element)))=20
return; var clone =3D element.cloneNode(deep); clone._prototypeUID =3D =
void 0; if=20
(deep) { var descendants =3D Element.select(clone, '*'), i =3D =
descendants.length;=20
while (i--) { descendants[i]._prototypeUID =3D void 0; } } return=20
Element.extend(clone); } }); /* Portions of the Selector class are =
derived from=20
Jack Slocum's DomQuery, * part of YUI-Ext version 0.40, distributed =
under the=20
terms of an MIT-style * license. Please see http://www.yui-ext.com/ for =
more=20
information. */ var Selector =3D Class.create({ initialize: =
function(expression) {=20
this.expression =3D expression.strip(); if =
(this.shouldUseSelectorsAPI()) {=20
this.mode =3D 'selectorsAPI'; } else if (this.shouldUseXPath()) { =
this.mode =3D=20
'xpath'; this.compileXPathMatcher(); } else { this.mode =3D "normal";=20
this.compileMatcher(); } }, shouldUseXPath: (function() { var=20
IS_DESCENDANT_SELECTOR_BUGGY =3D (function(){ var isBuggy =3D false; if=20
(document.evaluate &amp;&amp; window.XPathResult) { var el =3D=20
document.createElement('div'); el.innerHTML =3D '
<UL>
  <LI></LI></UL>
<DIV>
<UL>
  <LI></LI></UL></DIV>'; var xpath =3D ".//*[local-name()=3D'ul' or=20
local-name()=3D'UL']" + "//*[local-name()=3D'li' or =
local-name()=3D'LI']"; var result=20
=3D document.evaluate(xpath, el, null, =
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,=20
null); isBuggy =3D (result.snapshotLength !=3D=3D 2); el =3D null; } =
return isBuggy;=20
})(); return function() { if (!Prototype.BrowserFeatures.XPath) return =
false;=20
var e =3D this.expression; if (Prototype.Browser.WebKit &amp;&amp;=20
(e.include("-of-type") || e.include(":empty"))) return false; if=20
((/(\[[\w-]*?:|:checked)/).test(e)) return false; if=20
(IS_DESCENDANT_SELECTOR_BUGGY) return false; return true; } })(),=20
shouldUseSelectorsAPI: function() { if =
(!Prototype.BrowserFeatures.SelectorsAPI)=20
return false; if (Selector.CASE_INSENSITIVE_CLASS_NAMES) return false; =
if=20
(!Selector._div) Selector._div =3D new Element('div'); try {=20
Selector._div.querySelector(this.expression); } catch(e) { return false; =
}=20
return true; }, compileMatcher: function() { var e =3D this.expression, =
ps =3D=20
Selector.patterns, h =3D Selector.handlers, c =3D Selector.criteria, le, =
p, m, len =3D=20
ps.length, name; if (Selector._cache[e]) { this.matcher =3D =
Selector._cache[e];=20
return; } this.matcher =3D ["this.matcher =3D function(root) {", "var r =
=3D root, h =3D=20
Selector.handlers, c =3D false, n;"]; while (e &amp;&amp; le !=3D e =
&amp;&amp;=20
(/\S/).test(e)) { le =3D e; for (var i =3D 0; i<LEN; =
id=3D$(root).identify(); ? +=20
return { this.expression.inspect() ?#<Selector:? function() inspect: },=20
this.expression; toString: match; } break; match=3D"true," matches))=20
(!Selector.assertions[name](element, if matches=3D"token[1];" =
name=3D"ps[i].name;"=20
i++) token=3D"this.tokens[i];" token; i=3D"0;" (var for matches; name, =
var=20
this.findElements(document).include(element); else ??); =
e=3D"e.replace(m[0],"=20
Object.clone(m)]); this.tokens.push([name, (as[name]) (m=3D"e.match(p))" =

p=3D"ps[i].re;" i<len; le ).test(e)) \S ( && !=3D"e" (e while name; =
len=3D"ps.length,"=20
m, p, le, as=3D"Selector.assertions;" ps=3D"Selector.patterns," =
this.tokens=3D"[];"=20
function(element) match: this.matcher(root); default: root);=20
document._getElementsByXPath(this.xpath, ?xpath?: case results; =
root.id=3D"oldId;"=20
results=3D"$A(root.querySelectorAll(e)).map(Element.extend);" e; =
?\\$1?);=20
oldId=3D"root.id," document) (root ?selectorsAPI?: (this.mode) switch =
document; ||=20
root=3D"root" function(root) findElements:=20
Selector._cache[this.expression]=3D"this.matcher;"=20
this.xpath=3D"Selector._cache[e];" Template(x[name]).evaluate(m)); new : =

x[name](m) this.matcher.push(Object.isFunction(x[name]) =
this.matcher=3D"['.//*'];"=20
return; (Selector._cache[e]) x=3D"Selector.xpath," compileXPathMatcher:=20
eval(this.matcher.join(?\n?)); h.unique(n);\n}?); =
this.matcher.push(?return=20
Template(c[name]).evaluate(m)); c[name](m)=20
this.matcher.push(Object.isFunction(c[name])>"; } }); if=20
(Prototype.BrowserFeatures.SelectorsAPI &amp;&amp; document.compatMode =
=3D=3D=3D=20
'BackCompat') { Selector.CASE_INSENSITIVE_CLASS_NAMES =3D (function(){ =
var div =3D=20
document.createElement('div'), span =3D document.createElement('span'); =
div.id =3D=20
"prototype_test_id"; span.className =3D 'Test'; div.appendChild(span); =
var=20
isIgnored =3D (div.querySelector('#prototype_test_id .test') !=3D=3D =
null); div =3D span=20
=3D null; return isIgnored; })(); } Object.extend(Selector, { _cache: { =
}, xpath:=20
{ descendant: "//*", child: "/*", adjacent: "/following-sibling::*[1]",=20
laterSibling: '/following-sibling::*', tagName: function(m) { if (m[1] =
=3D=3D '*')=20
return ''; return "[local-name()=3D'" + m[1].toLowerCase() + "' or =
local-name()=3D'"=20
+ m[1].toUpperCase() + "']"; }, className: "[contains(concat(' ', =
@class, ' '),=20
' #{1} ')]", id: "[@id=3D'#{1}']", attrPresence: function(m) { m[1] =3D=20
m[1].toLowerCase(); return new Template("[@#{1}]").evaluate(m); }, attr: =

function(m) { m[1] =3D m[1].toLowerCase(); m[3] =3D m[5] || m[6]; return =
new=20
Template(Selector.xpath.operators[m[2]]).evaluate(m); }, pseudo: =
function(m) {=20
var h =3D Selector.xpath.pseudos[m[1]]; if (!h) return ''; if=20
(Object.isFunction(h)) return h(m); return new=20
Template(Selector.xpath.pseudos[m[1]]).evaluate(m); }, operators: { =
'=3D':=20
"[@#{1}=3D'#{3}']", '!=3D': "[@#{1}!=3D'#{3}']", '^=3D': =
"[starts-with(@#{1}, '#{3}')]",=20
'$=3D': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') =
+=20
1))=3D'#{3}']", '*=3D': "[contains(@#{1}, '#{3}')]", '~=3D': =
"[contains(concat(' ',=20
@#{1}, ' '), ' #{3} ')]", '|=3D': "[contains(concat('-', @#{1}, '-'), =
'-#{3}-')]"=20
}, pseudos: { 'first-child': '[not(preceding-sibling::*)]', =
'last-child':=20
'[not(following-sibling::*)]', 'only-child': '[not(preceding-sibling::* =
or=20
following-sibling::*)]', 'empty': "[count(*) =3D 0 and (count(text()) =
=3D 0)]",=20
'checked': "[@checked]", 'disabled': "[(@disabled) and =
(@type!=3D'hidden')]",=20
'enabled': "[not(@disabled) and (@type!=3D'hidden')]", 'not': =
function(m) { var e=20
=3D m[6], p =3D Selector.patterns, x =3D Selector.xpath, le, v, len =3D =
p.length, name;=20
var exclusion =3D []; while (e &amp;&amp; le !=3D e &amp;&amp; =
(/\S/).test(e)) { le=20
=3D e; for (var i =3D 0; i<LEN; ? + ?) return { }, } break; if =
name=3D"p[i].name" i++)=20
var ??); e=3D"e.replace(m[0]," (m=3D"e.match(p[i].re))" =
p=3D"Selector.xpath.pseudos;"=20
new : x[name](m) #{a} div #{b}) - ?((#{fragment}=20
predicate=3D"[((#{fragment} - #{b}) mod #{a} =3D 0) and " 0; =
Number(mm[2]) b=3D"mm[2]"=20
1; Number(mm[1]) a=3D"mm[1]" mm[1]=3D"-1;" -?) fragment ?[? only digit=20
(mm=3D"formula.match(/^(\d+)$/))" ; formula=3D"m[6]," ?odd?) =
(formula=3D"=3D" ?even?)=20
predicate; mm, m) function(fragment, nth: p[?last-of-type?](m);=20
p[?first-of-type?](m) function(m) ?only-of-type?:=20
Selector.xpath.pseudos[?nth-last-of-type?](m); m[6]=3D"1" =
?last-of-type?:=20
Selector.xpath.pseudos[?nth-of-type?](m); ?first-of-type?: m); ?, =
position()) 1=20
Selector.xpath.pseudos.nth(?(last() ?nth-last-of-type?:=20
Selector.xpath.pseudos.nth(?position() ?nth-of-type?: 1) =
following-sibling::*)=20
Selector.xpath.pseudos.nth(?(count(. ?nth-last-child?: =
preceding-sibling::*)=20
?nth-child?: ?)]?; and exclusion.join(? ?[not(? ?)?); v.length =
v.substring(1,=20
exclusion.push(?(? Template(x[name]).evaluate(m);=20
v=3D"Object.isFunction(x[name])">=3D 0)]"; return new =
Template(predicate).evaluate({=20
fragment: fragment, a: a, b: b }); } } } }, criteria: { tagName: 'n =3D=20
h.tagName(n, r, "#{1}", c); c =3D false;', className: 'n =3D =
h.className(n, r,=20
"#{1}", c); c =3D false;', id: 'n =3D h.id(n, r, "#{1}", c); c =3D =
false;',=20
attrPresence: 'n =3D h.attrPresence(n, r, "#{1}", c); c =3D false;', =
attr:=20
function(m) { m[3] =3D (m[5] || m[6]); return new Template('n =3D =
h.attr(n, r,=20
"#{1}", "#{3}", "#{2}", c); c =3D false;').evaluate(m); }, pseudo: =
function(m) {=20
if (m[6]) m[6] =3D m[6].replace(/"/g, '\\"'); return new Template('n =3D =
h.pseudo(n,=20
"#{1}", "#{6}", r, c); c =3D false;').evaluate(m); }, descendant: 'c =3D =

"descendant";', child: 'c =3D "child";', adjacent: 'c =3D "adjacent";',=20
laterSibling: 'c =3D "laterSibling";' }, patterns: [ { name: =
'laterSibling', re:=20
/^\s*~\s*/ }, { name: 'child', re: /^\s*&gt;\s*/ }, { name: 'adjacent', =
re:=20
/^\s*\+\s*/ }, { name: 'descendant', re: /^\s/ }, { name: 'tagName', re: =

/^\s*(\*|[\w\-]+)(\b|$)?/ }, { name: 'id', re: /^#([\w\-\*]+)(\b|$)/ }, =
{ name:=20
'className', re: /^\.([\w\-\*]+)(\b|$)/ }, { name: 'pseudo', re:=20
/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis=
)abled|not)(\((.*?)\))?(\b|$|(?=3D\s|[:+~&gt;]))/=20
}, { name: 'attrPresence', re: /^\[((?:[\w-]+:)?[\w-]+)\]/ }, { name: =
'attr',=20
re:=20
/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=3D)\s*((['"])([^\4]*?)\4|([^'"][^=
\]]*?)))?\]/=20
} ], assertions: { tagName: function(element, matches) { return=20
matches[1].toUpperCase() =3D=3D element.tagName.toUpperCase(); }, =
className:=20
function(element, matches) { return Element.hasClassName(element, =
matches[1]);=20
}, id: function(element, matches) { return element.id =3D=3D=3D =
matches[1]; },=20
attrPresence: function(element, matches) { return =
Element.hasAttribute(element,=20
matches[1]); }, attr: function(element, matches) { var nodeValue =3D=20
Element.readAttribute(element, matches[1]); return nodeValue &amp;&amp;=20
Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]); } =
},=20
handlers: { concat: function(a, b) { for (var i =3D 0, node; node =3D =
b[i]; i++)=20
a.push(node); return a; }, mark: function(nodes) { var _true =3D=20
Prototype.emptyFunction; for (var i =3D 0, node; node =3D nodes[i]; i++) =

node._countedByPrototype =3D _true; return nodes; }, unmark: =
(function(){ var=20
PROPERTIES_ATTRIBUTES_MAP =3D (function(){ var el =3D =
document.createElement('div'),=20
isBuggy =3D false, propName =3D '_countedByPrototype', value =3D 'x' =
el[propName] =3D=20
value; isBuggy =3D (el.getAttribute(propName) =3D=3D=3D value); el =3D =
null; return=20
isBuggy; })(); return PROPERTIES_ATTRIBUTES_MAP ? function(nodes) { for =
(var i =3D=20
0, node; node =3D nodes[i]; i++) =
node.removeAttribute('_countedByPrototype');=20
return nodes; } : function(nodes) { for (var i =3D 0, node; node =3D =
nodes[i]; i++)=20
node._countedByPrototype =3D void 0; return nodes; } })(), index:=20
function(parentNode, reverse, ofType) { parentNode._countedByPrototype =
=3D=20
Prototype.emptyFunction; if (reverse) { for (var nodes =3D =
parentNode.childNodes,=20
i =3D nodes.length - 1, j =3D 1; i &gt;=3D 0; i--) { var node =3D =
nodes[i]; if=20
(node.nodeType =3D=3D 1 &amp;&amp; (!ofType || =
node._countedByPrototype))=20
node.nodeIndex =3D j++; } } else { for (var i =3D 0, j =3D 1, nodes =3D=20
parentNode.childNodes; node =3D nodes[i]; i++) if (node.nodeType =3D=3D =
1 &amp;&amp;=20
(!ofType || node._countedByPrototype)) node.nodeIndex =3D j++; } }, =
unique:=20
function(nodes) { if (nodes.length =3D=3D 0) return nodes; var results =
=3D [], n; for=20
(var i =3D 0, l =3D nodes.length; i &lt; l; i++) if (typeof (n =3D=20
nodes[i])._countedByPrototype =3D=3D 'undefined') { =
n._countedByPrototype =3D=20
Prototype.emptyFunction; results.push(Element.extend(n)); } return=20
Selector.handlers.unmark(results); }, descendant: function(nodes) { var =
h =3D=20
Selector.handlers; for (var i =3D 0, results =3D [], node; node =3D =
nodes[i]; i++)=20
h.concat(results, node.getElementsByTagName('*')); return results; }, =
child:=20
function(nodes) { var h =3D Selector.handlers; for (var i =3D 0, results =
=3D [], node;=20
node =3D nodes[i]; i++) { for (var j =3D 0, child; child =3D =
node.childNodes[j]; j++)=20
if (child.nodeType =3D=3D 1 &amp;&amp; child.tagName !=3D '!') =
results.push(child); }=20
return results; }, adjacent: function(nodes) { for (var i =3D 0, results =
=3D [],=20
node; node =3D nodes[i]; i++) { var next =3D =
this.nextElementSibling(node); if=20
(next) results.push(next); } return results; }, laterSibling: =
function(nodes) {=20
var h =3D Selector.handlers; for (var i =3D 0, results =3D [], node; =
node =3D nodes[i];=20
i++) h.concat(results, Element.nextSiblings(node)); return results; },=20
nextElementSibling: function(node) { while (node =3D node.nextSibling) =
if=20
(node.nodeType =3D=3D 1) return node; return null; }, =
previousElementSibling:=20
function(node) { while (node =3D node.previousSibling) if (node.nodeType =
=3D=3D 1)=20
return node; return null; }, tagName: function(nodes, root, tagName, =
combinator)=20
{ var uTagName =3D tagName.toUpperCase(); var results =3D [], h =3D =
Selector.handlers;=20
if (nodes) { if (combinator) { if (combinator =3D=3D "descendant") { for =
(var i =3D 0,=20
node; node =3D nodes[i]; i++) h.concat(results,=20
node.getElementsByTagName(tagName)); return results; } else nodes =3D=20
this[combinator](nodes); if (tagName =3D=3D "*") return nodes; } for =
(var i =3D 0,=20
node; node =3D nodes[i]; i++) if (node.tagName.toUpperCase() =3D=3D=3D =
uTagName)=20
results.push(node); return results; } else return=20
root.getElementsByTagName(tagName); }, id: function(nodes, root, id, =
combinator)=20
{ var targetNode =3D $(id), h =3D Selector.handlers; if (root =3D=3D =
document) { if=20
(!targetNode) return []; if (!nodes) return [targetNode]; } else { if=20
(!root.sourceIndex || root.sourceIndex &lt; 1) { var nodes =3D=20
root.getElementsByTagName('*'); for (var j =3D 0, node; node =3D =
nodes[j]; j++) { if=20
(node.id =3D=3D=3D id) return [node]; } } } if (nodes) { if (combinator) =
{ if=20
(combinator =3D=3D 'child') { for (var i =3D 0, node; node =3D nodes[i]; =
i++) if=20
(targetNode.parentNode =3D=3D node) return [targetNode]; } else if =
(combinator =3D=3D=20
'descendant') { for (var i =3D 0, node; node =3D nodes[i]; i++) if=20
(Element.descendantOf(targetNode, node)) return [targetNode]; } else if=20
(combinator =3D=3D 'adjacent') { for (var i =3D 0, node; node =3D =
nodes[i]; i++) if=20
(Selector.handlers.previousElementSibling(targetNode) =3D=3D node) =
return=20
[targetNode]; } else nodes =3D h[combinator](nodes); } for (var i =3D 0, =
node; node=20
=3D nodes[i]; i++) if (node =3D=3D targetNode) return [targetNode]; =
return []; }=20
return (targetNode &amp;&amp; Element.descendantOf(targetNode, root)) ?=20
[targetNode] : []; }, className: function(nodes, root, className, =
combinator) {=20
if (nodes &amp;&amp; combinator) nodes =3D this[combinator](nodes); =
return=20
Selector.handlers.byClassName(nodes, root, className); }, byClassName:=20
function(nodes, root, className) { if (!nodes) nodes =3D=20
Selector.handlers.descendant([root]); var needle =3D ' ' + className + ' =
'; for=20
(var i =3D 0, results =3D [], node, nodeClassName; node =3D nodes[i]; =
i++) {=20
nodeClassName =3D node.className; if (nodeClassName.length =3D=3D 0) =
continue; if=20
(nodeClassName =3D=3D className || (' ' + nodeClassName + ' =
').include(needle))=20
results.push(node); } return results; }, attrPresence: function(nodes, =
root,=20
attr, combinator) { if (!nodes) nodes =3D =
root.getElementsByTagName("*"); if=20
(nodes &amp;&amp; combinator) nodes =3D this[combinator](nodes); var =
results =3D [];=20
for (var i =3D 0, node; node =3D nodes[i]; i++) if =
(Element.hasAttribute(node,=20
attr)) results.push(node); return results; }, attr: function(nodes, =
root, attr,=20
value, operator, combinator) { if (!nodes) nodes =3D=20
root.getElementsByTagName("*"); if (nodes &amp;&amp; combinator) nodes =
=3D=20
this[combinator](nodes); var handler =3D Selector.operators[operator], =
results =3D=20
[]; for (var i =3D 0, node; node =3D nodes[i]; i++) { var nodeValue =3D=20
Element.readAttribute(node, attr); if (nodeValue =3D=3D=3D null) =
continue; if=20
(handler(nodeValue, value)) results.push(node); } return results; }, =
pseudo:=20
function(nodes, name, value, root, combinator) { if (nodes &amp;&amp;=20
combinator) nodes =3D this[combinator](nodes); if (!nodes) nodes =3D=20
root.getElementsByTagName("*"); return Selector.pseudos[name](nodes, =
value,=20
root); } }, pseudos: { 'first-child': function(nodes, value, root) { for =
(var i=20
=3D 0, results =3D [], node; node =3D nodes[i]; i++) { if=20
(Selector.handlers.previousElementSibling(node)) continue; =
results.push(node); }=20
return results; }, 'last-child': function(nodes, value, root) { for (var =
i =3D 0,=20
results =3D [], node; node =3D nodes[i]; i++) { if=20
(Selector.handlers.nextElementSibling(node)) continue; =
results.push(node); }=20
return results; }, 'only-child': function(nodes, value, root) { var h =
=3D=20
Selector.handlers; for (var i =3D 0, results =3D [], node; node =3D =
nodes[i]; i++) if=20
(!h.previousElementSibling(node) &amp;&amp; !h.nextElementSibling(node)) =

results.push(node); return results; }, 'nth-child': function(nodes, =
formula,=20
root) { return Selector.pseudos.nth(nodes, formula, root); }, =
'nth-last-child':=20
function(nodes, formula, root) { return Selector.pseudos.nth(nodes, =
formula,=20
root, true); }, 'nth-of-type': function(nodes, formula, root) { return=20
Selector.pseudos.nth(nodes, formula, root, false, true); }, =
'nth-last-of-type':=20
function(nodes, formula, root) { return Selector.pseudos.nth(nodes, =
formula,=20
root, true, true); }, 'first-of-type': function(nodes, formula, root) { =
return=20
Selector.pseudos.nth(nodes, "1", root, false, true); }, 'last-of-type':=20
function(nodes, formula, root) { return Selector.pseudos.nth(nodes, "1", =
root,=20
true, true); }, 'only-of-type': function(nodes, formula, root) { var p =
=3D=20
Selector.pseudos; return p['last-of-type'](p['first-of-type'](nodes, =
formula,=20
root), formula, root); }, getIndices: function(a, b, total) { if (a =
=3D=3D 0) return=20
b &gt; 0 ? [b] : []; return $R(1, total).inject([], function(memo, i) { =
if (0 =3D=3D=20
(i - b) % a &amp;&amp; (i - b) / a &gt;=3D 0) memo.push(i); return memo; =
}); },=20
nth: function(nodes, formula, root, reverse, ofType) { if (nodes.length =
=3D=3D 0)=20
return []; if (formula =3D=3D 'even') formula =3D '2n+0'; if (formula =
=3D=3D 'odd')=20
formula =3D '2n+1'; var h =3D Selector.handlers, results =3D [], indexed =
=3D [], m;=20
h.mark(nodes); for (var i =3D 0, node; node =3D nodes[i]; i++) { if=20
(!node.parentNode._countedByPrototype) { h.index(node.parentNode, =
reverse,=20
ofType); indexed.push(node.parentNode); } } if (formula.match(/^\d+$/)) =
{ //=20
just a number formula =3D Number(formula); for (var i =3D 0, node; node =
=3D nodes[i];=20
i++) if (node.nodeIndex =3D=3D formula) results.push(node); } else if (m =
=3D=20
formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b if (m[1] =3D=3D =
"-") m[1] =3D -1;=20
var a =3D m[1] ? Number(m[1]) : 1; var b =3D m[2] ? Number(m[2]) : 0; =
var indices =3D=20
Selector.pseudos.getIndices(a, b, nodes.length); for (var i =3D 0, node, =
l =3D=20
indices.length; node =3D nodes[i]; i++) { for (var j =3D 0; j &lt; l; =
j++) if=20
(node.nodeIndex =3D=3D indices[j]) results.push(node); } } =
h.unmark(nodes);=20
h.unmark(indexed); return results; }, 'empty': function(nodes, value, =
root) {=20
for (var i =3D 0, results =3D [], node; node =3D nodes[i]; i++) { if =
(node.tagName =3D=3D=20
'!' || node.firstChild) continue; results.push(node); } return results; =
},=20
'not': function(nodes, selector, root) { var h =3D Selector.handlers,=20
selectorType, m; var exclusions =3D new =
Selector(selector).findElements(root);=20
h.mark(exclusions); for (var i =3D 0, results =3D [], node; node =3D =
nodes[i]; i++) if=20
(!node._countedByPrototype) results.push(node); h.unmark(exclusions); =
return=20
results; }, 'enabled': function(nodes, value, root) { for (var i =3D 0, =
results =3D=20
[], node; node =3D nodes[i]; i++) if (!node.disabled &amp;&amp; =
(!node.type ||=20
node.type !=3D=3D 'hidden')) results.push(node); return results; }, =
'disabled':=20
function(nodes, value, root) { for (var i =3D 0, results =3D [], node; =
node =3D=20
nodes[i]; i++) if (node.disabled) results.push(node); return results; }, =

'checked': function(nodes, value, root) { for (var i =3D 0, results =3D =
[], node;=20
node =3D nodes[i]; i++) if (node.checked) results.push(node); return =
results; } },=20
operators: { '=3D': function(nv, v) { return nv =3D=3D v; }, '!=3D': =
function(nv, v) {=20
return nv !=3D v; }, '^=3D': function(nv, v) { return nv =3D=3D v || nv =
&amp;&amp;=20
nv.startsWith(v); }, '$=3D': function(nv, v) { return nv =3D=3D v || nv =
&amp;&amp;=20
nv.endsWith(v); }, '*=3D': function(nv, v) { return nv =3D=3D v || nv =
&amp;&amp;=20
nv.include(v); }, '~=3D': function(nv, v) { return (' ' + nv + ' =
').include(' ' +=20
v + ' '); }, '|=3D': function(nv, v) { return ('-' + (nv || =
"").toUpperCase() +=20
'-').include('-' + (v || "").toUpperCase() + '-'); } }, split:=20
function(expression) { var expressions =3D [];=20
expression.scan(/(([\w#:.~&gt;+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, =
function(m) {=20
expressions.push(m[1].strip()); }); return expressions; }, =
matchElements:=20
function(elements, expression) { var matches =3D $$(expression), h =3D=20
Selector.handlers; h.mark(matches); for (var i =3D 0, results =3D [], =
element;=20
element =3D elements[i]; i++) if (element._countedByPrototype)=20
results.push(element); h.unmark(matches); return results; }, =
findElement:=20
function(elements, expression, index) { if (Object.isNumber(expression)) =
{ index=20
=3D expression; expression =3D false; } return =
Selector.matchElements(elements,=20
expression || '*')[index || 0]; }, findChildElements: function(element,=20
expressions) { expressions =3D Selector.split(expressions.join(',')); =
var results=20
=3D [], h =3D Selector.handlers; for (var i =3D 0, l =3D =
expressions.length, selector; i=20
&lt; l; i++) { selector =3D new Selector(expressions[i].strip());=20
h.concat(results, selector.findElements(element)); } return (l &gt; 1) ? =

h.unique(results) : results; } }); if (Prototype.Browser.IE) {=20
Object.extend(Selector.handlers, { concat: function(a, b) { for (var i =
=3D 0,=20
node; node =3D b[i]; i++) if (node.tagName !=3D=3D "!") a.push(node); =
return a; } });=20
} function $$() { return Selector.findChildElements(document, =
$A(arguments)); }=20
var Form =3D { reset: function(form) { form =3D $(form); form.reset(); =
return form;=20
}, serializeElements: function(elements, options) { if (typeof options =
!=3D=20
'object') options =3D { hash: !!options }; else if=20
(Object.isUndefined(options.hash)) options.hash =3D true; var key, =
value,=20
submitted =3D false, submit =3D options.submit; var data =3D =
elements.inject({ },=20
function(result, element) { if (!element.disabled &amp;&amp; =
element.name) { key=20
=3D element.name; value =3D $(element).getValue(); if (value !=3D null =
&amp;&amp;=20
element.type !=3D 'file' &amp;&amp; (element.type !=3D 'submit' || =
(!submitted=20
&amp;&amp; submit !=3D=3D false &amp;&amp; (!submit || key =3D=3D =
submit) &amp;&amp;=20
(submitted =3D true)))) { if (key in result) { if =
(!Object.isArray(result[key]))=20
result[key] =3D [result[key]]; result[key].push(value); } else =
result[key] =3D=20
value; } } return result; }); return options.hash ? data :=20
Object.toQueryString(data); } }; Form.Methods =3D { serialize: =
function(form,=20
options) { return Form.serializeElements(Form.getElements(form), =
options); },=20
getElements: function(form) { var elements =3D =
$(form).getElementsByTagName('*'),=20
element, arr =3D [ ], serializers =3D Form.Element.Serializers; for (var =
i =3D 0;=20
element =3D elements[i]; i++) { arr.push(element); } return =
arr.inject([],=20
function(elements, child) { if =
(serializers[child.tagName.toLowerCase()])=20
elements.push(Element.extend(child)); return elements; }) }, getInputs:=20
function(form, typeName, name) { form =3D $(form); var inputs =3D=20
form.getElementsByTagName('input'); if (!typeName &amp;&amp; !name) =
return=20
$A(inputs).map(Element.extend); for (var i =3D 0, matchingInputs =3D [], =
length =3D=20
inputs.length; i &lt; length; i++) { var input =3D inputs[i]; if =
((typeName=20
&amp;&amp; input.type !=3D typeName) || (name &amp;&amp; input.name !=3D =
name))=20
continue; matchingInputs.push(Element.extend(input)); } return =
matchingInputs;=20
}, disable: function(form) { form =3D $(form);=20
Form.getElements(form).invoke('disable'); return form; }, enable: =
function(form)=20
{ form =3D $(form); Form.getElements(form).invoke('enable'); return =
form; },=20
findFirstElement: function(form) { var elements =3D=20
$(form).getElements().findAll(function(element) { return 'hidden' !=3D=20
element.type &amp;&amp; !element.disabled; }); var firstByIndex =3D=20
elements.findAll(function(element) { return =
element.hasAttribute('tabIndex')=20
&amp;&amp; element.tabIndex &gt;=3D 0; }).sortBy(function(element) { =
return=20
element.tabIndex }).first(); return firstByIndex ? firstByIndex :=20
elements.find(function(element) { return=20
/^(?:input|select|textarea)$/i.test(element.tagName); }); }, =
focusFirstElement:=20
function(form) { form =3D $(form); form.findFirstElement().activate(); =
return=20
form; }, request: function(form, options) { form =3D $(form), options =
=3D=20
Object.clone(options || { }); var params =3D options.parameters, action =
=3D=20
form.readAttribute('action') || ''; if (action.blank()) action =3D=20
window.location.href; options.parameters =3D form.serialize(true); if =
(params) {=20
if (Object.isString(params)) params =3D params.toQueryParams();=20
Object.extend(options.parameters, params); } if =
(form.hasAttribute('method')=20
&amp;&amp; !options.method) options.method =3D form.method; return new=20
Ajax.Request(action, options); } };=20
/*-----------------------------------------------------------------------=
---*/=20
Form.Element =3D { focus: function(element) { $(element).focus(); return =
element;=20
}, select: function(element) { $(element).select(); return element; } }; =

Form.Element.Methods =3D { serialize: function(element) { element =3D =
$(element); if=20
(!element.disabled &amp;&amp; element.name) { var value =3D =
element.getValue(); if=20
(value !=3D undefined) { var pair =3D { }; pair[element.name] =3D value; =
return=20
Object.toQueryString(pair); } } return ''; }, getValue: =
function(element) {=20
element =3D $(element); var method =3D element.tagName.toLowerCase(); =
return=20
Form.Element.Serializers[method](element); }, setValue: =
function(element, value)=20
{ element =3D $(element); var method =3D element.tagName.toLowerCase();=20
Form.Element.Serializers[method](element, value); return element; }, =
clear:=20
function(element) { $(element).value =3D ''; return element; }, present: =

function(element) { return $(element).value !=3D ''; }, activate:=20
function(element) { element =3D $(element); try { element.focus(); if=20
(element.select &amp;&amp; (element.tagName.toLowerCase() !=3D 'input' =
||=20
!(/^(?:button|reset|submit)$/i.test(element.type)))) element.select(); } =
catch=20
(e) { } return element; }, disable: function(element) { element =3D =
$(element);=20
element.disabled =3D true; return element; }, enable: function(element) =
{ element=20
=3D $(element); element.disabled =3D false; return element; } };=20
/*-----------------------------------------------------------------------=
---*/=20
var Field =3D Form.Element; var $F =3D Form.Element.Methods.getValue;=20
/*-----------------------------------------------------------------------=
---*/=20
Form.Element.Serializers =3D { input: function(element, value) { switch=20
(element.type.toLowerCase()) { case 'checkbox': case 'radio': return=20
Form.Element.Serializers.inputSelector(element, value); default: return=20
Form.Element.Serializers.textarea(element, value); } }, inputSelector:=20
function(element, value) { if (Object.isUndefined(value)) return =
element.checked=20
? element.value : null; else element.checked =3D !!value; }, textarea:=20
function(element, value) { if (Object.isUndefined(value)) return =
element.value;=20
else element.value =3D value; }, select: function(element, value) { if=20
(Object.isUndefined(value)) return this[element.type =3D=3D 'select-one' =
?=20
'selectOne' : 'selectMany'](element); else { var opt, currentValue, =
single =3D=20
!Object.isArray(value); for (var i =3D 0, length =3D element.length; i =
&lt; length;=20
i++) { opt =3D element.options[i]; currentValue =3D =
this.optionValue(opt); if=20
(single) { if (currentValue =3D=3D value) { opt.selected =3D true; =
return; } } else=20
opt.selected =3D value.include(currentValue); } } }, selectOne: =
function(element)=20
{ var index =3D element.selectedIndex; return index &gt;=3D 0 ?=20
this.optionValue(element.options[index]) : null; }, selectMany:=20
function(element) { var values, length =3D element.length; if (!length) =
return=20
null; for (var i =3D 0, values =3D []; i &lt; length; i++) { var opt =3D =

element.options[i]; if (opt.selected) =
values.push(this.optionValue(opt)); }=20
return values; }, optionValue: function(opt) { return=20
Element.extend(opt).hasAttribute('value') ? opt.value : opt.text; } };=20
/*-----------------------------------------------------------------------=
---*/=20
Abstract.TimedObserver =3D Class.create(PeriodicalExecuter, { =
initialize:=20
function($super, element, frequency, callback) { $super(callback, =
frequency);=20
this.element =3D $(element); this.lastValue =3D this.getValue(); }, =
execute:=20
function() { var value =3D this.getValue(); if =
(Object.isString(this.lastValue)=20
&amp;&amp; Object.isString(value) ? this.lastValue !=3D value :=20
String(this.lastValue) !=3D String(value)) { this.callback(this.element, =
value);=20
this.lastValue =3D value; } } }); Form.Element.Observer =3D=20
Class.create(Abstract.TimedObserver, { getValue: function() { return=20
Form.Element.getValue(this.element); } }); Form.Observer =3D=20
Class.create(Abstract.TimedObserver, { getValue: function() { return=20
Form.serialize(this.element); } });=20
/*-----------------------------------------------------------------------=
---*/=20
Abstract.EventObserver =3D Class.create({ initialize: function(element, =
callback)=20
{ this.element =3D $(element); this.callback =3D callback; =
this.lastValue =3D=20
this.getValue(); if (this.element.tagName.toLowerCase() =3D=3D 'form')=20
this.registerFormCallbacks(); else this.registerCallback(this.element); =
},=20
onElementEvent: function() { var value =3D this.getValue(); if =
(this.lastValue !=3D=20
value) { this.callback(this.element, value); this.lastValue =3D value; } =
},=20
registerFormCallbacks: function() {=20
Form.getElements(this.element).each(this.registerCallback, this); },=20
registerCallback: function(element) { if (element.type) { switch=20
(element.type.toLowerCase()) { case 'checkbox': case 'radio':=20
Event.observe(element, 'click', this.onElementEvent.bind(this)); break; =
default:=20
Event.observe(element, 'change', this.onElementEvent.bind(this)); break; =
} } }=20
}); Form.Element.EventObserver =3D Class.create(Abstract.EventObserver, =
{=20
getValue: function() { return Form.Element.getValue(this.element); } }); =

Form.EventObserver =3D Class.create(Abstract.EventObserver, { getValue: =
function()=20
{ return Form.serialize(this.element); } }); (function() { var Event =3D =
{=20
KEY_BACKSPACE: 8, KEY_TAB: 9, KEY_RETURN: 13, KEY_ESC: 27, KEY_LEFT: 37, =
KEY_UP:=20
38, KEY_RIGHT: 39, KEY_DOWN: 40, KEY_DELETE: 46, KEY_HOME: 36, KEY_END: =
35,=20
KEY_PAGEUP: 33, KEY_PAGEDOWN: 34, KEY_INSERT: 45, cache: {} }; var docEl =
=3D=20
document.documentElement; var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED =3D =

'onmouseenter' in docEl &amp;&amp; 'onmouseleave' in docEl; var =
_isButton; if=20
(Prototype.Browser.IE) { var buttonMap =3D { 0: 1, 1: 4, 2: 2 }; =
_isButton =3D=20
function(event, code) { return event.button =3D=3D=3D buttonMap[code]; =
}; } else if=20
(Prototype.Browser.WebKit) { _isButton =3D function(event, code) { =
switch (code) {=20
case 0: return event.which =3D=3D 1 &amp;&amp; !event.metaKey; case 1: =
return=20
event.which =3D=3D 1 &amp;&amp; event.metaKey; default: return false; } =
}; } else {=20
_isButton =3D function(event, code) { return event.which ? (event.which =
=3D=3D=3D code +=20
1) : (event.button =3D=3D=3D code); }; } function isLeftClick(event) { =
return=20
_isButton(event, 0) } function isMiddleClick(event) { return =
_isButton(event, 1)=20
} function isRightClick(event) { return _isButton(event, 2) } function=20
element(event) { event =3D Event.extend(event); var node =3D =
event.target, type =3D=20
event.type, currentTarget =3D event.currentTarget; if (currentTarget =
&amp;&amp;=20
currentTarget.tagName) { if (type =3D=3D=3D 'load' || type =3D=3D=3D =
'error' || (type =3D=3D=3D=20
'click' &amp;&amp; currentTarget.tagName.toLowerCase() =3D=3D=3D 'input' =
&amp;&amp;=20
currentTarget.type =3D=3D=3D 'radio')) node =3D currentTarget; } if =
(node.nodeType =3D=3D=20
Node.TEXT_NODE) node =3D node.parentNode; return Element.extend(node); } =
function=20
findElement(event, expression) { var element =3D Event.element(event); =
if=20
(!expression) return element; var elements =3D=20
[element].concat(element.ancestors()); return =
Selector.findElement(elements,=20
expression, 0); } function pointer(event) { return { x: pointerX(event), =
y:=20
pointerY(event) }; } function pointerX(event) { var docElement =3D=20
document.documentElement, body =3D document.body || { scrollLeft: 0 }; =
return=20
event.pageX || (event.clientX + (docElement.scrollLeft || =
body.scrollLeft) -=20
(docElement.clientLeft || 0)); } function pointerY(event) { var =
docElement =3D=20
document.documentElement, body =3D document.body || { scrollTop: 0 }; =
return=20
event.pageY || (event.clientY + (docElement.scrollTop || body.scrollTop) =
-=20
(docElement.clientTop || 0)); } function stop(event) { =
Event.extend(event);=20
event.preventDefault(); event.stopPropagation(); event.stopped =3D true; =
}=20
Event.Methods =3D { isLeftClick: isLeftClick, isMiddleClick: =
isMiddleClick,=20
isRightClick: isRightClick, element: element, findElement: findElement, =
pointer:=20
pointer, pointerX: pointerX, pointerY: pointerY, stop: stop }; var =
methods =3D=20
Object.keys(Event.Methods).inject({ }, function(m, name) { m[name] =3D=20
Event.Methods[name].methodize(); return m; }); if (Prototype.Browser.IE) =
{=20
function _relatedTarget(event) { var element; switch (event.type) { case =

'mouseover': element =3D event.fromElement; break; case 'mouseout': =
element =3D=20
event.toElement; break; default: return null; } return =
Element.extend(element);=20
} Object.extend(methods, { stopPropagation: function() { =
this.cancelBubble =3D=20
true }, preventDefault: function() { this.returnValue =3D false }, =
inspect:=20
function() { return '[object Event]' } }); Event.extend =3D =
function(event,=20
element) { if (!event) return false; if (event._extendedByPrototype) =
return=20
event; event._extendedByPrototype =3D Prototype.emptyFunction; var =
pointer =3D=20
Event.pointer(event); Object.extend(event, { target: event.srcElement || =

element, relatedTarget: _relatedTarget(event), pageX: pointer.x, pageY:=20
pointer.y }); return Object.extend(event, methods); }; } else { =
Event.prototype=20
=3D window.Event.prototype || =
document.createEvent('HTMLEvents').__proto__;=20
Object.extend(Event.prototype, methods); Event.extend =3D Prototype.K; } =
function=20
_createResponder(element, eventName, handler) { var registry =3D=20
Element.retrieve(element, 'prototype_event_registry'); if=20
(Object.isUndefined(registry)) { CACHE.push(element); registry =3D=20
Element.retrieve(element, 'prototype_event_registry', $H()); } var=20
respondersForEvent =3D registry.get(eventName); if=20
(Object.isUndefined(respondersForEvent)) { respondersForEvent =3D [];=20
registry.set(eventName, respondersForEvent); } if=20
(respondersForEvent.pluck('handler').include(handler)) return false; var =

responder; if (eventName.include(":")) { responder =3D function(event) { =
if=20
(Object.isUndefined(event.eventName)) return false; if (event.eventName =
!=3D=3D=20
eventName) return false; Event.extend(event, element); =
handler.call(element,=20
event); }; } else { if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED =
&amp;&amp;=20
(eventName =3D=3D=3D "mouseenter" || eventName =3D=3D=3D "mouseleave")) =
{ if (eventName =3D=3D=3D=20
"mouseenter" || eventName =3D=3D=3D "mouseleave") { responder =3D =
function(event) {=20
Event.extend(event, element); var parent =3D event.relatedTarget; while =
(parent=20
&amp;&amp; parent !=3D=3D element) { try { parent =3D parent.parentNode; =
} catch(e) {=20
parent =3D element; } } if (parent =3D=3D=3D element) return; =
handler.call(element,=20
event); }; } } else { responder =3D function(event) { =
Event.extend(event,=20
element); handler.call(element, event); }; } } responder.handler =3D =
handler;=20
respondersForEvent.push(responder); return responder; } function =
_destroyCache()=20
{ for (var i =3D 0, length =3D CACHE.length; i &lt; length; i++) {=20
Event.stopObserving(CACHE[i]); CACHE[i] =3D null; } } var CACHE =3D []; =
if=20
(Prototype.Browser.IE) window.attachEvent('onunload', _destroyCache); if =

(Prototype.Browser.WebKit) window.addEventListener('unload',=20
Prototype.emptyFunction, false); var _getDOMEventName =3D Prototype.K; =
if=20
(!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) { _getDOMEventName =3D=20
function(eventName) { var translations =3D { mouseenter: "mouseover", =
mouseleave:=20
"mouseout" }; return eventName in translations ? translations[eventName] =
:=20
eventName; }; } function observe(element, eventName, handler) { element =
=3D=20
$(element); var responder =3D _createResponder(element, eventName, =
handler); if=20
(!responder) return element; if (eventName.include(':')) { if=20
(element.addEventListener) element.addEventListener("dataavailable", =
responder,=20
false); else { element.attachEvent("ondataavailable", responder);=20
element.attachEvent("onfilterchange", responder); } } else { var =
actualEventName=20
=3D _getDOMEventName(eventName); if (element.addEventListener)=20
element.addEventListener(actualEventName, responder, false); else=20
element.attachEvent("on" + actualEventName, responder); } return =
element; }=20
function stopObserving(element, eventName, handler) { element =3D =
$(element); var=20
registry =3D Element.retrieve(element, 'prototype_event_registry'); if=20
(Object.isUndefined(registry)) return element; if (eventName &amp;&amp;=20
!handler) { var responders =3D registry.get(eventName); if=20
(Object.isUndefined(responders)) return element; responders.each( =
function(r) {=20
Element.stopObserving(element, eventName, r.handler); }); return =
element; } else=20
if (!eventName) { registry.each( function(pair) { var eventName =3D =
pair.key,=20
responders =3D pair.value; responders.each( function(r) {=20
Element.stopObserving(element, eventName, r.handler); }); }); return =
element; }=20
var responders =3D registry.get(eventName); if (!responders) return; var =
responder=20
=3D responders.find( function(r) { return r.handler =3D=3D=3D handler; =
}); if=20
(!responder) return element; var actualEventName =3D =
_getDOMEventName(eventName);=20
if (eventName.include(':')) { if (element.removeEventListener)=20
element.removeEventListener("dataavailable", responder, false); else {=20
element.detachEvent("ondataavailable", responder);=20
element.detachEvent("onfilterchange", responder); } } else { if=20
(element.removeEventListener) =
element.removeEventListener(actualEventName,=20
responder, false); else element.detachEvent('on' + actualEventName, =
responder);=20
} registry.set(eventName, responders.without(responder)); return =
element; }=20
function fire(element, eventName, memo, bubble) { element =3D =
$(element); if=20
(Object.isUndefined(bubble)) bubble =3D true; if (element =3D=3D =
document &amp;&amp;=20
document.createEvent &amp;&amp; !element.dispatchEvent) element =3D=20
document.documentElement; var event; if (document.createEvent) { event =
=3D=20
document.createEvent('HTMLEvents'); event.initEvent('dataavailable', =
true,=20
true); } else { event =3D document.createEventObject(); event.eventType =
=3D bubble ?=20
'ondataavailable' : 'onfilterchange'; } event.eventName =3D eventName; =
event.memo=20
=3D memo || { }; if (document.createEvent) element.dispatchEvent(event); =
else=20
element.fireEvent(event.eventType, event); return Event.extend(event); } =

Object.extend(Event, Event.Methods); Object.extend(Event, { fire: fire, =
observe:=20
observe, stopObserving: stopObserving }); Element.addMethods({ fire: =
fire,=20
observe: observe, stopObserving: stopObserving }); =
Object.extend(document, {=20
fire: fire.methodize(), observe: observe.methodize(), stopObserving:=20
stopObserving.methodize(), loaded: false }); if (window.Event)=20
Object.extend(window.Event, Event); else window.Event =3D Event; })(); =
(function()=20
{ /* Support for the DOMContentLoaded event is based on work by Dan =
Webb,=20
Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */ var =
timer;=20
function fireContentLoadedEvent() { if (document.loaded) return; if =
(timer)=20
window.clearTimeout(timer); document.loaded =3D true; =
document.fire('dom:loaded');=20
} function checkReadyState() { if (document.readyState =3D=3D=3D =
'complete') {=20
document.stopObserving('readystatechange', checkReadyState);=20
fireContentLoadedEvent(); } } function pollDoScroll() { try {=20
document.documentElement.doScroll('left'); } catch(e) { timer =3D=20
pollDoScroll.defer(); return; } fireContentLoadedEvent(); } if=20
(document.addEventListener) { =
document.addEventListener('DOMContentLoaded',=20
fireContentLoadedEvent, false); } else { =
document.observe('readystatechange',=20
checkReadyState); if (window =3D=3D top) timer =3D pollDoScroll.defer(); =
}=20
Event.observe(window, 'load', fireContentLoadedEvent); })();=20
Element.addMethods(); /*------------------------------- DEPRECATED=20
-------------------------------*/ Hash.toQueryString =3D =
Object.toQueryString; var=20
Toggle =3D { display: Element.toggle }; Element.Methods.childOf =3D=20
Element.Methods.descendantOf; var Insertion =3D { Before: =
function(element,=20
content) { return Element.insert(element, {before:content}); }, Top:=20
function(element, content) { return Element.insert(element, =
{top:content}); },=20
Bottom: function(element, content) { return Element.insert(element,=20
{bottom:content}); }, After: function(element, content) { return=20
Element.insert(element, {after:content}); } }; var $continue =3D new =
Error('"throw=20
$continue" is deprecated, use "return" instead'); var Position =3D {=20
includeScrollOffsets: false, prepare: function() { this.deltaX =3D=20
window.pageXOffset || document.documentElement.scrollLeft ||=20
document.body.scrollLeft || 0; this.deltaY =3D window.pageYOffset ||=20
document.documentElement.scrollTop || document.body.scrollTop || 0; }, =
within:=20
function(element, x, y) { if (this.includeScrollOffsets) return=20
this.withinIncludingScrolloffsets(element, x, y); this.xcomp =3D x; =
this.ycomp =3D=20
y; this.offset =3D Element.cumulativeOffset(element); return (y &gt;=3D=20
this.offset[1] &amp;&amp; y &lt; this.offset[1] + element.offsetHeight=20
&amp;&amp; x &gt;=3D this.offset[0] &amp;&amp; x &lt; this.offset[0] +=20
element.offsetWidth); }, withinIncludingScrolloffsets: function(element, =
x, y) {=20
var offsetcache =3D Element.cumulativeScrollOffset(element); this.xcomp =
=3D x +=20
offsetcache[0] - this.deltaX; this.ycomp =3D y + offsetcache[1] - =
this.deltaY;=20
this.offset =3D Element.cumulativeOffset(element); return (this.ycomp =
&gt;=3D=20
this.offset[1] &amp;&amp; this.ycomp &lt; this.offset[1] + =
element.offsetHeight=20
&amp;&amp; this.xcomp &gt;=3D this.offset[0] &amp;&amp; this.xcomp &lt;=20
this.offset[0] + element.offsetWidth); }, overlap: function(mode, =
element) { if=20
(!mode) return 0; if (mode =3D=3D 'vertical') return ((this.offset[1] +=20
element.offsetHeight) - this.ycomp) / element.offsetHeight; if (mode =
=3D=3D=20
'horizontal') return ((this.offset[0] + element.offsetWidth) - =
this.xcomp) /=20
element.offsetWidth; }, cumulativeOffset: =
Element.Methods.cumulativeOffset,=20
positionedOffset: Element.Methods.positionedOffset, absolutize:=20
function(element) { Position.prepare(); return =
Element.absolutize(element); },=20
relativize: function(element) { Position.prepare(); return=20
Element.relativize(element); }, realOffset:=20
Element.Methods.cumulativeScrollOffset, offsetParent:=20
Element.Methods.getOffsetParent, page: Element.Methods.viewportOffset, =
clone:=20
function(source, target, options) { options =3D options || { }; return=20
Element.clonePosition(target, source, options); } };=20
/*-----------------------------------------------------------------------=
---*/=20
if (!document.getElementsByClassName) document.getElementsByClassName =
=3D=20
function(instanceMethods){ function iter(name) { return name.blank() ? =
null :=20
"[contains(concat(' ', @class, ' '), ' " + name + " ')]"; }=20
instanceMethods.getElementsByClassName =3D =
Prototype.BrowserFeatures.XPath ?=20
function(element, className) { className =3D =
className.toString().strip(); var=20
cond =3D /\s/.test(className) ? $w(className).map(iter).join('') :=20
iter(className); return cond ? document._getElementsByXPath('.//*' + =
cond,=20
element) : []; } : function(element, className) { className =3D=20
className.toString().strip(); var elements =3D [], classNames =3D=20
(/\s/.test(className) ? $w(className) : null); if (!classNames =
&amp;&amp;=20
!className) return elements; var nodes =3D =
$(element).getElementsByTagName('*');=20
className =3D ' ' + className + ' '; for (var i =3D 0, child, cn; child =
=3D nodes[i];=20
i++) { if (child.className &amp;&amp; (cn =3D ' ' + child.className + ' =
')=20
&amp;&amp; (cn.include(className) || (classNames &amp;&amp;=20
classNames.all(function(name) { return !name.toString().blank() =
&amp;&amp;=20
cn.include(' ' + name + ' '); })))) =
elements.push(Element.extend(child)); }=20
return elements; }; return function(className, parentElement) { return=20
$(parentElement || document.body).getElementsByClassName(className); };=20
}(Element.Methods);=20
/*-----------------------------------------------------------------------=
---*/=20
Element.ClassNames =3D Class.create(); Element.ClassNames.prototype =3D =
{=20
initialize: function(element) { this.element =3D $(element); }, _each:=20
function(iterator) { =
this.element.className.split(/\s+/).select(function(name) {=20
return name.length &gt; 0; })._each(iterator); }, set: =
function(className) {=20
this.element.className =3D className; }, add: function(classNameToAdd) { =
if=20
(this.include(classNameToAdd)) return;=20
this.set($A(this).concat(classNameToAdd).join(' ')); }, remove:=20
function(classNameToRemove) { if (!this.include(classNameToRemove)) =
return;=20
this.set($A(this).without(classNameToRemove).join(' ')); }, toString: =
function()=20
{ return $A(this).join(' '); } }; =
Object.extend(Element.ClassNames.prototype,=20
Enumerable);=20
/*-----------------------------------------------------------------------=
---*/=20
</BODY></HTML>
