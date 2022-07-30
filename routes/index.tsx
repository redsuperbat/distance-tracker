/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";
import { ClubButton } from "../components/ClubButton.tsx";
import { client } from "../supabase/client.ts";

interface Data {
  clubs: { club_name: string; id: number }[];
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const clubs = await client.from("clubs").getAll();
    return ctx.render({ clubs });
  },
};

export default function Home(props: PageProps<Data>) {
  const clubs: { club_name: string; id: number }[] = props?.data?.clubs.sort(
    (a, b) => {
      if (a.club_name < b.club_name) {
        return -1;
      }
      if (a.club_name > b.club_name) {
        return 1;
      }
      return 0;
    }
  );

  return (
    <div
      class={tw`h-screen flex flex-col items-center justify-center p-4 relative`}
    >
      <a
        href="/statistics"
        class={tw`p-2 absolute top-0 right-0 bg-blue-400 rounded m-1 text-white`}
      >
        Statistics
      </a>
      <h1>Choose a club</h1>
      <div class={tw`grid grid-cols-3`}>
        {clubs.map((club) => (
          <a href={`/${club.id}`}>
            <ClubButton type={club.club_name} />
          </a>
        ))}
      </div>
    </div>
  );
}
