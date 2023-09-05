import { useRef, useState } from "react";
import styles from "../styles/AppBar.module.css";
import {
  useSearchMoviesByTitleQuery,
} from "../api/ApiSlice";
import errorImage from '../assets/error_image.png'

const AppBar = () => {
  const [text, setText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const isFocusedRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useSearchMoviesByTitleQuery(searchQuery);

  const handleChange = (e: string) => {
    setText(e);
    if (e.length > 1 && isFocusedRef.current) {
      setSearchQuery(e);
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };
  // Function to set isFocused to true when input gains focus
  const handleFocus = () => {
    isFocusedRef.current = true;
    if (text.length > 1) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  };

  // Function to set isFocused to false when input loses focus
  const handleBlur = () => {
    isFocusedRef.current = false;
    setTimeout(() => {
      setDropdown(false);
    }, 100);
  };

  const printClick = (title: string) => {
    console.log(title);
  };

  return (
    <div className={styles.main}>
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Movie"
      />
      <div className={dropdown ? styles.dropdownactive : styles.dropdown}>
        {isLoading ? (
          <div>Loading</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          data?.results.map((e) => (
            <div onClick={() => printClick(e.original_title)} key={e.id}>
              <li className={styles.listItem} key={e.id}>
                <img
                  className={styles.image}
                  src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`}
                  alt={errorImage}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = errorImage;
                  }}
                />
                <div>{e.original_title}</div>
              </li>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppBar;
