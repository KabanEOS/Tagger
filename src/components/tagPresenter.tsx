import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Tag } from '../models/Tag.model';

interface Props {
  tags: Tag[];
  handleTagXInputChange: (e: React.ChangeEvent<HTMLInputElement>, tag: Tag) => void
  onClose: () => void
  isTableView: boolean;
  randomArray: number[];
}

export const TagPresenter: React.FC<Props> = ({ tags, handleTagXInputChange, isTableView, onClose, randomArray }) => {

  const [watchIndex, setWatchIndex] = useState<number>(1);
  console.log('watchIndex', watchIndex);
  const incrementWatchIndex = () => {
    if (watchIndex < tags.length) {
      setWatchIndex(watchIndex + 1);
    }

  };
  const decrementWatchIndex = () => {
    if (watchIndex > 1) {
      setWatchIndex(watchIndex - 1);
    }
  };
  const screenWidth = window.innerWidth;
  const loaderWidth = watchIndex * (screenWidth / tags.length);

  const randomTag = tags[randomArray[watchIndex - 1] - 1];
  console.log('randomTag', randomTag);

  return (
    <div className={isTableView ? "fadeIn" : "fadeOut"}>
      <div className="loader slide-in"
        style={{ width: loaderWidth }} />
      <div className="tagPresenterWrapper">
        <div className="stageWrapper">
          <div style={{ paddingLeft: '24px', cursor: 'pointer' }} onClick={decrementWatchIndex}>
            <FontAwesomeIcon style={{ width: "50px", height: "50px", color: "#47474A" }} icon={faArrowLeft} />
          </div>
          <div className="stage">
            <h3>#{watchIndex} </h3>
            <h2>{randomTag.name} </h2>
            <div className="tagXRow">
              Catchy
              <input
                name={"xc"}
                type="range"
                min="0"
                max="100"
                value={randomTag.XTag.xc}
                onChange={(e) => handleTagXInputChange(e, randomTag)}
              />
            </div>
            <div className="tagXRow">
              Interesting
              <input
                name={"xi"}
                type="range"
                min="0"
                max="100"
                value={randomTag.XTag.xi}
                onChange={(e) => handleTagXInputChange(e, randomTag)}
              />
            </div>
            <div className="tagXRow">
              Important
              <input
                name={"xv"}
                type="range"
                min="0"
                max="100"
                value={randomTag.XTag.xv}
                onChange={(e) => handleTagXInputChange(e, randomTag)} />
            </div>
          </div>
          <div style={{ paddingRight: '24px', cursor: 'pointer' }} onClick={incrementWatchIndex}>
            <FontAwesomeIcon style={{ width: "50px", height: "50px", color: "#47474A" }} icon={faArrowRight} />
          </div>
        </div>


      </div>
    </div>
  )
}
