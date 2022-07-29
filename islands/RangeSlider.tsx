/** @jsx h */
import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "../utils/twind.ts";

const toNumber = (val: unknown): number => {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    return Number(val);
  }
  throw new TypeError("invalid type");
};

const isInputTarget = (
  target: EventTarget | null
): target is HTMLInputElement => {
  return target !== null && "value" in target;
};

export interface RangeSliderOptions {
  min: number;
  max: number;
  onValueChange?: (value: number) => void;
  initialValue?: number;
}

const RangeSlider: FunctionComponent<RangeSliderOptions> = ({
  max,
  min,
  initialValue,
  onValueChange,
}) => {
  const [value, setValue] = useState(initialValue ?? 0);

  return (
    <div class={tw`flex flex-col items-center justify-center`}>
      <h1>Längd: {value}m </h1>
      <input
        class={tw`w-[45vw] scale-150`}
        onChange={(e) => {
          if (!isInputTarget(e.target)) {
            return;
          }
          const value = toNumber(e.target.value);
          onValueChange?.(value);
          setValue(value);
        }}
        type="range"
        value={value}
        name="distance"
        min={min}
        max={max}
      />
    </div>
  );
};

export default RangeSlider;
