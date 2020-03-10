(this["webpackJsonpdemo-airquality-map"]=this["webpackJsonpdemo-airquality-map"]||[]).push([[0],{109:function(e,t,a){e.exports=a(145)},139:function(e,t,a){},144:function(e,t,a){},145:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(7),i=a.n(r),s=a(88),c=(a(114),a(200)),l=a(201),d=a(99),u=Object(d.a)({overrides:{},palette:{primary:{light:"#58a5f0",main:"#0277bd",dark:"#004c8c",contrastText:"#ffffff",text:"#ffffff"},secondary:{light:"#efdcd5",main:"#bcaaa4",dark:"#8c7b75",contrastText:"#000000",text:"#000000"}},typography:{fontSize:12,useNextVariants:!0}}),p=a(44),m=a.n(p),h=a(68),f=a(15),b=a(11),g=a(16),v=a(17),y=a(20),k=a(196),E=a(197),w=a(198),C=a(199),S=a(69),x=a.n(S),j=a(3),O=a(4),N=a(40),F=a.n(N);function z(e){var t=e.split("/");return{sensorId:t[t.length-1],deviceId:t[t.length-3],networkId:t[t.length-5]}}var I="data-layer-points-1",M=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).handleMouseClick=function(e){e.features.length>0&&a.props.onClick&&(a.handleMouseLeave(),a.props.onClick(e.features[0]))},a.handleMouseMove=function(e){a.props.map.getCanvas().style.cursor="pointer",e.features.length>0&&a.setState({selected:e.features[0]},a.renderPopup)},a.handleMouseLeave=function(){a.props.map.getCanvas().style.cursor="",a.setState({selected:void 0},a.renderPopup)},a.renderPopup=function(){var e=a.state,t=e.popup,n=e.selected,o=a.props.map;if(t&&t.remove(),void 0!==n){var r=n.geometry,i=n.properties,s=z(i.href),c=s.sensorId,l=s.deviceId,d=s.networkId,u="".concat(d," / ").concat(l," / ").concat(c),p=new F.a.Popup({className:"pb-map-popup",closeButton:!1}).setLngLat(r.coordinates).setHTML('<div class="popup-content">'+'<span class="title">'.concat(u,"</span>")+'<span class="value">Days over 50\xb5g/m\xb3: <span>'.concat(i.over50,"</span></span>")+"</div>").addTo(o);a.setState({popup:p})}else a.setState({popup:void 0})},a.state={popup:void 0,selected:void 0},a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.data,a=e.map;a.addSource("data-source-1",{type:"geojson",data:t}),a.addLayer({id:I,source:"data-source-1",type:"circle",paint:{"circle-radius":{base:1.75,stops:[[3,3],[5,4],[8,6],[16,10],[22,180]]},"circle-color":["step",["get","over50"],"#2167fe",7,"#2d9dfe",14,"#66affe",21,"#99c6fc",28,"#b4e5fe",35,"#fdfdbe",42,"#fefe00",49,"#feaa00",56,"#fd0000",63,"#a80000",70,"#a900e6"],"circle-opacity":.85}}),a.on("mousemove",I,this.handleMouseMove),a.on("mouseleave",I,this.handleMouseLeave),a.on("click",I,this.handleMouseClick)}},{key:"componentWillUnmount",value:function(){var e=this.props.map;e.off("mousemove",I,this.handleMouseMove),e.off("mouseleave",I,this.handleMouseLeave),e.off("click",I,this.handleMouseClick)}},{key:"componentDidUpdate",value:function(){this.props.map.getSource("data-source-1").setData(this.props.data)}},{key:"render",value:function(){return o.a.createElement("div",{style:{display:"none"}})}}]),t}(n.Component);M.defaultProps={data:{type:"FeatureCollection",features:[]},onClick:function(){}};var B=M,L=(a(132),function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={map:void 0,refMap:o.a.createRef()},a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.refMap,a=this.props,n=a.mapboxStyle,o=a.mapboxToken,r=a.viewport;F.a.accessToken=o;var i=new F.a.Map({bearing:r.bearing,center:[r.longitude,r.latitude],container:t.current,pitch:r.pitch,style:n,zoom:r.zoom});i.dragRotate.disable(),i.touchZoomRotate.disableRotation(),i.addControl(new F.a.NavigationControl({showCompass:!1})),i.on("load",(function(){e.setState({map:i}),e.props.onLoad&&e.props.onLoad(i)}))}},{key:"componentDidUpdate",value:function(e,t,a){var n=this.state.map,o=this.props,r=o.width,i=o.height;void 0===n||r===e.width&&i===e.height||n.resize()}},{key:"componentWillUnmount",value:function(){var e=this.state.map;void 0!==e&&e.remove()}},{key:"render",value:function(){var e=this.state.refMap,t=this.props,a=t.children,n=t.height,r=t.width;return o.a.createElement("div",{ref:e,style:{width:"".concat(r,"px"),height:"".concat(n,"px")}},a)}}]),t}(n.Component));L.defaultProps={reducedStyle:!1,disableInteractions:!1};var A=a(203),W=a(146),D=a(53),P=a.n(D),R=function(e){function t(){return Object(f.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.className,n=e.feature,r=e.year,i=n.geometry,s=n.properties,c=z(s.href),l=c.sensorId,d=c.deviceId,u=c.networkId,p="".concat(u," / ").concat(d," / ").concat(l),m=i.coordinates,h=0===r.length?"2020":r,f="https://opensensorweb.de/#/search?c=".concat(m[0],",").concat(m[1])+"&sid=".concat(u,".").concat(d,".").concat(l,",")+"&te=".concat(h,"-01-01,").concat(h,"-12-31&tz=B&z=15&v=sidebar");return o.a.createElement(A.a,{className:a,"aria-labelledby":"feature-popup","aria-describedby":"Popup of the selected feature",open:!0,onClose:this.props.onClose},o.a.createElement("div",{className:Object(j.a)(t.root,"content-container")},o.a.createElement("div",{className:"popup-content"},o.a.createElement("span",{className:"title"},p),o.a.createElement("span",{className:"value"},"Days over 50\xb5g/m\xb3: ",o.a.createElement("span",null,s.over50)),o.a.createElement("p",{className:"link"},"See full timeseries at ",o.a.createElement("a",{href:f,target:"_blank",rel:"noopener noreferrer"},"OpenSensorWeb"),".")),o.a.createElement(W.a,{"aria-label":"delete",className:t.closeButton,onClick:this.props.onClose},o.a.createElement(P.a,null))))}}]),t}(n.Component);R.defaultProps={className:"",onClose:function(){},year:""};var U=Object(O.a)((function(e){return{root:{backgroundColor:e.palette.background.paper,padding:e.spacing(2,4,3)},closeButton:{margin:e.spacing(1),position:"absolute",top:0,right:0}}}))(R),T=a(19),H=a(204),Y=a(185),q=a(186),G=a(187),_=a(188),V=a(189),J=a(190),Z=a(191),Q=a(151),K=a(206),X=a(91),$=a.n(X),ee=a(90),te=a.n(ee),ae=a(92),ne=a(65),oe=Object(O.a)((function(e){return{root:{"label + &":{marginTop:e.spacing(3)}},input:{borderRadius:4,position:"relative",backgroundColor:e.palette.background.paper,border:"1px solid #ced4da",fontSize:16,padding:"10px 26px 10px 12px",transition:e.transitions.create(["border-color","box-shadow"]),fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:focus":{borderRadius:4,borderColor:"#80bdff",boxShadow:"0 0 0 0.2rem rgba(0,123,255,.25)"}}}}))(Q.a),re=[{label:"0-7 days",color:"#2167fe"},{label:"> 14 days",color:"#66affe"},{label:"> 21 days",color:"#99c6fc"},{label:"> 28 days",color:"#b4e5fe"},{label:"> 35 days",color:"#fdfdbe"},{label:"> 42 days",color:"#fefe00"},{label:"> 49 days",color:"#feaa00"},{label:"> 56 days",color:"#fd0000"},{label:"> 63 days",color:"#a80000"},{label:"> 70 days",color:"#a900e6"}];var ie=function(e){function t(e){var a;return Object(f.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).handleChange=function(e){a.props.onChange(e.target.value)},a.handleExpansion=function(e,t){a.setState({showInfo:t})},a.state={showInfo:!0},a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.state.showInfo,t=this.props,a=t.className,n=t.classes,r=t.currentYear,i=t.featureCount,s=t.metadata;return o.a.createElement("div",{className:Object(j.a)(n.root,"pb-map-legend",a)},o.a.createElement(H.a,{className:n.header,expanded:e,onChange:this.handleExpansion},o.a.createElement(Y.a,{expandIcon:e?o.a.createElement(te.a,null):o.a.createElement($.a,null),"aria-controls":"info",id:"info-header"},o.a.createElement(ne.a,{className:n.heading,component:"h6",variant:"h6"},"Found ",i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")," sensors.")),o.a.createElement(q.a,null,o.a.createElement(ne.a,null,"Number of exceedances of the particulate matter PM10 daily mean value of 50 \xb5g/m3 in ",r,"."))),o.a.createElement(G.a,{className:n.formControl},o.a.createElement(K.a,{id:"customized-select"},"Evaluation year"),o.a.createElement(ae.a,{id:"customized-select",value:r,onChange:this.handleChange,input:o.a.createElement(oe,null)},[{year:"",path:void 0}].concat(Object(T.a)(s.slices)).map((function(e,t){return o.a.createElement("option",{key:t,value:e.year},e.year)})))),o.a.createElement(ne.a,{component:"p",variant:"body1"},"Legende:"),o.a.createElement(_.a,{className:n.containerList},re.map((function(e,t){return o.a.createElement(V.a,{key:t},o.a.createElement(J.a,null,o.a.createElement("div",{className:n.icon,style:{backgroundColor:e.color}})),o.a.createElement(Z.a,{primary:e.label}))}))),o.a.createElement(ne.a,{component:"p",variant:"body1"},"Data is based on ",o.a.createElement("a",{href:"https://opensensorweb.de",target:"_blank",rel:"noopener noreferrer"},"OpenSensorWeb"),". Last update on ",s.lastUpdate,"."))}}]),t}(n.Component);ie.defaultProps={className:"",currentYear:"",featureCount:0,metadata:{lastUpdate:"2020-03-01",slices:[]},onChange:function(){}};var se=Object(O.a)((function(e){return{root:{zIndex:1020,position:"absolute",left:10,top:100,width:300,backgroundColor:"#FFFFFF",boxShadow:"0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",padding:e.spacing(1),"& > p":{fontSize:12,color:"rgba(0,0,0,0.6)"}},containerList:{},icon:{width:16,height:16},formControl:{margin:e.spacing(0,0,2,0),width:300-e.spacing(2),cursor:"pointer"},header:{marginBottom:e.spacing(2),border:"none",boxShadow:"none","& .MuiExpansionPanelSummary-root":{padding:0},"& .MuiExpansionPanelDetails-root":{padding:e.spacing(1,0,1,0)}},heading:{fontWeight:e.typography.fontWeightRegular}}}))(ie),ce=a(39),le=a(192),de=a(202),ue=Object(le.a)((function(e){return{root:{zIndex:1020,position:"absolute",top:10,right:50,width:300,"& > p":{fontSize:12,color:"rgba(0,0,0,0.6)"}},formControl:{backgroundColor:"#FFFFFF",minWidth:120},selectEmpty:{marginTop:e.spacing(2)}}}));function pe(e){var t=e.className,a=e.networks,n=e.selectedNetwork,r=ue(),i=o.a.useRef(null),s=o.a.useState(0),c=Object(ce.a)(s,2),l=c[0],d=c[1];return o.a.useEffect((function(){d(i.current.offsetWidth)}),[]),o.a.createElement("div",{className:Object(j.a)(r.root,"pb-select-networks",t)},o.a.createElement(G.a,{variant:"outlined",className:r.formControl},o.a.createElement(K.a,{ref:i,htmlFor:"select-network"},"Network"),o.a.createElement(de.a,{native:!0,value:n,onChange:function(t){e.onChange(t.target.value)},labelWidth:l},a.map((function(e,t){return o.a.createElement("option",{key:t,value:e.value},e.label)})))))}pe.defaultProps={className:"",networks:[],onChange:function(){},selectedNetwork:""};var me=pe,he=a(2),fe=a(93),be=a.n(fe),ge=a(95),ve=a.n(ge),ye=a(96),ke=a.n(ye),Ee=a(64),we=a(194),Ce=a(205),Se=a(195),xe=a(94),je=a.n(xe),Oe={success:be.a,warning:je.a,error:ve.a,info:ke.a},Ne=Object(le.a)((function(e){return{success:{backgroundColor:Ee.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:we.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"},margin:{margin:e.spacing(1)}}}));function Fe(e){var t=Ne(),a=e.className,n=e.message,r=e.onClose,i=e.variant,s=Object(he.a)(e,["className","message","onClose","variant"]),c=Oe[i];return o.a.createElement(Ce.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:!0,autoHideDuration:6e3,onClose:r},o.a.createElement(Se.a,Object.assign({className:Object(j.a)(t[i],a),"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:t.message},o.a.createElement(c,{className:Object(j.a)(t.icon,t.iconVariant)}),n),action:[o.a.createElement(W.a,{key:"close","aria-label":"close",color:"inherit",onClick:r},o.a.createElement(P.a,{className:t.icon}))]},s)))}var ze=a(97),Ie=a.n(ze),Me=(a(139),function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(g.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(o)))).state={width:0,height:0,currentYear:"",metadata:void 0,networks:[{label:"All",value:"All"},{label:"Airly",value:"AIRLY"},{label:"European Environment Agency (EEA)",value:"EEA-air"},{label:"German Environment Agency (UBA)",value:"UBA_LUFT"},{label:"Luftdaten.info",value:"luftdaten-info"},{label:"OpenAQ",value:"OPEN_AQ"},{label:"United States Environmental Protection Agency (EPA)",value:"EPA-AIR"}],networkSelected:"All",data:void 0,map:void 0,feedback:void 0,featuresWithinBounds:0,featureSelected:void 0},a.fetchInitialData=Object(h.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get("data/metadata.json");case 3:200===(t=e.sent).status&&a.setState({metadata:t.data},(function(){var e=a.state.metadata;if(e.slices.length>0){var t=e.slices[e.slices.length-2];a.setState({currentYear:t.year}),a.fetchSelectData(t.path)}})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),a.setState({feedback:{message:e.t0.message,variant:"error"}});case 10:case"end":return e.stop()}}),e,null,[[0,7]])}))),a.fetchSelectData=function(){var e=Object(h.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.get(t);case 3:200===(n=e.sent).status&&a.setState({data:n.data},(function(){var e=a.state.map;void 0!==e&&a.updateFeaturesWithinBounds(e.getBounds())})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),a.setState({feedback:{message:e.t0.message,variant:"error"}});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),a.handleChangeData=function(e){var t=a.state.metadata;a.setState({currentYear:e},(function(){if(void 0!==t){var n=t.slices.find((function(t){return t.year===e}));void 0===n?a.setState({data:void 0}):a.fetchSelectData(n.path)}}))},a.handleCloseFeedback=function(){a.setState({feedback:void 0})},a.handleCloseFeaturePopup=function(){a.setState({featureSelected:void 0})},a.handleFeatureClick=function(e){a.setState({featureSelected:e})},a.handleMapLoad=function(e){void 0===a.state.map&&(e.on("moveend",(function(e){a.updateFeaturesWithinBounds(e.target.getBounds())})),a.updateFeaturesWithinBounds(e.getBounds()),a.setState({map:e}))},a.handleChangeNetwork=function(e){var t=a.state.map;if(void 0!==t){a.setState({networkSelected:e});var n=t.getBounds();"All"===e?(t.setFilter(I,null),a.updateFeaturesWithinBounds(n)):(t.setFilter(I,["in","network",e]),a.updateFeaturesWithinBounds(n,e))}},a.handleResize=function(){a.setState({width:window.innerWidth,height:window.innerHeight-40})},a.updateFeaturesWithinBounds=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=a.state.data;if(void 0!==n){var o=n.features.reduce((function(a,n){return a+(!e.contains(n.geometry.coordinates)||void 0!==t&&t!==n.properties.network?0:1)}),0);a.setState({featuresWithinBounds:o})}},a}return Object(y.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handleResize),this.handleResize(),this.fetchInitialData()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize)}},{key:"render",value:function(){var e=this.state,t=e.currentYear,a=e.height,n=e.width,r=e.map,i=e.metadata,s=e.networks,c=e.networkSelected,l=e.data,d=e.feedback,u=e.featuresWithinBounds,p=e.featureSelected,m=this.props.classes;return o.a.createElement("div",{className:Object(j.a)(m.root,"pb-airquality-map")},o.a.createElement("main",{className:Object(j.a)(m.content)},o.a.createElement("div",{className:m.containerLogo},o.a.createElement("img",{src:Ie.a,alt:""})),o.a.createElement("div",{className:m.containerMap},n>0&&a>0&&o.a.createElement(L,{height:a,mapboxStyle:"mapbox://styles/pikobytes/cjhkafemq0e6j2rr3jq4gg1by",mapboxToken:"pk.eyJ1IjoicGlrb2J5dGVzIiwiYSI6ImNrN2Fmam9razB6dGUzZ3M0ZWs4M2dxNnAifQ.euPoZAHChTNu2WpMyWcOpg",onLoad:this.handleMapLoad,viewport:{bearing:0,latitude:51.415,longitude:0,zoom:2,pitch:0},width:n},void 0!==r&&o.a.createElement(B,{data:l,map:r,onClick:this.handleFeatureClick}))),void 0!==d&&o.a.createElement(Fe,{className:"pb-snackbar-feedback",message:d.message,onClose:this.handleCloseFeedback,variant:d.variant}),o.a.createElement(se,{currentYear:t,featureCount:u,metadata:i,onChange:this.handleChangeData}),o.a.createElement(k.a,{url:"https://pikobytes.github.io/demo-airquality-map/",title:"Share on Facebook",className:"pb-share-button facebook"},o.a.createElement(E.a,{size:40,round:!0})),o.a.createElement(w.a,{url:"/demo-airquality-map",title:"Share on Twitter",className:"pb-share-button twitter"},o.a.createElement(C.a,{size:40,round:!0})),o.a.createElement(me,{networks:s,onChange:this.handleChangeNetwork,selectedNetwork:c}),void 0!==p&&o.a.createElement(U,{className:"pb-feature-popup",feature:p,onClose:this.handleCloseFeaturePopup,year:t})),o.a.createElement("div",{className:m.footer},o.a.createElement("div",null,o.a.createElement("a",{href:"https://www.opensensorweb.de/#/impressum",target:"_blank",rel:"noopener noreferrer"},"Impressum"),o.a.createElement("a",{href:"https://www.opensensorweb.de/#/privacy",target:"_blank",rel:"noopener noreferrer"},"Datenschutz"))))}}]),t}(n.Component)),Be=Object(O.a)((function(e){return{containerMap:{width:"100%",height:"100%",display:"block"},containerLogo:{position:"absolute",top:10,left:10,zIndex:1020,"& img":{width:250}},content:{flexGrow:1,marginBottom:40},root:{height:"100%",width:"100%",display:"flex"},footer:{position:"absolute",left:0,right:0,bottom:0,height:40,background:"#F5F5F5","& div":{marginTop:e.spacing(1.5),textAlign:"center"},"& a":{height:16,width:64,color:"rgba(0,0,0,0.6)",fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',fontSize:14,letterSpacing:.4,lineHeight:"18px",textAlign:"center",textDecoration:"none"},"& a:hover":{color:"rgba(0,0,0,0.6)",textDecoration:"none"},"& a:first-child":{paddingRight:e.spacing(3)}}}}))(Me),Le=(a(144),"ie"===Object(s.detect)().name);if(Le){var Ae=document.getElementById("root"),We=Le?"<h2>Fehlende Browser Unterst\xfczung</h2><div>Die Anwendung unterst\xfctzt keinen Internet Explorer. Bitte wechseln Sie zu einem neueren Browser wie Chrome, Firefox, Edge, Opera oder Safari. ":"<h2>Fehlende WebGL Unterst\xfczung</h2><div>Ihr Browser unterst\xfctzt kein WebGL. Bitte wechseln Sie zu einer neueren Browser-Version von Chrome, Firefox, Edge, Opera oder Safari. ",De=document.createElement("h1");De.innerHTML='<div class="missing-browser-support">'.concat(We).concat('Haben Sie anschlie\xdfend immer noch Probleme wenden Sie sich bitte an <a href="mailto:info@pikobytes.de" title="Contact Email">info@pikobytes.de</a>.',"</div></div>"),Ae.innerHTML="",Ae.appendChild(De)}else i.a.render(o.a.createElement(c.a,{theme:u},o.a.createElement(l.a,null),o.a.createElement(Be,null)),document.getElementById("root"))},97:function(e,t,a){e.exports=a.p+"static/media/pikobytes-logo-white.ffde0018.png"}},[[109,1,2]]]);
//# sourceMappingURL=main.89b2a8b4.chunk.js.map