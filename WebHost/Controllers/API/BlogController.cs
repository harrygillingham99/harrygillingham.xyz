using System.Net;
using harrygillingham.xyz.BLL.Facades.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.Objects.Config;
using harrygillingham.xyz.WebHost.Controllers.API.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace harrygillingham.xyz.WebHost.Controllers.API
{
    [ApiController]
    [Route("api/blog")]
    public class BlogController : BaseController
    {
        private readonly BlogConfig _blogConfig;
        private readonly IBlogFacade _blogFacade;
        public BlogController(IOptions<BlogConfig> blogOptions, IBlogFacade blogFacade)
        {
            _blogFacade = blogFacade;
            _blogConfig = blogOptions.Value;
        }

        [HttpGet("summary")]
        [ProducesResponseType(typeof(List<BlogSummary>), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Summary([FromQuery] int? page, [FromQuery] int? pageSize)
        {
            return ExecuteMapToActionResult(() =>
                _blogFacade.GetBlogSummaries(page ?? _blogConfig.DefaultPage, pageSize ?? _blogConfig.DefaultPageSize));
        }

        [HttpGet("article/{id:guid}")]
        [ProducesResponseType(typeof(Blog), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromRoute] Guid id)
        {
            return ExecuteMapToActionResult(() => _blogFacade.GetBlogArticle(id));
        }

        [HttpPost("article")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromBody] Blog blog)
        {
            return ExecuteMapToActionResult(() => _blogFacade.AddBlogArticle(blog));
        }
    }
}
