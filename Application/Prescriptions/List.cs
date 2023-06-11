using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Prescriptions
{
    public class List
    {
        public class Query : IRequest<Result<List<PrescriptionDto>>> {
            public string UserId { get; set; }
         }

        public class Handler : IRequestHandler<Query, Result<List<PrescriptionDto>>>
        {
            private readonly DataContext _context;
            
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            
            public async Task<Result<List<PrescriptionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointments = await _context.Prescriptions
                    .Include(x => x.Attendees)
                    .Where(x => (request.UserId != null) ? x.Attendees.Any(a => a.AppUserId == request.UserId) : true )
                    .ProjectTo<PrescriptionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<PrescriptionDto>>.Success(appointments);
            }
        }
    }
}