import React, {use, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../components';
import { Button } from '../components/FormModule/Index';
import storageService from '../appwrite/storage';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = userData && post && userData.$id === post.userId;

  const deletePost = () => {
    storageService.deletePost(post.$id).then((status) => {
        if(status) {
            storageService.deleteImage(post.featureImage);
            navigate("/");
        }
    })
  }

  useEffect(() => {
    if(slug){
        storageService.getPost(slug).then((post) => {
            if(post) setPost(post)
            else navigate("/")
        })
    }
    else {
        navigate("/")
    }
  }, [slug])
  return (
    post && (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storageService.imagePreview(post.featureImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
  ))
}

export default Post
