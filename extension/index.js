(()=>{"use strict";var e={700:(e,t,r)=>{var n=r(768),i=r(766),a=r(739),u=r(777),o=r(662);e.exports=function(e){i.initRunDataRepository(e),a.initSpreadsheet(e),u.initSurroundRunIndex(e),o.twitch(e),n.messageRouter(e)}},757:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.twitchUrlToName=t.timeStringToSeconds=t.googleSpreadsheetUrlToId=void 0;var n=r(835);t.googleSpreadsheetUrlToId=function(e){return new n.URL(e).pathname.split("/")[3]||""},t.timeStringToSeconds=function(e){var t=e.split(":");return 3600*parseInt(t[0])+60*parseInt(t[1])+parseInt(t[2])},t.twitchUrlToName=function(e){return new n.URL(e).pathname.split("/").pop()||null}},768:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,a){function u(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,o)}l((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function o(a){return function(o){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,n=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){u=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){u.label=a[1];break}if(6===a[0]&&u.label<i[1]){u.label=i[1],i=a;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(a);break}i[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(e){a=[6,e],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,o])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.messageRouter=void 0;var a=r(766),u=r(739),o=r(662),l=r(231),s=r(757),c=r(777);t.messageRouter=function(e){var t=new e.Logger("router");e.listenFor("spreadsheet.sheets",(function(e,r){var a=e.spreadsheetUri;return n(void 0,void 0,void 0,(function(){var e,n;return i(this,(function(i){switch(i.label){case 0:if(r&&r.handled)return[2];i.label=1;case 1:return i.trys.push([1,3,,4]),[4,u.spreadsheet.readSheetTitles(a)];case 2:return e=i.sent(),r&&r(null,e),[3,4];case 3:return n=i.sent(),t.error("Failed to read spreadsheet names."),t.error(n),r&&r(n),[3,4];case 4:return[2]}}))}))})),e.listenFor("channels.import",(function(e,r){var c=e.spreadsheetUri,d=e.sheetName;return n(void 0,void 0,void 0,(function(){var e,n,f,p,h;return i(this,(function(i){switch(i.label){case 0:if(r&&r.handled)return[2];i.label=1;case 1:return i.trys.push([1,4,,5]),[4,u.spreadsheet.readSpreadsheet(c,d)];case 2:return e=i.sent(),t.debug("Import data:"),t.debug(e),n=e.map((function(e){return s.twitchUrlToName(e.twitch)})).filter((function(e){return null!==e})),t.debug("Load twitch data with "+JSON.stringify(n)),[4,o.getTwitchDataByNames(n)];case 3:return f=i.sent(),p=e.map((function(e){var t=l.v4(),r=s.twitchUrlToName(e.twitch);return{uuid:t,game:e.game,category:e.category,estimate:e.estimate,estimateInSeconds:s.timeStringToSeconds(e.estimate),player:{name:e.player,twitch:f.find((function(e){return e.login===r}))}}})),a.runDataRepository.setRunData(p),[3,5];case 4:return h=i.sent(),t.error("[channels.import]"),t.error(h),[3,5];case 5:return[2]}}))}))})),e.listenFor("current.update",(function(e,r){var n=e.newCurrent;if(!r||!r.handled)try{c.surroundRunIndex.updateCurrentTo(n,a.runDataRepository.all())}catch(e){t.error("[current.update]"),t.error(e),r&&r(e)}}))}},766:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.runDataRepository=t.initRunDataRepository=void 0;var i,a=n(r(593));t.initRunDataRepository=function(e){(i=e).Replicant("runArray",{defaultValue:[]})},t.runDataRepository={find:function(e){var t=i.Replicant("runArray");return Array.isArray(t.value)&&t.value.find((function(t){return t.uuid===e}))||null},all:function(){var e=i.Replicant("runArray");return Array.isArray(e.value)?a.default(e.value):[]},addRunData:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=i.Replicant("runArray");if(Array.isArray(r.value)){var n=a.default(r.value);r.value=n.map((function(t){return e.find((function(e){return e.uuid===t.uuid}))||t}))}},setRunData:function(e){var t=i.Replicant("runArray");Array.isArray(t.value)&&(t.value=e)}}},739:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,a){function u(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,o)}l((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function o(a){return function(o){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,n=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){u=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){u.label=a[1];break}if(6===a[0]&&u.label<i[1]){u.label=i[1],i=a;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(a);break}i[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(e){a=[6,e],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,o])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.spreadsheet=t.initSpreadsheet=void 0;var a,u,o=r(757),l=r(944);t.initSpreadsheet=function(e){a=new e.Logger("spreadsheet");var t=e.bundleConfig.googleApiKey;t||a.warn("Google API Key is undefined."),u=l.google.sheets({version:"v4",auth:t})},t.spreadsheet={readSheetTitles:function(e){return n(void 0,void 0,void 0,(function(){var t,r,n;return i(this,(function(i){switch(i.label){case 0:if(""===(t=o.googleSpreadsheetUrlToId(e)))throw new Error("Spreadsheet URL is invalid.");return[4,u.spreadsheets.get({spreadsheetId:t})];case 1:return r=i.sent(),[2,(null===(n=r.data.sheets)||void 0===n?void 0:n.map((function(e){return e.properties&&e.properties.title||""})).filter((function(e){return""!==e})))||[]]}}))}))},readSpreadsheet:function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,a,l;return i(this,(function(i){switch(i.label){case 0:if(""===(r=o.googleSpreadsheetUrlToId(e)))throw new Error("Spreadsheet URL is invalid.");return[4,u.spreadsheets.values.get({spreadsheetId:r,range:t})];case 1:return(n=i.sent()).data.values?(a=n.data.values,l=a[0],[2,a.slice(1).map((function(e){return Object.fromEntries(l.map((function(t,r){return[t,e[r]]})))}))]):[2,[]]}}))}))}}},777:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.surroundRunIndex=t.initSurroundRunIndex=void 0,t.initSurroundRunIndex=function(e){(r=e).Replicant("surroundRunIndex",{defaultValue:{prev:null,current:null,next:null}});var n=r.Replicant("runArray");n.value&&t.surroundRunIndex.initializeRunData(n.value)},t.surroundRunIndex={initializeRunData:function(e){var t,n,i,a,u=r.Replicant("surroundRunIndex");if(u.value){var o=u.value.current;if(o){var l=e.findIndex((function(e){return e.uuid===o}));u.value={prev:(null===(i=e[l-1])||void 0===i?void 0:i.uuid)||null,current:o,next:(null===(a=e[l+1])||void 0===a?void 0:a.uuid)||null}}else u.value={prev:null,current:(null===(t=e[0])||void 0===t?void 0:t.uuid)||null,next:(null===(n=e[1])||void 0===n?void 0:n.uuid)||null}}},updateCurrentTo:function(e,t){var n,i,a=r.Replicant("surroundRunIndex");if(a.value){var u=t.findIndex((function(t){return t.uuid===e}));if(u<0)throw new Error("Received run uuid is not found.");a.value={prev:(null===(n=t[u-1])||void 0===n?void 0:n.uuid)||null,current:e,next:(null===(i=t[u+1])||void 0===i?void 0:i.uuid)||null}}}}},662:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,a){function u(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,o)}l((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function o(a){return function(o){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,n=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!((i=(i=u.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){u=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){u.label=a[1];break}if(6===a[0]&&u.label<i[1]){u.label=i[1],i=a;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(a);break}i[2]&&u.ops.pop(),u.trys.pop();continue}a=t.call(e,u)}catch(e){a=[6,e],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,o])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getTwitchDataByNames=t.twitch=void 0;var u,o=a(r(376)),l=r(952),s=["user:read:email"];t.twitch=function(e){return n(void 0,void 0,void 0,(function(){var t,r,a,c,d,f,p,h;return i(this,(function(v){switch(v.label){case 0:if(t=new e.Logger("Twitch"),r=e.Replicant("twitchTokens",{defaultValue:null}),!(a=e.bundleConfig.twitch).key||!a.secret)return t.warn("Twitch config is invalid."),t.warn("You cannot call twitch api and receive channel info."),[2];if(c=function(e,r,a){return n(void 0,void 0,void 0,(function(){var n,u,l;return i(this,(function(i){switch(i.label){case 0:n=new URLSearchParams({client_id:e,client_secret:r,grant_type:"client_credentials",scope:a.join(" ")}),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,o.default.post("https://id.twitch.tv/oauth2/token?"+n.toString())];case 2:return[2,{accessToken:(u=i.sent()).data.access_token,expiryTimestamp:Date.now()+1e3*parseInt(u.data.expires_in)}];case 3:throw l=i.sent(),t.error("Failed to get access token from Twitch."),l;case 4:return[2]}}))}))},r.value)return[3,4];v.label=1;case 1:return v.trys.push([1,3,,4]),[4,c(a.key,a.secret,s)];case 2:return d=v.sent(),t.debug(JSON.stringify(d)),r.value=d,[3,4];case 3:return f=v.sent(),t.error("Failed to get access token from Twitch."),t.error(f),[3,4];case 4:return(p=r.value)?(h=new l.StaticAuthProvider(a.key,p.accessToken),u=new l.ApiClient({authProvider:h}),[2]):[2]}}))}))},t.getTwitchDataByNames=function(e){return n(void 0,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,u.helix.users.getUsersByNames(e)];case 1:return[2,t.sent().map((function(e){return{id:e.id,login:e.name,displayName:e.displayName,profileImageUrl:e.profilePictureUrl}}))]}}))}))}},376:e=>{e.exports=require("axios")},944:e=>{e.exports=require("googleapis")},593:e=>{e.exports=require("lodash.clone")},952:e=>{e.exports=require("twitch")},835:e=>{e.exports=require("url")},231:e=>{e.exports=require("uuid")}},t={},r=function r(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(700);module.exports=r})();