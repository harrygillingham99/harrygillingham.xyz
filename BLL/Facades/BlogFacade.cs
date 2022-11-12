using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Facades
{
    public class BlogFacade : IBlogFacade
    {
        public Task<List<BlogSummary>> GetBlogSummaries(int page, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Blog> GetBlogArticle(Guid id)
        {
            throw new NotImplementedException();
        }
    }

    public interface IBlogFacade
    {
        public Task<List<BlogSummary>> GetBlogSummaries(int page, int pageSize);
        public Task<Blog> GetBlogArticle(Guid id);
    }
}