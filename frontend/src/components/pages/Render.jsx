// src/PhotoList.js
import React, { useState, useEffect } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import necessary styles
import styled from 'styled-components';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
    const data = await response.json();
    setPhotos(prevPhotos => [...prevPhotos, ...data]);
    console.log(photos)
    setLoading(false);
    setPage(prevPage => prevPage + 1);
  };

  const isRowLoaded = ({ index }) => !!photos[index];

  const loadMoreRows = () => {
    if (!loading) {
      fetchPhotos();
    }
  };

  const rowRenderer = ({ key, index, style }) => {
    const photo = photos[index];

    if (!photo) {
      return <div key={key} style={style}>Loading...</div>;
    }

    return (
      <div key={key} style={style}>
        <img src={photo.thumbnailUrl} alt={photo.title} />
        <p>{photo.title}</p>
      </div>
    );
  };

  return (
    <>
    <p>Hi</p>
    <AutoSizer>
      {({ height, width }) => (
          <List
          height={height}
          rowCount={photos.length + 1} // Add one more row to trigger loading
          rowHeight={150}
          rowRenderer={rowRenderer}
          width={width}
          onRowsRendered={({ stopIndex }) => {
              if (stopIndex >= photos.length - 1) {
                  loadMoreRows();
                }
            }}
            />
        )}
    </AutoSizer>
    <PhotoListContainer>
        {photos.map(each =>(
            <ListLi key={each.id}>
                <img src={each.thumbnailUrl} alt={each.title}/>
                <p>{each.title}</p>
            </ListLi>
        ))}
    </PhotoListContainer>
        </>
  );
};

export default PhotoList;

const PhotoListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ListLi = styled.li`
  margin: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 150px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    border-radius: 5px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
`;