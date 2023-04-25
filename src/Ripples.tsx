import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import {
  BackdropBlur,
  Canvas,
  interpolate,
  Paint,
  vec,
  useComputedValue,
  useClockValue,
  SkPoint,
  Oval,
} from '@shopify/react-native-skia';

interface RipplesProps {
  style?: StyleProp<ViewStyle>;
  cycle: number;
  num: number;
  width: number;
  height: number;
  maxRadius: number;
}

interface PieceProps {
  delay: number;
  cycle: number;
  c: SkPoint;
  maxRadius: number;
}

export function RipplePiece(props: PieceProps) {
  const clock = useClockValue();
  const opacity = useComputedValue(() => {
    const ms = clock.current - props.delay;
    return interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0.9, 0.01]);
  }, [clock]);

  const radius = useComputedValue(() => {
    const ms = clock.current - props.delay;
    return interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius]);
  }, [clock]);

  const elipseX = useComputedValue(() => {
    const ms = clock.current - props.delay;
    return interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius * 2.5]);
  }, [clock]);

  const elipseY = useComputedValue(() => {
    const ms = clock.current - props.delay;
    return interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius]);
  }, [clock]);

  const elipseCenterX = useComputedValue(() => {
    const ms = clock.current - props.delay;
    const eX = interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius * 2.5]);
    // return props.c.x - ;
    return props.c.x - eX / 2;
  }, [clock]);

  const elipseCenterY = useComputedValue(() => {
    const ms = clock.current - props.delay;
    const eY = interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius]);
    return props.c.y - eY / 2 + 10;
  }, [clock]);

  // const elipseCenterY = useComputedValue(() => {
  //   const ms = clock.current - props.delay;
  //   const eY = interpolate(Math.abs(ms % props.cycle), [0, props.cycle], [0, props.maxRadius * 0.75]);
  //   return eY + props.c.y;
  // }, [clock]);

  // return (
  //   <Circle c={props.c} r={radius} opacity={0}>
  //     <Paint color='lightblue' style='stroke' strokeWidth={3} opacity={opacity} />
  //   </Circle>
  // );
  return (
    <Oval x={elipseCenterX} y={elipseCenterY} width={elipseX} height={elipseY} opacity={0}>
      <Paint color='lightblue' style='stroke' strokeWidth={2} opacity={opacity} />
    </Oval>
  );
}

export function Ripples(props: RipplesProps) {
  const c = vec(props.width / 2, props.height / 2);
  let ripples = [];

  for (let i = 0; i < props.num; i++) {
    const delay = (i * props.cycle) / props.num;
    ripples.push(<RipplePiece delay={delay} cycle={props.cycle} maxRadius={props.maxRadius} c={c} key={i} />);
  }
  return (
    <Canvas style={props.style}>
      {ripples}
      <BackdropBlur blur={1} />
    </Canvas>
  );
}
