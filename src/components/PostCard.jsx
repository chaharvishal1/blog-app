import React from 'react'
import authService from '../appwrite/auth'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featureImage}) => {
  return (
    <Link to={`/post/${$id}`} className='bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105'>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={authService.getFilePreview(featureImage)} alt={title} className='w-full h-48 object-cover rounded-lg' />
        </div>
        <div className='w-full'>
            <h2 className='text-lg font-semibold'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
