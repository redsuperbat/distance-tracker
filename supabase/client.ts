const baseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const key = Deno.env.get("SUPABASE_KEY") ?? "";

export const client = {
  tableName: "distances",
  async add(item: object): Promise<unknown> {
    const url = `${baseUrl}/rest/v1/${this.tableName}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
      },
      body: JSON.stringify(item),
    });

    return res.text();
  },
};
