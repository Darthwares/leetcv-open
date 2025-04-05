import BlogList from "@components/blogList";
import { render, screen } from "@testing-library/react";

const mockPosts = [
  {
    id: 1,
    title: "Blog Post 1",
    href: "https://example.com/blog-post-1",
    description: "Description of Blog Post 1",
    imageUrl: "https://example.com/images/blog-post-1.jpg",
    date: "2023-05-10",
    datetime: "2023-05-10T10:00:00Z",
    category: {
      title: "Category 1",
      href: "https://example.com/category-1",
    },
    author: {
      name: "John Doe",
      role: "Author",
      href: "https://example.com/authors/john-doe",
      imageUrl: "https://example.com/images/john-doe.jpg",
    },
  },
];

describe("Blog List", () => {
  it("should render blog list components", () => {
    render(<BlogList posts={mockPosts} />);

    expect(screen.getByTestId("blogList")).toBeInTheDocument();

    mockPosts.forEach((post) => {
      expect(screen.getByTestId(`article-${post.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`image-${post.id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`dataTime-${post.id}`)).toBeInTheDocument();

      const category = screen.getByTestId(`category-${post.id}`);
      expect(category).toBeInTheDocument();

      expect(category).toHaveTextContent(post.category.title);

      expect(screen.getByTestId(`postTitle-${post.id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`description-${post.id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`authorImage-${post.id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`authorName-${post.id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`authorRole-${post.id}`)).toBeInTheDocument();
    });
  });
});
