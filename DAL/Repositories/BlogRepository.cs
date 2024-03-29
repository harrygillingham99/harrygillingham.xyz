﻿using Azure;
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
    private readonly bool _addBlogEnabled;
    public BlogRepository(IOptions<AzureConfig> azureOptions, TableClientOptions? options = null) : base(azureOptions.Value.ConnectionString, azureOptions.Value.BlogTableName, options)
    {
        _addBlogEnabled = azureOptions.Value.AddBlogEnabled;
    }

    public Task<List<BlogEntity>> GetBlogEntities(int page, int pageSize)
    {
        return WithTableClient(async tc =>
        {
            List<BlogEntity> articles = new();
            var summaryPages = tc.QueryAsync<BlogEntity>(maxPerPage: pageSize).AsPages(pageSizeHint: pageSize);

            await foreach (var blogArticle in summaryPages.Skip(page))
            {
                articles.AddRange(blogArticle.Values);
            }

            return articles;
        })!;
    }

    public async Task<(BlogEntity? blog, string? content)> GetBlogEntityWithMarkdownContent(string slug)
    {
        var blogEntity = await WithTableClient(async tc=>
        {
            var result = tc.QueryAsync<BlogEntity>(blog =>
                blog.Slug.Equals(slug, StringComparison.InvariantCultureIgnoreCase));

            var blog = await result.OrderByDescending(x => x.Created).FirstOrDefaultAsync();

            if (blog is null) throw new NotFoundException("Blog could not be found");

            return blog;
        });

        var content = await DownloadBlob<string>(blogEntity!.MarkdownContentBlobId);

        return (blogEntity, content);
    }

    public async Task<bool> AddBlogEntityWithContent(BlogEntity blog, string markdownContent)
    {
        if (!_addBlogEnabled) return false;

        var blobId = await UploadBlob(markdownContent, Guid.NewGuid().ToString());

        if (string.IsNullOrWhiteSpace(blobId)) throw new Exception("Content blob failed to upload");

        blog.MarkdownContentBlobId = blobId;

        return await WithTableClient(async tc =>
        {
            var result = await tc.UpsertEntityAsync(blog);
            return !result.IsError;
        });
    }

    public async Task<bool> DeleteBlog(string slug)
    {
        var deletionResult = true;
        var (blog, _) = await GetBlogEntityWithMarkdownContent(slug);
        
        if (!string.IsNullOrEmpty(blog?.MarkdownContentBlobId))
        {
            deletionResult &= await DeleteBlob(blog.MarkdownContentBlobId);
        }

        if (blog is null) return deletionResult;

        deletionResult &= await WithTableClient(async tc =>
        {
            var result = await tc.DeleteEntityAsync(blog.PartitionKey, blog.RowKey, ETag.All);
            return !result.IsError;
        });

        return deletionResult;
    }
}