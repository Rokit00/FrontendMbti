//DebateList.js
import React, { useState, useEffect } from "react";
import NavBar from "../../components/nav_bar/NavBar";
import styles from "./DebateList.module.css";
import style from "../../components/Input.module.css"
import { sortByLikes, sortByDate, sortByMessages } from "../../utils/sortUtils";
import axios from "axios";
import SearchResults from "../../components/SearchResults";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";

const DebateList = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    async function fetchAllDebates() {
      try {
        const response = await axios.get("/post/lists");

        const dataWithComments = await Promise.all(
          response.data.map(async (post) => {
            const commentCountResponse = await axios.get(
              `/comment/${post.id}/count`
            );

            return {
              ...post,
              messages: commentCountResponse.data.count,
            };
          })
        );

        const transformedData = transformData(dataWithComments);
        setOriginalData(transformedData);
        setSearchResults(transformedData);
      } catch (error) {
        console.error("Error fetching the posts", error.response.data || error);
      }
    }

    function transformData(data) {
      return data.map((post) => {
        const postDate = new Date(post.createdAt);
        const currentDate = new Date();
        const timeDiff = currentDate - postDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        return {
          id: post.id,
          title: post.title,
          nickname: post.nickname,
          A: post.optionA,
          B: post.optionB,
          messages: post.messages,
          views: Math.round(post.viewCount / 2),
          likes: post.likeCount,
          bookMark: post.bookmark,
          isUnderway: daysDiff <= 7,
          dates: post.createdAt,
        };
      });
    }

    fetchAllDebates();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [sortOption]);
  const handleWriteDebate = () => {
    navigate("/newDebate");
  };

  const handleSearch = () => {
    const results = filterAndSortResults(originalData);
    setSearchResults(results);
  };

  const filterAndSortResults = (data) => {
    let results = [...data];

    if (searchKeyword.trim() !== "") {
      results = results.filter((debate) =>
        debate.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    switch (sortOption) {
      case "views":
        results.sort(sortByLikes);
        break;
      case "messages":
        results.sort(sortByMessages);
        break;
      default:
        results.sort(sortByDate);
        break;
    }

    return results;
  };
  return (
    <div className={styles.listContainer}>
      <NavBar />
      <h2 className={styles.mainTitle}>전체 토론 주제</h2>
      <input
        type="text"
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="토론 주제 검색..."
      />
      <button className={style.contentsbutton} onClick={handleSearch}>search</button>
      <div className={styles.cardContainer}>
        {searchResults.length > 0 && (
          <SearchResults results={searchResults} onSortChange={setSortOption} />
        )}
      </div>
      {isLoggedIn && <button className={style.contentsbutton} onClick={handleWriteDebate}>토론 글 쓰기</button>}
    </div>
  );
};

export default DebateList;
