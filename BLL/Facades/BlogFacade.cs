using harrygillingham.xyz.BLL.Facades.Interfaces;
using harrygillingham.xyz.BLL.Mapping.Interfaces;
using harrygillingham.xyz.DAL.Repositories.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Exceptions;
using LazyCache;

namespace harrygillingham.xyz.BLL.Facades
{

    public class BlogFacade : IBlogFacade
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IBlogMapper _blogMapper;
        private readonly IAppCache _cache;

        public BlogFacade(IBlogRepository blogRepository, IBlogMapper blogMapper, IAppCache cache)
        {
            _blogRepository = blogRepository;
            _blogMapper = blogMapper;
            _cache = cache;
        }

        public Task<BlogSummaryResponse> GetBlogSummaries(int page, int pageSize)
        {
            return _cache.GetOrAddAsync($"{GetType().FullName}_BlogSummaries_{page}_{pageSize}", async () =>
                {
                    var blogEntities = await _blogRepository.GetBlogEntities(page, pageSize);
                    return _blogMapper.EntitiesToSummaries(blogEntities, pageSize);
                }, DateTimeOffset.Now.AddHours(2))
                ;
        }

        public Task<Blog> GetBlogArticle(Guid id)
        {
            return _cache.GetOrAddAsync($"{GetType().FullName}_{id}_article", async () =>
            {
                var (entity, content) = await _blogRepository.GetBlogEntityWithMarkdownContent(id);

                if (entity is null || string.IsNullOrWhiteSpace(content))
                    throw new NotFoundException("Article not found");

                return _blogMapper.EntityWithContentToArticle(entity, content);
            }, DateTimeOffset.Now.AddHours(2));
        }

        public Task<bool> AddBlogArticle(Blog blog)
        {
            var (entity, content) = _blogMapper.ArticleToEntityWithContent(blog);
            return _blogRepository.AddBlogEntityWithContent(entity, content);
        }
    }
}