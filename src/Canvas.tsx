import React, { memo } from "react";
import { Application } from "pixi.js";

type ApplicationProps = {
  autoStart?: boolean;
  width?: number;
  height?: number;
  transparent?: boolean;
  autoDensity?: boolean;
  antialias?: boolean;
  preserveDrawingBuffer?: boolean;
  resolution?: number;
  forceCanvas?: boolean;
  backgroundColor?: number;
  clearBeforeRender?: boolean;
  powerPreference?: string;
  sharedTicker?: boolean;
  sharedLoader?: boolean;
  resizeTo?: Window | HTMLElement;
};

type Props = ApplicationProps & {
  init: (app: Application) => void;
};

export default memo(({ init, ...props }: Props) => (
  <canvas
    ref={(view: HTMLCanvasElement) => init(new Application({ view, ...props }))}
  ></canvas>
));
