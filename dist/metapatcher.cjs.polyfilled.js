"use strict";var t,e=require("basekits"),n=(t=require("dom-scripter"))&&"object"==typeof t&&"default"in t?t.default:t,r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(t,e){return t(e={exports:{}},e.exports),e.exports}var o=function(t){return t&&t.Math==Math&&t},a=o("object"==typeof globalThis&&globalThis)||o("object"==typeof window&&window)||o("object"==typeof self&&self)||o("object"==typeof r&&r)||Function("return this")(),c=function(t){try{return!!t()}catch(t){return!0}},s=!c((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),u={}.propertyIsEnumerable,l=Object.getOwnPropertyDescriptor,p={f:l&&!u.call({1:2},1)?function(t){var e=l(this,t);return!!e&&e.enumerable}:u},f=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},d={}.toString,h=function(t){return d.call(t).slice(8,-1)},m="".split,g=c((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==h(t)?m.call(t,""):Object(t)}:Object,y=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},v=function(t){return g(y(t))},b=function(t){return"object"==typeof t?null!==t:"function"==typeof t},S=function(t,e){if(!b(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!b(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!b(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!b(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},x={}.hasOwnProperty,E=function(t,e){return x.call(t,e)},O=a.document,w=b(O)&&b(O.createElement),T=function(t){return w?O.createElement(t):{}},k=!s&&!c((function(){return 7!=Object.defineProperty(T("div"),"a",{get:function(){return 7}}).a})),j=Object.getOwnPropertyDescriptor,A={f:s?j:function(t,e){if(t=v(t),e=S(e,!0),k)try{return j(t,e)}catch(t){}if(E(t,e))return f(!p.f.call(t,e),t[e])}},I=function(t){if(!b(t))throw TypeError(String(t)+" is not an object");return t},N=Object.defineProperty,P={f:s?N:function(t,e,n){if(I(t),e=S(e,!0),I(n),k)try{return N(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},C=s?function(t,e,n){return P.f(t,e,f(1,n))}:function(t,e,n){return t[e]=n,t},R=function(t,e){try{C(a,t,e)}catch(n){a[t]=e}return e},M=a["__core-js_shared__"]||R("__core-js_shared__",{}),_=Function.toString;"function"!=typeof M.inspectSource&&(M.inspectSource=function(t){return _.call(t)});var z,D,$,F=M.inspectSource,L=a.WeakMap,q="function"==typeof L&&/native code/.test(F(L)),B=i((function(t){(t.exports=function(t,e){return M[t]||(M[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),G=0,U=Math.random(),W=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++G+U).toString(36)},K=B("keys"),J=function(t){return K[t]||(K[t]=W(t))},V={},X=a.WeakMap;if(q){var Y=new X,Q=Y.get,H=Y.has,Z=Y.set;z=function(t,e){return Z.call(Y,t,e),e},D=function(t){return Q.call(Y,t)||{}},$=function(t){return H.call(Y,t)}}else{var tt=J("state");V[tt]=!0,z=function(t,e){return C(t,tt,e),e},D=function(t){return E(t,tt)?t[tt]:{}},$=function(t){return E(t,tt)}}var et,nt={set:z,get:D,has:$,enforce:function(t){return $(t)?D(t):z(t,{})},getterFor:function(t){return function(e){var n;if(!b(e)||(n=D(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},rt=i((function(t){var e=nt.get,n=nt.enforce,r=String(String).split("String");(t.exports=function(t,e,i,o){var c=!!o&&!!o.unsafe,s=!!o&&!!o.enumerable,u=!!o&&!!o.noTargetGet;"function"==typeof i&&("string"!=typeof e||E(i,"name")||C(i,"name",e),n(i).source=r.join("string"==typeof e?e:"")),t!==a?(c?!u&&t[e]&&(s=!0):delete t[e],s?t[e]=i:C(t,e,i)):s?t[e]=i:R(e,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||F(this)}))})),it=a,ot=function(t){return"function"==typeof t?t:void 0},at=function(t,e){return arguments.length<2?ot(it[t])||ot(a[t]):it[t]&&it[t][e]||a[t]&&a[t][e]},ct=Math.ceil,st=Math.floor,ut=function(t){return isNaN(t=+t)?0:(t>0?st:ct)(t)},lt=Math.min,pt=function(t){return t>0?lt(ut(t),9007199254740991):0},ft=Math.max,dt=Math.min,ht=function(t,e){var n=ut(t);return n<0?ft(n+e,0):dt(n,e)},mt=function(t){return function(e,n,r){var i,o=v(e),a=pt(o.length),c=ht(r,a);if(t&&n!=n){for(;a>c;)if((i=o[c++])!=i)return!0}else for(;a>c;c++)if((t||c in o)&&o[c]===n)return t||c||0;return!t&&-1}},gt={includes:mt(!0),indexOf:mt(!1)},yt=gt.indexOf,vt=function(t,e){var n,r=v(t),i=0,o=[];for(n in r)!E(V,n)&&E(r,n)&&o.push(n);for(;e.length>i;)E(r,n=e[i++])&&(~yt(o,n)||o.push(n));return o},bt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],St=bt.concat("length","prototype"),xt={f:Object.getOwnPropertyNames||function(t){return vt(t,St)}},Et={f:Object.getOwnPropertySymbols},Ot=at("Reflect","ownKeys")||function(t){var e=xt.f(I(t)),n=Et.f;return n?e.concat(n(t)):e},wt=function(t,e){for(var n=Ot(e),r=P.f,i=A.f,o=0;o<n.length;o++){var a=n[o];E(t,a)||r(t,a,i(e,a))}},Tt=/#|\.prototype\./,kt=function(t,e){var n=At[jt(t)];return n==Nt||n!=It&&("function"==typeof e?c(e):!!e)},jt=kt.normalize=function(t){return String(t).replace(Tt,".").toLowerCase()},At=kt.data={},It=kt.NATIVE="N",Nt=kt.POLYFILL="P",Pt=kt,Ct=A.f,Rt=function(t,e){var n,r,i,o,c,s=t.target,u=t.global,l=t.stat;if(n=u?a:l?a[s]||R(s,{}):(a[s]||{}).prototype)for(r in e){if(o=e[r],i=t.noTargetGet?(c=Ct(n,r))&&c.value:n[r],!Pt(u?r:s+(l?".":"#")+r,t.forced)&&void 0!==i){if(typeof o==typeof i)continue;wt(o,i)}(t.sham||i&&i.sham)&&C(o,"sham",!0),rt(n,r,o,t)}},Mt=!!Object.getOwnPropertySymbols&&!c((function(){return!String(Symbol())})),_t=Mt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,zt=Array.isArray||function(t){return"Array"==h(t)},Dt=function(t){return Object(y(t))},$t=Object.keys||function(t){return vt(t,bt)},Ft=s?Object.defineProperties:function(t,e){I(t);for(var n,r=$t(e),i=r.length,o=0;i>o;)P.f(t,n=r[o++],e[n]);return t},Lt=at("document","documentElement"),qt=J("IE_PROTO"),Bt=function(){},Gt=function(t){return"<script>"+t+"<\/script>"},Ut=function(){try{et=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;Ut=et?function(t){t.write(Gt("")),t.close();var e=t.parentWindow.Object;return t=null,e}(et):((e=T("iframe")).style.display="none",Lt.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(Gt("document.F=Object")),t.close(),t.F);for(var n=bt.length;n--;)delete Ut.prototype[bt[n]];return Ut()};V[qt]=!0;var Wt,Kt,Jt,Vt=Object.create||function(t,e){var n;return null!==t?(Bt.prototype=I(t),n=new Bt,Bt.prototype=null,n[qt]=t):n=Ut(),void 0===e?n:Ft(n,e)},Xt=xt.f,Yt={}.toString,Qt="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],Ht={f:function(t){return Qt&&"[object Window]"==Yt.call(t)?function(t){try{return Xt(t)}catch(t){return Qt.slice()}}(t):Xt(v(t))}},Zt=B("wks"),te=a.Symbol,ee=_t?te:te&&te.withoutSetter||W,ne=function(t){return E(Zt,t)||(Mt&&E(te,t)?Zt[t]=te[t]:Zt[t]=ee("Symbol."+t)),Zt[t]},re={f:ne},ie=P.f,oe=P.f,ae=ne("toStringTag"),ce=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t},se=ne("species"),ue=function(t,e){var n;return zt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!zt(n.prototype)?b(n)&&null===(n=n[se])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},le=[].push,pe=function(t){var e=1==t,n=2==t,r=3==t,i=4==t,o=6==t,a=5==t||o;return function(c,s,u,l){for(var p,f,d=Dt(c),h=g(d),m=function(t,e,n){if(ce(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}(s,u,3),y=pt(h.length),v=0,b=l||ue,S=e?b(c,y):n?b(c,0):void 0;y>v;v++)if((a||v in h)&&(f=m(p=h[v],v,d),t))if(e)S[v]=f;else if(f)switch(t){case 3:return!0;case 5:return p;case 6:return v;case 2:le.call(S,p)}else if(i)return!1;return o?-1:r||i?i:S}},fe={forEach:pe(0),map:pe(1),filter:pe(2),some:pe(3),every:pe(4),find:pe(5),findIndex:pe(6)},de=fe.forEach,he=J("hidden"),me=ne("toPrimitive"),ge=nt.set,ye=nt.getterFor("Symbol"),ve=Object.prototype,be=a.Symbol,Se=at("JSON","stringify"),xe=A.f,Ee=P.f,Oe=Ht.f,we=p.f,Te=B("symbols"),ke=B("op-symbols"),je=B("string-to-symbol-registry"),Ae=B("symbol-to-string-registry"),Ie=B("wks"),Ne=a.QObject,Pe=!Ne||!Ne.prototype||!Ne.prototype.findChild,Ce=s&&c((function(){return 7!=Vt(Ee({},"a",{get:function(){return Ee(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=xe(ve,e);r&&delete ve[e],Ee(t,e,n),r&&t!==ve&&Ee(ve,e,r)}:Ee,Re=function(t,e){var n=Te[t]=Vt(be.prototype);return ge(n,{type:"Symbol",tag:t,description:e}),s||(n.description=e),n},Me=_t?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof be},_e=function(t,e,n){t===ve&&_e(ke,e,n),I(t);var r=S(e,!0);return I(n),E(Te,r)?(n.enumerable?(E(t,he)&&t[he][r]&&(t[he][r]=!1),n=Vt(n,{enumerable:f(0,!1)})):(E(t,he)||Ee(t,he,f(1,{})),t[he][r]=!0),Ce(t,r,n)):Ee(t,r,n)},ze=function(t,e){I(t);var n=v(e),r=$t(n).concat(Le(n));return de(r,(function(e){s&&!De.call(n,e)||_e(t,e,n[e])})),t},De=function(t){var e=S(t,!0),n=we.call(this,e);return!(this===ve&&E(Te,e)&&!E(ke,e))&&(!(n||!E(this,e)||!E(Te,e)||E(this,he)&&this[he][e])||n)},$e=function(t,e){var n=v(t),r=S(e,!0);if(n!==ve||!E(Te,r)||E(ke,r)){var i=xe(n,r);return!i||!E(Te,r)||E(n,he)&&n[he][r]||(i.enumerable=!0),i}},Fe=function(t){var e=Oe(v(t)),n=[];return de(e,(function(t){E(Te,t)||E(V,t)||n.push(t)})),n},Le=function(t){var e=t===ve,n=Oe(e?ke:v(t)),r=[];return de(n,(function(t){!E(Te,t)||e&&!E(ve,t)||r.push(Te[t])})),r};(Mt||(rt((be=function(){if(this instanceof be)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=W(t),n=function(t){this===ve&&n.call(ke,t),E(this,he)&&E(this[he],e)&&(this[he][e]=!1),Ce(this,e,f(1,t))};return s&&Pe&&Ce(ve,e,{configurable:!0,set:n}),Re(e,t)}).prototype,"toString",(function(){return ye(this).tag})),rt(be,"withoutSetter",(function(t){return Re(W(t),t)})),p.f=De,P.f=_e,A.f=$e,xt.f=Ht.f=Fe,Et.f=Le,re.f=function(t){return Re(ne(t),t)},s&&(Ee(be.prototype,"description",{configurable:!0,get:function(){return ye(this).description}}),rt(ve,"propertyIsEnumerable",De,{unsafe:!0}))),Rt({global:!0,wrap:!0,forced:!Mt,sham:!Mt},{Symbol:be}),de($t(Ie),(function(t){!function(t){var e=it.Symbol||(it.Symbol={});E(e,t)||ie(e,t,{value:re.f(t)})}(t)})),Rt({target:"Symbol",stat:!0,forced:!Mt},{for:function(t){var e=String(t);if(E(je,e))return je[e];var n=be(e);return je[e]=n,Ae[n]=e,n},keyFor:function(t){if(!Me(t))throw TypeError(t+" is not a symbol");if(E(Ae,t))return Ae[t]},useSetter:function(){Pe=!0},useSimple:function(){Pe=!1}}),Rt({target:"Object",stat:!0,forced:!Mt,sham:!s},{create:function(t,e){return void 0===e?Vt(t):ze(Vt(t),e)},defineProperty:_e,defineProperties:ze,getOwnPropertyDescriptor:$e}),Rt({target:"Object",stat:!0,forced:!Mt},{getOwnPropertyNames:Fe,getOwnPropertySymbols:Le}),Rt({target:"Object",stat:!0,forced:c((function(){Et.f(1)}))},{getOwnPropertySymbols:function(t){return Et.f(Dt(t))}}),Se)&&Rt({target:"JSON",stat:!0,forced:!Mt||c((function(){var t=be();return"[null]"!=Se([t])||"{}"!=Se({a:t})||"{}"!=Se(Object(t))}))},{stringify:function(t,e,n){for(var r,i=[t],o=1;arguments.length>o;)i.push(arguments[o++]);if(r=e,(b(e)||void 0!==t)&&!Me(t))return zt(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!Me(e))return e}),i[1]=e,Se.apply(null,i)}});be.prototype[me]||C(be.prototype,me,be.prototype.valueOf),Kt="Symbol",(Wt=be)&&!E(Wt=Jt?Wt:Wt.prototype,ae)&&oe(Wt,ae,{configurable:!0,value:Kt}),V[he]=!0;var qe=P.f,Be=a.Symbol;if(s&&"function"==typeof Be&&(!("description"in Be.prototype)||void 0!==Be().description)){var Ge={},Ue=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof Ue?new Be(t):void 0===t?Be():Be(t);return""===t&&(Ge[e]=!0),e};wt(Ue,Be);var We=Ue.prototype=Be.prototype;We.constructor=Ue;var Ke=We.toString,Je="Symbol(test)"==String(Be("test")),Ve=/^Symbol\((.*)\)[^)]+$/;qe(We,"description",{configurable:!0,get:function(){var t=b(this)?this.valueOf():this,e=Ke.call(t);if(E(Ge,t))return"";var n=Je?e.slice(7,-1):e.replace(Ve,"$1");return""===n?void 0:n}}),Rt({global:!0,forced:!0},{Symbol:Ue})}var Xe=function(t,e){var n=[][t];return!!n&&c((function(){n.call(null,e||function(){throw 1},1)}))},Ye=Object.defineProperty,Qe={},He=function(t){throw t},Ze=function(t,e){if(E(Qe,t))return Qe[t];e||(e={});var n=[][t],r=!!E(e,"ACCESSORS")&&e.ACCESSORS,i=E(e,0)?e[0]:He,o=E(e,1)?e[1]:void 0;return Qe[t]=!!n&&!c((function(){if(r&&!s)return!0;var t={length:-1};r?Ye(t,1,{enumerable:!0,get:He}):t[1]=1,n.call(t,i,o)}))},tn=gt.indexOf,en=[].indexOf,nn=!!en&&1/[1].indexOf(1,-0)<0,rn=Xe("indexOf"),on=Ze("indexOf",{ACCESSORS:!0,1:0});Rt({target:"Array",proto:!0,forced:nn||!rn||!on},{indexOf:function(t){return nn?en.apply(this,arguments)||0:tn(this,t,arguments.length>1?arguments[1]:void 0)}});var an=Math.min,cn=[].lastIndexOf,sn=!!cn&&1/[1].lastIndexOf(1,-0)<0,un=Xe("lastIndexOf"),ln=Ze("indexOf",{ACCESSORS:!0,1:0}),pn=sn||!un||!ln?function(t){if(sn)return cn.apply(this,arguments)||0;var e=v(this),n=pt(e.length),r=n-1;for(arguments.length>1&&(r=an(r,ut(arguments[1]))),r<0&&(r=n+r);r>=0;r--)if(r in e&&e[r]===t)return r||0;return-1}:cn;Rt({target:"Array",proto:!0,forced:pn!==[].lastIndexOf},{lastIndexOf:pn});var fn,dn,hn=at("navigator","userAgent")||"",mn=a.process,gn=mn&&mn.versions,yn=gn&&gn.v8;yn?dn=(fn=yn.split("."))[0]+fn[1]:hn&&(!(fn=hn.match(/Edge\/(\d+)/))||fn[1]>=74)&&(fn=hn.match(/Chrome\/(\d+)/))&&(dn=fn[1]);var vn=dn&&+dn,bn=ne("species"),Sn=function(t){return vn>=51||!c((function(){var e=[];return(e.constructor={})[bn]=function(){return{foo:1}},1!==e[t](Boolean).foo}))},xn=fe.map,En=Sn("map"),On=Ze("map");Rt({target:"Array",proto:!0,forced:!En||!On},{map:function(t){return xn(this,t,arguments.length>1?arguments[1]:void 0)}});var wn=function(t){return function(e,n,r,i){ce(n);var o=Dt(e),a=g(o),c=pt(o.length),s=t?c-1:0,u=t?-1:1;if(r<2)for(;;){if(s in a){i=a[s],s+=u;break}if(s+=u,t?s<0:c<=s)throw TypeError("Reduce of empty array with no initial value")}for(;t?s>=0:c>s;s+=u)s in a&&(i=n(i,a[s],s,o));return i}},Tn={left:wn(!1),right:wn(!0)}.left,kn=Xe("reduce"),jn=Ze("reduce",{1:0});Rt({target:"Array",proto:!0,forced:!kn||!jn},{reduce:function(t){return Tn(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}});var An=Sn("slice"),In=Ze("slice",{ACCESSORS:!0,0:0,1:2}),Nn=ne("species"),Pn=[].slice,Cn=Math.max;Rt({target:"Array",proto:!0,forced:!An||!In},{slice:function(t,e){var n,r,i,o,a,c,s,u=v(this),l=pt(u.length),p=ht(t,l),d=ht(void 0===e?l:e,l);if(zt(u)&&("function"!=typeof(n=u.constructor)||n!==Array&&!zt(n.prototype)?b(n)&&null===(n=n[Nn])&&(n=void 0):n=void 0,n===Array||void 0===n))return Pn.call(u,p,d);for(r=new(void 0===n?Array:n)(Cn(d-p,0)),i=0;p<d;p++,i++)p in u&&(o=r,a=i,c=u[p],s=void 0,(s=S(a))in o?P.f(o,s,f(0,c)):o[s]=c);return r.length=i,r}});var Rn=P.f,Mn=Function.prototype,_n=Mn.toString,zn=/^\s*function ([^ (]*)/;s&&!("name"in Mn)&&Rn(Mn,"name",{configurable:!0,get:function(){try{return _n.call(this).match(zn)[1]}catch(t){return""}}}),Rt({target:"Object",stat:!0,forced:c((function(){$t(1)}))},{keys:function(t){return $t(Dt(t))}});var Dn=p.f,$n=function(t){return function(e){for(var n,r=v(e),i=$t(r),o=i.length,a=0,c=[];o>a;)n=i[a++],s&&!Dn.call(r,n)||c.push(t?[n,r[n]]:r[n]);return c}},Fn={entries:$n(!0),values:$n(!1)}.values;Rt({target:"Object",stat:!0},{values:function(t){return Fn(t)}});var Ln=function(){var t=I(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e};function qn(t,e){return RegExp(t,e)}var Bn,Gn,Un={UNSUPPORTED_Y:c((function(){var t=qn("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),BROKEN_CARET:c((function(){var t=qn("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},Wn=RegExp.prototype.exec,Kn=String.prototype.replace,Jn=Wn,Vn=(Bn=/a/,Gn=/b*/g,Wn.call(Bn,"a"),Wn.call(Gn,"a"),0!==Bn.lastIndex||0!==Gn.lastIndex),Xn=Un.UNSUPPORTED_Y||Un.BROKEN_CARET,Yn=void 0!==/()??/.exec("")[1];(Vn||Yn||Xn)&&(Jn=function(t){var e,n,r,i,o=this,a=Xn&&o.sticky,c=Ln.call(o),s=o.source,u=0,l=t;return a&&(-1===(c=c.replace("y","")).indexOf("g")&&(c+="g"),l=String(t).slice(o.lastIndex),o.lastIndex>0&&(!o.multiline||o.multiline&&"\n"!==t[o.lastIndex-1])&&(s="(?: "+s+")",l=" "+l,u++),n=new RegExp("^(?:"+s+")",c)),Yn&&(n=new RegExp("^"+s+"$(?!\\s)",c)),Vn&&(e=o.lastIndex),r=Wn.call(a?n:o,l),a?r?(r.input=r.input.slice(u),r[0]=r[0].slice(u),r.index=o.lastIndex,o.lastIndex+=r[0].length):o.lastIndex=0:Vn&&r&&(o.lastIndex=o.global?r.index+r[0].length:e),Yn&&r&&r.length>1&&Kn.call(r[0],n,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)})),r});var Qn=Jn;Rt({target:"RegExp",proto:!0,forced:/./.exec!==Qn},{exec:Qn});var Hn=ne("species"),Zn=!c((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),tr="$0"==="a".replace(/./,"$0"),er=ne("replace"),nr=!!/./[er]&&""===/./[er]("a","$0"),rr=!c((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),ir=function(t,e,n,r){var i=ne(t),o=!c((function(){var e={};return e[i]=function(){return 7},7!=""[t](e)})),a=o&&!c((function(){var e=!1,n=/a/;return"split"===t&&((n={}).constructor={},n.constructor[Hn]=function(){return n},n.flags="",n[i]=/./[i]),n.exec=function(){return e=!0,null},n[i](""),!e}));if(!o||!a||"replace"===t&&(!Zn||!tr||nr)||"split"===t&&!rr){var s=/./[i],u=n(i,""[t],(function(t,e,n,r,i){return e.exec===Qn?o&&!i?{done:!0,value:s.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:tr,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:nr}),l=u[0],p=u[1];rt(String.prototype,t,l),rt(RegExp.prototype,i,2==e?function(t,e){return p.call(t,this,e)}:function(t){return p.call(t,this)})}r&&C(RegExp.prototype[i],"sham",!0)},or=function(t){return function(e,n){var r,i,o=String(y(e)),a=ut(n),c=o.length;return a<0||a>=c?t?"":void 0:(r=o.charCodeAt(a))<55296||r>56319||a+1===c||(i=o.charCodeAt(a+1))<56320||i>57343?t?o.charAt(a):r:t?o.slice(a,a+2):i-56320+(r-55296<<10)+65536}},ar={codeAt:or(!1),charAt:or(!0)}.charAt,cr=function(t,e,n){return e+(n?ar(t,e).length:1)},sr=function(t,e){var n=t.exec;if("function"==typeof n){var r=n.call(t,e);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==h(t))throw TypeError("RegExp#exec called on incompatible receiver");return Qn.call(t,e)};ir("match",1,(function(t,e,n){return[function(e){var n=y(this),r=null==e?void 0:e[t];return void 0!==r?r.call(e,n):new RegExp(e)[t](String(n))},function(t){var r=n(e,t,this);if(r.done)return r.value;var i=I(t),o=String(this);if(!i.global)return sr(i,o);var a=i.unicode;i.lastIndex=0;for(var c,s=[],u=0;null!==(c=sr(i,o));){var l=String(c[0]);s[u]=l,""===l&&(i.lastIndex=cr(o,pt(i.lastIndex),a)),u++}return 0===u?null:s}]}));var ur=Math.max,lr=Math.min,pr=Math.floor,fr=/\$([$&'`]|\d\d?|<[^>]*>)/g,dr=/\$([$&'`]|\d\d?)/g,hr=function(t){return void 0===t?t:String(t)};function mr(){this.configure(),this.set("meta","name",{name:"msapplication-config",content:"none"})}ir("replace",2,(function(t,e,n,r){var i=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,o=r.REPLACE_KEEPS_$0,a=i?"$":"$0";return[function(n,r){var i=y(this),o=null==n?void 0:n[t];return void 0!==o?o.call(n,i,r):e.call(String(i),n,r)},function(t,r){if(!i&&o||"string"==typeof r&&-1===r.indexOf(a)){var s=n(e,t,this,r);if(s.done)return s.value}var u=I(t),l=String(this),p="function"==typeof r;p||(r=String(r));var f=u.global;if(f){var d=u.unicode;u.lastIndex=0}for(var h=[];;){var m=sr(u,l);if(null===m)break;if(h.push(m),!f)break;""===String(m[0])&&(u.lastIndex=cr(l,pt(u.lastIndex),d))}for(var g="",y=0,v=0;v<h.length;v++){m=h[v];for(var b=String(m[0]),S=ur(lr(ut(m.index),l.length),0),x=[],E=1;E<m.length;E++)x.push(hr(m[E]));var O=m.groups;if(p){var w=[b].concat(x,S,l);void 0!==O&&w.push(O);var T=String(r.apply(void 0,w))}else T=c(b,l,S,x,O,r);S>=y&&(g+=l.slice(y,S)+T,y=S+b.length)}return g+l.slice(y)}];function c(t,n,r,i,o,a){var c=r+t.length,s=i.length,u=dr;return void 0!==o&&(o=Dt(o),u=fr),e.call(a,u,(function(e,a){var u;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":u=o[a.slice(1,-1)];break;default:var l=+a;if(0===l)return e;if(l>s){var p=pr(l/10);return 0===p?e:p<=s?void 0===i[p-1]?a.charAt(1):i[p-1]+a.charAt(1):e}u=i[l-1]}return void 0===u?"":u}))}})),mr.prototype.defaultSettings={structuredData:{enabled:!0},androidChromeIcons:{enabled:!0},msTags:{enabled:!0},safariTags:{enabled:!0},appleTags:{enabled:!0},openGraphTags:{enabled:!0},twitterTags:{enabled:!0},facebookTags:{enabled:!0}},mr.prototype.mimeTypesByExtension={svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",ico:"image/x-icon",gif:"image/gif",webp:"image/webp",bmp:"image/bmp"},mr.prototype.prioritizeMethods=["preload","prefetch","preconnect","dns-prefetch"],mr.prototype.validAndroidChromeIconSizes=["72x72","96x96","128x128","144x144","152x152","192x192","384x384","512x512"],mr.prototype.validAppleTouchIconSizes=["120x120","180x180","152x152","167x167","1024x1024"],mr.prototype.validMSTileIconSizes=["70x70","150x150","310x150","310x310"],mr.prototype.mstilesNamingMap={"70x70":"msapplication-square70x70logo","150x150":"msapplication-square150x150logo","310x310":"msapplication-square310x310logo","310x150":"msapplication-wide310x150logo"},mr.prototype.reImageSizeFromStr=/[0-9]{2,3}x[0-9]{2,3}/g,mr.prototype.setFavicon=function(t){var n=this.findMimeType(t);if(!e.validationkit.isEmpty(n))return this.set("link","rel",{rel:"shortcut icon",href:t,type:n})},mr.prototype.setProjectMeta=function(t){if(!e.validationkit.isEmpty(t))return e.validationkit.isNotEmpty(t.name)&&(this.settings.msTags.enabled&&this.set("meta","name",{name:"application-name",content:t.name}),this.settings.safariTags.enabled&&this.setSafariMobileWebApp({name:t.name}),this.settings.openGraphTags.enabled&&this.set("meta","property",{property:"og:site_name",content:t.name})),e.validationkit.isNotEmpty(t.url)&&this.settings.msTags.enabled&&this.set("meta","name",{name:"msapplication-starturl",content:t.url}),e.validationkit.isNotEmpty(t.logo)&&this.settings.structuredData.enabled&&n.injectJSONLD({"@type":"Organization",logo:t.logo,url:t.url},{"data-mptype":"sdorg"}),e.validationkit.isNotEmpty(t.primaryColor)&&this.set("meta","name",{name:"theme-color",content:t.primaryColor}),e.validationkit.isNotEmpty(t.backgroundColor)&&this.settings.msTags.enabled&&this.set("meta","name",{name:"msapplication-TileColor",content:t.backgroundColor}),this},mr.prototype.robots=function(t){return this.set("meta","name",{name:"robots",content:t})},mr.prototype.prioritize=function(t,e){if(-1!==this.prioritizeMethods.indexOf(e))return this.set("meta",void 0,{name:e,content:t})},mr.prototype.removeAllPrioritizations=function(){for(var t=0;t<this.prioritizeMethods.length;t++){var n=this.prioritizeMethods[t],r=document.querySelectorAll('meta[name="'+n+'"]');if(e.validationkit.isNotEmpty(r))for(var i=0;i<r.length;i++)r[i].parentNode.removeChild(r[i])}return this},mr.prototype.setIcons=function(t){var e=this,n=Object.values(e.mimeTypesByExtension);return t.map((function(t){var r=e.findMimeType(t),i=t.match(e.reImageSizeFromStr);if(i&&i.length>0&&r&&-1!==n.indexOf(r)){var o=i[0];-1!==e.validAndroidChromeIconSizes.indexOf(o)&&e.settings.androidChromeIcons.enabled&&e.set("link",void 0,{rel:"icon",href:t,sizes:o,type:r}),-1!==e.validAppleTouchIconSizes.indexOf(o)&&e.settings.appleTags.enabled&&e.set("link",void 0,{rel:"apple-touch-icon",href:t,sizes:o}),-1!==e.validMSTileIconSizes.indexOf(o)&&e.settings.msTags.enabled&&e.set("meta",void 0,{name:e.mstilesNamingMap[o],content:t})}})),e},mr.prototype.setCanonical=function(t){return this.set("link",void 0,{rel:"canonical",href:t})},mr.prototype.removeAllCanonicals=function(){var t=document.querySelectorAll('link[rel="canonical"]');if(e.validationkit.isNotEmpty(t))for(var n=0;n<t.length;n++)t[n].parentNode.removeChild(t[n]);return this},mr.prototype.setLocalVersion=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(this.set("link",void 0,{rel:"alternate",href:e,hreflang:t}),this.settings.openGraphTags.enabled){var r=n?"":":alternate";this.set("meta",void 0,{property:"og:locale"+r,content:t})}return this},mr.prototype.removeAllLocalVersions=function(){var t=document.querySelectorAll('link[rel="alternate"]');if(e.validationkit.isNotEmpty(t))for(var n=0;n<t.length;n++)elems2[n].parentNode.removeChild(elems2[n]);if(this.settings.openGraphTags.enabled){var r=document.querySelectorAll('meta[property="og:locale:alternate"]');if(e.validationkit.isNotEmpty(r))for(var i=0;i<r.length;i++)r[i].parentNode.removeChild(r[i]);var o=document.querySelector('meta[property="og:locale"]');e.validationkit.isNotEmpty(o)&&o.parentNode.removeChild(o)}return this},mr.prototype.setPageMeta=function(t){if(e.validationkit.isEmpty(t))return this;if(e.validationkit.isNotEmpty(t.title)&&(document.title=t.title,this.settings.openGraphTags.enabled&&this.set("meta","property",{property:"og:title",content:t.title}),this.settings.twitterTags.enabled&&this.set("meta","name",{name:"twitter:title",content:t.title})),e.validationkit.isNotEmpty(t.description)&&(this.set("meta","name",{name:"description",content:t.description}),this.settings.openGraphTags.enabled&&this.set("meta","property",{property:"og:description",content:t.description}),this.settings.twitterTags.enabled&&this.set("meta","name",{name:"twitter:description",content:t.description})),e.validationkit.isNotEmpty(t.url)&&this.settings.openGraphTags.enabled&&this.set("meta","property",{property:"og:url",content:t.url}),e.validationkit.isNotEmpty(t.image)){var n=this.formatImageInput(t.image);this.settings.openGraphTags.enabled&&(this.set("meta","property",{property:"og:image",content:n.url}),e.validationkit.isNotEmpty(n.width)&&this.set("meta","property",{property:"og:image:width",content:n.width}),e.validationkit.isNotEmpty(n.height)&&this.set("meta","property",{property:"og:image:height",content:n.height})),this.settings.twitterTags.enabled&&this.set("meta","name",{name:"twitter:image",content:n.url})}return e.validationkit.isNotEmpty(t.locale)&&(document.querySelector("html").setAttribute("lang",t.locale),this.settings.openGraphTags.enabled&&this.set("meta","property",{property:"og:locale",content:t.locale.replace("-","_")})),this},mr.prototype.setSafariMobileWebApp=function(t){return this.settings.appleTags.enabled?(this.set("meta","name",{name:"apple-mobile-web-app-capable",content:"yes"}),e.validationkit.isNotEmpty(t.name)&&this.set("meta","name",{name:"apple-mobile-web-app-title",content:t.name}),e.validationkit.isNotEmpty(t.statusBarStyle)&&this.set("meta","name",{name:"apple-mobile-web-app-status-bar-style",content:t.statusBarStyle}),this):this},mr.prototype.setSafariPinnedTab=function(t,e){return this.set("link","rel",{rel:"mask-icon",href:t,color:e||"black"})},mr.prototype.setFacebookMeta=function(t){return e.validationkit.isNotEmpty(t.appID)&&this.set("meta","property",{property:"fb:app_id",content:t.appID}),this},mr.prototype.setTwitterMeta=function(t){if(!this.settings.twitterTags.enabled)return this;e.validationkit.isNotEmpty(t.card)&&this.set("meta","name",{name:"twitter:card",content:t.card}),e.validationkit.isNotEmpty(t.site)&&this.set("meta","name",{name:"twitter:site",content:t.site}),e.validationkit.isNotEmpty(t.creator)&&this.set("meta","name",{name:"twitter:creator",content:t.creator})},mr.prototype.breadcrumb=function(t){if(!this.settings.structuredData.enabled)return this;var e={"@type":"BreadcrumbList",itemListElement:t.map((function(t,e){return{"@type":"ListItem",position:e+1,name:t.title,item:t.url}}))};return n.injectJSONLD(e,{"data-mptype":"sdb"}),this},mr.prototype.formatImageInput=function(t){return e.typekit.isString(t)?{url:t}:e.typekit.isObject(t)?{url:t.url,width:t.width,height:t.height}:{}},mr.prototype.findMimeType=function(t){var n=t.lastIndexOf(".");if(!(n<1)){var r=t.slice(n+1);if(!e.validationkit.isEmpty(r))return e.objectkit.getProp(this.mimeTypesByExtension,r,void 0)}},mr.prototype.set=function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(e.validationkit.isNotEmpty(n)){var i=this.hasElement(t+"["+n+'="'+r[n]+'"]');i&&i.parentNode.removeChild(i)}var o=this.createElement(t,r);return this.patch(o),o},mr.prototype.hasElement=function(t){return document.querySelector(t)},mr.prototype.createElement=function(t,n){var r=document.createElement(t);return e.typekit.isObject(n)&&Object.keys(n).map((function(t){return r.setAttribute(t,n[t])})),r},mr.prototype.patch=function(t){document.getElementsByTagName("head")[0].insertBefore(t,null)},mr.prototype.configure=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this.defaultSettings;this.settings=Object.keys(this.defaultSettings).reduce((function(r,i){return r[i]=e.objectkit.getProp(t,i,e.objectkit.getProp(n,i,{})),r}),{})};var gr=new mr;module.exports=gr;