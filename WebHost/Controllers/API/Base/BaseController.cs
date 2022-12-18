using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace harrygillingham.xyz.WebHost.Controllers.API.Base;

[ApiController]
[ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.InternalServerError)]
[ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.NotFound)]
[ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
public class BaseController : ControllerBase
{
    /* async */
    protected async Task<IActionResult> ExecuteMapToActionResult<T>(Func<Task<T>> action)
    {
        var result = await action();
        return Ok(result);
    }

    /* sync */
    protected IActionResult ExecuteMapToActionResult<T>(Func<T> action)
    {
        var result = action();
        return Ok(result);
    }

    /* async Fire + Forget */
    protected async Task<IActionResult> Execute(Func<Task> action)
    {
        await action();
        return Ok();
    }

    /* sync Fire + Forget */
    protected IActionResult Execute(Action action)
    {
        action();
        return Ok();
    }
}