using System.Security.Principal;
using harrygillingham.xyz.Objects.Attributes;

namespace harrygillingham.xyz.Objects.Config
{
    [NSwagInclude]
    public class BlogConfig
    {
        public int DefaultPageSize { get; set; }
        public int DefaultPage { get; set; }
        public string LinkedInUrl { get; set; } = string.Empty;
        public string GitHubUrl { get; set; } = string.Empty;
        public bool? Authenticated { get; set; } = false;
        public string LogOutUrl { get; set; } = string.Empty;
        public BlogConfig SetIsAuthenticated(IIdentity? identity)
        {
            Authenticated = identity?.IsAuthenticated ?? false;
            return this;
        }

        public BlogConfig SetLogOutUrl(string logOutUrl)
        {
            LogOutUrl = logOutUrl;
            return this;
        }
    }
}
