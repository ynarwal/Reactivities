using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BaseApiController : ControllerBase
    {

        private IMediator _meditator;

        protected IMediator Mediator => _meditator ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}