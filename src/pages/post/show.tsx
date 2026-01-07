import { useShow } from "@refinedev/core";
import { Typography, Tag, Space, theme } from "antd";
import { useParams, Link } from "react-router";
import { MarkdownField } from "@refinedev/antd";

const { Title, Text } = Typography;
const { useToken } = theme;

export const PostShow: React.FC = () => {
  const { id } = useParams();
  const { token } = useToken();

  const { query } = useShow({
    resource: "blog_posts",
    id,
    meta: {
      select: "*, categories(title)",
    },
  });

  const { data, isLoading } = query;
  const post = data?.data;

  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Text>Loading...</Text>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Text>Post not found</Text>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundColor: token.colorBgLayout,
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Link to="/login" style={{ fontSize: "14px", color: "#1890ff" }}>
              ← Back to home
            </Link>
          </div>

          <div>
            <Space size="small" style={{ marginBottom: 16 }}>
              <Tag color="blue">{post.categories?.title || "Uncategorized"}</Tag>
              <Tag color={post.status === "published" ? "green" : "orange"}>
                {post.status}
              </Tag>
            </Space>
            <Title level={1} style={{ margin: 0, marginBottom: 8 }}>
              {post.title}
            </Title>
            {post.createdAt && (
              <Text type="secondary">
                Published on {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}
          </div>

          <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
            {post.content && <MarkdownField value={post.content} />}
          </div>
        </Space>
      </div>
    </div>
  );
};
