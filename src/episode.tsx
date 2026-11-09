import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig,interpolate,spring,Audio,staticFile} from 'remotion';

/** STIK 2.0: independently animated character rig; all motion is frame-deterministic. */
const Y='#ffd238',INK='#121320',SKIN='#ffca9e',HAIR='#6a3527',CYAN='#58eaff';
const script=[
'Привет! Я Стик. И сегодня покажу, как работает интернет!',
'Сайты, игры и приложения — всё начинается с простых команд.',
'Представь: сайт — это твой собственный дом в интернете.',
'А HTML — как каркас, из которого он построен.',
'Напишем пару строк — и вот, страница уже оживает!',
'Хочешь создать свой сайт? Подписывайся! Сложно? Сейчас упростим!'
];
const headlines=['ПРИВЕТ! Я СТИК!','ТЕХНОЛОГИИ ПРОЩЕ, ЧЕМ КАЖЕТСЯ','ЧТО ТАКОЕ САЙТ?','СЕКРЕТ: HTML','СОЗДАЙ САМ!','ПОДПИСЫВАЙСЯ!'];
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
const wave=(f:number,s=1)=>Math.sin(f*s);
const Intro:React.FC<{f:number;scene:number}>=({f,scene})=>{
 const spin=interpolate(f,[0,25],[.6,1],{extrapolateRight:'clamp'});
 return <g>
 <rect x="55" y="100" width="970" height="155" rx="36" fill="#101323" stroke={Y} strokeWidth="4" opacity=".9"/>
 <text x="540" y="199" textAnchor="middle" fill={Y} fontSize={scene===1?44:55} fontFamily="Arial" fontWeight="900" transform={`translate(540 170) scale(${spin}) translate(-540 -170)`}>{headlines[scene]}</text>
 </g>;
};
const Character:React.FC<{f:number;scene:number;cx?:number;cy?:number;scale?:number}>=({f,scene,cx=540,cy=1020,scale=1})=>{
 const bob=wave(f,.13)*8, nod=wave(f,.11)*3, blink=f%103>98, talk=Math.abs(wave(f,.41));
 const armL=scene===4?-42+wave(f,.14)*15:scene===0?-22+wave(f,.18)*24:wave(f,.1)*11;
 const armR=scene===5?-56+wave(f,.18)*17:scene===2?-50+wave(f,.12)*15:wave(f,.14)*13;
 const lean=scene===4?wave(f,.06)*3:wave(f,.07)*1.8;
 return <g transform={`translate(${cx} ${cy+bob}) scale(${scale}) rotate(${lean})`}>
 <ellipse cy="392" rx="190" ry="25" fill="#000" opacity=".27"/>
 <g stroke={INK} strokeLinecap="round" strokeLinejoin="round">
 <path d="M-65 150 L-90 337 M65 150 L92 337" strokeWidth="31"/>
 <path d="M-113 342 Q-72 315 -22 340 M68 342 Q122 315 178 340" stroke="#f9f9ff" strokeWidth="38"/>
 <path d="M-113 350 H-22 M68 350 H178" strokeWidth="9"/>
 </g>
 <path d="M-105 -87 Q0 -132 109 -87 L122 171 Q0 202 -122 171 Z" fill="#17141d" stroke="#39303b" strokeWidth="8"/>
 <path d="M-65 -84 Q-130 -55 -130 54 M65 -84 Q130 -55 130 54" fill="none" stroke="#29242e" strokeWidth="8"/>
 <g transform={`translate(-99 -76) rotate(${armL})`}><path d="M0 0 Q-72 17 -83 126" fill="none" stroke="#17141d" strokeWidth="42" strokeLinecap="round"/><circle cx="-83" cy="126" r="26" fill={SKIN}/></g>
 <g transform={`translate(99 -76) rotate(${armR})`}><path d="M0 0 Q74 20 90 126" fill="none" stroke="#17141d" strokeWidth="42" strokeLinecap="round"/><circle cx="90" cy="126" r="26" fill={SKIN}/></g>
 <path d="M-35 -85 L-31 42 M35 -85 L31 42" stroke={Y} strokeWidth="11" strokeLinecap="round"/>
 <circle cx="-31" cy="46" r="10" fill={Y}/><circle cx="31" cy="46" r="10" fill={Y}/>
 <text x="0" y="120" textAnchor="middle" fill="white" fontSize="81" fontFamily="monospace" fontWeight="bold">{'</>'}</text>
 <g transform={`translate(0 ${-225+nod})`}>
 <path d="M-111 -40 Q-125 -162 -5 -167 Q123 -173 115 -37 L101 40 Q70 125 0 123 Q-75 124 -103 36 Z" fill={SKIN} stroke={INK} strokeWidth="7"/>
 <path d="M-109 -70 Q-108 -168 -5 -174 Q120 -172 117 -68 L86 -112 L55 -90 L24 -126 L-9 -91 L-38 -118 L-72 -83 Z" fill={HAIR}/>
 <path d="M-110 -118 Q-80 -202 14 -197 Q94 -196 115 -133 L110 -114 Q0 -143 -110 -118Z" fill={Y} stroke={INK} strokeWidth="7"/>
 <path d="M89 -152 Q155 -150 171 -133 Q150 -112 100 -116" fill={Y} stroke={INK} strokeWidth="7"/>
 <path d="M-112 -58 Q-152 -10 -116 65 M112 -58 Q152 -10 116 65" fill="none" stroke={INK} strokeWidth="27"/>
 <rect x="-149" y="-40" width="41" height="90" rx="17" fill="#20202a" stroke={Y} strokeWidth="5"/>
 <rect x="108" y="-40" width="41" height="90" rx="17" fill="#20202a" stroke={Y} strokeWidth="5"/>
 <text x="-128" y="16" textAnchor="middle" fontSize="22" fill={Y}>{'</>'}</text>
 <text x="128" y="16" textAnchor="middle" fontSize="22" fill={Y}>{'</>'}</text>
 <path d="M-82 -49 Q-52 -63 -24 -48 M25 -48 Q53 -63 84 -48" fill="none" stroke={HAIR} strokeWidth="11" strokeLinecap="round"/>
 <ellipse cx="-50" cy="-7" rx="27" ry={blink?2:37} fill="white" stroke={INK} strokeWidth="5"/>
 <ellipse cx="52" cy="-7" rx="27" ry={blink?2:37} fill="white" stroke={INK} strokeWidth="5"/>
 {!blink&&<><ellipse cx="-45" cy="0" rx="14" ry="24" fill="#6b3d24"/><ellipse cx="57" cy="0" rx="14" ry="24" fill="#6b3d24"/><circle cx="-49" cy="-9" r="6" fill="white"/><circle cx="53" cy="-9" r="6" fill="white"/></>}
 {[-77,-64,-54,54,67,79].map((x,i)=><circle key={i} cx={x} cy={43+(i%2)*7} r="3" fill="#cb846b"/>)}
 <path d={talk>.55?'M-35 69 Q0 119 36 69 Q0 84 -35 69':'M-36 71 Q0 96 36 71'} fill={talk>.55?'#9a4352':'none'} stroke={INK} strokeWidth="6" strokeLinecap="round"/>
 </g></g>;
};
const Extras:React.FC<{f:number;scene:number}>=({f,scene})=>{
 const pulse=1+wave(f,.16)*.07;const rise=clamp(f/26);
 if(scene===0)return <g><text x="540" y="420" textAnchor="middle" fill={CYAN} fontSize="57">СЛОЖНО? СЕЙЧАС УПРОСТИМ!</text>{[0,1,2,3].map(i=><circle key={i} cx={170+i*240} cy={520+wave(f+i*12,.12)*22} r="13" fill={Y}/>)}</g>;
 if(scene===1)return <g>{['</>','🎮','WWW'].map((v,i)=><g key={i} transform={`translate(${130+i*290} ${470+wave(f+i*12,.1)*24}) scale(${pulse})`}><rect width="235" height="145" rx="28" fill="#222744" stroke={CYAN} strokeWidth="5"/><text x="117" y="94" textAnchor="middle" fill={Y} fontSize="68" fontWeight="bold">{v}</text></g>)}</g>;
 if(scene===2)return <g><path d="M540 500 L750 700 H680 V840 H400 V700 H330Z" fill="#1b3457" stroke={CYAN} strokeWidth="13" strokeLinejoin="round" strokeDasharray={f<35?'40 15':'none'}/><text x="540" y="750" textAnchor="middle" fill={Y} fontSize="100">WWW</text><text x="540" y="920" textAnchor="middle" fill="white" fontSize="51">ТВОЙ ДОМ В ИНТЕРНЕТЕ</text></g>;
 if(scene===3)return <g><rect x="100" y="430" width="880" height="500" rx="32" fill="#10172b" stroke={CYAN} strokeWidth="8"/>{['<!DOCTYPE html>','<html>','  <h1>Привет!</h1>','</html>'].map((v,i)=><text key={i} x="155" y={535+i*98} fontFamily="monospace" fontSize="48" fill={i===2?Y:CYAN} opacity={clamp((f-i*16)/12)}>{v}</text>)}</g>;
 if(scene===4)return <g><rect x="115" y="425" width="850" height="520" rx="28" fill="#1d2b4d" stroke={CYAN} strokeWidth="7"/><rect x="140" y="470" width="800" height="80" rx="15" fill={Y}/><text x="540" y="527" textAnchor="middle" fontSize="46" fill={INK} fontWeight="bold">МОЙ ПЕРВЫЙ САЙТ</text><text x="540" y="720" textAnchor="middle" fontSize={65+rise*15} fill="white">Привет, мир! ✨</text><text x="540" y="860" textAnchor="middle" fontSize="56" fill="#7aff9b">✓ ГОТОВО</text></g>;
 return <g transform={`translate(540 540) scale(${pulse})`}><rect x="-340" y="-85" width="680" height="170" rx="40" fill="#ef353d" stroke="white" strokeWidth="7"/><text y="25" textAnchor="middle" fontSize="72" fill="white" fontWeight="bold">▶ ПОДПИШИСЬ!</text></g>;
};
const Scene:React.FC<{scene:number}>=({scene})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();const intro=spring({frame:f,fps,config:{damping:14}});
 const fade=Math.min(clamp(f/9),clamp((150-f)/11));
 const charScale=scene===3?.87:scene===2?.8:scene===4?.88:1.02;
 const cy=scene===3?1240:scene===2?1260:scene===4?1250:1120;
 return <AbsoluteFill style={{background:'radial-gradient(circle at 55% 40%,#3c3267 0%,#151629 65%,#0d0e20 100%)',opacity:fade}}>
 <svg width="100%" height="100%" viewBox="0 0 1080 1920">
 <circle cx="920" cy="280" r="250" fill="#8855f4" opacity=".12"/><circle cx="100" cy="1240" r="270" fill="#ffb435" opacity=".07"/>
 <path d="M0 1450 H1080" stroke="#c17e4d" strokeWidth="10" opacity=".35"/>
 <g transform={`translate(540 175) scale(${intro}) translate(-540 -175)`}><Intro f={f} scene={scene}/></g>
 <Extras f={f} scene={scene}/>
 <Character f={f} scene={scene} cy={cy} scale={charScale}/>
 <rect x="45" y="1590" width="990" height="235" rx="38" fill="#10111f" stroke="#55466d" strokeWidth="5"/>
 <foreignObject x="80" y="1615" width="920" height="170"><div xmlns="http://www.w3.org/1999/xhtml" style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',fontFamily:'Arial,sans-serif',fontSize:49,lineHeight:1.2,fontWeight:900,color:'white',textAlign:'center'}}>{script[scene]}</div></foreignObject>
 <rect x="60" y="1860" width={960*(scene*150+f)/900} height="13" rx="7" fill={Y}/>
 </svg></AbsoluteFill>;
};
export const Episode:React.FC=()=> <AbsoluteFill style={{background:'#0d0e20'}}>{Array.from({length:6},(_,i)=><Sequence key={i} from={i*150} durationInFrames={150}><Scene scene={i}/></Sequence>)}</AbsoluteFill>;
