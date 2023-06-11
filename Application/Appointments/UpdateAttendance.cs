using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                if (appointment == null) return null;

                var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var DoctorUsername = appointment.Attendees.FirstOrDefault(x => x.IsDoctor).AppUser.UserName;

                var attendance = appointment.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && DoctorUsername == user.UserName)
                    appointment.isCancelled = !appointment.isCancelled;
                if (attendance != null && DoctorUsername != user.UserName)
                    appointment.Attendees.Remove(attendance);
                if (attendance == null)
                {
                    attendance = new AppointmentAttendee
                    {
                        AppUser = user,
                        Appointment = appointment,
                        IsDoctor = false,
                    };
                    appointment.Attendees.Add(attendance);
                }
                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance - appointment");
            }
        }
    }
}