using Azure.Data.Tables;
using harrygillingham.xyz.DAL.Repositories.Base;
using harrygillingham.xyz.DAL.Repositories.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Config;
using harrygillingham.xyz.Objects.Exceptions;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.DAL.Repositories;
public class BlogRepository : BaseAzureStorageRepo , IBlogRepository
{
    public BlogRepository(IOptions<AzureConfig> azureOptions, TableClientOptions? options = null) : base(azureOptions.Value.ConnectionString, azureOptions.Value.BlogTableName, options)
    {
    }

    public Task<List<BlogEntity>> GetBlogEntities(int page, int pageSize)
    {
        return WithTableClient(async tc =>
        {
            List<BlogEntity> articles = new();
            var summaryPages = tc.QueryAsync<BlogEntity>(maxPerPage: pageSize).AsPages();

            await foreach (var blogArticle in summaryPages.Skip(page))
            {
                articles.AddRange(blogArticle.Values);
            }

            return articles;
        });
    }

    public async Task<(BlogEntity? blog, string? content)> GetBlogEntityWithMarkdownContent(Guid id)
    {
        var blogEntity = await WithTableClient(async tc=>
        {
            var result = tc.QueryAsync<BlogEntity>(blog =>
                blog.RowKey.Equals(id.ToString(), StringComparison.InvariantCultureIgnoreCase));

            var blog = await result.FirstOrDefaultAsync();

            if (blog is null) throw new NotFoundException("Blog could not be found");

            return blog;
        });

        var content = await DownloadBlob<string>(blogEntity.MarkdownContentBlobId);

        return (blogEntity, content);
    }

    public async Task<bool> AddBlogEntityWithContent(BlogEntity blog, string markdownContent)
    {
        var blobId = await UploadBlob(markdownContent, Guid.NewGuid().ToString());

        if (string.IsNullOrWhiteSpace(blobId)) throw new Exception("Content blob failed to upload");

        blog.MarkdownContentBlobId = blobId;

        return await WithTableClient(async tc =>
        {
            var result = await tc.UpsertEntityAsync(blog);
            return !result.IsError;
        });
    }
}