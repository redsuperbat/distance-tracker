/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export const ClubButton = ({ type }: { type: string }) => {
  return (
    <div
      class={tw`p-4 bg-blue-400 m-2 text-center rounded cursor-pointer text-white`}
    >
      {type}
    </div>
  );
};
