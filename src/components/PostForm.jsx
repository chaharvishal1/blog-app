import React, {useEffect, useCallback} from 'react'
import { Input, Button, RTE, Select } from './FormModule/index.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import storageService from '../appwrite/storage';

const PostForm = ({post}) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });

    const submit = async (data) => {
        if(post) {
            const file = data.image?.[0] ? await storageService.uploadImage(data.image[0]) : null;
            if(file) {
                storageService.deleteImage(post.featureImage);
            }

            const dbPost = await storageService.updatePost(post.$id, { ...data, featureImage: file ? file.$id : undefined });

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {
            const file = data.image?.[0] ? await storageService.uploadImage(data.image[0]) : null;
            // const file =  await storageService.uploadImage(data.image[0]);

            if(file) {
                const fileId = file.$id
                data.featureImage = fileId;
                const dbPost = await storageService.createPost({ ...data, userId: userData.$id });

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") {
            return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        }
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if(name === "title") {
                const slug = slugTransform(value.title);
                setValue("slug", slug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input label="Title" placeholder="Enter title" {...register("title", { required: true })} />
        <Input label="Slug" placeholder="Enter slug" {...register("slug", { required: true })} onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })} />
        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className='w-1/3 px-2'>
        <Input label="Image file" type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", { required: !post })} />
        {post && <img src={storageService.imagePreview(post.featureImage)} alt="Post image" className="mb-4 max-h-48 object-cover" />}
        <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">{post ? "Update" : "Submit"}</Button>
      </div>
    </form>
  )
}

export default PostForm
