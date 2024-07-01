const BlogDetailed = ({ blog, addLike }) => {
  return (
    <>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={addLike}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </>
  )
}

export default BlogDetailed
