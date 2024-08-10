// src/Components/NewsFetcher.tsx
import { useEffect, useState } from "react";

const NewsFetcher = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=b688b743e5514d32bc845ac3fc07843b"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const articlesData = data.articles.slice(0, 4);
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="grid grid-rows-4 border h-4/6 w4/6 border-white rounded-lg p-4 text-white items-center">
      {articles.map((article, index) => (
        <div key={index} className="hover:text-blue-300 news-item">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-link"
          >
            <div className="news-title">{article.title}</div>
          </a>
          <div className="news-source">{article.source.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsFetcher;
