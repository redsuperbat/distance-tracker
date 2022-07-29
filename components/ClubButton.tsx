/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export type ClubType =
  | "i1"
  | "i2"
  | "i3"
  | "i4"
  | "i5"
  | "i6"
  | "i7"
  | "i8"
  | "i9"
  | "pw"
  | "48deg"
  | "50deg"
  | "52deg"
  | "54deg"
  | "56deg"
  | "58deg"
  | "60deg";

export const ClubButton = ({ type }: { type: ClubType }) => {
  return (
    <div class={tw`p-4 bg-blue-400 m-2 text-center rounded cursor-pointer`}>
      {type}
    </div>
  );
};
