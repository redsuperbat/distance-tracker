/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";
import { ClubButton, ClubType } from "../components/ClubButton.tsx";
import { client } from "../supabase/client.ts";

interface Data {
  clubs: { club_name: ClubType }[];
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const clubs = await client.from("clubs").getAll();
    return ctx.render({ clubs });
  },
};

export default function Home(props: PageProps<Data>) {
  const clubs: ClubType[] = props?.data?.clubs.map(
    ({ club_name }) => club_name
  );

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
