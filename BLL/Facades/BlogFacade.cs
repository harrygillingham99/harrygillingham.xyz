using harrygillingham.xyz.BLL.Facades.Interfaces;
using harrygillingham.xyz.BLL.Mapping.Interfaces;
using harrygillingham.xyz.DAL.Repositories.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Exceptions;

namespace harrygillingham.xyz.BLL.Facades
{

    public class BlogFacade : IBlogFacade
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IBlogMapper _blogMapper;

        public BlogFacade(IBlogRepository blogRepository, IBlogMapper blogMapper)
        {
            _blogRepository = blogRepository;
            _blogMapper = blogMapper;
        }

        public async Task<List<BlogSummary>> GetBlogSummaries(int page, int pageSize)
        {
            var blogEntities = await _blogRepository.GetBlogEntities(page, pageSize);
            return _blogMapper.EntitiesToSummaries(blogEntities);
        }

        public async Task<Blog> GetBlogArticle(Guid id)
        {
            var (entity, content) = await _blogRepository.GetBlogEntityWithMarkdownContent(id);

            if (entity is null || string.IsNullOrWhiteSpace(content)) throw new NotFoundException("Article not found");
            
            return _blogMapper.EntityWithContentToArticle(entity, content);
        }

        public Task<bool> AddBlogArticle(Blog blog)
        {
            var (entity, content) = _blogMapper.ArticleToEntityWithContent(blog);
            return _blogRepository.AddBlogEntityWithContent(entity, content);
        }
    }
}