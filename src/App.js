import { useState } from "react";
import { Oval } from "react-loader-spinner";

function App() {
  const [url, setUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [articleDataFromUrl, setArticleDataFromUrl] = useState();
  const [isLoadingFromUrl, setIsLoadingFromUrl] = useState(false);

  const handleSubmitFromUrl = async (e) => {
    e.preventDefault();
    if (url.length <= 4) {
      setErrorMsg("Url has to be at least 5 characters long.");
      return;
    }
    // Fetch request
    setIsLoadingFromUrl(true);
    setErrorMsg();

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    // Error handling #1
    const handleError = () => {
      setErrorMsg(
        "Something went wrong. Check if the URL provided is correct."
      );
      setIsLoadingFromUrl(false);
    };

    if (!response.ok) {
      handleError();
      return;
    }

    // Response
    const data = await response.json();

    // Error handling #2
    if (data.title === "Page not found") {
      setArticleDataFromUrl();
      handleError();
      return;
    }

    // Assign fetched data to variable
    setArticleDataFromUrl({
      title: data.title,
      image_url: data.image_url,
      summary: data.summary[0].summary_text,
    });
    setIsLoadingFromUrl(false);
  };

  const handleFocus = () => {
    setErrorMsg();
    setIsLoadingFromUrl(false);
  };

  return (
    <div className="container px-2 mx-auto font-serif">
      <header>
        <h1 className="my-6 text-3xl text-center">Article Summarizer</h1>
      </header>
      <main>
        <section>
          <p className="mb-1">Paste URL to an article:</p>
          <form onSubmit={handleSubmitFromUrl} className="flex flex-col mb-6">
            <div className="flex mb-1">
              <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
                URL:
              </span>
              <input
                type="text"
                placeholder="Enter link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={handleFocus}
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none"
              />
            </div>
            {errorMsg ? <p className="text-red-600 ">{errorMsg}</p> : null}
            <input
              type="submit"
              className="mt-3 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300  rounded-lg px-5 py-2.5 mb-2 w-24"
            />
          </form>
        </section>
        <section className="flex justify-center">
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
          {isLoadingFromUrl ? (
            <Oval arialLabel="loading-indicator" color="#555" />
          ) : null}
        </section>
      </main>
      <footer className="mt-8">
        <div>
          <p>This app is created for educational purposes.</p>{" "}
          <p>
            It uses&nbsp;
            <a
              className="text-blue-700 underline text-decoration-line:"
              href="https://huggingface.co/sshleifer/distilbart-cnn-12-6"
              targe="_blank"
            >
              distilbart-cnn-12-6
            </a>
            &nbsp;model created by sshleifer and hosted on&nbsp;
            <a
              className="text-blue-700 underline text-decoration-line:"
              href="https://huggingface.co/"
            >
              Hugging Face
            </a>
            .
          </p>
          <p>
            Project's code can be found{" "}
            <a
              href="https://github.com/marcinhodor/article_summarizer_app"
              target="_blank"
            >
              <span className="text-blue-700 underline text-decoration-line:">
                here
              </span>
            </a>
            .
          </p>
          <p>Created by Marcin Hodor. Contact me at mhodor@o2.pl</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
