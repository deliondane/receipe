import React, { useContext } from "react";
import { DataContext } from "../App";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const { data, loading } = useContext(DataContext);
  const { id } = useParams();
  const recipe = data ? data.find((item) => item.RCP_SEQ === id) : null;
  if (loading) {
    return <h1 className="loading">데이터 로딩 중입니다.</h1>;
  }

  if (!recipe) {
    return <h1 className="loading">찾는 레시피가 없습니다.</h1>;
  }

  const {
    RCP_NA_TIP,
    RCP_NM,
    RCP_PARTS_DTLS,
    INFO_ENG,
    INFO_FAT,
    INFO_NA,
    ATT_FILE_NO_MK,
    INFO_PRO,
    INFO_CAR,
  } = recipe;

  const manuals = Array.from({ length: 20 }, (_, i) => ({
    desc: recipe[`MANUAL${String(i + 1).padStart(2, "0")}`],
    //padStart(2, '0') 두 자리 변환해서 01, 02
    img: recipe[`MANUAL_IMG${String(i + 1).padStart(2, "0")}`],
  })).filter((manual) => manual.desc); //설명이 존재하는 항목만 필터링, desc가 없으면 배열에서 제외

  const source = RCP_PARTS_DTLS
    ? RCP_PARTS_DTLS.split("●")
        .map((el) =>
          el
            .split(":")
            .map((el) => el.trim())
            .filter(Boolean)
        )
        .filter((el) => el.length)
    : [];

  //RCP_PARTS_DTLS.split("●") 첫번째 분리 기준 (●)
  //el.split(":") 두번째 분리 기준 (:)
  //el.trim() 각 요소의 양옆의 공백 제거
  //filter(Boolean) 빈값이 있는 요소 제외
  //filter((el) =>el.length) 빈배열은 제외
  //[] 빈배열 반환

  return (
    <div className="recipeDetail">
      <img src={ATT_FILE_NO_MK} alt={RCP_NM} className="recipeDetailMainImg" />

      <div>
        <div className="recipeDetailTitle">{RCP_NM}</div>
        <div className="recipeDetailInfo">
          <div className="info-title">재료</div>
          {source.map((el, idx) => (
            <div key={idx} className="txt">
              <span className="source-tit">{el[0]}</span>
              <span className="source-con">{el[1]}</span>
            </div>
          ))}
        </div>
        <div className="recipeDetailInfo1">
          <div className="info-title1">조리법</div>
          {manuals.map((manual, idx) =>
            manual.desc ? (
              <div key={idx} className="desc_list">
                <img src={manual.img} alt={RCP_NM} />
                <span className="desc-txt">{manual.desc}</span>
              </div>
            ) : null
          )}
        </div>
        <div className="recipeDetailInfo2">
          <div className="info-title2">영양정보</div>
          <div className="table">
            <div className="row-left">
              <div className="row">
                <span className="col">열량: </span>
                <span className="col_info">{INFO_ENG}</span>
              </div>
              <div className="row">
                <span className="col">탄수화물: </span>
                <span className="col_info">{INFO_CAR}</span>
              </div>
              <div className="row">
                <span className="col">단백질: </span>
                <span className="col_info">{INFO_PRO}</span>
              </div>
            </div>
            <div className="row-right">
              <div className="row">
                <span className="col">지방: </span>
                <span className="col_info">{INFO_FAT}</span>
              </div>
              <div className="row">
                <span className="col">나트륨: </span>
                <span className="col_info">{INFO_NA}</span>
              </div>
            </div>
          </div>
              <div className="tip">
                <span className="col">조리법: </span>
                <span className="col_info">{RCP_NA_TIP}</span>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
