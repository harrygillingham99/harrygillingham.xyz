using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace harrygillingham.xyz.WebHost.Controllers
{
    [OpenApiIgnore]
    public class AdminController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
