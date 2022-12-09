using harrygillingham.xyz.Objects.Attributes;

namespace harrygillingham.xyz.Objects.Config
{
    [NSwagInclude]
    public class BlogConfig
    {
        public int DefaultPageSize { get; set; }
        public int DefaultPage { get; set; }
        public string LinkedInUrl { get; set; }
        public string GitHubUrl { get; set; }
    }
}
