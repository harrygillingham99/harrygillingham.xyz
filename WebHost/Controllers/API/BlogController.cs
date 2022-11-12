using System.Net;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Config;
using harrygillingham.xyz.WebHost.Controllers.API.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.WebHost.Controllers.API
{
    [ApiController]
    [Route("blog")]
    public class BlogController : BaseController
    {
        private readonly BlogConfig _blogConfig;
        public BlogController(IOptions<BlogConfig> blogOptions)
        {
            _blogConfig = blogOptions.Value;   
        }

        [HttpGet("summary")]
        [ProducesResponseType(typeof(List<BlogSummary>), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Summary([FromQuery] int? page, [FromQuery] int? pageSize)
        {
            throw new NotImplementedException();
        }

        [HttpGet("article/{id}")]
        [ProducesResponseType(typeof(Blog), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromRoute] Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
