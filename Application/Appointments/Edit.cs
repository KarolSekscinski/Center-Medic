using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Appointment Appointment { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Appointment.Id);

                _mapper.Map(request.Appointment, appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}