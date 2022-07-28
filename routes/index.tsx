/** @jsx h */
import { tw } from "@twind";
import { h } from "preact";

export default function Home() {
  return (
    <div class={tw`h-screen grid place-items-center`}>
      <h1>Hello World!</h1>
    </div>
  );
}
