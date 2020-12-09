/* min/MIDI.js/examples/inc/colorspace.js */

/* min/MIDI.js/js/midi/audioDetect-1909386c.js */
/* min/MIDI.js/js/midi/loadPlugin-1909386c.js */
/* min/MIDI.js/js/midi/player-1909386c.js */
/* min/MIDI.js/js/midi/plugin-1909386c.js */

/* min/MusicTheory.js */

/* min/MIDI.js/inc/shim/Base64-1909386c.js */

if("undefined"===typeof DOM)var DOM={};
(function(){DOM.dimensions=function(){document.body&&(document.body.scrollHeight||(document.body.scrollHeight=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)),window.innerWidth&&window.innerHeight||(document.body&&document.body.offsetWidth?(window.innerWidth=document.body.offsetWidth,window.innerHeight=document.body.offsetHeight):"CSS1Compat"===document.compatMode&&(document.documentElement&&document.documentElement.offsetWidth)&&(window.innerWidth=document.documentElement.offsetWidth,
window.innerHeight=document.documentElement.offsetHeight)))}})();


/* min/json2.js */


window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b,a){window.setTimeout(b,1E3/60)}}());

String.prototype.replaceAll=function(b,a){if("object"==typeof b){for(var c=this,e=0;e<b.length;e++)c=c.split(b[e]).join(a[e]);return c}return this.split(b).join(a)};
String.prototype.trim=function(b){return this.replace(/^\s+|\s+$/g,"")};
String.prototype.ucfirst=function(b){return this[0].toUpperCase()+this.substr(1)};
String.prototype.ucwords=function(b){return this.replace(/^(.)|\s(.)/g,function(a){return a.toUpperCase()})};
String.prototype.addslashes=function(){return this.replace(/([\\"'])/g,"\\$1").replace(/\0/g,"\\0")};
String.prototype.stripslashes=function(){return this.replace(/\0/g,"0").replace(/\\([\\'"])/g,"$1")};
String.format=function(b){var a=Array.prototype.slice.call(arguments,1,arguments.length);return b.replace(/\{(\d+)\}/g,function(b,e){return a[e]})};
String.prototype.basename=function(){return this.replace(/\\/g,"/").replace(/.*\//,"")};


if("undefined"===typeof widgets)var widgets={};
(function(){var b={"text/css":"string","text/html":"string","text/plain":"string"};widgets.FileSaver=function(a){"undefined"===typeof a&&(a={});var c=a.jsDir||"./inc/",e=this;this.html5="function"===typeof ArrayBuffer;this.boot=function(){var b=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder,d=window.btoa&&window.atob,g=[];g.push({src:c+"File/jszip.js",verify:"JSZip"});d||g.push({src:c+"Polyfill/Base64.js",verify:["atob","btoa"]});b||g.push({src:c+"Polyfill/BlobBuilder.js",verify:"BlobBuilder"});
e.html5?g.push({src:c+"File/FileSaver.js",verify:"saveAs"}):g.push({src:c+"File/downloadify.js",verify:["Downloadify","swfobject"]});DOMLoader.script.add({srcs:g,callback:function(){if(a.onready)a.onready(e)}});return this};this.download=function(a){if("function"===typeof saveAs&&"function"===typeof BlobBuilder&&a.getData){var c=a.getData(),e=a.name,f=a.mime,l=a.charset;a=a.extension;var n="";if("string"===typeof c){if("data:"===c.substr(0,5)){var r=c.substr(5).split(","),c=r[1],f=r[0].split(";")[0];
a||(a=f.split("/")[1]);b[r[0]]||(n="binary")}}else n="binary",f="application/zip",a="zip",c=d(c);e||(e="download");f||(f="text/plain");a||(a="txt");n||(n=b[f]||"binary");r=new BlobBuilder;if("string"===n)r.append(c),l&&(f+=";charset="+l);else{for(var c=atob(c),l=new ArrayBuffer(c.length),n=new Uint8Array(l),q=0;q<c.length;q++)n[q]=c.charCodeAt(q);r.append(l)}f=r.getBlob(f);saveAs(f,e+"."+a)}};this.button=function(a){var b=a.parent||document.body,g=a.id,f=a.fileName,l=a.fileType,n=a.getData,r="fake"===
a.format,q=document.createElement("span"),p=document.createElement("span");p.id=g;p.style.position="absolute";q.style.cssText="width: inherit; height: inherit;";q.className="downloadify-container";q.appendChild(p);var s=document.createElement("span");s.style.cssText="width: inherit; height: inherit;";s.className="downloadify";a.src?(p=new Image,p.src=a.src,s.appendChild(p)):s.innerHTML=a.title?a.title:f+"."+l;q.appendChild(s);b.appendChild(q);setTimeout(function(){var p=b.offsetWidth,v=b.offsetHeight;
q.style.width=p+"px";q.style.height=v+"px";var w=document.getElementById(g);e.html5||r?Event.add(s,"click",function(){if(r)return n();e.download({name:f,extension:l,getData:n})}):(Event.add(w,"mousedown",Event.stop),Downloadify.create(g,{filename:function(){return f+"."+l},data:function(){var a=n();return"string"===typeof a?a:d(a)},downloadImage:c+"File/downloadify.png",swf:c+"File/downloadify.swf",transparent:!0,append:!1,width:p,height:v,dataType:a.format}))},1)};var d=function(a){function c(a,
d){var e=a.data,f={};-1!==e.indexOf("base64")&&(e=e.split(";"),b[e[0].substr(5)]&&(f.binary=!1),f.base64=!0,e=e[1].substr(7));d.add(a.name,e,f)}var d=new JSZip;if("undefined"===typeof a.length)if(a.data&&a.name)a=[a];else{for(var e in a)for(var l=a[e],n=d.folder(e),r=0,q=l.length;r<q;r++)c(l[r],n);return d.generate()}r=0;for(q=a.length;r<q;r++)c(a[r],d);return d.generate()};return this.boot()}})();

/* min/MIDI.js/js/widget/loader-1909386c.js */

"undefined"===typeof widgets&&(widgets={});
widgets.Uploader=function(b){b||(b={});var a=this;this.uploadPath="./gallery-upload.php";this.callback=b.callback;this.maxFiles=((this.singleFile=b.singleFile||!1)?1:b.max)||Infinity;this.fileCollection={};this.hasFileReader=window.FileReader?!0:!1;this.acceptedFormats=b.formats||{"image/jpg":!0,"image/jpeg":!0,"image/gif":!0,"image/png":!0};this.uploadCollection=function(b){var d=[],c=this.fileCollection,e;for(e in c)d.push(c[e]);a.handleFiles(d,{upload:!0,callback:b})};this.preview=function(b){var d=
b.name,e=function(b){a.fileCollection[d].src=b.target.result;a.fileCollection[d].preview=!0;return c()},f=new FileReader;f.addEventListener?f.addEventListener("loadend",e,!1):f.onloadend=e;f.readAsDataURL(b)};this.upload=function(b){var d=b.name;if(a.hasFileReader){var e=function(b){switch(b.target.error.code){case b.target.error.NOT_FOUND_ERR:a.status="File not found.";break;case b.target.error.NOT_READABLE_ERR:a.status="File not readable.";break;case b.target.error.ABORT_ERR:a.status="Upload has been aborted.";
break;default:a.status="Read error."}},f=function(b){b.lengthComputable&&(a.status=Math.round(100*b.loaded/b.total))},l=function(e){var f=new XMLHttpRequest;f.onreadystatechange=function(b){if(4===f.readyState&&"success"===b.srcElement.responseText)return a.fileCollection[d].uploaded=!0,c()};"undefined"!==typeof f.sendAsBinary?(f.open("POST",a.uploadPath+"?upload=true",!0),e="--xxxxxxxxx\r\n"+("Content-Disposition: form-data; name='upload'; filename='"+b.name+"'\r\n"),e=e+"Content-Type: application/octet-stream\r\n\r\n"+
(n.result+"\r\n"),e+="--xxxxxxxxx\r\n",f.setRequestHeader("content-type","multipart/form-data; boundary=xxxxxxxxx"),f.sendAsBinary(e)):(f.open("POST",a.uploadPath+"?upload=true&base64=true",!0),f.setRequestHeader("X-FILENAME",b.name),f.setRequestHeader("X-FILESIZE",b.size),f.setRequestHeader("X-FILETYPE",b.type),f.send(window.btoa(n.result)))},n=new FileReader;"undefined"!==typeof n.addEventListener?(n.addEventListener("loadend",l,!1),n.addEventListener("error",e,!1),n.addEventListener("progress",
f,!1)):(n.onloadend=l,n.onerror=e,n.onprogress=f);n.readAsBinaryString(b)}else{var r=new XMLHttpRequest;r.onreadystatechange=function(b){if(4===r.readyState&&"success"===b.srcElement.responseText)return a.fileCollection[d].uploaded=!0,c()};r.open("POST",a.uploadPath+"?upload=true",!0);r.setRequestHeader("X-FILENAME",b.name);r.setRequestHeader("X-FILESIZE",b.size);r.setRequestHeader("X-FILETYPE",b.type);r.send(b)}};var c;this.handleFiles=function(b,d){var e=0,f=b.length;d||(d={});0<f&&(a.singleFile&&
!0!==d.upload)&&(a.fileCollection={});(c=function(){var l=b[e],n={status:a.status,current:e,length:f};if(++e>a.maxFiles||!l)a.callback(n,a.fileCollection,f-1,d.event);else{a.callback(n);n=l.name;if(a.fileCollection[n])if(d.upload){if(a.fileCollection[n].uploaded)return c()}else if(a.fileCollection[n].preview)return c();a.fileCollection[n]=l;(n=l.type)||(n="text/"+l.fileName.substr(l.fileName.lastIndexOf(".")+1));if(!a.acceptedFormats[n])return console.log(n+"is not an accepted format."),c();if(0===
(l.fileSize||l.size))return console.log("file is empty."),c();if(d.upload)a.upload(l);else if(d.preview&&a.hasFileReader)a.preview(l);else return c()}})()};var e=document.createElement("form");e.action="#";e.method="post";e.enctype="multipart/form-data";e.style.cssText="z-index: 10000; position: absolute; left: 0; top: 0; display: none;";e.addEventListener("dragenter",function(a){Event.prevent(a);Event.stop(a);e.style.background="rgba(255,0,0,0.2)";return!1},!1);e.addEventListener("dragover",function(a){Event.prevent(a);
Event.stop(a);return!1},!1);e.addEventListener("drop",function(b){Event.prevent(b);Event.stop(b);e.style.display="none";e.style.background="none";b.dataTransfer&&b.dataTransfer.files&&a.handleFiles(b.dataTransfer.files,{preview:!0,event:b})},!1);e.addEventListener("dragleave",function(a){Event.prevent(a);Event.stop(a);window.setTimeout(function(){e.style.display="none";e.style.background="none"},100)},!1);var d=document.createElement("input");d.type="file";d.name="files[]";!this.singleFile&&1<this.maxFiles&&
(d.multiple="multiple");d.style.cssText="position: absolute; opacity: 0;";d.addEventListener("change",function(b){d.files&&d.files[0]?a.handleFiles(d.files,{preview:!0,event:b}):d.value&&console.log(d.value)},!1);d.addEventListener("click",function(a){Event.prevent(a);Event.stop(a)},!1);e.appendChild(d);b=function(a){!window.innerWidth&&(document.body&&document.body.offsetWidth)&&(window.innerWidth=document.body.offsetWidth,window.innerHeight=document.body.offsetHeight);window.innerWidth&&window.innerHeight&&
(e.style.width=window.innerWidth+"px",e.style.height=window.innerHeight+"px")};b();window.addEventListener("dragenter",function(a){e.style.display="block"},!1);window.addEventListener("resize",b,!1);document.body.appendChild(e);return this};


/* min/MIDI.js/DMLoader.script-1909386c.js */

/* min/MIDI.js/js/util/dom_request_xhr-1909386c.js */

/* min/MIDI.js/examples/inc/event.js */

/* min/MIDI.js/inc/jasmid/stream.js */

/* min/MIDI.js/inc/jasmid/midifile.js */

/* min/MIDI.js/inc/jasmid/replayer.js */

/* min/MIDI.js/jsmidi-1909386c.js */

/* Duplicated. min/MIDI.js/inc/shim/Base64-1909386c.js */

String.prototype.replaceAll=function(b,a){if("object"===typeof b){for(var c=this,e=0;e<b.length;e++)c=c.split(b[e]).join(a[e]);return c}return this.split(b).join(a)};
String.prototype.trim=function(b){return this.replace(/^\s+|\s+$/g,"")};
String.prototype.ucfirst=function(b){return this[0].toUpperCase()+this.substr(1)};
String.prototype.ucwords=function(b){return this.replace(/^(.)|\s(.)/g,function(a){return a.toUpperCase()})};
String.prototype.addslashes=function(){return this.replace(/([\\"'])/g,"\\$1").replace(/\0/g,"\\0")};
String.prototype.stripslashes=function(){return this.replace(/\0/g,"0").replace(/\\([\\'"])/g,"$1")};
String.prototype.basename=function(){return this.replace(/\\/g,"/").replace(/.*\//,"")};
String.prototype.lpad=function(b,a){for(var c=this;c.length<a;)c=b+c;return c};
String.prototype.rpad=function(b,a){for(var c=this;c.length<a;)c+=b;return c};

window.STRING=String;
STRING.prototype.replaceAll=STRING.prototype.replaceAll;
STRING.prototype.trim=STRING.prototype.trim;
STRING.prototype.ucfirst=STRING.prototype.ucfirst;
STRING.prototype.ucwords=STRING.prototype.ucwords;
STRING.prototype.addslashes=STRING.prototype.addslashes;
STRING.prototype.stripslashes=STRING.prototype.stripslashes;
STRING.prototype.basename=STRING.prototype.basename;
STRING.prototype.lpad=STRING.prototype.lpad;
STRING.prototype.rpad=STRING.prototype.rpad;


window.localStorage||(window.localStorage={getItem:function(b){return b&&this.hasOwnProperty(b)?unescape(document.cookie.replace(RegExp("(?:^|.*;\\s*)"+escape(b).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),"$1")):null},key:function(b){return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/,"").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[b])},setItem:function(b,a){b&&(document.cookie=escape(b)+"="+escape(a)+"; path=/",this.length=document.cookie.match(/\=/g).length)},length:document.cookie.match(/\=/g).length,
removeItem:function(b){if(b&&this.hasOwnProperty(b)){var a=new Date;a.setDate(a.getDate()-1);document.cookie=escape(b)+"=; expires="+a.toGMTString()+"; path=/";this.length--}},hasOwnProperty:function(b){return RegExp("(?:^|;\\s*)"+escape(b).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)}});

/* min/MIDI.js/inc/shim/Base64binary-1909386c.js */

"use strict";
var self=this;
self.URL=self.URL||self.webkitURL;
self.requestFileSystem=self.requestFileSystem||self.webkitRequestFileSystem;
self.resolveLocalFileSystemURL=self.resolveLocalFileSystemURL||self.webkitResolveLocalFileSystemURL;

navigator.temporaryStorage=navigator.temporaryStorage||navigator.webkitTemporaryStorage;
navigator.persistentStorage=navigator.persistentStorage||navigator.webkitPersistentStorage;
self.BlobBuilder=self.BlobBuilder||self.MozBlobBuilder||self.WebKitBlobBuilder;

if(void 0===self.FileError){var FileError=function(){};FileError.prototype.prototype=Error.prototype}

var Util={toArray:function(b){return Array.prototype.slice.call(b||[],0)},strToDataURL:function(b,a,c){return(void 0!=c?c:1)?"data:"+a+";base64,"+self.btoa(b):"data:"+a+","+b},strToObjectURL:function(b,a){for(var c=new Uint8Array(b.length),e=0;e<c.length;++e)c[e]=b.charCodeAt(e);c=new Blob([c],a?{type:a}:{});return self.URL.createObjectURL(c)},fileToObjectURL:function(b){return self.URL.createObjectURL(b)},fileToArrayBuffer:function(b,a,c){var e=new FileReader;e.onload=function(b){a(b.target.result)};
e.onerror=function(a){c&&c(a)};e.readAsArrayBuffer(b)},dataURLToBlob:function(b){if(-1==b.indexOf(";base64,")){var a=b.split(",");b=a[0].split(":")[1];a=decodeURIComponent(a[1]);return new Blob([a],{type:b})}a=b.split(";base64,");b=a[0].split(":")[1];for(var a=window.atob(a[1]),c=a.length,e=new Uint8Array(c),d=0;d<c;++d)e[d]=a.charCodeAt(d);return new Blob([e],{type:b})},arrayBufferToBlob:function(b,a){var c=new Uint8Array(b);return new Blob([c],a?{type:a}:{})},arrayBufferToBinaryString:function(b,
a,c){var e=new FileReader;e.onload=function(b){a(b.target.result)};e.onerror=function(a){c&&c(a)};b=new Uint8Array(b);e.readAsBinaryString(new Blob([b]))},arrayToBinaryString:function(b){if("object"!=typeof b)return null;for(var a=b.length,c=Array(a);a--;)c[a]=String.fromCharCode(b[a]);return c.join("")},getFileExtension:function(b){var a=b.lastIndexOf(".");return-1!=a?b.substring(a):""}},
MyFileError=function(b){this.prototype=FileError.prototype;this.code=b.code;this.name=b.name};


FileError.BROWSER_NOT_SUPPORTED=1E3;
FileError.prototype.__defineGetter__("name",function(){for(var b=Object.keys(FileError),a=0,c;c=b[a];++a)if(FileError[c]==this.code)return c;return"Unknown Error"});

var Filer=new function(){function b(b){if(a=b||null)c=a.root,e=!0}var a=null,c=null,e=!1,d=function(b){0!=b.indexOf("filesystem:")&&(b="/"==b[0]?a.root.toURL()+b.substring(1):0==b.indexOf("./")||0==b.indexOf("../")?"../"==b&&c!=a.root?c.toURL()+"/"+b:c.toURL()+b:c.toURL()+"/"+b);return b},k=function(a,b){var c=arguments[1],e=arguments[2],k=function(a){if(a.code==FileError.NOT_FOUND_ERR){if(e)throw Error('"'+c+'" or "'+e+'" does not exist.');throw Error('"'+c+'" does not exist.');}throw Error("Problem getting Entry for one or more paths.");
},m=d(c);if(3==arguments.length){var p=d(e);self.resolveLocalFileSystemURL(m,function(b){self.resolveLocalFileSystemURL(p,function(d){a(b,d)},k)},k)}else self.resolveLocalFileSystemURL(m,a,k)},m=function(b,d,c,e,m,q){if(!a)throw Error("Filesystem has not been initialized.");if(typeof b!=typeof d)throw Error("These method arguments are not supported.");var p=c||null,s=void 0!=q?q:!1;(b.isFile||d.isDirectory)&&d.isDirectory?s?b.moveTo(d,p,e,m):b.copyTo(d,p,e,m):k(function(a,b){if(b.isDirectory)s?a.moveTo(b,
p,e,m):a.copyTo(b,p,e,m);else{var d=Error('Oops! "'+b.name+" is not a directory!");if(m)m(d);else throw d;}},b,d)};b.DEFAULT_FS_SIZE=1048576;b.version="0.4.3";b.prototype={get fs(){return a},get isOpen(){return e},get cwd(){return c}};b.prototype.pathToFilesystemURL=function(a){return d(a)};b.prototype.init=function(b,d,k){if(!self.requestFileSystem)throw new MyFileError({code:FileError.BROWSER_NOT_SUPPORTED,name:"BROWSER_NOT_SUPPORTED"});b=b?b:{};var m=b.size||1048576;this.type=self.TEMPORARY;"persistent"in
b&&b.persistent&&(this.type=self.PERSISTENT);var r=function(b){this.size=m;a=b;c=a.root;e=!0;d&&d(b)};this.type==self.PERSISTENT&&navigator.persistentStorage?navigator.persistentStorage.requestQuota(m,function(a){self.requestFileSystem(this.type,a,r.bind(this),k)}.bind(this),k):self.requestFileSystem(this.type,m,r.bind(this),k)};b.prototype.ls=function(b,d,e){if(!a)throw Error("Filesystem has not been initialized.");var m=function(a){c=a;var b=[],g=c.createReader(),k=function(){g.readEntries(function(a){a.length?
(b=b.concat(Util.toArray(a)),k()):(b.sort(function(a,b){return a.name<b.name?-1:b.name<a.name?1:0}),d(b))},e)};k()};b.isDirectory?m(b):0==b.indexOf("filesystem:")?k(m,b):c.getDirectory(b,{},m,e)};b.prototype.mkdir=function(b,d,e,k){if(!a)throw Error("Filesystem has not been initialized.");var m=null!=d?d:!1,q=b.split("/"),p=function(a,d){if("."==d[0]||""==d[0])d=d.slice(1);a.getDirectory(d[0],{create:!0,exclusive:m},function(a){if(a.isDirectory)d.length&&1!=q.length?p(a,d.slice(1)):e&&e(a);else if(a=
Error(b+" is not a directory"),k)k(a);else throw a;},function(a){if(a.code==FileError.INVALID_MODIFICATION_ERR)if(a.message="'"+b+"' already exists",k)k(a);else throw a;})};p(c,q)};b.prototype.open=function(b,c,e){if(!a)throw Error("Filesystem has not been initialized.");b.isFile?b.file(c,e):k(function(a){a.file(c,e)},d(b))};b.prototype.create=function(b,d,e,k){if(!a)throw Error("Filesystem has not been initialized.");c.getFile(b,{create:!0,exclusive:null!=d?d:!0},e,function(a){a.code==FileError.INVALID_MODIFICATION_ERR&&
(a.message="'"+b+"' already exists");if(k)k(a);else throw a;})};b.prototype.mv=function(a,b,d,c,e){m.bind(this,a,b,d,c,e,!0)()};b.prototype.rm=function(b,d,c){if(!a)throw Error("Filesystem has not been initialized.");var e=function(a){a.isFile?a.remove(d,c):a.isDirectory&&a.removeRecursively(d,c)};b.isFile||b.isDirectory?e(b):k(e,b)};b.prototype.cd=function(b,e,l){if(!a)throw Error("Filesystem has not been initialized.");b.isDirectory?(c=b,e&&e(c)):(b=d(b),k(function(a){if(a.isDirectory)c=a,e&&e(c);
else if(a=Error("Path was not a directory."),l)l(a);else throw a;},b))};b.prototype.cp=function(a,b,d,c,e){m.bind(this,a,b,d,c,e)()};b.prototype.write=function(b,d,e,m){if(!a)throw Error("Filesystem has not been initialized.");var r=function(a){a.createWriter(function(b){b.onerror=m;if(d.append)b.onwriteend=function(b){e&&e(a,this)},b.seek(b.length);else{var c=!1;b.onwriteend=function(b){c?e&&e(a,this):(c=!0,this.truncate(this.position))}}d.data.__proto__==ArrayBuffer.prototype&&(d.data=new Uint8Array(d.data));
var k=new Blob([d.data],d.type?{type:d.type}:{});b.write(k)},m)};b.isFile?r(b):0==b.indexOf("filesystem:")?k(r,b):c.getFile(b,{create:!0,exclusive:!1},r,m)};b.prototype.df=function(a,b){var d=function(b,d){a(b,d-b,d)};if(!navigator.temporaryStorage.queryUsageAndQuota||!navigator.persistentStorage.queryUsageAndQuota)throw Error("Not implemented.");self.TEMPORARY==this.type?navigator.temporaryStorage.queryUsageAndQuota(d,b):self.PERSISTENT==this.type&&navigator.persistentStorage.queryUsageAndQuota(d,
b)};return b};


/* min/Piano/piano_canvas.js */

/* min/Piano/piano_animation.js */

/* min/Piano/piano_notes_playing.js */

/* min/Piano/piano_render.js */


var MusicBox={};
(function(){function b(b){a.aspect=window.innerWidth/window.innerHeight;a.updateProjectionMatrix();e.setSize(window.innerWidth,window.innerHeight)}var a,c,e,d,k=[],m="#interactive"==window.location.hash,g;MusicBox.init=function(){d=document.createElement("div");d.id="musicbox";d.style.cssText="position: absolute; top: 0; left: 0; z-index: 0";d.onmousemove=MusicBox.render;document.body.appendChild(d);a=new THREE.TrackballCamera({fov:200,aspect:window.innerWidth/window.innerHeight,near:0,far:1E3,rotateSpeed:1,
zoomSpeed:1.2,panSpeed:0.8,noZoom:!1,noPan:!1,staticMoving:!1,dynamicDampingFactor:0.3});a.position.x=900;a.position.y=-100;a.position.z=-100;MusicBox.scene=new THREE.Scene;MusicBox.scene.fog=new THREE.FogExp2(0,0.0025);var f=new THREE.DirectionalLight(13421772,4);f.position.x=1;f.position.y=1;f.position.z=1;f.position.normalize();MusicBox.scene.addLight(f);f=new THREE.DirectionalLight(16777215,4);f.position.x=-1;f.position.y=-1;f.position.z=-1;f.position.normalize();MusicBox.scene.addLight(f);for(var f=
0,k=new THREE.CubeGeometry(100,40,40),g=1;9>g;g++)for(var m=0;12>m;m++){var q=new THREE.Mesh(k,new THREE.MeshLambertMaterial({color:parseInt("0x"+Piano.colorMap[f++].hex),transparent:!0,blending:THREE.AdditiveBlending}));q.position.x=1E3*(m/36)-50;q.position.y=1E3*(g/10)-500;q.position.z=1E3*(m/10)-400;q.sticky=!0;MusicBox.scene.addObject(q)}k=new THREE.Geometry;for(i=0;4E3>i;i++)vector=new THREE.Vector3(2E3*Math.random()-1E3,2E3*Math.random()-1E3,2E3*Math.random()-1E3),k.vertices.push(new THREE.Vertex(vector));
parameters=[[[1,1,1],5],[[0.95,1,1],4],[[0.9,1,1],3],[[0.85,1,1],2],[[0.8,1,1],1]];c=new THREE.Projector;e=new THREE.WebGLRenderer;e.sortObjects=!1;e.setSize(window.innerWidth,window.innerHeight);d.appendChild(e.domElement);window.addEventListener("resize",b,!1)};MusicBox.render=function(){a.update();if(m){var b=new THREE.Vector3(0,0,0.5);c.unprojectVector(b,a);b=(new THREE.Ray(a.position,b.subSelf(a.position).normalize())).intersectScene(MusicBox.scene);0<b.length?g!=b[0].object&&(g&&(g.scale.x=
1),g=b[0].object,g.currentHex=g.materials[0].color.hex,MIDI.noteOn&&(b=Color.Space(g.currentHex,"HEX>RGB>HSL"),b=(12*(b.H/360)>>0)+12*(b.L/10>>0),g.scale.x=100,MIDI.noteOn(1,b))):(g&&(g.scale.x=1),g=null)}b=1E-4*(new Date).getTime();for(i=0;i<MusicBox.scene.objects.length;i++){var d=MusicBox.scene.objects[i];d.sticky||(d.rotation.y=b*(4>i?i/70:-i/70))}for(i=0;i<k.length;i++)color=parameters[i][0],h=360*(color[0]+b)%360/360,k[i].color.setHSV(h,color[1],color[2]);e.render(MusicBox.scene,a)}})();


var change=function(){return{css:function(b,a){"string"===typeof b&&(b=document.getElementById(b));if(b){a=a.split(";");for(var c=0,e=a.length;c<e;c++){var d=a[c].split(":");b.style[d[0]]=d[1]}}},className:function(b,a){"string"===typeof b&&(b=document.getElementById(b));if(b){if(b.parentNode){var c=b.parentNode.getElementsByClassName(a);if(c.length)for(var e=0;e<c.length;e++)c[e].className=(" "+c[e].className+" ").replace(" "+a+" "," ").trim()}b.className=(b.className+" "+a).trim()}}}}();


"undefined"===typeof MIDI&&(MIDI={});
"undefined"===typeof MIDI.UI&&(MIDI.UI={});
(function(b){b.enableConfigure=function(a){var b=document.getElementById("tools").parentNode.style;a?(Event.remove(window,"keydown",Piano.keyDown),Event.remove(window,"keyup",Piano.keyUp),b.display="block"):(Event.add(window,"keydown",Piano.keyDown),Event.add(window,"keyup",Piano.keyUp),b.display="none")};b.enableView=function(a){"postview"===Piano.visualize?(MIDI.UI.enableTheoryView(),a||Piano.func()):MIDI.UI.enableSongView()};b.enableTheoryView=function(){Piano.setAnimation();change.className("view-theory",
"selected");document.querySelector("#view-song").className="selected theorymode";var a=document.getElementById("playback");"none"!==a.style.display&&(a.style.display="none",a=document.getElementById("theory"),a.style.display="inline-block",a.loaded||(a.loaded=!0,b.drawKeySignatures(a),b.drawOctaves(a),b.drawChords(a),b.drawInversions(a),b.drawScales(a)),Piano.visualize="postview",localStorage.setItem("visualize",Piano.visualize),Piano.Animation.boot())};b.enableSongView=function(){Piano.clearNotes();
change.className("view-song","selected");document.querySelector("#view-song").className="selected songmode";var a=document.getElementById("playback");"inline-block"!==a.style.display&&(a.style.display="inline-block",document.getElementById("theory").style.display="none",Piano.visualize="preview",localStorage.setItem("visualize",Piano.visualize),Piano.Animation.boot())};b.drawKeySignatures=function(a){var b=MIDI.noteToKey[Piano.key+21].replace(/[^a-zA-Z]+/g,"");a.appendChild(e({arr:MusicTheory.key2number,
header:{Signature:null},id:"key",title:"Key Signature",callback:function(a){a=a.options[a.selectedIndex].value;Piano.key=MusicTheory.key2number[a];Piano.inversion=0;MusicTheory.getKeySignature(a);Piano.drawKeyboard();Piano.func()},selected:b}))};b.drawOctaves=function(a){for(var b={},c=0;7>c;c++)b[c+" "]=c;a.appendChild(e({arr:b,header:{Octave:null},id:"octave",callback:function(a){Piano.octave=parseInt(a.options[a.selectedIndex].value);Piano.inversion=0;Piano.clearNotes();Piano.func()},selected:Piano.octave,
title:"Octaves"}))};b.drawChords=function(a){a.appendChild(e({arr:MusicTheory.Chords,id:"chord",header:{Chords:null},callback:function(a){Piano.chord=a.options[a.selectedIndex].value;Piano.func=function(){Piano.clearNotes();Piano.chordOn()};Piano.func();Piano.inversion=0},selected:Piano.chord,title:"Chords"}))};b.drawScales=function(a){var b=0,c=[],g;for(g in MusicTheory.Scales)c[b++]=g;Piano.scale=c[Math.round(Math.random()*b)];a.appendChild(e({arr:MusicTheory.Scales,id:"scale",header:{Scales:null},
callback:function(a){Piano.scale=a.options[a.selectedIndex].value;Piano.func=Piano.playScale;Piano.clearNotes();Piano.func();Piano.inversion=0},selected:Piano.scale,title:"Scales"}))};b.drawInversions=function(a){var b=document.createElement("input");b.type="button";b.title="Inversion -1";b.value="-";b.onclick=function(){Piano.clearNotes();Piano.invert(-1)};a.appendChild(b);b=document.createElement("input");b.type="button";b.title="Inversion +1";b.value="+";b.onclick=function(){Piano.clearNotes();
Piano.invert(1)};a.appendChild(b)};b.togglePlayer=function(a){var b=document.getElementById("control-play"),c="boolean"!==typeof a;c||b.setAttribute("toggled",a);a=b.getAttribute("toggled");"true"===a?(b.setAttribute("toggled",!1),b.src="./media/pause.png",Piano.clearNotes(),c&&(Piano.resume(),Piano.setAnimation())):(b.setAttribute("toggled",!0),b.src="./media/play.png",c&&MIDI.Player.pause())};b.drawTimeWarp=function(){var b=document.createElement("div");b.style.cssText="display: inline-block;";
var c,e,g=document.createElement("input");g.style.cssText="display: inline-block; width: 190px; position: relative; top: 4px;";g.setAttribute("type","range");g.max=400;g.min=100;g.value=100*Piano.timeWarp;g.onmousedown=function(a){e=MIDI.Player.currentTime;c=MIDI.Player.endTime;Event.stop(a);MIDI.Player.playing&&MIDI.UI.togglePlayer()};g.onchange=function(a){var b=g.value/100;a=(b<Piano.timeWarp?"Increasing":"Decreasing")+" speed...";Piano.timeWarp=b;localStorage.setItem("timeWarp",b);loader.message(a);
window.setTimeout(function(){MIDI.Player.timeWarp=b;MIDI.Player.loadMidiFile();MIDI.Player.currentTime=Piano.Animation.scrollTop=e/c*MIDI.Player.endTime;MIDI.Player.renderScreen();loader.stop()},10);f.innerHTML=Math.round(1E4*(1.25-g.value/400))/100+"%"};b.appendChild(g);var f=document.createElement("span");f.style.cssText="display: inline-block; color: #333; width: 30px; padding-left: 10px";f.innerHTML=g.value+"%";b.appendChild(f);a("Playback Speed:",b)};b.drawSynesthesia=function(){var b=e({arr:MusicTheory.Synesthesia.data,
id:"rgb",callback:function(a){Piano.HSL=a.options[a.selectedIndex].value;localStorage.setItem("HSL",Piano.HSL);Piano.colorMap=MusicTheory.Synesthesia.map(Piano.HSL);Piano.drawKeyboard();MIDI.Player.renderScreen();MIDI.Player.playing||(Piano.clearNotes(),Piano.func(),Piano.inversion=0)},selected:Piano.HSL,title:"Synesthesia"});a("Synesthesia:",b,!0)};b.drawInstruments=function(){String(MIDI.getInstruments()).split("|").splice(0,128);var c={},k="",m;for(m in MIDI.instruments){var g=MIDI.instruments[m];
g.instrument&&(k!=g.category&&(k=g.category,c[k]=null),c[g.instrument]=m)}a("Instrument",e({arr:c,id:"voice",title:"Instruments",callback:function(a){Piano.clearNotes();b.instrument=a.options[a.selectedIndex].value;MIDI.Plugin&&MIDI.programChange(b.channel,c[b.instrument]);MIDI.Player.playing||Piano.func()},selected:b.instrument}))};b.drawChannels=function(){for(var d={},k=0;16>k;k++)d[k+" "]=k;k=document.createElement("div");k.style.cssText="display: inline-block;";k.appendChild(e({arr:d,header:{Channels:null},
id:"channel",callback:function(a){b.channel=parseInt(a.options[a.selectedIndex].value);a=MIDI.channels[b.channel];document.getElementById("mute").checked=a.mute?"checked":"";document.getElementById("voice").selectedIndex=a.instrument},selected:0,title:"Channels"}));k.appendChild(c({title:"Mute channel",id:"mute",checked:!1,value:"Mute channel",callback:function(){Piano.clearNotes();MIDI.channels[b.channel].mute=this.checked;MIDI.setMute(b.channel,this.checked)}}));a("Channels",k)};var a=function(a,
b,c){var e=document.getElementById("tools"),f=document.createElement("span");f.innerHTML=a;!1!==c&&e.appendChild(document.createElement("hr"));e.appendChild(f);e.appendChild(b)},c=function(a){a||(a={});var b=document.createElement("input");b.title=a.title;b.id=a.id;b.type="checkbox";b.value=a.value;b.checked=a.checked?a.checked:"";b.onmousedown=function(a){Event.stop(a)};b.onclick=a.callback;return b},e=function(a){var b=document.createElement("select");b.id=a.id;b.title=a.title;b.onmousedown=function(a){Event.stop(a)};
b.onchange=function(b){a.callback(this,b);this.blur()};if(a.header){var c=a.header,e;for(e in a.arr)c[e]=a.arr[e];a.arr=c}for(e in a.arr)null===a.arr[e]?(c=document.createElement("optgroup"),c.label="-"+e.toUpperCase()+"-"):(c=document.createElement("option"),a.selected==e&&(c.selected=!0),c.value=e,c.text=e),b.appendChild(c);return b}})(MIDI.UI);
