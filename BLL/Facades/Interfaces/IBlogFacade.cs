using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Facades.Interfaces;

public interface IBlogFacade
{
    public Task<BlogSummaryResponse> GetBlogSummaries(int? page, int? pageSize);
    public Task<Blog> GetBlogArticle(string slug);
    Task<bool> AddBlogArticle(Blog blog);
}