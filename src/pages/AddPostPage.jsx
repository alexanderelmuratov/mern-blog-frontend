import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axios from '../axios';

export default function AddPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isAuth = useSelector(state => state.auth.isAuth);

  const inputFileRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags.join(' '));
          setImageUrl(data.imageUrl);
        })
        .catch(error => console.log(error));
    } else {
      setTitle('');
      setText('');
      setTags('');
      setImageUrl('');
    }
  }, [id]);

  const onChange = useCallback(value => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      minHeight: '350px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleChangeFile = async event => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = () => setImageUrl('');

  const handleSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        tags: tags.split(' '),
        imageUrl,
      };

      id
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '84px' }}>
      <Paper sx={styles.addPostWrapper}>
        {!imageUrl && (
          <>
            <Button
              onClick={() => inputFileRef.current.click()}
              variant="outlined"
              size="large"
              sx={{ marginBottom: 2 }}
            >
              Загрузить превью
            </Button>
            <input
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              hidden
            />
          </>
        )}
        {imageUrl && (
          <Box sx={styles.imageWrapper}>
            <img
              src={`https://mern-blog-backend.herokuapp.com${imageUrl}`}
              alt="Uploaded"
            />
            <IconButton
              aria-label="close"
              onClick={removeImage}
              sx={styles.closeButton}
            >
              <Close fontSize="large" />
            </IconButton>
          </Box>
        )}
        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          value={tags}
          onChange={e => setTags(e.target.value)}
          variant="outlined"
          placeholder="Теги..."
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <SimpleMDE value={text} onChange={onChange} options={options} />
        <Box sx={styles.buttonsWrapper}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            size="large"
            sx={{ marginRight: 2 }}
          >
            {id ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <Button onClick={() => navigate(-1)} variant="outlined" size="large">
            Отмена
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

const styles = {
  addPostWrapper: {
    marginTop: 3,
    marginBottom: 3,
    padding: '30px',
  },
  imageWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',

    '&:hover': {
      color: '#fff',
    },
  },
  buttonsWrapper: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
