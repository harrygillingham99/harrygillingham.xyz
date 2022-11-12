namespace harrygillingham.xyz.Objects
{
    public class Blog : BlogSummary
    {
        public Blog()
        {

        }

        public Blog(string title, string markdownContent)
        {
            MarkdownContent = markdownContent;
            Title = title;
            Slug = title.ToLowerInvariant().Replace(" ", "-");
        }

        public Blog(string title, string slug, string markdownContent)
        {
            MarkdownContent = markdownContent;
            Title = title;
            Slug = slug;
        }

        public string MarkdownContent { get; set; } = string.Empty;
    }
}
