// SortSelect.js
import styles from "./SortSelect.module.css";
function SortSelect({ onSortChange }) {
  if (typeof onSortChange !== "function") {
    console.error("onSortChange prop is missing or is not a function");
    return null;
  }
  return (
    <div>
      <select
        className={styles.sortBox}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="date">날짜 순</option>
        <option value="views">조회수 순</option>
        <option value="messages">댓글 순</option>
      </select>
    </div>
  );
}

export default SortSelect;
