using System.Net;
using harrygillingham.xyz.BLL.Facades.Interfaces;
using harrygillingham.xyz.Objects;
using harrygillingham.xyz.WebHost.Controllers.API.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace harrygillingham.xyz.WebHost.Controllers.API
{
    [ApiController]
    [Route("api/blog")]
    public class BlogController : BaseController
    {
        private readonly IBlogFacade _blogFacade;
        public BlogController( IBlogFacade blogFacade)
        {
            _blogFacade = blogFacade;
        }

        [HttpGet("summary")]
        [ProducesResponseType(typeof(BlogSummaryResponse), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Summary([FromQuery] int? page, [FromQuery] int? pageSize)
        {
            return ExecuteMapToActionResult(() =>
                _blogFacade.GetBlogSummaries(page, pageSize));
        }

        [HttpGet("article/{slug}")]
        [ProducesResponseType(typeof(Blog), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromRoute] string slug)
        {
            return ExecuteMapToActionResult(() => _blogFacade.GetBlogArticle(slug));
        }

        [Authorize]
        [HttpPost("article")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromBody] Blog blog)
        {
            return ExecuteMapToActionResult(() => _blogFacade.AddBlogArticle(blog));
        }

        [Authorize]
        [HttpDelete("article/{slug}")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public Task<IActionResult> DeleteArticle([FromRoute] string slug)
        {
            return ExecuteMapToActionResult(() => _blogFacade.DeleteBlog(slug));
        }

    }
}
