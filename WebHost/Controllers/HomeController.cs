using harrygillingham.xyz.Objects.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NSwag.Annotations;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class HomeController : Controller
    {
        private readonly BlogConfig _blogConfig;
        public HomeController(IOptions<BlogConfig> blogConfig)
        {
            _blogConfig = blogConfig.Value;
        }

        public IActionResult Index()
        {
            return View("Index", _blogConfig);
        }
    }
}
