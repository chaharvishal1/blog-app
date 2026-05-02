import React, {use, useEffect} from 'react'
import { Container, PostForm } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import storageService from '../appwrite/storage';
import { set } from 'react-hook-form';

const EditPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  useEffect(() => {
    storageService.getPost(slug)
    .then((postData) => {
      if(postData) setPost(postData);
      else navigate('/');
    })
  }, [slug, navigate]);


  return (
    post && (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
  )
}

export default EditPost
