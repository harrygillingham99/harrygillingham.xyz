using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NSwag.Annotations;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class HomeController : Controller
    {
        private readonly AppSettings _appConfig;

        public HomeController(IOptions<AppSettings> appConfig)
        {
            _appConfig = appConfig.Value;
        }

        public IActionResult Index()
        {

            return View("Index", _appConfig);
        }
    }
}
