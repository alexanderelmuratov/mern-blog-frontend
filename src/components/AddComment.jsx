import React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddComment() {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <div
        style={{
          // padding: '20px',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // fontSize: 24,
          // color: '#010101',
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Написать комментарий"
          multiline
          maxRows={10}
          fullWidth
          // variant="outlined"
        />
        <Button
          variant="contained"
          style={{
            marginTop: '20px',
          }}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
}
