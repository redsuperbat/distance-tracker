/** @jsx h */
import { PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";
import { ClubButton, ClubType } from "../components/ClubButton.tsx";

interface Data {
  club: ClubType;
}

export default function Home(props: PageProps<Data>) {
  const clubs: ClubType[] = [
    "i4",
    "i5",
    "i6",
    "i7",
    "i8",
    "i9",
    "pw",
    "50deg",
    "60deg",
    "56deg",
  ];

  return (
    <div class={tw`h-screen flex flex-col items-center justify-center p-4`}>
      <h1>Choose a club</h1>
      <div class={tw`grid grid-cols-3`}>
        {clubs.map((club) => (
          <a href={`/${club}`}>
            <ClubButton type={club} />
          </a>
        ))}
      </div>
    </div>
  );
}
