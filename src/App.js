import { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [site, setSite] = useState("");
  const [articleDataFromUrl, setArticleDataFromUrl] = useState({});
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);

  const handleSubmitFromUrl = async (e) => {
    e.preventDefault();
    setIsLoadingFromUrl(true);
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const jsonResponse = await response.json();
    setArticleDataFromUrl({
      title: jsonResponse.title,
      image_url: jsonResponse.image_url,
      summary: jsonResponse.summary[0].summary_text,
    });
    console.log(articleDataFromUrl);
    setIsLoadingFromUrl(false);
  };

  useEffect(() => {
    if (!site) return;
    if (site === "fox-news") {
    }

    console.log("effect", site);
  }, [site]);

  return (
    <div className="container mx-auto font-serif">
      <header>
        <h1 className="text-3xl">Article Summarizer</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmitFromUrl} className="flex">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
              Enter URL:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
          {articleDataFromUrl && !isLoadingFromUrl ? (
            <div>
              <p>{articleDataFromUrl.summary}</p>
            </div>
          ) : null}
          {isLoadingFromUrl ? <p>Loading...</p> : null}
        </section>
        <section>
          <select name="site-select" onChange={(e) => setSite(e.target.value)}>
            <option value="">Choose a site...</option>
            <option value="fox-news">Fox News</option>
          </select>
          <p>Site: {site}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
