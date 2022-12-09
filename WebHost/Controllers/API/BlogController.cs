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
        [ProducesResponseType(typeof(BlogSummaryResponse), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Summary([FromQuery] int? page, [FromQuery] int? pageSize)
        {
            return ExecuteMapToActionResult(() =>
                _blogFacade.GetBlogSummaries(page ?? _blogConfig.DefaultPage, pageSize ?? _blogConfig.DefaultPageSize));
        }

        [HttpGet("article/{slug}")]
        [ProducesResponseType(typeof(Blog), (int)HttpStatusCode.OK)]
        public Task<IActionResult> Article([FromRoute] string slug)
        {
            return ExecuteMapToActionResult(() => _blogFacade.GetBlogArticle(slug));
        }

        //[HttpPost("article")]
        //[ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        //public Task<IActionResult> Article([FromBody] Blog blog)
        //{
        //    return ExecuteMapToActionResult(() => _blogFacade.AddBlogArticle(blog));
        //}
    }
}
