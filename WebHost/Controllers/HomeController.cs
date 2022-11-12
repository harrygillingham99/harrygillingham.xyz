using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class HomeController : Controller
    {

        public HomeController()
        {
        }

        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
