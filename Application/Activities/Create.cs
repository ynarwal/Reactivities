

using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private DataContext _dbContext;

            public Handler(DataContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _dbContext.Activities.Add(request.Activity);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}