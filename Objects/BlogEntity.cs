using Azure;
using Azure.Data.Tables;

namespace harrygillingham.xyz.Objects
{
    public class BlogEntity : ITableEntity
    {
        public string PartitionKey { get; set; } = "blog-article";
        public string RowKey { get; set; } = string.Empty;
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public DateTimeOffset Created { get; set; }
        public string MarkdownContentBlobId { get; set; } = string.Empty;
    }
}
