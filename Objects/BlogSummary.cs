namespace harrygillingham.xyz.Objects;

public class BlogSummary
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Created { get; set; } = DateTime.Now;
}

public class BlogSummaryResponse
{
    public List<BlogSummary> Summaries { get; set; }
    public bool HasNextPage { get; set; }
}