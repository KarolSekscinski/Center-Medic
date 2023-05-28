using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
             public Appointment Appointment { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Appointment).SetValidator(new AppointmentValidator());
            }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Appointments.Add(request.Appointment);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) {
                    return Result<Unit>.Failure("Failed to create appointment");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}