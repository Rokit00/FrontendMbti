import React from "react";
import CardComponent from "./card/Card";
import SortSelect from "./SortSelect";
import styles from "./SearchResults.module.css";

const SearchResults = ({ results, onSortChange }) => {
  return (
    <div className={styles.fixedWidthContainer}>
      <h2>검색 결과</h2>
      <div className={styles.sortSelectContainer}>
        <SortSelect onSortChange={onSortChange} />
      </div>
      <div className={styles.cardRow}>
        {results.map((debate) => (
          <Card key={debate.id} debate={debate} />
        ))}
      </div>
    </div>
  );
};
const Card = React.memo(CardComponent);

export default SearchResults;
