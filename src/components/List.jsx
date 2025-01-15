import React from "react";
import { Link } from "react-router-dom";
import { PiCookingPotFill } from "react-icons/pi";
import { FaCookieBite } from "react-icons/fa6";

const List = ({ data }) => {
  return (
    <div className="list">
      {data.map(({ ATT_FILE_NO_MAIN, INFO_ENG, RCP_SEQ, RCP_WAY2, RCP_NM }) => (
        <div key={RCP_SEQ} className="item">
        <Link to={`/recipe/${RCP_SEQ}`}>
            <div className="item-img">
              <img src={ATT_FILE_NO_MAIN} alt={RCP_NM} />
            </div>
            <div className="list-text-wrap">
              <div className="list-txt-title">{RCP_NM}</div>
              <div className="list-sub-txt-wrap">
                <div className="list-txt-kcal"><FaCookieBite className="kcalIcon" />{INFO_ENG} kcal</div>
                <div className="list-txt-way"><PiCookingPotFill className="cookIcon" />{RCP_WAY2}</div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
