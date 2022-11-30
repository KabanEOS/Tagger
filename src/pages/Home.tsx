import React, { useState } from 'react'
import { Tag, XTag } from '../models/Tag.model';

const baseTags: Tag[] = [
  { id: 1, name: "Tag 1", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 2, name: "Tag 2", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 3, name: "Tag 3", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 4, name: "Tag 4", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
  { id: 5, name: "Tag 5", XTag: { xc: 100, xi: 100, xv: 100 }, rating: 0 },
];


function Home() {

  const [tags, setTags] = useState<Tag[]>(baseTags);

  const [myXMulti, setMyXMulti] = useState<XTag>({ xc: 50, xi: 50, xv: 50 });

  const handleXMultiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyXMulti({ ...myXMulti, [name]: parseInt(value) });
    calculateRating();
  };

  const handleTagXInputChange = (e: React.ChangeEvent<HTMLInputElement>, tag: Tag, index: number) => {

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

          onSubmit={(e) => {
            e.preventDefault();
            const newTag = {
              id: tags.length + 1,
              // as name use the value of the input with id "name"
              name: (document.getElementById("name") as HTMLInputElement).value,
              XTag: { xc: 0, xi: 0, xv: 0 },
              rating: 0,
            };
            setTags([...tags, newTag]);
          }}
        >
          {/* create input with id name on change if this input check all other tag names which contains the same letters add to setTagWithSameName if not delete*/}
          <input
            id="name"
            type="text"
            onChange={(e) => {
              setNewTagNameToCompare(e.target.value);
            }}
          />
          <button type="submit">Add</button>

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
            <button className="sortButton" onClick={sortByName}> Sort by name </button>
            <button className="sortButton" onClick={sortByRating}> Sort by rating </button>
          </div>

          <input
            type="text"
            placeholder="Filter tags by name"
            value={tagToCompare}
            onChange={(e) => setTagToCompare(e.target.value)}
          />
        </div>

      </div>
      <div>
        {/* create a table to display the tags */}
        <div className="tableWrapper">
          <table style={{ backgroundColor: '#EBEBEB' }}>
            <thead>
              <tr>
                <th style={{ width: '50px', color: '#47474A', textAlign: 'left' }}>Id</th>
                <th style={{ color: '#3C92E1', width: 'auto' }}>Name</th>
                <th style={{ color: '#FEAC31' }}>Rating</th>
                <th>Catchy</th>
                <th>Interesting</th>
                <th>Important</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line array-callback-return */}
              {tags.filter((tag) => {
                if (tagToCompare === "") {
                  return tag
                } else if (tag.name.toLowerCase().includes(tagToCompare.toLowerCase())) {
                  return tag
                }
              }).map((tag, index) => (
                <tr key={tag.id}>
                  <td style={{ width: '50px', color: '#47474A', textAlign: 'left' }}>{tag.id}</td>
                  <td style={{ color: '#3C92E1', width: '300px' }}>{tag.name}</td>
                  <td style={{ color: '#FEAC31' }}>{Math.round(tag.rating)}</td>
                  <td className="mainTableRow">
                    <input
                      name={"xc"}
                      type="range"
                      min="0"
                      max="100"
                      value={tag.XTag.xc}
                      onChange={(e) => handleTagXInputChange(e, tag, index)}
                    /></td>
                  <td className="mainTableRow">
                    <input
                      name={"xi"}
                      type="range"
                      min="0"
                      max="100"
                      value={tag.XTag.xi}
                      onChange={(e) => handleTagXInputChange(e, tag, index)}
                    /></td>
                  <td className="mainTableRow">
                    <input
                      name={"xv"}
                      type="range"
                      min="0"
                      max="100"
                      value={tag.XTag.xv}
                      onChange={(e) => handleTagXInputChange(e, tag, index)}
                    /></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div >

  );
}

export default Home;