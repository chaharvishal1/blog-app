import React, {use, useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import storageService from '../appwrite/storage'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    storageService.getPosts([])
    .then((postData) => {
      setPosts(postData)
    })
  }, [])

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

export default AllPost
