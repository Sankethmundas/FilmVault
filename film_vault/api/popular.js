export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB_API_KEY is not configured");
    return res.status(500).json({ error: "Movie service is not configured" });
  }

  const page = Number(req.query.page ?? 1);
  if (!Number.isInteger(page) || page < 1 || page > 500) {
    return res.status(400).json({ error: "Page must be an integer from 1 to 500" });
  }

  try {
    const url = new URL("https://api.themoviedb.org/3/movie/popular");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", String(page));

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB request failed with status ${response.status}`);
      return res.status(response.status).json({ error: "Unable to retrieve movies" });
    }

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(await response.json());
  } catch (error) {
    console.error("TMDB request failed", error);
    return res.status(502).json({ error: "Unable to retrieve movies" });
  }
}
