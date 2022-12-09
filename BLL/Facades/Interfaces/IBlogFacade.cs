﻿using harrygillingham.xyz.Objects;

namespace harrygillingham.xyz.BLL.Facades.Interfaces;

public interface IBlogFacade
{
    public Task<List<BlogSummary>> GetBlogSummaries(int page, int pageSize);
    public Task<Blog> GetBlogArticle(Guid id);
    Task<bool> AddBlogArticle(Blog blog);
}