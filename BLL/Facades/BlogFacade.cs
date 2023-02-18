using harrygillingham.xyz.BLL.Facades.Interfaces;
using harrygillingham.xyz.BLL.Mapping.Interfaces;
using harrygillingham.xyz.DAL.Repositories.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Config;
using harrygillingham.xyz.Objects.Exceptions;
using LazyCache;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.BLL.Facades;

public class BlogFacade : IBlogFacade
{
    private readonly BlogConfig _blogConfig;
    private readonly IBlogMapper _blogMapper;
    private readonly IBlogRepository _blogRepository;
    private readonly IAppCache _cache;

    public BlogFacade(IBlogRepository blogRepository, IBlogMapper blogMapper, IAppCache cache,
        IOptions<BlogConfig> options)
    {
        _blogRepository = blogRepository;
        _blogMapper = blogMapper;
        _cache = cache;
        _blogConfig = options.Value;
    }

    public Task<BlogSummaryResponse> GetBlogSummaries(int? page, int? pageSize)
    {
        page ??= _blogConfig.DefaultPage;
        pageSize ??= _blogConfig.DefaultPageSize;

        return _cache.GetOrAddAsync($"{GetType().FullName}_BlogSummaries_{page.Value}_{pageSize.Value}", async () =>
        {
            var blogEntities = await _blogRepository.GetBlogEntities(page.Value, pageSize.Value);
            return _blogMapper.EntitiesToSummaries(blogEntities, pageSize.Value);
        }, DateTimeOffset.Now.AddMinutes(10));
    }

    public Task<Blog> GetBlogArticle(string slug)
    {
        return _cache.GetOrAddAsync($"{GetType().FullName}_{slug}_article", async () =>
        {
            var (entity, content) = await _blogRepository.GetBlogEntityWithMarkdownContent(slug);

            if (entity is null || string.IsNullOrWhiteSpace(content))
                throw new NotFoundException("Article not found");

            return _blogMapper.EntityWithContentToArticle(entity, content);
        }, DateTimeOffset.Now.AddHours(2));
    }

    public async Task<bool> AddBlogArticle(Blog blog)
    {
        var (entity, content) = _blogMapper.ArticleToEntityWithContent(blog);
        var success = await _blogRepository.AddBlogEntityWithContent(entity, content);

        if (!success) return false;

        InvalidateCache(blog.Slug);

        return true;
    }

    public async Task<bool> DeleteBlog(string slug)
    {
        var result = await _blogRepository.DeleteBlog(slug);

        if (!result) return false;

        InvalidateCache(slug);

        return true;
    }

    private void InvalidateCache(string slug)
    {
        _cache.Remove($"{GetType().FullName}_{slug}_article");
        _cache.Remove($"{GetType().FullName}_BlogSummaries_{_blogConfig.DefaultPage}_{_blogConfig.DefaultPageSize}");
    }
}