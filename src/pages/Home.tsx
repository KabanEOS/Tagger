import React, { useEffect, useState } from 'react'
import { TagPresenter } from '../components/tagPresenter';
import { TagTable } from '../components/tagTable';
import { Tag, XTag } from '../models/Tag.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCircleXmark } from '@fortawesome/free-solid-svg-icons'



const baseTags: Tag[] = [
  { id: 1, name: "Tag 1", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 2, name: "Tag 2", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 3, name: "Tag 3", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 4, name: "Tag 4", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 5, name: "Tag 5", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
];


function Home() {

  const [tags, setTags] = useState<Tag[]>(baseTags);
  const [isTableView, setIsTableView] = useState<boolean>(true);

  const [randomArray, setRandomArray] = useState<number[]>([]);
  console.log('randomArray', randomArray);

  useEffect(() => {
    setRandomArrayHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRandomArrayHandler = () => {
    const randomArray = Array.from({ length: tags.length - 1 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setRandomArray(randomArray);
  };


  const [myXMulti, setMyXMulti] = useState<XTag>({ xc: 50, xi: 50, xv: 50 });

  const handleXMultiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyXMulti({ ...myXMulti, [name]: parseInt(value) });
    calculateRating();
  };

  const handleTagXInputChange = (e: React.ChangeEvent<HTMLInputElement>, tag: Tag) => {

    const { name, value } = e.target;
    const newTags = [...tags];
    newTags.map((t) => {
      if (t.id === tag.id) {
        t.XTag = { ...t.XTag, [name]: parseInt(value) };
      }
      return t;
    });

    setTags(newTags);
    calculateRating();
  };

  const calculateRating = () => {
    setTags(
      tags.map((tag) => {
        return {
          ...tag,
          rating: ((tag.XTag.xc * myXMulti.xc / 100) + (tag.XTag.xi * myXMulti.xi / 100) + (tag.XTag.xv * myXMulti.xv / 100)) / (myXMulti.xc + myXMulti.xi + myXMulti.xv) * 100,
        };
      })
    );
    baseTags.map((tag) => {
      tags.map((t) => {
        if (tag.id === t.id) {
          tag = t;
        }
        return tag;
      });
      return tag;
    }
    );
  };

  const [newTagToCompare, setNewTagNameToCompare] = useState("");
  const [tagToCompare, setTagToCompare] = useState("");

  const sortByName = () => {
    setTags([...tags].sort((a, b) => a.name.localeCompare(b.name)));
  }

  const sortByRating = () => {
    setTags([...tags].sort((a, b) => b.rating - a.rating));
  }

  useEffect(() => {
    sortByRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTableView]);

  console.log('isTableView', isTableView);

  return (
    <div className="mainWrapper">
      <div>
        <div className="XMultiWrapper">
          <h2>
            How much do you agree with each statement? (1-100)
          </h2>
          <div className="CIMRow">
            <h3>
              Tags should be:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Catchy:
              <>{myXMulti.xc}</>
              <input
                name={"xc"}
                type="range"
                min="0"
                max="100"
                value={myXMulti.xc}
                onChange={handleXMultiInputChange}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Interesting:
              <>{myXMulti.xi}</>
              <input
                name={"xi"}
                type="range"
                min="0"
                max="100"
                value={myXMulti.xi}
                onChange={handleXMultiInputChange}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Important:
              <>{myXMulti.xv}</>

              <input
                name={"xv"}
                type="range"
                min="0"
                max="100"
                value={myXMulti.xv}
                onChange={handleXMultiInputChange}
              />
            </div >
          </div >
        </div >

        {/* add new tag area */}

      </div>
      <div>
        <h4 className="addTag">Add new tag</h4>
        <form
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          onSubmit={(e) => {
            e.preventDefault();
            const newTag = {
              id: tags.length + 1,
              // as name use the value of the input with id "name"
              name: (document.getElementById("name") as HTMLInputElement).value,
              XTag: { xc: 0, xi: 0, xv: 0 },
              rating: 0,
            };
            setTags([newTag, ...tags]);
            setRandomArrayHandler();
          }}
        >
          {/* create input with id name on change if this input check all other tag names which contains the same letters add to setTagWithSameName if not delete*/}
          <input
            id="name"
            type="text"
            placeholder="new tag name"
            onChange={(e) => {
              setNewTagNameToCompare(e.target.value);
            }}
          />
          <button className="button" type="submit">Add</button>

        </form>
      </div>
      {/* map tags and filter by tagNameToCompare */}
      {newTagToCompare.length > 0 && tags
        .filter((tag) => tag.name.toLowerCase().includes(newTagToCompare.toLowerCase()))
        .map((tag) => (
          <div style={{ color: 'red' }} key={tag.id}>
            {tag.name}
          </div>
        ))}
      <div />
      <br />
      <div>

        {/* sort n filter area */}
        <div className="sortFilterWrapper">
          <div className="sortWrapper">
            <button className="sortButton button" onClick={sortByName}> Sort by name </button>
            <button className="sortButton button" style={{ backgroundColor: "#FF8787" }} onClick={sortByRating}> Sort by rating </button>
          </div>

          <input
            type="text"
            placeholder="filter tags by name"
            value={tagToCompare}
            onChange={(e) => setTagToCompare(e.target.value)}
          />
        </div>

      </div>
      <div className={isTableView ? "playPauseButton fadeIn" : "playPauseButton fadeOut"} onClick={() => setIsTableView(!isTableView)}>
        {/* font awesome icon */}
        {isTableView ?
          <FontAwesomeIcon
            style={{ width: '70px', height: '70px' }} icon={faCirclePlay} />
          :
          <FontAwesomeIcon
            style={{ width: '70px', height: '70px' }} icon={faCircleXmark} />
        }
      </div>
      <div>
        {isTableView ?
          <TagTable
            tags={tags.filter((tag) => tag.name.toLowerCase().includes(tagToCompare.toLowerCase()))}
            handleTagXInputChange={handleTagXInputChange}
            isTableView={isTableView}
          />
          :

          <TagPresenter
            tags={tags}
            handleTagXInputChange={handleTagXInputChange}
            onClose={() => setIsTableView(false)}
            isTableView={isTableView}
            randomArray={randomArray}
          />
        }
      </div>
    </div >

  );
}


export default Home;