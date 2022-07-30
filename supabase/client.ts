const baseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const key = Deno.env.get("SUPABASE_KEY") ?? "";

class SupabaseRequest {
  constructor(private tableName: string) {}
  public async add(item: unknown): Promise<unknown> {
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
  }
  public async getAll() {
    const url = `${baseUrl}/rest/v1/${this.tableName}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: key,
      },
    });
    return res.json();
  }
  public async select(query: string) {
    const url = `${baseUrl}/rest/v1/${this.tableName}?select=${query}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: key,
      },
    });
    return res.json();
  }
}

export const client = {
  from(tableName: string) {
    return new SupabaseRequest(tableName);
  },
};
