import { AuthPage } from "@refinedev/antd";
import { useList, type BaseRecord } from "@refinedev/core";
import { Card, Typography, Space, Tag } from "antd";
import { Link } from "react-router";

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const { result } = useList({
    resource: "blog_posts",
    pagination: {
      pageSize: 3,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    meta: {
      select: "*, categories(title)",
    },
  });

  const blogPosts = result?.data || [];

  console.log("Blog posts data:", blogPosts);

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@demo.com",
          password: "123456",
        },
      }}
      renderContent={(content: React.ReactNode) => (
        <div>
          <div style={{ textAlign: "center", paddingBottom: "8px" }}>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              Click on Sign in to view the Refine.dev dashboard.
            </Text>
          </div>
          {content}
          {blogPosts.length > 0 && (
            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Title
                level={4}
                style={{ textAlign: "center", marginBottom: 24 }}
              >
                Latest Blog Posts
              </Title>
              <div style={{ maxWidth: "400px", width: "100%" }}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  {blogPosts.map((post: BaseRecord) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card hoverable style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 16,
                          }}
                        >
                          <div
                            style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
                          >
                            <Title
                              level={5}
                              style={{ margin: 0, marginBottom: 4 }}
                            >
                              {post.title}
                            </Title>
                            {post.content && (
                              <Text
                                type="secondary"
                                style={{
                                  fontSize: "13px",
                                  display: "block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  marginBottom: 4,
                                }}
                              >
                                {post.content.replace(/[#*`\n]/g, "").trim()}
                              </Text>
                            )}
                            {post.createdAt && (
                              <Text
                                type="secondary"
                                style={{ fontSize: "12px" }}
                              >
                                {new Date(post.createdAt).toLocaleDateString()}
                              </Text>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", gap: 8, flexShrink: 0 }}
                          >
                            <Tag color="blue">
                              {post.categories?.title || "Uncategorized"}
                            </Tag>
                            <Tag
                              color={
                                post.status === "published" ? "green" : "orange"
                              }
                            >
                              {post.status}
                            </Tag>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </Space>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};
