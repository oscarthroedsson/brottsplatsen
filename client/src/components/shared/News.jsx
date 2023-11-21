import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
let count = 0;
export default function News() {
  const [news, setNews] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/rss/debate_articles");
      const data = await response.json();
      console.log("CLIENT DATA", data);
      await setNews(data);
    };
    getData();
  }, []);
  count++;

  return (
    <>
      <article className="sectionLayout">
        <h2 className="h2T m-2"> Debatt Artiklar</h2>
        {news &&
          news.map((article, index) => {
            return (
              <article key={index} className="secBox m-5 elementLayout1">
                <h1>{article.title}</h1>
                <p className="listP my-2">{article.description}</p>
                <Link to={article.link} target="_blank">
                  <a className="a:hover ">Gå till artikel</a>
                </Link>
              </article>
            );
          })}
      </article>
    </>
  );
}
