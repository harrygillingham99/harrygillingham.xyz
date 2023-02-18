using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.DAL.Repositories.Interfaces;

public interface IBlogRepository
{
    public Task<List<BlogEntity>> GetBlogEntities(int page, int pageSize);
    public Task<(BlogEntity? blog, string? content)> GetBlogEntityWithMarkdownContent(string slug);
    Task<bool> AddBlogEntityWithContent(BlogEntity blog, string markdownContent);
    Task<bool> DeleteBlog(string slug);
}