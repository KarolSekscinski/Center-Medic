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
    public class Details
    {
        public class Query : IRequest<Result<PrescriptionDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PrescriptionDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            
            public async Task<Result<PrescriptionDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var prescription = await _context.Prescriptions
                    .ProjectTo<PrescriptionDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<PrescriptionDto>.Success(prescription);
            }
        }
    }
}