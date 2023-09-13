import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LZString from "lz-string";
import useSharedLogic from "../../../hook/useSharedLogic";
import Start from "../../../components/Start";
import Input from "../../../components/Input";
import Result from "../../../components/Result";
import styles from "./SectionTwo.module.css";
import Loading from "../../../components/loading/Loading";
import NavBar from "../../../components/nav_bar/NavBar";
const SectionTwo = ({ handleScrollToSectionTwo }) => {
  const { data } = useParams();
  const {
    name,
    selectedImageIndexes,
    showContent,
    setShowContent,
    showResult,
    setShowResult,
    showLoading,
    setShowLoading,
    savedData,
    setSavedData,
    images,
    handleNameChange,
    handleImageClick,
    handleStart,
    handleSave,
    handleShowResult,
    renderSelectedImages,
    renderSavedData,
    mbtiTexts,
  } = useSharedLogic(data);

  useEffect(() => {
    if (data) {
      const decompressedData = LZString.decompressFromEncodedURIComponent(data);
      const parsedData = JSON.parse(decompressedData);

      if (Array.isArray(parsedData)) {
        setSavedData(parsedData);
        setShowResult(true);
        setShowContent(false);
      } else if (typeof parsedData === "object") {
        setSavedData([parsedData]);
        setShowResult(true);
        setShowContent(false);
      } else {
        console.error(
          "복호화된 데이터의 형태가 올바르지 않습니다:",
          parsedData
        );
      }
    } else {
      setShowContent(false);
    }
  }, [data]);

  return (
    <>
      <NavBar />

      <div className={styles.sectionTwo}>
        {showLoading ? (
          <Loading />
        ) : !showContent && !showResult ? (
          <Start handleStart={() => setShowContent(true)} />
        ) : showContent && !showResult ? (
          <Input
            name={name}
            handleNameChange={handleNameChange}
            selectedImageIndexes={selectedImageIndexes}
            handleImageClick={handleImageClick}
            handleSave={handleSave}
            renderSavedData={renderSavedData}
            handleShowResult={handleShowResult}
            mbtiTexts={mbtiTexts}
          />
        ) : showResult ? (
          <Result
            savedData={savedData}
            mbtiTexts={mbtiTexts}
            setShowContent={setShowContent}
            setShowResult={setShowResult}
            setSavedData={setSavedData}
          />
        ) : null}
      </div>
    </>
  );
};

export default SectionTwo;
