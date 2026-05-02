import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import storageService from '../appwrite/storage'

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    storageService.getPosts()
      .then((postData) => {
        if (postData) setPosts(postData.documents);
      });
  }, [])

  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
