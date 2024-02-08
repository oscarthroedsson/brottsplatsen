import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../config/apiCall";

export default function NewsPress() {
  const [news, setNews] = useState();

  useEffect(() => {
    const getData = async () => {
      const newsArticles = await fetchApi("rss/press_articles");
      await setNews(newsArticles);
    };
    getData();
  }, []);

  return (
    <>
      <article className="sectionLayout w-full ">
        <div className="elementLayout1">
          <h2>Polisens pressmeddelande</h2>
          <p className="h2T">Pressmeddelanden</p>
          <div className="flex flex-wrap align-center justify-center md:justify-center">
            {news &&
              news.map((article, index) => {
                return (
                  <article
                    key={index}
                    className="secBox m-5 elementLayout1 max-w-lg md:max-w-xl lg:max-w-sm xl:max-w-[360px] "
                  >
                    <h1>{article.title}</h1>
                    <p className="listP my-2">{article.description}</p>
                    <Link to={article.link} target="_blank" className="a:hover">
                      Gå till artikel
                    </Link>
                  </article>
                );
              })}
          </div>
        </div>
      </article>
    </>
  );
}
