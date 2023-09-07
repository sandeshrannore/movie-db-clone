import React, { useRef, useState } from "react";
import styles from "../styles/TrendingList.module.css";
import { useGetTrendingMoviesQuery } from "../api/ApiSlice";
import errorImage from "../assets/error_image.png";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const TrendingList = () => {
  const { data, isError, isLoading } = useGetTrendingMoviesQuery();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    const scrollAmount = 200; // You can adjust this value

    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  const scrollLeft = () => {
    const scrollAmount = -200; // You can adjust this value

    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  };

  return (
    <div className={styles.main}>
      <h1 style={{ margin: 0, paddingLeft: '10px', color: "#08c415" }}>
        Popular Movies
      </h1>
      <div
        className={styles.button}
        style={{ left: "5px" }}
        onClick={scrollLeft}
      >
        <AiOutlineArrowLeft />
      </div>
      <div
        className={styles.button}
        style={{ right: "5px" }}
        onClick={scrollRight}
      >
        <AiOutlineArrowRight />
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className={styles.carousel} ref={containerRef}>
          {data?.results.map((e) => (
            <div key={e.id}>
              <li className={styles.listItem} key={e.id}>
                <img
                  className={styles.image}
                  src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                  alt={errorImage}
                  onError={(e) => {
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.src = errorImage;
                  }}
                />
                <div style={{color:'white'}}>{truncateString(e.original_title, 15)}</div>
              </li>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingList;
