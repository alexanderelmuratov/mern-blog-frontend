import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';

export default function HomePage() {
  return (
    <>
      <Tabs
        style={{ marginBottom: 20 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые"></Tab>
        <Tab label="Популярные"></Tab>
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {Array.from(Array(5)).map((_, i) => (
            <div key={i}>
              <Post />
              <TagsBlock />
              <CommentsBlock />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
