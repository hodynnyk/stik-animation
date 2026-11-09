import React from 'react';
import {Composition} from 'remotion';
import {Episode} from './episode';
export const Root:React.FC=()=> <Composition id="STIK001" component={Episode} durationInFrames={900} fps={30} width={1080} height={1920}/>;
