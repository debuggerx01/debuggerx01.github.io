!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("haxe",function(e,t){var n,r,a,i,o=e.indentUnit,c=(e=l("keyword a"),a=l("keyword b"),n=l("keyword c"),r=l("operator"),i=l("typedef"),{if:e,while:e,else:a,do:a,try:a,return:n,break:n,continue:n,new:n,throw:n,var:l("var"),inline:e={type:"attribute",style:"attribute"},static:e,using:l("import"),public:e,private:e,cast:l("cast"),import:l("import"),macro:l("macro"),function:l("function"),catch:l("catch"),untyped:l("untyped"),callback:l("cb"),for:l("for"),switch:l("switch"),case:l("case"),default:l("default"),in:r,never:l("property_access"),trace:l("trace"),class:i,abstract:i,enum:i,interface:i,typedef:i,extends:i,implements:i,dynamic:i,true:a={type:"atom",style:"atom"},false:a,null:a});function l(e){return{type:e,style:"keyword"}}var u,f,d=/[+\-*&%=<>!?|]/;function s(e,t,n){return(t.tokenize=n)(e,t)}function m(e,t){for(var n,r=!1;null!=(n=e.next());){if(n==t&&!r)return;r=!r&&"\\"==n}return r}function p(e,t,n){return u=e,f=n,t}function v(e,t){var n,r,a=e.next();return'"'==a||"'"==a?s(e,t,(r=a,function(e,t){return m(e,r)||(t.tokenize=v),p("string","string")})):/[\[\]{}\(\),;\:\.]/.test(a)?p(a):"0"==a&&e.eat(/x/i)?(e.eatWhile(/[\da-f]/i),p("number","number")):/\d/.test(a)||"-"==a&&e.eat(/\d/)?(e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),p("number","number")):t.reAllowed&&"~"==a&&e.eat(/\//)?(m(e,"/"),e.eatWhile(/[gimsu]/),p("regexp","string-2")):"/"==a?e.eat("*")?s(e,t,_):e.eat("/")?(e.skipToEnd(),p("comment","comment")):(e.eatWhile(d),p("operator",null,e.current())):"#"==a?(e.skipToEnd(),p("conditional","meta")):"@"==a?(e.eat(/:/),e.eatWhile(/[\w_]/),p("metadata","meta")):d.test(a)?(e.eatWhile(d),p("operator",null,e.current())):/[A-Z]/.test(a)?(e.eatWhile(/[\w_<>]/),p("type","variable-3",n=e.current())):(e.eatWhile(/[\w_]/),n=e.current(),(a=c.propertyIsEnumerable(n)&&c[n])&&t.kwAllowed?p(a.type,a.style,n):p("variable","variable",n))}function _(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=v;break}r="*"==n}return p("comment","comment")}var y={atom:!0,number:!0,variable:!0,string:!0,regexp:!0};function x(e,t,n,r,a,i){this.indented=e,this.column=t,this.type=n,this.prev=a,this.info=i,null!=r&&(this.align=r)}function D(e,t,n,r,a){var i=e.cc;for(b.state=e,b.stream=a,b.marked=null,b.cc=i,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((i.length?i.pop():z)(n,r)){for(;i.length&&i[i.length-1].lex;)i.pop()();return b.marked?b.marked:"variable"==n&&function(e,t){for(var n=e.localVars;n;n=n.next)if(n.name==t)return 1}(e,r)?"variable-2":"variable"==n&&function(e,t){if(/[a-z]/.test(t.charAt(0)))return;for(var n=e.importedtypes.length,r=0;r<n;r++)if(e.importedtypes[r]==t)return 1}(e,r)?"variable-3":t}}function h(e){for(var t=b.state,n=t.importedtypes;n;n=n.next)if(n.name==e)return;t.importedtypes={name:e,next:t.importedtypes}}var b={state:null,column:null,marked:null,cc:null};function k(){for(var e=arguments.length-1;0<=e;e--)b.cc.push(arguments[e])}function w(){return k.apply(null,arguments),!0}function g(e){var t=b.state;if(t.context){b.marked="def";for(var n=t.localVars;n;n=n.next)if(n.name==e)return;t.localVars={name:e,next:t.localVars}}}var j={name:"this",next:null};function A(){b.state.context||(b.state.localVars=j),b.state.context={prev:b.state.context,vars:b.state.localVars}}function V(){b.state.localVars=b.state.context.vars,b.state.context=b.state.context.prev}function S(t,n){function e(){var e=b.state;e.lexical=new x(e.indented,b.stream.column(),t,null,e.lexical,n)}return e.lex=!0,e}function E(){var e=b.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function W(n){return function e(t){return t==n?w():";"==n?k():w(e)}}function z(e){return"@"==e?w(F):"var"==e?w(S("vardef"),I,W(";"),E):"keyword a"==e?w(S("form"),M,z,E):"keyword b"==e?w(S("form"),z,E):"{"==e?w(S("}"),A,Z,E,V):";"==e?w():"attribute"==e?w(B):"function"==e?w(O):"for"==e?w(S("form"),W("("),S(")"),N,W(")"),E,z,E):"variable"==e?w(S("stat"),H):"switch"==e?w(S("form"),M,S("}","switch"),W("{"),Z,E,E):"case"==e?w(M,W(":")):"default"==e?w(W(":")):"catch"==e?w(S("form"),A,W("("),Y,W(")"),z,E,V):"import"==e?w($,W(";")):"typedef"==e?w(G):k(S("stat"),M,W(";"),E)}function M(e){return y.hasOwnProperty(e)?w(C):"function"==e?w(O):"keyword c"==e?w(q):"("==e?w(S(")"),q,W(")"),E,C):"operator"==e?w(M):"["==e?w(S("]"),T(M,"]"),E,C):"{"==e?w(S("}"),T(K,"}"),E,C):w()}function q(e){return e.match(/[;\}\)\],]/)?k():k(M)}function C(e,t){return"operator"==e&&/\+\+|--/.test(t)?w(C):"operator"==e||":"==e?w(M):";"!=e?"("==e?w(S(")"),T(M,")"),E,C):"."==e?w(J,C):"["==e?w(S("]"),M,W("]"),E,C):void 0:void 0}function B(e){return"attribute"==e?w(B):"function"==e?w(O):"var"==e?w(I):void 0}function F(e){return":"==e||"variable"==e?w(F):"("==e?w(S(")"),T(U,")"),E,z):void 0}function U(e){if("variable"==e)return w()}function $(e,t){return"variable"==e&&/[A-Z]/.test(t.charAt(0))?(h(t),w()):"variable"==e||"property"==e||"."==e||"*"==t?w($):void 0}function G(e,t){return"variable"==e&&/[A-Z]/.test(t.charAt(0))?(h(t),w()):"type"==e&&/[A-Z]/.test(t.charAt(0))?w():void 0}function H(e){return":"==e?w(E,z):k(C,W(";"),E)}function J(e){if("variable"==e)return b.marked="property",w()}function K(e){if("variable"==e&&(b.marked="property"),y.hasOwnProperty(e))return w(W(":"),M)}function T(t,n){function r(e){return","==e?w(t,r):e==n?w():w(W(n))}return function(e){return e==n?w():k(t,r)}}function Z(e){return"}"==e?w():k(z,Z)}function I(e,t){return"variable"==e?(g(t),w(P,L)):w()}function L(e,t){return"="==t?w(M,L):","==e?w(I):void 0}function N(e,t){return"variable"==e&&g(t),w(S(")"),A,Q,M,E,z,V)}function Q(e,t){if("in"==t)return w()}function O(e,t){return"variable"==e?(g(t),w(O)):"new"==t?w(O):"("==e?w(S(")"),A,T(Y,")"),E,P,z,V):void 0}function P(e){if(":"==e)return w(R)}function R(e){return"type"==e||"variable"==e?w():"{"==e?w(S("}"),T(X,"}"),E):void 0}function X(e){if("variable"==e)return w(P)}function Y(e,t){if("variable"==e)return g(t),w(P)}return E.lex=!0,{startState:function(e){return{tokenize:v,reAllowed:!0,kwAllowed:!0,cc:[],lexical:new x((e||0)-o,0,"block",!1),localVars:t.localVars,importedtypes:["Int","Float","String","Void","Std","Bool","Dynamic","Array"],context:t.localVars&&{vars:t.localVars},indented:0}},token:function(e,t){var n;return e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation()),e.eatSpace()?null:(n=t.tokenize(e,t),"comment"==u?n:(t.reAllowed=!("operator"!=u&&"keyword c"!=u&&!u.match(/^[\[{}\(,;:]$/)),t.kwAllowed="."!=u,D(t,n,u,f,e)))},indent:function(e,t){var n,r,a;return e.tokenize!=v?0:(a=(n=t&&t.charAt(0))==(r=(e="stat"==(e=e.lexical).type&&"}"==n?e.prev:e).type),"vardef"==r?e.indented+4:"form"==r&&"{"==n?e.indented:"stat"==r||"form"==r?e.indented+o:"switch"!=e.info||a?e.align?e.column+(a?0:1):e.indented+(a?0:o):e.indented+(/^(?:case|default)\b/.test(t)?o:2*o))},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}}),e.defineMIME("text/x-haxe","haxe"),e.defineMode("hxml",function(){return{startState:function(){return{define:!1,inString:!1}},token:function(e,t){var n=e.peek(),r=e.sol();return"#"==n?(e.skipToEnd(),"comment"):r&&"-"==n?(r="variable-2",e.eat(/-/),"-"==e.peek()&&(e.eat(/-/),r="keyword a"),"D"==e.peek()&&(e.eat(/[D]/),r="keyword c",t.define=!0),e.eatWhile(/[A-Z]/i),r):(n=e.peek(),0==t.inString&&"'"==n&&(t.inString=!0,n=e.next()),1==t.inString?(e.skipTo("'")||e.skipToEnd(),"'"==e.peek()&&(e.next(),t.inString=!1),"string"):(e.next(),null))},lineComment:"#"}}),e.defineMIME("text/x-hxml","hxml")});