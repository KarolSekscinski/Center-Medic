using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Appointments
{
    public class List
    {
        public class Query : IRequest<Result<List<AppointmentDto>>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<AppointmentDto>>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<List<AppointmentDto>>> Handle(Query request, CancellationToken cancellationToken)

            {
                var appointments = await _context.Appointments
                    .Include(x => x.Attendees)
                    .Where(x => (request.UserId != null) ? x.Attendees.Any(a => a.AppUserId == request.UserId) : true )
                    .ProjectTo<AppointmentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                





                return Result<List<AppointmentDto>>.Success(appointments);




            }
        }
    }
}