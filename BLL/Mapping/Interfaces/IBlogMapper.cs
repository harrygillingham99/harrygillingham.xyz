using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Mapping.Interfaces;

public interface IBlogMapper
{
    List<BlogSummary> EntitiesToSummaries(List<BlogEntity> entities);
    Blog EntityWithContentToArticle(BlogEntity entity, string content);
    (BlogEntity, string) ArticleToEntityWithContent(Blog article);

}