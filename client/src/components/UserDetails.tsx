import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GET_USER_BASIC,
  GET_USER_CONNECTIONS,
  GET_USER_POSTS,
  GET_POST_COMMENTS,
} from "../graphql/query/user.query";
import { Post } from "../types/post.types";
import { UserConnection } from "../types/user.types";

interface Comment {
  description: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
  };
}

const UserDetails = () => {
  const { id } = useParams();

  // Load basic user data
  const {
    data: basicData,
    loading: basicLoading,
    error: basicError,
  } = useQuery(GET_USER_BASIC, {
    variables: { getUserId: id },
  });

  // Load connections after basic data
  const { data: connectionsData, loading: connectionsLoading } = useQuery(
    GET_USER_CONNECTIONS,
    {
      variables: { getUserId: id },
      skip: !basicData,
    }
  );

  // Load posts with pagination
  const { data: postsData, loading: postsLoading } = useQuery(GET_USER_POSTS, {
    variables: { getUserId: id, limit: 10, offset: 0 },
    skip: !basicData,
  });

  if (basicLoading) return <div>Loading...</div>;
  if (basicError) return <div>Error: {basicError.message}</div>;

  const user = {
    ...basicData.getUser,
    followers: connectionsData?.getUser?.followers || [],
    following: connectionsData?.getUser?.following || [],
    posts: postsData?.getUser?.posts || [],
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Profile Header */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <img
          src={user.profilePhoto}
          alt={`${user.firstName}'s profile`}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <h1 style={{ margin: "0 0 10px 0" }}>
            {user.firstName} {user.lastName}
          </h1>
          <p style={{ fontSize: "1.1em", color: "#666" }}>{user.bio}</p>
        </div>
      </div>

      {/* Connections Section */}
      <div style={{ marginBottom: "30px" }}>
        {connectionsLoading ? (
          <div>Loading connections...</div>
        ) : (
          <>
            {/* Followers Section */}
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ marginBottom: "15px" }}>
                Followers ({user.followers.length})
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                {user.followers.map(
                  (follower: UserConnection, index: number) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={follower.profilePhoto}
                        alt={`${follower.firstName}'s profile`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>
                          {follower.firstName} {follower.lastName}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Following Section */}
            <div>
              <h2 style={{ marginBottom: "15px" }}>
                Following ({user.following.length})
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "15px",
                }}
              >
                {user.following.map(
                  (following: UserConnection, index: number) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={following.profilePhoto}
                        alt={`${following.firstName}'s profile`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>
                          {following.firstName} {following.lastName}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h2>Posts ({user.postCount})</h2>
        {postsLoading ? (
          <div>Loading posts...</div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {user.posts.map((post: Post, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Separated PostCard component for better organization
const PostCard = ({ post }: { post: Post }) => {
  // Load comments for each post
  const { data: commentsData } = useQuery(GET_POST_COMMENTS, {
    variables: { postId: post._id },
  });

  const comments = commentsData?.getCommentsByPostId || [];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <img
        src={post.image}
        alt={post.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "15px" }}>
        <span
          style={{
            backgroundColor: "green",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.8em",
          }}
        >
          {post.category}
        </span>
        <h3 style={{ margin: "10px 0" }}>{post.title}</h3>
        {post.description && (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.description }}
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "20px",
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#999",
            }}
          />
        )}
        <div style={{ marginTop: "10px", color: "#888", fontSize: "0.8em" }}>
          {post.numViews} views • {comments.length} comments
        </div>

        {/* Comments Section */}
        {comments.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>Comments</h4>
            {comments.map((comment: Comment, commentIndex: number) => (
              <div
                key={commentIndex}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <img
                    src={comment.user?.profilePhoto}
                    alt={`${comment.user?.firstName}'s profile`}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {comment.user?.firstName} {comment.user?.lastName}
                    </span>
                    <span
                      style={{
                        color: "#888",
                        fontSize: "0.8em",
                        marginLeft: "10px",
                      }}
                    >
                      {new Date(
                        parseInt(comment.createdAt)
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p style={{ margin: "0", color: "#999" }}>
                  {comment.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
