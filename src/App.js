import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [articleDataFromUrl, setArticleDataFromUrl] = useState();
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

  return (
    <div className="container px-2 mx-auto font-serif">
      <header>
        <h1 className="my-6 text-3xl text-center">Article Summarizer</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmitFromUrl} className="flex flex-col mb-6">
            <div className="flex mb-3">
              <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
                URL:
              </span>
              <input
                type="text"
                placeholder="Enter link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none"
              />
            </div>
            <input
              type="submit"
              className="cursor-pointer text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300  rounded-lg px-5 py-2.5 mb-2 w-24"
            />
          </form>
        </section>
        <section>
          {articleDataFromUrl && !isLoadingFromUrl ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100"
            >
              <img
                className="max-w-sm sm:rounded-none lg:rounded-l-lg"
                src={articleDataFromUrl.image_url}
                alt="article"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {articleDataFromUrl.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  {articleDataFromUrl.summary}
                </p>
              </div>
            </a>
          ) : null}
          {isLoadingFromUrl ? <p>Loading...</p> : null}
        </section>
      </main>
    </div>
  );
}

export default App;
