/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { h } from "preact";
import RangeSlider from "../islands/RangeSlider.tsx";
import { client } from "../supabase/client.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("distance");
    if (!query) return ctx.render();
    const distance = Number(query);
    client.from("distances").add({
      club: req.url.split("/").at(-1)?.split("?")?.at(0),
      distance,
    });
    return ctx.render({ distance });
  },
};

const ClubPage = (props: PageProps) => {
  const { club } = props.params;
  const distance = props?.data?.distance;

  if (distance) {
    return (
      <div
        class={tw`h-screen flex flex-col items-center justify-center space-y-4`}
      >
        <h1>
          Distance {distance}m for club {club} submitted!
        </h1>
        <a href="/" class={tw`mt-2 p-1 bg-blue-700 text-white rounded`}>
          Return
        </a>
      </div>
    );
  }

  return (
    <div
      class={tw`h-screen flex flex-col items-center justify-center space-y-4`}
    >
      <h1 class={tw`font-bold`}>Club {club}</h1>
      <form class={tw`flex flex-col items-center justify-center`}>
        <RangeSlider min={0} max={500} />
        <button class={tw`mt-5 p-1 bg-blue-700 text-white rounded`}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default ClubPage;
