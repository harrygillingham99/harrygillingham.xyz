using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure;
using harrygillingham.xyz.BLL.Mapping.Interfaces;
using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Mapping
{
    public class BlogMapper : IBlogMapper
    {
        public BlogSummaryResponse EntitiesToSummaries(List<BlogEntity> entities, int pageSize)
        {
            var summaries = entities.Select(e => new BlogSummary
            {
                Title = e.Title,
                Description = e.Description,
                Slug = e.Slug,
                Id = Guid.Parse(e.RowKey),
                Created = e.Created.DateTime
            }).OrderByDescending(x => x.Created).ToList();
            
            return new BlogSummaryResponse
            {
                Summaries = summaries,
                HasNextPage = summaries.Count == pageSize
            };
        }

        public Blog EntityWithContentToArticle(BlogEntity entity, string content)
        {
            return new Blog
            {
                Title = entity.Title,
                Slug = entity.Slug,
                Description = entity.Description,
                Id = Guid.Parse(entity.RowKey),
                Created = entity.Created.DateTime,
                MarkdownContent = content
            };
        }

        public (BlogEntity, string) ArticleToEntityWithContent(Blog article)
        {
            var entity = new BlogEntity
            {
                RowKey = article.Id.ToString(),
                Timestamp = DateTimeOffset.Now,
                Created = article.Created,
                MarkdownContentBlobId = string.Empty,
                ETag = ETag.All,
                Title = article.Title,
                Description = article.Description,
                Slug = article.Slug,
            };

            return (entity, article.MarkdownContent);
        }
    }
}
