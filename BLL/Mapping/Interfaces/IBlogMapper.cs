using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Mapping.Interfaces;

public interface IBlogMapper
{
    BlogSummaryResponse EntitiesToSummaries(List<BlogEntity> entities, int pageSize);
    Blog EntityWithContentToArticle(BlogEntity entity, string content);
    (BlogEntity, string) ArticleToEntityWithContent(Blog article);

}