using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class HomeController : Controller
    {
        [Authorize]
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
