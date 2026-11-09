import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,interpolate,spring,useVideoConfig} from 'remotion';
const lines=['Ты уже программируешь — и даже не знаешь об этом!','Нажимаешь кнопку — герой прыгает.','Ставишь лайк — появляется сердечко.','Это код: инструкции, которые выполняет компьютер.','Ты тоже можешь писать код. Сложно? Сейчас упростим!','Python или Java? Пиши в комментариях!'];
const titles=['СТИК ОБЪЯСНЯЕТ IT','ИГРА','ЛАЙК','КОД','ПРОСТЫЕ КОМАНДЫ','ЧТО ДАЛЬШЕ?'];
const Stick:React.FC<{f:number;scene:number}>=({f,scene})=>{
 const bounce=Math.sin(f/7)*12;const wave=Math.sin(f/6)*22;const blink=f%95>90;
 return <g transform={`translate(540 ${1020+bounce})`}>
 <ellipse cx="0" cy="385" rx="165" ry="30" fill="#000" opacity=".25"/>
 <path d="M-65 125 L-88 330 M65 125 L88 330" stroke="#101827" strokeWidth="25" strokeLinecap="round"/>
 <path d="M-100 334 h90 M80 334 h95" stroke="white" strokeWidth="37" strokeLinecap="round"/>
 <path d="M-110 -75 Q0 -125 110 -75 L120 160 Q0 190 -120 160 Z" fill="#111827"/>
 <path d={`M-105 -65 Q-180 ${-20+wave} -170 70 M105 -65 Q180 ${-20-wave} 170 70`} fill="none" stroke="#111827" strokeWidth="27" strokeLinecap="round"/>
 <circle cx="-170" cy="70" r="21" fill="#f3bc8c"/><circle cx="170" cy="70" r="21" fill="#f3bc8c"/>
 <text x="0" y="75" fontSize="72" fill="white" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{'</>'}</text>
 <ellipse cy="-215" rx="113" ry="125" fill="#f3bc8c" stroke="#111827" strokeWidth="8"/>
 <path d="M-104 -260 Q-95 -360 10 -350 Q120 -350 108 -252 L60 -290 L25 -260 L-25 -295 L-72 -260Z" fill="#69412b"/>
 <path d="M-115 -300 Q-30 -390 104 -322 L125 -290 H-115Z" fill="#ffd23c" stroke="#111827" strokeWidth="8"/>
 <path d="M85 -318 L172 -299 Q170 -276 110 -275" fill="#ffd23c" stroke="#111827" strokeWidth="8"/>
 <path d="M-110 -235 Q-150 -195 -115 -140 M110 -235 Q150 -195 115 -140" fill="none" stroke="#111827" strokeWidth="25"/>
 <rect x="-148" y="-221" width="37" height="85" rx="17" fill="#ffd23c"/><rect x="111" y="-221" width="37" height="85" rx="17" fill="#ffd23c"/>
 <ellipse cx="-43" cy="-216" rx="11" ry={blink?2:16} fill="#111827"/><ellipse cx="43" cy="-216" rx="11" ry={blink?2:16} fill="#111827"/>
 <path d="M-29 -150 Q0 -125 29 -150" stroke="#111827" strokeWidth="8" fill="none" strokeLinecap="round"/>
 </g>};
const Scene:React.FC<{scene:number}>=({scene})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const p=spring({frame:f,fps,config:{damping:13}});
 const opacity=interpolate(f,[0,10,140,150],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'radial-gradient(circle at 50% 40%,#2d456e,#0c1326)',opacity}}>
 <svg viewBox="0 0 1080 1920" width="100%" height="100%">
 <circle cx="870" cy="350" r="270" fill="#5eead4" opacity=".08"/>
 <rect x="60" y="120" width="960" height="145" rx="35" fill="#111c32" stroke="#4a678c" strokeWidth="5"/>
 <text x="540" y="212" fill="#ffd23c" textAnchor="middle" fontSize="63" fontFamily="Arial" fontWeight="bold">{titles[scene]}</text>
 {scene===1&&<g><rect x="90" y="430" width="900" height="400" rx="40" fill="#27476b" stroke="#5eead4" strokeWidth="8"/><path d="M100 750 H980" stroke="#61cf8b" strokeWidth="60"/><g transform={`translate(650 ${640-Math.abs(Math.sin(f/12))*130})`}><circle r="43" fill="#ffd23c"/><rect x="-30" y="40" width="60" height="60" rx="10" fill="#141b30"/></g></g>}
 {scene===2&&<g transform={`translate(540 530) scale(${p})`}><text textAnchor="middle" fontSize="210">❤️</text></g>}
 {scene===3&&<g><rect x="100" y="430" width="880" height="420" rx="35" fill="#0d1728" stroke="#5eead4" strokeWidth="7"/>{['if (pressed) {','  character.jump();','  addLike();','}'].map((l,i)=><text key={i} x="150" y={535+i*82} fill={i===1?'#ffd23c':'#5eead4'} fontSize="49" fontFamily="monospace" opacity={f>i*15?1:.15}>{l}</text>)}</g>}
 {scene===4&&['НАЖАТЬ','ПРОВЕРИТЬ','ВЫПОЛНИТЬ'].map((t,i)=><g key={i} transform={`translate(${100+i*300} ${455+Math.sin(f/10+i)*20})`}><rect width="280" height="115" rx="30" fill={i===1?'#5eead4':'#ffd23c'}/><text x="140" y="70" textAnchor="middle" fill="#141b30" fontSize="34" fontWeight="bold">{t}</text></g>)}
 {scene===5&&<g><text x="250" y="560" fill="#5eead4" fontSize="90" fontWeight="bold" textAnchor="middle">Python</text><text x="820" y="560" fill="#ffd23c" fontSize="90" fontWeight="bold" textAnchor="middle">Java</text></g>}
 <Stick f={f} scene={scene}/>
 <rect x="60" y="1570" width="960" height="225" rx="35" fill="#0d1728" stroke="#3c5274" strokeWidth="4"/>
 <foreignObject x="85" y="1590" width="910" height="175"><div xmlns="http://www.w3.org/1999/xhtml" style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:'Arial,sans-serif',fontWeight:800,fontSize:49,lineHeight:1.2,color:'white'}}>{lines[scene]}</div></foreignObject>
 <rect x="60" y="1845" width={960*(scene*150+f)/900} height="12" rx="6" fill="#ffd23c"/>
 </svg></AbsoluteFill>;
};
export const Episode:React.FC=()=> <AbsoluteFill>{Array.from({length:6},(_,i)=><Sequence key={i} from={i*150} durationInFrames={150}><Scene scene={i}/></Sequence>)}</AbsoluteFill>;
