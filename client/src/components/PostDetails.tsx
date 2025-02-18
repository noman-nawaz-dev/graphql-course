import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_POST_BY_ID } from "../graphql/query/post.query";
import { DELETE_POST_MUTATION } from "../graphql/mutations/post.mutation";
import { toast } from "react-toastify";
import { Post, Comment } from "../types/post.types";
import { useUser } from "../hooks/useUser";

const PostDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { id },
  });

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: (data) => {
      if (data.deletePost) {
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Failed to delete post.");
      }
    },
    onError: () => {
      toast.error("An error occurred while deleting the post.");
    },
  });

  const handleDelete = () => {
    deletePost({ variables: { id } });
  };

  const { user } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const post: Post = data.getPost;

  console.log(user);
  const isOwner = post.user._id === user?._id;

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      {isOwner && (
        <button onClick={handleDelete} style={{ marginBottom: "1rem" }}>
          Delete Post
        </button>
      )}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <img
          src={post.user.profilePhoto}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "1rem",
          }}
        />
        <div>
          <h4 style={{ margin: 0 }}>
            {post.user.firstName} {post.user.lastName}
          </h4>
          <small>
            {new Date(parseInt(post.createdAt)).toLocaleDateString()}
          </small>
        </div>
      </div>

      <h1>{post.title}</h1>
      <img
        src={post.image}
        alt={post.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />
      <div
        style={{ lineHeight: "1.6", margin: "2rem 0" }}
        dangerouslySetInnerHTML={{ __html: post.description }}
      />

      <div style={{ marginTop: "2rem" }}>
        <h2>Comments</h2>
        {post.comments.map((comment: Comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <img
                src={comment.user.profilePhoto}
                alt="Profile"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "0.5rem",
                }}
              />
              <div>
                <strong>
                  {comment.user.firstName} {comment.user.lastName}
                </strong>
                <small style={{ marginLeft: "1rem" }}>
                  {new Date(parseInt(comment.createdAt)).toLocaleDateString()}
                </small>
              </div>
            </div>
            <p style={{ margin: "0" }}>{comment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
