/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";
import { client } from "../../supabase/client.ts";

export interface ClubId {
  club_name: string;
}

export interface Data {
  distance: number;
  club_id: ClubId;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const res = await client.from("distances").select(
      `
distance,
club_id(
  club_name
)`
    );
    console.log(res);
    return ctx.render(res);
  },
};

export default function Home(props: PageProps<Data[]>) {
  const mean = props.data.reduce((prev, curr) => {
    if (!prev[curr.club_id.club_name]) {
      prev[curr.club_id.club_name] = 0;
    }
    prev[curr.club_id.club_name] += curr.distance;
    return prev;
  }, {} as Record<string, number>);

  for (const key of Object.keys(mean)) {
    mean[key] =
      mean[key] /
      props.data.filter((data) => data.club_id.club_name === key).length;
  }

  console.log(mean);

  return (
    <div class={tw`h-screen flex flex-col`}>
      <h1 class={tw`font-bold text-2xl text-blue-400 p-2`}>Statistics</h1>
      <table>
        <thead>
          <tr class={tw`font-bold`}>
            <td class={tw`border`}>Club</td>
            <td class={tw`border`}>Mean Distance</td>
          </tr>
        </thead>
        {Object.entries(mean).map(([key, val]) => {
          return (
            <tr class={tw`border-b`}>
              <td>{key}</td>
              <td>{val}m</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
