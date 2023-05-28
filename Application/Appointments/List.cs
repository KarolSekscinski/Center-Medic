using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Appointments
{
    public class List
    {
        public class Query : IRequest<Result<List<Appointment>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Appointment>>>
        {
            private readonly DataContext _context;
            

            public Handler(DataContext context)
            {
                _context = context;
            
            }

            public async Task<Result<List<Appointment>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Appointment>>.Success(await _context.Appointments.ToListAsync(cancellationToken));
                
            }
        }
    }
}