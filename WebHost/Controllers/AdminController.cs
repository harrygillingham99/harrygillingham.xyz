using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using harrygillingham.xyz.Objects.Config;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class AdminController : Controller
    {
        private readonly BlogConfig _blogConfig;
        public AdminController(IOptions<BlogConfig> blogConfig)
        {
            _blogConfig = blogConfig.Value;
        }

        [Authorize]
        public IActionResult Index()
        {
            return View("Index", _blogConfig
                .SetIsAuthenticated(User.Identity)
                .SetLogOutUrl(Url.Action("Logout", "Account")!));
        }
    }
}
