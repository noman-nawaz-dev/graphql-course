import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/query/post.query";
import { useNavigate } from "react-router-dom";
import { Post } from "../types/post.types";

const PostList = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#2c5282", marginBottom: "0.5rem" }}>
          Explore Stories
        </h1>
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Where every post opens a door to new perspectives and shared
          experiences
        </p>
      </div>

      {data.getAllPosts.map((post: Post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
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

          <h2
            onClick={() => navigate(`/posts/${post._id}`)}
            style={{ cursor: "pointer", color: "#2c5282" }}
          >
            {post.title}
          </h2>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          />
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                marginBottom: "1rem",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                lineHeight: "1.5",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  post.description.replace(/<[^>]*>/g, " ").substring(0, 300) +
                  "...",
              }}
            />
            <div style={{ display: "flex", gap: "1rem", color: "#666" }}>
              <span>👁️ {post.numViews} views</span>
              <span>❤️ {post.likes.length} likes</span>
              <span>👎 {post.disLikes.length} dislikes</span>
            </div>
            <button
              onClick={() => navigate(`/posts/${post._id}`)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#2c5282",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
