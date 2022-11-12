using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.DAL.Repositories.Interfaces;

public interface IBlogRepository
{
    public Task<List<BlogEntity>> GetBlogEntities(int page, int pageSize);
    public Task<(BlogEntity? blog, string? content)> GetBlogEntityWithMarkdownContent(Guid id);
    Task<bool> AddBlogEntityWithContent(BlogEntity blog, string markdownContent);
}