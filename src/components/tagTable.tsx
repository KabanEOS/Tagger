import React from 'react'
import { Tag } from '../models/Tag.model';

interface Props {
  isTableView: boolean;
  tags: Tag[];
  handleTagXInputChange: (e: React.ChangeEvent<HTMLInputElement>, tag: Tag) => void
}

export const TagTable: React.FC<Props> = ({ tags, handleTagXInputChange, isTableView }) => {

  return (
    <div className={isTableView ? "fadeIn" : "fadeOut"}>
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
            {tags.map((tag, index) => (
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
                    onChange={(e) => handleTagXInputChange(e, tag)}
                  /></td>
                <td className="mainTableRow">
                  <input
                    name={"xi"}
                    type="range"
                    min="0"
                    max="100"
                    value={tag.XTag.xi}
                    onChange={(e) => handleTagXInputChange(e, tag)}
                  /></td>
                <td className="mainTableRow">
                  <input
                    name={"xv"}
                    type="range"
                    min="0"
                    max="100"
                    value={tag.XTag.xv}
                    onChange={(e) => handleTagXInputChange(e, tag)}
                  /></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>

  )
}
